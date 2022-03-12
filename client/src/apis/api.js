import axios from "axios";
import {url} from '../utils/common'
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.get["Access-Control-Allow-Origin"] = "*";


export default axios.create({
    baseURL: url,
    headers: {
      Accept: "applications/json",
    },
});
