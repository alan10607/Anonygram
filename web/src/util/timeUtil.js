import i18next from "i18next";

export const getTimeFromStr = (dateStr) => {
  if (!dateStr) return "";

  const date = new Date(dateStr);
  const now = new Date();
  const gap = now - date;
  const s = 1000;
  const m = 60000;
  const h = 3600000;
  const day = 86400000;
  const week = 604800000;

  if (gap >= week) {//if more than a week display the date
    const dateObj = {
      yyyy: date.getFullYear(),
      MM: String(date.getMonth()).padStart(2, "0"),
      dd: String(date.getDate()).padStart(2, "0")
    };
    return now.getFullYear() > date.getFullYear() ?
      i18next.t("text.time.yyyyMMdd", dateObj) :
      i18next.t("text.time.MMdd", dateObj);
  }
  if (gap >= day) return i18next.t("text.time.days.ago", { days: Math.floor(gap / day) });
  if (gap >= h) return i18next.t("text.time.hours.ago", { hours: Math.floor(gap / h) });
  if (gap >= m) return i18next.t("text.time.mins.ago", { minutes: Math.floor(gap / m) });
  if (gap >= s) return i18next.t("text.time.secs.ago", { seconds: Math.floor(gap / s) });  
  if (gap >= 0) return i18next.t("text.time.now");
  return "";
}

export const getNowTime = () => {
  const now = new Date();
  const dateObj = {
    yyyy: now.getFullYear(),
    MM: String(now.getMonth() + 1).padStart(2, "0"),
    dd: String(now.getDate()).padStart(2, "0"),
    hh: String(now.getHours()).padStart(2, "0"),
    mm: String(now.getMinutes()).padStart(2, "0")
  };
  return i18next.t("text.time.yyyyMMddhhmm", dateObj);
}