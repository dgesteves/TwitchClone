import {combineReducers} from "redux";
import authReducer from "./authReducer";
import {reducer as formReducer} from "redux-form";
import streamsReducer from "./streamsReducer";

export default combineReducers({
    auth: authReducer,
    form: formReducer,
    streams: streamsReducer
})