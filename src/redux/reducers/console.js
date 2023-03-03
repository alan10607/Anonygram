import { SHOW_CONSOLE, CLOSE_CONSOLE, NEED_RELOAD } from "../constant";

const initState = {
    str : "",
    needReload : false
};

export default function consoleReducer(preState = initState, action){
    const {type, data} = action;
    switch(type){
      case SHOW_CONSOLE:
        return Object.assign({}, preState, {
          str : data
        });
      case CLOSE_CONSOLE:
        return Object.assign({}, preState, {
          str : ""
        });
      case NEED_RELOAD:
        return Object.assign({}, preState, {
          needReload : true
        });
      default:
        return preState;
    }
}