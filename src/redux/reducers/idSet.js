import { FIND_ID_SET } from "../constant";

const initState = [];

export default function idListReducer(preState = initState, action){
    const {type, data} = action;
    switch(type){
        case FIND_ID_SET:
            return data;//必須new新的
        default:
            return preState;
    }
}