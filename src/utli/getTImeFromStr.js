export default function getTimeFromStr (dateStr) {
  if(dateStr == "") return "";

  const date = new Date(dateStr);
  const now = new Date();
  const gap = now - date;
  const s = 1000;
  const m = 60000;
  const h = 3600000;
  const day = 86400000;
  const week = 604800000;

  if(gap >= week)//超過一周直接顯示日期
      return (now.getFullYear() > date.getFullYear() ? date.getFullYear() + "年 " : "")
              + date.getMonth() + "月 " + date.getDate() + "日";
  if(gap >= day) return Math.floor(gap / day) + "天前";
  if(gap >= h) return Math.floor(gap / h) + "小時前";
  if(gap >= m) return Math.floor(gap / m) + "分鐘前";
  if(gap >= s) return Math.floor(gap / s) + "秒前";
  if(gap >= 0) return "剛剛";
  return "";
}
