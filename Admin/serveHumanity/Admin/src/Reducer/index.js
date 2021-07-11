import { combineReducers } from 'redux'

import {adminReducer} from './Admin.js'
import Story from './Story.js';
export default combineReducers({
    adminReducer,
    Story
});