import React from 'react';
import Config from '../Config/Config';
import axios from 'axios';


const Translate = async() =>{
    const data = new FormData();
    data.append('get_translate', 'true');

    const config = {
        method: 'post',
        url: Config().ApiUrl,
        headers: {},
        data : data
    };

    const translate_list = await axios(config);

    return  translate_list.data;

}


export default Translate;