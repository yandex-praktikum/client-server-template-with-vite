import axios from 'axios'
const baseApiUrl = 'https://ya-praktikum.tech/api/v2/';
export default axios.create({
  baseURL: baseApiUrl,
})
export { baseApiUrl };
