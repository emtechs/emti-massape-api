import axios from 'axios'

export const authApi = axios.create({
  baseURL: 'https://auth.emsolucoestecnologicas.com.br/',
  timeout: 100000,
})

export const emtiApi = axios.create({
  baseURL: 'https://api.emtidigital.com.br/',
  timeout: 100000,
})
