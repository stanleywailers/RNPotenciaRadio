 

import axios from 'axios';
const radioApi = axios.create({
    baseURL:'https://api.themoviedb.org/3/movie',
    // params:{
    //     api_key:'479bccc76a7314e9490a23e6b3a0d87e',
    //     language:'es-ES'
    // }
});

export default radioApi;