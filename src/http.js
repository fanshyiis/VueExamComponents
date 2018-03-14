/*
* @Author: Super X
* @Date:   2017-08-28 16:39:19
* @Last Modified by:   Super X
* @Last Modified time: 2018-01-26 19:20:09
*/
import axios from 'axios'
import is from 'is_js'

axios.defaults.timeout = 5000
axios.defaults.baseURL = is.safari() && (is.ios() || is.mac()) ? 'https://www.enjoyreading.net' : process.env.API_BASE_URL
// axios.defaults.baseURL = is.safari() && (is.ios() || is.mac()) ? 'https://www.enjoyreading.net' : 'https://www.enjoyreading.net'
// axios.defaults.baseURL = is.safari() && (is.ios() || is.mac()) ? process.env.API_BASE_URL : 'https://www.enjoyreading.net'
axios.defaults.withCredentials = true

export default axios
