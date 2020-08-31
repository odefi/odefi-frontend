import React, { Component } from 'react'
import Clipboard from 'clipboard'
import { connect } from 'react-redux';
import Header from '../components/Header'
import IconDelete from '../assets/img/Group 8783.svg'
import ProcessingImage from '../assets/img/processing.png'
new Clipboard(".copy")

class ProvideController extends Component {
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
            <div id="provide" className="bg-body">
                <Header></Header>
                <div className="wrap-content">
                    <div className="provide-content">
                        <div className="left-content">
                            <div className="tabs provide-tabs">
                                <div className="header">
                                    <h2>LIQUIDITY PROVIDE</h2>
                                </div>
                                <div className="provide-tab">
                                    <div className="item-card">
                                        <p>ODEFI/USDT</p>
                                        <p>10ODEFI=1993,433USD </p>
                                    </div>
                                    <div className="item-card">
                                        <p>ODEFI/USDT</p>
                                        <p>10ODEFI=1993,433USD</p>
                                    </div>
                                    <div className="item-card">
                                        <p>ODEFI/USDT</p>
                                        <p>10ODEFI=1993,433USD</p>
                                    </div>
                                    <div className="item-card">
                                        <p>ODEFI/USDT</p>
                                        <p>10ODEFI=1993,433USD</p>
                                    </div>
                                    <div className="item-card">
                                        <p>ODEFI/USDT</p>
                                        <p>10ODEFI=1993,433USD</p>
                                    </div>
                                    <div className="item-card">
                                        <p>ODEFI/USDT</p>
                                        <p>10ODEFI=1993,433USD</p>
                                    </div>
                                    <div className="item-card">
                                        <p>ODEFI/USDT</p>
                                        <p>10ODEFI=1993,433USD</p>
                                    </div>
                                    <div className="item-card">
                                        <p>ODEFI/USDT</p>
                                        <p>10ODEFI=1993,433USD</p>
                                    </div>
                                </div>
                            </div>
                            <div className="tabs table-provide">
                                <div className="tabs">
                                    <div className="tab">
                                        <button className="tablinks-bottom active" onclick="openTabProvide(event, 'benifit')">BENIFIT</button>
                                        <button className="tablinks-bottom" onclick="openTabProvide(event, 'recent')">RECENT TRANSECTIONS</button>
                                    </div>
                                    <div className="tabcontents">
                                        <div id="benifit" className="tabcontent-bottom">
                                            <table id="table-bottom" className="display" style={{ width: '100%' }}>
                                                <thead>
                                                    <tr>
                                                        <th>DATE | TIME</th>
                                                        <th>PAIRS</th>
                                                        <th>BUYING</th>
                                                        <th>SELLING</th>
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
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div id="recent" className="tabcontent-bottom">
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
                        <div className="sidebar-right">
                            <div className="tabs">
                                <div className="header">
                                    <h2>Invest</h2>
                                </div>
                                <div className="tabcontents">
                                    <div className="tabcontent">
                                        <div className="sell">
                                            <div className="label">
                                                <span />
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
                                                <span />
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
                                                </tbody>
                                            </table>
                                        </div>
                                        <button className="confirm-trade">
                                            ADD LIQUIDITY
                          </button>
                                    </div>
                                    {/* <div id="sell" class="tabcontent">
                              <div class="sell">
                                  <div class="label">
                                      <span>Sell:</span>
                                      <span>Balance: 1000.000USD</span>
                                  </div>
                                  <div class="susdt">
                                      <div class="sus color-susdt">
                                          <span class="circle"></span>
                                          <span>sUSDT</span>
                                      </div>
                                      <div class="balance">
                                          <span>
                                              161516161.121215
                                          </span>
                                      </div>
                                  </div>
                              </div>
                              <div class="buy">
                                  <div class="label">
                                      <span>Buy:</span>
                                      <span>Balance: 0.8 BTC</span>
                                  </div>
                                  <div class="susdt">
                                      <div class="sus color-susdt">
                                          <span class="circle"></span>
                                          <span>sUSDT</span>
                                      </div>
                                      <div class="balance">
                                          <span>
                                              10000.0001
                                          </span>
                                      </div>
                                  </div>
                              </div>
                              <div class="table-percent">
                                  <div class="group-button-filter">
                                      <button class="active">1H</button>
                                      <button>4H</button>
                                      <button>1D</button>
                                      <button>1W</button>
                                  </div>
                                  <table>
                                      <thead>
                                      <tbody>
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
                                      </thead>
                                  </table>
                              </div>
                              <button class="confirm-trade">
                                  Confirm trade
                              </button>
                          </div> */}
                                </div>
                            </div>
                            <div className="tabs">
                                <div className="header">
                                    <h2>Remove</h2>
                                </div>
                                <div className="tabcontents">
                                    <div className="tabcontent">
                                        <div className="sell">
                                            <div className="label">
                                                <span />
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
                                                <span />
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
                                                </tbody>
                                            </table>
                                        </div>
                                        <button className="confirm-trade">
                                            ADD LIQUIDITY
                          </button>
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
    myAddress: state.app.myAddress
}), ({
}))(ProvideController)