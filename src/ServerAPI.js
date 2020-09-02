import Axios from "axios";
import { API_ENDPOINT } from './constants/index'

const ServerAPI = {
    getConfig() {
        return new Promise ( (resolve,reject) => {
            Axios.get(`${API_ENDPOINT}/getConfig`)
            .then(res => (resolve(res.data)))
            .catch(error => (reject(error.response.data)))
        })
    },

    getSaleOrder(address) {
        return new Promise ( (resolve,reject) => {
            Axios.get(`${API_ENDPOINT}/getSaleOrder/${address}`)
            .then(res => (resolve(res.data)))
            .catch(error => (reject(error.response.data)))
        })
    },

    getSaleOrderHistory(address) {
        return new Promise ( (resolve,reject) => {
            Axios.get(`${API_ENDPOINT}/getSaleOrderHistory/${address}`)
            .then(res => (resolve(res.data)))
            .catch(error => (reject(error.response.data)))
        })
    },

    getSaleRef(address) {
        return new Promise ( (resolve,reject) => {
            Axios.get(`${API_ENDPOINT}/getSaleRef/${address}`)
            .then(res => (resolve(res.data)))
            .catch(error => (reject(error.response.data)))
        })
    },

    getRoundConfig(round) {
        return new Promise ( (resolve,reject) => {
            Axios.get(`${API_ENDPOINT}/getRoundConfig/${round}`)
            .then(res => (resolve(res.data)))
            .catch(error => (reject(error.response.data)))
        })
    },

    getRef(address) {
        return new Promise ( (resolve,reject) => {
            Axios.get(`${API_ENDPOINT}/getRef/${address}`)
            .then(res => (resolve(res.data)))
            .catch(error => (reject(error.response.data)))
        })
    }
}

export default ServerAPI;
