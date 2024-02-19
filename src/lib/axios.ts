import axios from 'axios'

export const authApi = axios.create({
  baseURL: 'https://auth.emsolucoestecnologicas.com.br/',
  timeout: 100000,
})
