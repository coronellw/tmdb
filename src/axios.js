import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
        api_key:'66af19a8f162bdc60f7b70dc730c2e33'
    }
})

export default instance;