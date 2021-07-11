import * as api from '../Api/Api'
export const createStory = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.createstory(formData)
        dispatch({ type: "CREATE", payload: data })
    } catch (error) {
        console.log(error)
    }
}

export const fetchStory = () => async (dispatch) => {
    try {
        const { data } = await api.fetchstory()
        dispatch({ type: "FETCH_ALL", payload: data })
    } catch (error) {
        console.log(error)
    }
}
export const deleteStory = (id) => async (dispatch) => {
    try {
        await api.deletestory(id)
        dispatch({ type: "DELETE", payload: id })
    } catch (error) {
        console.log(error)
    }
}