export default (stories = [], action) => {       //action:typr  and data=>post intially it is empty[]
    switch (action.type) {
        case "CREATE":
            return [...stories, action.payload]  //array is there => array is storys => spread the array stories=> add the new =>newis stored i action.paylaod
        case "FETCH_ALL":
            return action.payload
        case "DELETE":
            return stories.filter((story) => story._id !== action.payload)
        default:
            return stories
    }
}