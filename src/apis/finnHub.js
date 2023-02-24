import axios from "axios";

const BASE_URL = "https://finnhub.io/api/v1/";
const TOKEN = "cfsedcpr01qgkckhdk70cfsedcpr01qgkckhdk7g";

export default axios.create({
    baseURL: BASE_URL,
    params: {
        token: TOKEN,
    },
});
