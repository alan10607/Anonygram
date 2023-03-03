import { post } from "../../cmn/postApi";
import { FIND_ID_SET, SHOW_CONSOLE } from "../constant";

export const findIdSet = () => {
  return (dispatch) => {
    post(FIND_ID_SET, {}).then((idList) => {
      dispatch({ type: FIND_ID_SET, data : idList });
    }).catch((e) => {
      dispatch({ type: SHOW_CONSOLE, data : "看起來泡麵打翻機台了, 請稍後再進來試試" });
    });
  }
}
