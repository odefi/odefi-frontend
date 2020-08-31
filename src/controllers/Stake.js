import React, { Component } from 'react'
import Clipboard from 'clipboard'
import { connect } from 'react-redux';
import Header from '../components/Header'
import IconDelete from '../assets/img/Group 8783.svg'
import ProcessingImage from '../assets/img/processing.png'

new Clipboard(".copy")

class StakeController extends Component {
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
            <div id="trade" className="bg-body">
                 <Header></Header>
                <div className="wrap-content">
                    <div className="stake-content">
                        <div className="left">
                            <div className="benifit">
                                <div className="header">
                                    <h2>Stake Benifit</h2>
                                </div>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>EMPOW</td>
                                            <td>0.45%/day</td>
                                        </tr>
                                        <tr>
                                            <td>ODEFI</td>
                                            <td>0.45%/day</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="your-exchange-fee">
                                <div className="header">
                                    <h2>Your exchange fee</h2>
                                </div>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>EMPOW</td>
                                            <td>0.45%/day</td>
                                        </tr>
                                        <tr>
                                            <td>ODEFI</td>
                                            <td>0.45%/day</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="right">
                            <div className="tabs">
                                <div className="tab">
                                    <button className="tablinks-bottom active" onclick="openTabStake(event, 'stake-odefi')">ODEFI</button>
                                    <button className="tablinks-bottom" onclick="openTabStake(event, 'stake-empow')">EMPOW</button>
                                </div>
                                <div className="tabcontents">
                                    <div id="stake-odefi" className="tabcontent-bottom">
                                        <div className="totals">
                                            <div className="total-card">
                                                <p>Total Packages</p>
                                                <span>0</span>
                                            </div>
                                            <div className="total-card">
                                                <p>Total Packages</p>
                                                <span>0</span>
                                            </div>
                                            <div className="total-card">
                                                <p>Total Packages</p>
                                                <span>0</span>
                                            </div>
                                            <div className="total-card">
                                                <p>Total Packages</p>
                                                <span>0</span>
                                            </div>
                                            <div className="total-card">
                                                <p>Total Packages</p>
                                                <span>0</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="stake-empow" className="tabcontent-bottom">
                                        <div className="totals">
                                            <div className="total-card">
                                                <p>Total Packages</p>
                                                <span>0</span>
                                            </div>
                                            <div className="total-card">
                                                <p>Total Packages</p>
                                                <span>0</span>
                                            </div>
                                            <div className="total-card">
                                                <p>Total Packages</p>
                                                <span>0</span>
                                            </div>
                                            <div className="total-card">
                                                <p>Total Packages</p>
                                                <span>0</span>
                                            </div>
                                            <div className="total-card">
                                                <p>Total Packages</p>
                                                <span>0</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="stake-button">
                                <div className="stakes">
                                    <h2>Stake Amount</h2>
                                    <div className="susdt">
                                        <div className="sus ">
                                            <span>0</span>
                                        </div>
                                        <div className="balance color-susdt">
                                            <span>
                                                ODEFI
                            </span>
                                        </div>
                                    </div>
                                    <div className="group-button-filter">
                                        <button className="active">25</button>
                                        <button>50%</button>
                                        <button>75%</button>
                                        <button>100%</button>
                                    </div>
                                    <div className="btn-stake">
                                        <button className="stake-btn">
                                            STAKE
                          </button>
                                    </div>
                                </div>
                            </div>
                            <div className="stake-table">
                                <div className="header">
                                    <h2>PACKAGES</h2>
                                    <div className="group-btn-unstaked">
                                        <div className="button-switch theme-switch-wrapper">
                                            <input type="checkbox" id="switch-blue" className="switch" defaultChecked />
                                            <label htmlFor="switch-blue" className="lbl-off" />
                                            <label htmlFor="switch-blue" className="lbl-on" />
                                        </div>
                                        <span>Hide Unstaked</span>
                                    </div>
                                </div>
                                <table className="table">
                                    <thead>
                                        <tr><th>ID</th>
                                            <th>Amount</th>
                                            <th>Status</th>
                                            <th>Last Withdraw</th>
                                            <th>Has Withdraw</th>
                                            <th>Can Withdraw</th>
                                            <th />
                                            <th />
                                        </tr></thead>
                                    <tbody>
                                        <tr>
                                            <td />
                                            <td>18118 EM</td>
                                            <td>
                                                <div className="status-running">
                                                    <span className="status" />
                                                    <span>Running</span>
                                                </div>
                                            </td>
                                            <td>2 months ago</td>
                                            <td>0 EM</td>
                                            <td>2212,2323 EM</td>
                                            <td>
                                                <span className="badge-purple">Withdraw</span>
                                            </td>
                                            <td>
                                                <span className="badge-purple">Withdraw</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>0</td>
                                            <td>18118 EM</td>
                                            <td>
                                                <div className="status-running">
                                                    <span className="status" />
                                                    <span>Running</span>
                                                </div>
                                            </td>
                                            <td>2 months ago</td>
                                            <td>0 EM</td>
                                            <td>2212,2323 EM</td>
                                            <td>
                                                <span className="badge-grey">Withdraw</span>
                                            </td>
                                            <td>
                                                <span className="badge-purple">Withdraw</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
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
}))(StakeController)