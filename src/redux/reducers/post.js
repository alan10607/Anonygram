import { FIND_POST } from "../constant";

const initState = [];

export default function postReducer(preState = initState, action){
    const {type, data} = action;
    switch(type){
        case FIND_POST:
            return [...preState, data];
        default:
            return preState;
    }
}
