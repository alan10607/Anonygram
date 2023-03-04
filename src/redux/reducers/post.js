import { FIND_ID_SET, FIND_POST, FIND_TOP_CONT } from "../constant";

const initState = new Map();

export default function postReducer(preState = initState, action){
    const {type, data} = action;
    const newState = new Map(preState);

    switch(type){
        case FIND_ID_SET:
            data.forEach(id => newState.set(id, null));
            return newState;
        case FIND_POST:
            data.forEach(art => newState.set(art.id, art));
            return newState;
        case FIND_TOP_CONT:
            newState.get(data[0].id).contList.push(...data);
            return newState;
        default:
            return preState;
    }
}

