import React, { Component } from 'react'
import Clipboard from 'clipboard'
import { connect } from 'react-redux';
import Header from '../components/Header'
import IconDelete from '../assets/img/Group 8783.svg'
import ProcessingImage from '../assets/img/processing.png'
new Clipboard(".copy")

class TradeController extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showPopup: true,
        };
    };

    renderPopup() {
        return (
            <div className="overlay">
                <div className="waper">
                    <div className="dark-range" 
                    //onClick={() => { this.setState({ showPopup: false }) }}
                    ></div>
                    <div className="processing">
                        <img className="close" src={IconDelete} alt="photos" 
                        //onClick={() => { this.setState({ showPopup: false }) }}
                        ></img>
                        <p className="title">PROCESSING...</p>
                        <div className="processing-image">
                            <img src={ProcessingImage}></img>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    renderPopup() {
        var { config, linkRef } = this.state
        return (
            <div className="overlay">
                <div className="waper">
                    <div className="dark-range" onClick={() => { this.setState({ showPopup: true }) }}></div>
                    <div className="processing">
                        {/* <img className="close" src={IconDelete} alt="photos" onClick={() => { this.setState({ showPopup: false }) }}></img> */}
                        <p className="title">PROCESSING...</p>
                        <div className="processing-image">
                            <img src={ProcessingImage}></img>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    render() {

        const { showPopup } = this.state

        return (
            <div id="trade" className="bg-body">
                <Header></Header>
                <div className="wrap-content">
                    <div className="sidebar-left">
                        <div className="sidebar-content">
                            <div className="filtet-top">
                                <input type="text" className="input-search" placeholder="SEARCH" />
                                <div className="group-button-filter">
                                    <span className="active">USD</span>
                                    <span>ETH</span>
                                    <span>BTC</span>
                                    <span>FIAT</span>
                                </div>
                                <table id="example" className="display" style={{ width: '100%' }}>
                                    <thead>
                                        <tr>
                                            <th>PAIR</th>
                                            <th>PRICE</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="active">
                                            <td>
                                                <div>
                                                    <img src="./assets/img/Group 2015.png" alt="" />
                                                    <span>ETH/USDT</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div>$ 18.000</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div>
                                                    <img src="./assets/img/Group 2015.png" alt="" />
                                                    <span>ETH/USDT</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div>$ 18.000</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div>
                                                    <img src="./assets/img/Group 2015.png" alt="" />
                                                    <span>ETH/USDT</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div>$ 18.000</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div>
                                                    <img src="./assets/img/Group 2015.png" alt="" />
                                                    <span>ETH/USDT</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div>$ 18.000</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div>
                                                    <img src="./assets/img/Group 2015.png" alt="" />
                                                    <span>ETH/USDT</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div>$ 18.000</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div>
                                                    <img src="./assets/img/Group 2015.png" alt="" />
                                                    <span>ETH/USDT</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div>$ 18.000</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div>
                                                    <img src="./assets/img/Group 2015.png" alt="" />
                                                    <span>ETH/USDT</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div>$ 18.000</div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="filter-bottom">
                            </div>
                        </div>
                    </div>
                    <div className="right-content">
                        <div className="top">
                            <div className="left">
                                <div className="top-header">
                                    <span className="title">iETH/sUSDT</span>
                                    <div className="group-button-filter">
                                        <button className="active">1H</button>
                                        <button>4H</button>
                                        <button>1D</button>
                                        <button>1W</button>
                                    </div>
                                </div>
                                <div className="title-badge">
                                    <span className="active">
                                        <p>PRICE</p>
                                        <p>$10,633.00</p>
                                    </span>
                                    <span>
                                        <p>24H CHANGE</p>
                                        <p>+20,5%</p>
                                    </span>
                                    <span>
                                        <p>24H HIGH</p>
                                        <p>$10,633.00</p>
                                    </span>
                                    <span>
                                        <p>24H LOW</p>
                                        <p>$10,633.00</p>
                                    </span>
                                    <span>
                                        <p>24H VOLUME</p>
                                        <p>$10,633.00</p>
                                    </span>
                                </div>
                            </div>
                            <div className="right">
                                <div className="tabs">
                                    <div className="tab">
                                        <button className="tablinks active" onclick="openBuySell(event, 'buy')">Buy</button>
                                        <button className="tablinks" onclick="openBuySell(event, 'sell')">Sell</button>
                                    </div>
                                    <div className="tabcontents">
                                        <div id="buy" className="tabcontent">
                                            <div className="sell">
                                                <div className="label">
                                                    <span>Sell:</span>
                                                    <span>Balance: 1000.000USD</span>
                                                </div>
                                                <div className="susdt">
                                                    <div className="sus color-susdt">
                                                        <span className="circle" />
                                                        <span>sUSDT</span>
                                                    </div>
                                                    <div className="balance">
                                                        <span>
                                                            161516161.121215
                                  </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="buy">
                                                <div className="label">
                                                    <span>Buy:</span>
                                                    <span>Balance: 0.8 BTC</span>
                                                </div>
                                                <div className="susdt">
                                                    <div className="sus color-susdt">
                                                        <span className="circle" />
                                                        <span>sUSDT</span>
                                                    </div>
                                                    <div className="balance">
                                                        <span>
                                                            10000.0001
                                  </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="table-percent">
                                                <div className="group-button-filter">
                                                    <button className="active">1H</button>
                                                    <button>4H</button>
                                                    <button>1D</button>
                                                    <button>1W</button>
                                                </div>
                                                <table>
                                                    <thead>
                                                    </thead><tbody>
                                                        <tr>
                                                            <td>Price</td>
                                                            <td>1 sUSDT = 1000.123123 USD </td>
                                                        </tr>
                                                        <tr>
                                                            <td>USD VALUE</td>
                                                            <td>1.123123 USD</td>
                                                        </tr>
                                                        <tr>
                                                            <td>FEE</td>
                                                            <td>5 BTC (0.1%)</td>
                                                        </tr>
                                                        <tr>
                                                            <td>ODIFE MINE</td>
                                                            <td>300,000 ($0.12)</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <button className="confirm-trade">
                                                Confirm trade
                            </button>
                                        </div>
                                        <div id="sell" className="tabcontent">
                                            <div className="sell">
                                                <div className="label">
                                                    <span>Sell:</span>
                                                    <span>Balance: 1000.000USD</span>
                                                </div>
                                                <div className="susdt">
                                                    <div className="sus color-susdt">
                                                        <span className="circle" />
                                                        <span>sUSDT</span>
                                                    </div>
                                                    <div className="balance">
                                                        <span>
                                                            161516161.121215
                                  </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="buy">
                                                <div className="label">
                                                    <span>Buy:</span>
                                                    <span>Balance: 0.8 BTC</span>
                                                </div>
                                                <div className="susdt">
                                                    <div className="sus color-susdt">
                                                        <span className="circle" />
                                                        <span>sUSDT</span>
                                                    </div>
                                                    <div className="balance">
                                                        <span>
                                                            10000.0001
                                  </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="table-percent">
                                                <div className="group-button-filter">
                                                    <button className="active">1H</button>
                                                    <button>4H</button>
                                                    <button>1D</button>
                                                    <button>1W</button>
                                                </div>
                                                <table>
                                                    <thead>
                                                    </thead><tbody>
                                                        <tr>
                                                            <td>Price</td>
                                                            <td>1 sUSDT = 1000.123123 USD </td>
                                                        </tr>
                                                        <tr>
                                                            <td>USD VALUE</td>
                                                            <td>1.123123 USD</td>
                                                        </tr>
                                                        <tr>
                                                            <td>FEE</td>
                                                            <td>5 BTC (0.1%)</td>
                                                        </tr>
                                                        <tr>
                                                            <td>ODIFE MINE</td>
                                                            <td>300,000 ($0.12)</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <button className="confirm-trade">
                                                Confirm trade
                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bottom">
                            <div className="tabs">
                                <div className="tab">
                                    <button className="tablinks-bottom active" onclick="openTabBottom(event, 'your')">YOUR</button>
                                    <button className="tablinks-bottom" onclick="openTabBottom(event, 'all')">ALL</button>
                                    <button className="tablinks-bottom" onclick="openTabBottom(event, 'odfi')">ODFI</button>
                                </div>
                                <div className="tabcontents">
                                    <div id="your" className="tabcontent-bottom">
                                        <table id="table-bottom" className="display" style={{ width: '100%' }}>
                                            <thead>
                                                <tr>
                                                    <th>DATE | TIME</th>
                                                    <th>PAIRS</th>
                                                    <th>BUYING</th>
                                                    <th>SELLING</th>
                                                    <th>PRICE</th>
                                                    <th>TOTAL</th>
                                                    <th>STATUS</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <div>
                                                            <span>14-02-2019 | 12:12PM</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <span>BTC/USD</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <span>50 BTC</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <span>50 BTC</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <span>35000</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <span>$11212.3</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <span>PENDING</span>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div>
                                                            <span>14-02-2019 | 12:12PM</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <span>BTC/USD</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <span>50 BTC</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <span>50 BTC</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <span>35000</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <span>$11212.3</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <span>PENDING</span>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div>
                                                            <span>14-02-2019 | 12:12PM</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <span>BTC/USD</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <span>50 BTC</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <span>50 BTC</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <span>35000</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <span>$11212.3</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <span>PENDING</span>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div>
                                                            <span>14-02-2019 | 12:12PM</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <span>BTC/USD</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <span>50 BTC</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <span>50 BTC</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <span>35000</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <span>$11212.3</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <span>PENDING</span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div id="all" className="tabcontent-bottom">
                                        <table id="table-bottom" className="display" style={{ width: '100%' }}>
                                            <thead>
                                                <tr>
                                                    <th>DATE | TIME</th>
                                                    <th>PAIRS</th>
                                                    <th>BUYING</th>
                                                    <th>SELLING</th>
                                                    <th>PRICE</th>
                                                    <th>TOTAL</th>
                                                    <th>STATUS</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <div>
                                                            <span>14-02-2019 | 12:12PM</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <span>BTC/USD</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <span>50 BTC</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <span>50 BTC</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <span>35000</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <span>$11212.3</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <span>PENDING</span>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div>
                                                            <span>14-02-2019 | 12:12PM</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <span>BTC/USD</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <span>50 BTC</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <span>50 BTC</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <span>35000</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <span>$11212.3</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <span>PENDING</span>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div>
                                                            <span>14-02-2019 | 12:12PM</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <span>BTC/USD</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <span>50 BTC</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <span>50 BTC</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <span>35000</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <span>$11212.3</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <span>PENDING</span>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div>
                                                            <span>14-02-2019 | 12:12PM</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <span>BTC/USD</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <span>50 BTC</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <span>50 BTC</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <span>35000</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <span>$11212.3</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <span>PENDING</span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div id="odfi" className="tabcontent-bottom">
                                        <table id="table-bottom" className="display" style={{ width: '100%' }}>
                                            <thead>
                                                <tr>
                                                    <th>DATE | TIME</th>
                                                    <th>PAIRS</th>
                                                    <th>BUYING</th>
                                                    <th>SELLING</th>
                                                    <th>PRICE</th>
                                                    <th>TOTAL</th>
                                                    <th>STATUS</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <div>
                                                            <span>14-02-2019 | 12:12PM</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <span>BTC/USD</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <span>50 BTC</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <span>50 BTC</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <span>35000</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <span>$11212.3</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <span>PENDING</span>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div>
                                                            <span>14-02-2019 | 12:12PM</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <span>BTC/USD</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <span>50 BTC</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <span>50 BTC</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <span>35000</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <span>$11212.3</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <span>PENDING</span>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div>
                                                            <span>14-02-2019 | 12:12PM</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <span>BTC/USD</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <span>50 BTC</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <span>50 BTC</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <span>35000</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <span>$11212.3</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <span>PENDING</span>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div>
                                                            <span>14-02-2019 | 12:12PM</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <span>BTC/USD</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <span>50 BTC</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <span>50 BTC</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <span>35000</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <span>$11212.3</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <span>PENDING</span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                
                    {showPopup && this.renderPopup()}
                </div>
            </div>
        );
    }

}

export default connect(state => ({
    myAddress: state.app.myAddress,
    isDarkMode: state.app.isDarkMode
}), ({
}))(TradeController)