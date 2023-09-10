import axios from 'axios'
const therapistBaseurl = 'http://127.0.0.1:8080/api/v1/therapist'
const instance = axios.create({
    baseURL: therapistBaseurl,
    headers: {'Access-Control-Allow-Origin': '*'}
  });
export default {instance}