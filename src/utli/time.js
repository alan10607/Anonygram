import i18next from "i18next";

export const getTimeFromStr = (dateStr) => {
  if(dateStr == "") return "";

  const date = new Date(dateStr);
  const now = new Date();
  const gap = now - date;
  const s = 1000;
  const m = 60000;
  const h = 3600000;
  const day = 86400000;
  const week = 604800000;

  if(gap >= week){//超過一周直接顯示日期
    const dateObj = {
      yyyy : date.getFullYear(),
      MM : String(date.getMonth()).padStart(2, "0"),
      dd : String(date.getDate()).padStart(2, "0")
    };
    return now.getFullYear() > date.getFullYear() ? 
      i18next.t("date-full", dateObj) :
      i18next.t("date-half", dateObj) ;
  }
  if(gap >= day) return Math.floor(gap / day) + i18next.t("just-day");
  if(gap >= h) return Math.floor(gap / h) + i18next.t("just-hour");
  if(gap >= m) return Math.floor(gap / m) + i18next.t("just-min",);
  if(gap >= s) return Math.floor(gap / s) + i18next.t("just-sec",);
  if(gap >= 0) return i18next.t("just");
  return "";
}

export const getNowTime = () => {
  const now = new Date();
  const dateObj = {
    yyyy : now.getFullYear(),
    MM : String(now.getMonth() + 1).padStart(2, "0"),
    dd : String(now.getDate()).padStart(2, "0"),
    hh : String(now.getHours()).padStart(2, "0"),
    mm : String(now.getMinutes()).padStart(2, "0")
  };
  return i18next.t("time-half", dateObj) ;;
}