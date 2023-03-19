export default function getNowTime () {
  const now = new Date();
  const yyyy = now.getFullYear(),
    MM = String(now.getMonth() + 1).padStart(2, "0"),
    dd = String(now.getDate()).padStart(2, "0"),
    hh = String(now.getHours()).padStart(2, "0"),
    mm = String(now.getMinutes()).padStart(2, "0");
  return `${yyyy}/${MM}/${dd} ${hh}:${mm}`;
}