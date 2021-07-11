import axios from 'axios'

export const API = axios.create({ baseURL: 'http://localhost:8080' })

//auth handler
export const signup = (formData) => API.post('/signup', formData)
export const login = (formData) => API.post('/login', formData)
//request handler
export const request = (formData) => API.post('/request', formData)
export const updaterequest = (formData) => { API.patch('/perform', formData) }
//story post handler
export const createstory = (formData) => (API.post('/story', formData))
export const fetchstory = () => (API.get('/story'))
export const deletestory = (id) => API.delete(`/story/${id}`)
