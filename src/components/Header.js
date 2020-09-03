import React, { Component } from 'react'
import { connect } from 'react-redux';
import {
    setMode,
    setAddress
} from '../reducers/appReducer'

import EthereumService from '../services/EthereumService';
import Logo from '../assets/img/logo.svg'
import DarkMode from '../assets/img/Group 8114.svg'
import LightMode from '../assets/img/Group 8117.svg'
import Utils from '../utils';
import IconDapp from '../assets/img/Group 2039.svg'
import IconMetamask from '../assets/img/metamask.svg'
import IconEmpow from '../assets/img/Group 2006.svg'

import IconMobile from '../assets/img/icon-mobile.svg'
import IconClose from '../assets/img/icon-close.svg'

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            balance: 0,
            showLogin: false,
            toggleMenu: false
        }
    };

    async componentDidMount() {
        if (window.ethereum) {
            var address = await window.ethereum.enable()
            address = address[0].toLowerCase()
            this.setState({
                myAddress: address
            })

            this.props.setAddress(address)

            EthereumService.web3.eth.getBalance(address, (err, balance) => {
                this.setState({
                    balance: EthereumService.web3.utils.fromWei(balance)
                })
            })
        }

        var mode = window.localStorage.getItem('data-theme')
        if (!mode) {
            window.localStorage.setItem("data-theme", 'light')
        } else {
            this.props.setMode(mode === 'dark' ? true : false)
        }

        if (mode === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
    }

    setMode = () => {
        if (this.props.isDarkMode) {
            document.documentElement.setAttribute('data-theme', 'light');
            window.localStorage.setItem("data-theme", 'light')
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            window.localStorage.setItem("data-theme", 'dark')
        }

        this.props.setMode(!this.props.isDarkMode)
    }

    render() {

        const { redirectComponent, myAddress, balance, showLogin, toggleMenu } = this.state
        var { isDarkMode } = this.props
        return (
            <header style={{ backgroundColor: isDarkMode ? "#2A2B30" : "white" }}>
                {redirectComponent && redirectComponent}

                <img src={toggleMenu ? IconClose : IconMobile} className="icon-mobile" alt="photos" onClick={() => this.setState({ toggleMenu: !toggleMenu })}></img>

                <a className="waper-logo logo" href='/'>
                    <img src={Logo} alt="photos" style={{ width: '50px', height: '50px' }}></img>
                    <p>O D E F I</p>
                </a>
                <ul className={`menu ${isDarkMode ? "darkmode" : ""} ${toggleMenu ? 'is-toggle' : ''}`}>
                    <a href='/market'>Market</a>
                    <a href='/trade'>Trade</a>
                    <a href='/provide' >Provide</a>
                    <a href='/stake'>Stake</a>
                    <a href='https://odefi.org' target="_blank" rel="noopener noreferrer">About</a>
                    <a href='/'>Token Sale</a>
                </ul>
                <div className="waper-logo info">
                    {isDarkMode && <img src={DarkMode} alt="photos" style={{ width: '50px', cursor: "pointer", marginRight: '15px' }} onClick={() => this.setMode()}></img>}
                    {!isDarkMode && <img src={LightMode} alt="photos" style={{ width: '50px', cursor: "pointer", marginRight: '15px' }} onClick={() => this.setMode()}></img>}

                    {!myAddress && <div className="waper-logo login" style={{ backgroundColor: isDarkMode ? "#3F4044" : "#8e3ddf" }} onClick={() => { this.setState({ showLogin: !showLogin }) }}>
                        <p style={{ fontSize: '18px' }}>LOG-IN</p>
                    </div>}
                    {showLogin && <div className="waper-wallet">
                        <div>
                            <p>Choose your wallet</p>
                        </div>
                        <ul>
                            <li>
                                <a href="https://chrome.google.com/webstore/detail/empow-wallet/nlgnepoeokdfodgjkjiblkadkjbdfmgd" target="_blank" rel="noopener noreferrer">
                                    <img src={IconDapp} alt="photos"></img>
                                    <p>MULTI WALLET</p>
                                </a>
                            </li>
                            <li>
                                <a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn" target="_blank" rel="noopener noreferrer">
                                    <img src={IconMetamask} alt="photos"></img>
                                    <p>METAMASK</p>
                                </a>
                            </li>
                            {/* <li>
                                <a href="https://chrome.google.com/webstore/detail/empow-mutil-wallet/bglmfiihjjbjolgjpflcdklccdlcidgn" target="_blank" rel="noopener noreferrer">
                                    <img src={IconEmpow} alt="photos"></img>
                                    <p>EMPOW MULTI</p>
                                </a>
                            </li> */}
                        </ul>
                    </div>}
                    {myAddress && <div className="group-info">
                        <div className="child" style={{ backgroundColor: isDarkMode ? "#3F4044" : "#8E3DDF" }}>
                            <div style={{ width: '10px', height: "10px", borderRadius: '50%', backgroundColor: 'white', marginRight: '5px' }}></div>
                            <p className="text-truncate">{myAddress}</p>
                        </div>
                        <div className="child" style={{ backgroundColor: "#0D570D" }}>
                            <p className="text-truncate">{Utils.formatCurrency(balance)} ETH</p>
                        </div>
                    </div>}
                </div>
            </header>
        )
    }
};

export default connect(state => ({
    isDarkMode: state.app.isDarkMode
}), ({
    setMode,
    setAddress,
}))(Header)