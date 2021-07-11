import * as api from '../Api/Api'
const AUTH = "AUTH"

export const request = (formData, history) => async () => {
    try {
        await api.request(formData)
        history.push('/')
    } catch (error) {
        console.log(error)
    }
}

export const updRequest = (formData, history) => async () => {
    try {
        await api.updaterequest(formData)
        history.push('/dashboard')
    } catch (error) {

    }
}