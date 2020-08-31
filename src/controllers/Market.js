import React, { Component } from 'react'
import Clipboard from 'clipboard'
import { connect } from 'react-redux';
import Header from '../components/Header'
import IconDelete from '../assets/img/Group 8783.svg'
import ProcessingImage from '../assets/img/processing.png'
new Clipboard(".copy")

class MarketController extends Component {
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
            <div id="market" className="bg-body">
                <Header></Header>
                <div className="wrap-content" style={{ marginTop: '50px' }}>
                    <div className="market-content">
                        <div className="group-filter-search">
                            <div className="group-button-filter">
                                <span className="active">USD</span>
                                <span>ETH</span>
                                <span>BTC</span>
                            </div>
                            <div className="search-box">
                                <i className="fa fa-search" />
                                <input type="text" placeholder="search" />
                            </div>
                        </div>
                        <div className="table-market">
                            <table id="table-bottom" className="display" style={{ width: '100%' }}>
                                <thead>
                                    <tr>
                                        <th>PAIRS</th>
                                        <th>LAST PRICE</th>
                                        <th>24HR CHANGE</th>
                                        <th>24HR LOW</th>
                                        <th>24HR HIGH</th>
                                        <th>24HR VOLUME</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <div>
                                                <span>XAG/USD</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div>
                                                <span>$0.7227</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div>
                                                <span className="badge-green">5.51%</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div>
                                                <span>$24.56</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div>
                                                <span>$2006.12</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div>
                                                <span>$480.444,232</span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div>
                                                <span>XAG/USD</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div>
                                                <span>$0.7227</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div>
                                                <span className="badge-red">5.51%</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div>
                                                <span>$24.56</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div>
                                                <span>$2006.12</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div>
                                                <span>$480.444,232</span>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
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
}))(MarketController)