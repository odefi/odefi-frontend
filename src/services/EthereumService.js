import Web3 from 'web3'
import {ETHEREUM_NODE} from '../constants/index'

const EthereumService =  {
    web3: false,
    init() {
        var provider = new Web3.providers.HttpProvider(ETHEREUM_NODE)
        this.web3 = new Web3(provider)
    }
}

export default EthereumService