import React, { Component } from 'react'
import IconETH from '../assets/img/Group 8045.svg'
import Reward from '../assets/img/Group 8612.svg'
import IconDelete from '../assets/img/Group 8783.svg'
import Arrow from '../assets/img/Group 8784.svg'
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
            showReward: true,
            started: false
        };

        this.totalAmountByRound = {}
    };

    componentDidMount() {
        if (this.props.match || this.props.match.params || this.props.match.params.ref) {
            if (EthereumService.web3.utils.isAddress(this.props.match.params.ref)) {
                Utils.setCookie("ref", this.props.match.params.ref, 30)
            }
        }

        this.getConfig()
        this.getBalance()
        this.getSaleOrderLocalStorage()
    }

    componentDidUpdate(prevProps) {
        if (_.isEqual(prevProps, this.props)) {
            return;
        }
        this.getBalance()
        this.getSaleOrder()
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

    async calcPriceByRound(round, token_sale_amount, min_price) {
        var totalAmount;
        if (this.totalAmountByRound.hasOwnProperty(round)) totalAmount = this.totalAmountByRound[round]
        else {
            totalAmount = await ServerAPI.getTotalAmountSaleOrder(round)
            this.totalAmountByRound[round] = totalAmount
        }

        totalAmount = parseFloat(totalAmount)

        var amountOdefiPerETH = 1 / min_price

        if (totalAmount > 0) {
            let value = token_sale_amount / totalAmount
            amountOdefiPerETH = value > amountOdefiPerETH ? amountOdefiPerETH : value
        }

        return Math.ceil(amountOdefiPerETH)
    }

    getConfig = async () => {
        var config = await ServerAPI.getConfig()

        const amountOdefiPerETH = await this.calcPriceByRound(config.current_round, config.token_sale_amount, config.min_price)
        const previousAmountOdefiPerETH = await this.calcPriceByRound(config.current_round - 1, config.token_sale_amount, config.min_price)
        const totalAmountCurrentRound = await ServerAPI.getTotalAmountSaleOrder(config.current_round)

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
            totalAmountCurrentRound,
            amountOdefiPerETH,
            previousAmountOdefiPerETH,
            started
        })
    }

    countDown = () => {
        var { config, started } = this.state
        let now = new Date().getTime();

        let distance = config.start_time - now;
        if(started) {
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

    showPopup = () => {
        if (!this.props.myAddress) {
            toastr.info('', "Please login first")
            return
        }
        this.setState({
            showPopup: true
        })

        var linkRef = `${window.location.origin}/${this.props.myAddress.toLowerCase()}`
        this.setState({
            linkRef
        })
    }

    onDeposit = () => {

        const { saleOrderLocalStorage, config, saleOrders, amount } = this.state

        if (!this.props.myAddress) {
            toastr.info('', "Please login first")
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

    renderPopup() {
        var { config, linkRef } = this.state
        return (
            <div className="overlay">
                <div className="waper">
                    <div className="dark-range" onClick={() => { this.setState({ showPopup: false }) }}></div>
                    <div className="reward">
                        <img src={IconDelete} alt="photos" onClick={() => { this.setState({ showPopup: false }) }}></img>
                        <div className="child">
                            <p className="text1">GET <span className="text2" >{config.ref_percent}%</span> ODEFI</p>
                            <p className="text3">WHEN REFER YOUR FRIENDS</p>
                            <div className="wape-input">
                                <input value={linkRef}></input>
                                <span className="copy" data-clipboard-text={linkRef} onClick={() => this.onCopy()}>COPY</span>
                            </div>
                        </div>
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
            totalAmountCurrentRound,
            amountOdefiPerETH,
            previousAmountOdefiPerETH,
            showReward,
            started } = this.state

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
                            <div className="child">
                                <p style={{ fontSize: '24px' }}>ETHEREUM</p>
                                <img src={IconETH} alt="photos"></img>
                                <p>1 ETH = {amountOdefiPerETH} ODEFI</p>
                            </div>
                        </div>

                        <div className="right">
                            <p style={{ marginTop: 0, fontSize: '28px' }}>TOTAL SALE: {config.token_sale_amount} ODEFI</p>

                            <div className="btn-percent">
                                <div className="percent">
                                    <p>ORDERED</p>
                                </div>
                                <span>{totalAmountCurrentRound} ETH</span>
                            </div>

                            <p style={{ textAlign: 'right', marginTop: '30px', marginBottom: '10px' }}>YOUR ETH BALANCE: {Utils.formatCurrency(balance)} ETH</p>
                            <div className="wape-input">
                                <input value={amount} onChange={(e) => { this.setState({ amount: e.target.value }) }}></input>
                                <span>ETH</span>
                            </div>

                            <p style={{ marginTop: '20px', marginBottom: '30px' }}>PREVIOUS ROUND PRICE: 1 ETH = {previousAmountOdefiPerETH} ODEFI</p>
                            {started && <button className="purchase" onClick={() => this.onDeposit()}>DEPOSIT</button>}
                            {started && <p>*MIN ORDER: {config.min_order} ETH</p>}
                        </div>
                    </div>

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
                            <li>AMOUNT</li>
                            <li>STATUS</li>
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
                                        <li ><a href={`https://etherscan.io/tx/${value.txid}`} target="_blank" rel="noopener noreferrer">{value.pending ? "PENDING" : "COMPLETE"} <img src={Arrow} alt="photos"></img></a></li>
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
                                        <li>{value.ref_received ? `${value.ref_received} ODEFI` : "PENDING"}</li>
                                        <li>{value.ref_paid ? <a href={`https://etherscan.io/tx/${value.ref_paid_txid}`} target="_blank" rel="noopener noreferrer">COMPLETE <img src={Arrow} alt="photos"></img></a> : "PENDING"}</li>

                                    </ul>
                                </div>
                            )
                        })}
                    </div>}

                    <p style={{ marginBottom: 20, fontSize: 12, color: "#77838f" }}>Current Block: {Utils.formatCurrency(config.current_block, 0)}</p>

                    {showReward && <div className="reward-icon">
                        <img src={Reward} alt="photos" style={{ width: '50%' }} onClick={() => this.showPopup()}></img>
                        <p onClick={() => this.showPopup()}>{config.ref_percent}%</p>
                        <div>
                            <img src={IconDelete} alt="photos" onClick={() => { this.setState({ showReward: false }) }}></img>
                        </div>
                    </div>}

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