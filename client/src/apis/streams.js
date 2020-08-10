import axios from 'axios'

const BASE_URL = 'http://localhost:3001'

export const createStreamApi = async (url, stream) => {
    const response = await axios.post(`${BASE_URL}${url}`, stream)
    return response.data
}

export const fetchStreamsApi = async url => {
    const response = await axios.get(`${BASE_URL}${url}`)
    return response.data
}

export const fetchStreamApi = async (url, id) => {
    const response = await axios.get(`${BASE_URL}${url}/${id}`)
    return response.data
}

export const editStreamApi = async (url, id, newValues) => {
    const response = await axios.patch(`${BASE_URL}${url}/${id}`, newValues)
    return response.data
}

export const deleteStreamApi = async (url, id) => {
    await axios.delete(`${BASE_URL}${url}/${id}`)
}