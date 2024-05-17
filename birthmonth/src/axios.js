import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://us-central1-challenge-93541.cloudfunctions.net/api'
})

export default instance;

//Local host link 

//http://127.0.0.1:5001/challenge-93541/us-central1/api