import React, { Component } from 'react'
import IconETH from '../assets/img/Group 8045.svg'
import IconClose from '../assets/img/close.svg'
import Arrow from '../assets/img/Group 8784.svg'
import Question from '../assets/img/question.svg'
import Header from '../components/Header'
import Utils from '../utils';
import EthereumService from '../services/EthereumService';
import ServerAPI from '../ServerAPI'
import Clipboard from 'clipboard'
import { connect } from 'react-redux';
import _ from 'lodash'
import { toastr } from 'react-redux-toastr'
import odefiSaleABI from '../odefi-sale.abi.json'
import { SALE_CONTRACT_ADDRESS, DEFAULT_REF_ADDRESS } from '../constants'
import Axios from 'axios'

new Clipboard(".copy")

class PreSaleController extends Component {
    constructor(props) {
        super(props);

        this.state = {
            saleOrders: [],
            orderHistory: [],
            invitedPeople: [],
            selectedChild: 'YOUR ORDER',
            showPopup: false,
            config: false,
            amount: "0",
            totalAmountPreviousRound: 0,
            saleOrderLocalStorage: false,
            started: false,
            ref: false,
            ethPrice: 0,
            selectedCoin: "ETHEREUM"
        };
    };

    async componentDidMount() {
        if (window.location.pathname === "/") {
            window.location.pathname = "/presale";
            return;
        }

        if (this.props.match || this.props.match.params || this.props.match.params.ref) {
            if (EthereumService.web3.utils.isAddress(this.props.match.params.ref)) {
                Utils.setCookie("ref", this.props.match.params.ref, 30)
            }
        }

        this.getConfig()
        this.getBalance()
        this.getSaleOrderLocalStorage()
        this.getRef()
    }

    componentDidUpdate(prevProps) {

        if (window.location.pathname === "/") {
            window.location.pathname = "/presale"
            return;
        }

        if (_.isEqual(prevProps, this.props)) {
            return;
        }

        if (this.props.myAddress) {
            var linkRef = `${window.location.origin}/presale/${this.props.myAddress.toLowerCase()}`
            this.setState({
                linkRef
            })
        }

        this.getBalance()
        this.getSaleOrder()
        this.getRef()
    }

    getRef() {
        if (!this.props.myAddress) return;
        ServerAPI.getRef(this.props.myAddress).then(ref => this.setState({ ref }))
    }

    getSaleOrderLocalStorage() {
        let saleOrderLocalStorage = window.localStorage.getItem('saleOrderLocalStorage')

        if (!saleOrderLocalStorage) saleOrderLocalStorage = []
        else {
            saleOrderLocalStorage = JSON.parse(saleOrderLocalStorage)
        }

        this.setState({
            saleOrderLocalStorage
        })
    }

    getSaleOrder = () => {
        var interval = setInterval(async () => {
            var { saleOrderLocalStorage } = this.state
            if (this.props.myAddress && saleOrderLocalStorage) {
                clearInterval(interval)

                ServerAPI.getSaleOrder(this.props.myAddress).then(dbOrders => {
                    var saleOrders = []
                    dbOrders.forEach(orderDB => {
                        saleOrderLocalStorage = saleOrderLocalStorage.filter(x => x.txid !== orderDB.txid)
                    });

                    saleOrders = [...saleOrderLocalStorage, ...dbOrders]

                    this.setState({
                        saleOrders,
                        saleOrderLocalStorage,
                    })

                    window.localStorage.setItem("saleOrderLocalStorage", JSON.stringify(saleOrderLocalStorage))
                })

                ServerAPI.getSaleOrderHistory(this.props.myAddress).then(orderHistory => {
                    this.setState({
                        orderHistory
                    })
                })

                ServerAPI.getSaleRef(this.props.myAddress).then(invitedPeople => {
                    this.setState({
                        invitedPeople
                    })
                })


            }
        }, 1000)
    }

    getBalance = () => {
        if (this.props.myAddress) {
            EthereumService.web3.eth.getBalance(this.props.myAddress, (err, balance) => {
                this.setState({
                    balance: EthereumService.web3.utils.fromWei(balance)
                })
            })
        }
    }

    getConfig = async () => {
        const res = await Axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd`)
        const ethPrice = res.data.ethereum.usd
        var config = await ServerAPI.getConfig()
        const roundConfig = await ServerAPI.getRoundConfig(config.current_round)
        const amountOdefiPerUSDT = Math.ceil(1 / (roundConfig.estimated_price * ethPrice))
        const previousRoundConfig = await ServerAPI.getRoundConfig(config.current_round - 1)
        const previousAmountOdefiPerUSDT = Math.ceil(1 / (previousRoundConfig.estimated_price * ethPrice))

        setInterval(() => {
            this.countDown()
        }, 1000);

        let started = false
        if (new Date().getTime() > config.start_time) {
            started = true
        }

        this.setState({
            config,
            amount: config.min_order.toString(),
            amountOdefiPerUSDT,
            previousAmountOdefiPerUSDT,
            started
        })
    }

    countDown = () => {
        var { config, started } = this.state
        let now = new Date().getTime();

        let distance = config.start_time - now;
        if (started) {
            distance = config.next_round_time - now;
        }

        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        var countdown = `${days}d ${hours}h ${minutes}m ${seconds}s`

        this.setState({
            countdown
        })
    }

    onDeposit = () => {

        const { saleOrderLocalStorage, config, saleOrders, amount } = this.state

        if (!this.props.myAddress) {
            toastr.info('', "Please login first")
            return
        }

        if (amount < config.min_order) {
            toastr.error('', `Min order: ${config.min_order} ETH`)
            return
        }

        const ref = Utils.getCookie('ref') || DEFAULT_REF_ADDRESS

        const contract = new EthereumService.web3.eth.Contract(odefiSaleABI, SALE_CONTRACT_ADDRESS);

        const encodeABI = contract.methods.order(ref).encodeABI()

        window.web3.eth.sendTransaction({
            from: this.props.myAddress,
            to: SALE_CONTRACT_ADDRESS,
            value: EthereumService.web3.utils.numberToHex(EthereumService.web3.utils.toWei(this.state.amount)),
            data: encodeABI
        }, (error, result) => {
            if (error) {
                return toastr.error(error + "")
            }

            const order = {
                txid: result,
                amount: parseFloat(amount),
                time: new Date().getTime() / 1000,
                pending: true,
                round: config.current_round
            }

            saleOrderLocalStorage.push(order)
            window.localStorage.setItem("saleOrderLocalStorage", JSON.stringify(saleOrderLocalStorage))

            saleOrders.unshift(order)

            this.setState({
                saleOrderLocalStorage,
                saleOrders
            })

            toastr.success("", "Order Successfully")
        })
    }

    onCopy = () => {
        toastr.success('', "Copied")
    }

    onClickCoin = (name) => {
        this.setState({
            selectedCoin: name
        })
    }

    renderPopup() {
        var { config, ref } = this.state
        return (
            <div className="overlay">
                <div className="waper">
                    <div className="dark-range" onClick={() => { this.setState({ showPopup: false }) }}></div>
                    <div className="ref-question">
                        <img onClick={() => this.setState({ showPopup: false })} className="close" src={IconClose} alt="close"></img>
                        <div className="current-commission">Current commission rate : {ref ? ref.current_commission_percent : config.ref_percent[0].percent}%</div>
                        <p>The rate of your commission depends on the USD value that one who you refer buys in ODEFI token. The rule is as follows:<br />
                        - Referee buys token with the volume less than 25 ETH, the rate is 5%.<br />
                        - Referee buys token with the volume from 25 - 110 ETH, the rate is 8%.<br />
                        - Referee buys token with the volume from greater than 110 ETH, the rate is 10%.<br />
                        Your commission will be paid at the end of each sale round until you fully receive your commission based on the rule above.</p>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        var { saleOrders,
            orderHistory,
            selectedChild,
            invitedPeople,
            showPopup,
            config,
            balance,
            countdown,
            amount,
            amountOdefiPerUSDT,
            previousAmountOdefiPerUSDT,
            linkRef,
            started,
            selectedCoin } = this.state

        return (
            <div id="presale" className="bg-garena">
                <Header></Header>
                <div className="container">
                    <p style={{ fontSize: '55px', color: 'white', marginTop: '50px' }}>PRE-SALE ODEFI TOKEN</p>
                    <div className="wapper">
                        <div className="left">
                            <p style={{ fontSize: 28 }}>ROUND: {config.current_round}</p>
                            <div className="btn-percent">
                                <div className="percent">
                                    {started && <p>END AT</p>}
                                    {!started && <p>START AT</p>}
                                </div>
                                <span>{countdown}</span>
                            </div>

                            <p style={{ fontSize: 28, marginTop: '40px', marginBottom: '10px' }}>ESTIMATED PRICE</p>
                            <div className={`child ${ selectedCoin === "ETHEREUM" ? "active" : ""}`} onClick={() => this.onClickCoin("ETHEREUM")}>
                                <p style={{ fontSize: '24px' }}>ETHEREUM</p>
                                <img src={IconETH} alt="photos"></img>
                                <p>1 USDT = {amountOdefiPerUSDT} ODEFI</p>
                            </div>
                            <div className={`child child2 ${ selectedCoin === "TRON" ? "active" : ""}`} onClick={() => this.onClickCoin("TRON")}>
                                <p style={{ fontSize: '24px' }}>TRON</p>
                                <img src={IconETH} alt="photos"></img>
                                <p>1 TRON = {amountOdefiPerUSDT} ODEFI</p>
                            </div>
                        </div>

                        <div className="right">
                            <p style={{ marginTop: 0, fontSize: '28px' }}>TOTAL SALE: {config.token_sale_amount} ODEFI</p>

                            <div className="btn-percent">
                                <div className="percent">
                                    <p>ESTIMATED PRICE</p>
                                </div>
                                <span>1 USDT = {amountOdefiPerUSDT} ODEFI</span>
                            </div>

                            <p style={{ textAlign: 'right', marginTop: '30px', marginBottom: '10px' }}>YOUR ETH BALANCE: {Utils.formatCurrency(balance)} ETH</p>
                            <div className="wape-input">
                                <input value={amount} onChange={(e) => { this.setState({ amount: e.target.value }) }}></input>
                                <span>ETH</span>
                            </div>

                            <p style={{ marginTop: '20px', marginBottom: '30px' }}>PREVIOUS ROUND PRICE: 1 USDT = {previousAmountOdefiPerUSDT} ODEFI</p>
                            {started && <button className="purchase" onClick={() => this.onDeposit()}>DEPOSIT</button>}
                            {started && <p>*MIN ORDER: {config.min_order} ETH</p>}
                        </div>
                    </div>

                    {this.props.myAddress && <div className="ref">
                        <div className="wrapper">
                            <p>Referral: </p>
                            <img onClick={() => this.setState({ showPopup: true })} className="question" src={Question} alt="question"></img>
                            <div className="wape-input">
                                <input value={linkRef}></input>
                                <span className="copy" data-clipboard-text={linkRef} onClick={() => this.onCopy()}>COPY</span>
                            </div>
                        </div>
                    </div>}

                    {selectedChild && <div className="wapper2">
                        <div className="waper-header">
                            <div className={`child ${selectedChild === 'YOUR ORDER' ? 'active' : ''}`} onClick={() => { this.setState({ selectedChild: 'YOUR ORDER' }) }}> <p>YOUR ORDER</p></div>
                            <div className={`child ${selectedChild === 'HISTORY' ? 'active' : ''}`} onClick={() => { this.setState({ selectedChild: 'HISTORY' }) }}><p>HISTORY</p></div>
                            <div className={`child ${selectedChild === 'INVITED PEOPLE' ? 'active' : ''}`} onClick={() => { this.setState({ selectedChild: 'INVITED PEOPLE' }) }}><p>INVITED PEOPLE</p></div>
                        </div>
                        {(selectedChild === 'YOUR ORDER' || selectedChild === 'HISTORY') && <ul className="table-title">
                            <li>DATE | TIME</li>
                            <li>TYPE</li>
                            <li>ROUND</li>
                            <li>AMOUNT</li>
                            <li>STATUS</li>
                        </ul>}

                        {selectedChild === 'INVITED PEOPLE' && <ul className="table-title">
                            <li>DATE | TIME</li>
                            <li>WALLET ADDRESS</li>
                            <li>ROUND</li>
                            <li>BOUGHT AMOUNT</li>
                            <li>YOU RECEIVED</li>
                            <li>TXID</li>
                        </ul>}

                        {selectedChild === 'YOUR ORDER' && saleOrders.map((value, index) => {
                            return (
                                <div>
                                    <ul className="table-title" style={{ borderWidth: 0 }}>
                                        <li>{Utils.convertDate(value.time * 1000)}</li>
                                        <li>BUY ORDER</li>
                                        <li>{value.round}</li>
                                        <li>{value.amount} ETH</li>
                                        <li ><a href={`https://etherscan.io/tx/${value.txid}`} target="_blank" rel="noopener noreferrer">{value.pending ? "PENDING" : "COMPLETE"} <img src={Arrow} alt="photos"></img></a></li>
                                    </ul>
                                </div>
                            )
                        })}

                        {selectedChild === 'HISTORY' && orderHistory.map((value, index) => {
                            return (
                                <div>
                                    <ul className="table-title" style={{ borderWidth: 0 }}>
                                        <li>{Utils.convertDate(value.time * 1000)}</li>
                                        <li>BUY ORDER</li>
                                        <li>{value.round}</li>
                                        <li>{value.amount} ETH</li>
                                        {value.error && <li >{value.error}</li>}
                                        {!value.error && <li ><a href={`https://etherscan.io/tx/${value.paid_txid}`} target="_blank" rel="noopener noreferrer">COMPLETE <img src={Arrow} alt="photos"></img></a></li>}
                                    </ul>
                                </div>
                            )
                        })}

                        {selectedChild === 'INVITED PEOPLE' && invitedPeople.map((value, index) => {
                            return (
                                <div>
                                    <ul className="table-title" style={{ borderWidth: 0 }}>
                                        <li>{Utils.convertDate(value.time * 1000)}</li>
                                        <li><a href={`https://etherscan.io/address/${value.buyer}`} target="_blank" rel="noopener noreferrer" className="text-truncate">{value.buyer} <img src={Arrow} alt="photos"></img></a></li>
                                        <li>{value.round}</li>
                                        <li>{value.bought_amount ? `${parseInt(value.bought_amount)} ODEFI` : "PENDING"}</li>
                                        <li>{value.ref_received ? `${parseInt(value.ref_received)} ODEFI` : "PENDING"}</li>
                                        <li>{value.ref_paid_txid ? <a href={`https://etherscan.io/tx/${value.ref_paid_txid}`} target="_blank" rel="noopener noreferrer">COMPLETE <img src={Arrow} alt="photos"></img></a> : "PENDING"}</li>
                                    </ul>
                                </div>
                            )
                        })}
                    </div>}

                    <p style={{ marginBottom: 20, fontSize: 12, color: "#77838f" }}>Current Block: {Utils.formatCurrency(config.current_block, 0)}</p>

                    {showPopup && this.renderPopup()}
                </div>

            </div>
        )
    }

}

export default connect(state => ({
    myAddress: state.app.myAddress
}), ({
}))(PreSaleController)