import * as api from '../Api/Api'
 const AUTH = "AUTH"
export const signup = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.signup(formData)
        dispatch({ type: AUTH }, data)
        history.push('/login')
    } catch (error) {
        console.log(error)
    }
}

export const login = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.login(formData)
        dispatch({ type: AUTH, data})
        history.push('/dashboard')
    } catch (error) {
        console.log(error)
    }
}