import axios from 'axios'

axios.defaults.withCredentials = true

export const getData = async (url) => {
    const res = await axios.get("https://merncommentsocketserver.herokuapp.com" + url)
    console.log("alo alo");
    console.log("huy",res);
    return res
}

export const patchData = async (url, data) => {
    const res = await axios.patch("https://merncommentsocketserver.herokuapp.com" + url, data)
    return res
}


