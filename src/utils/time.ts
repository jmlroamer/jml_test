export const nowTime = {
  formateDate(time: number) {
    if (!time) return "";
    const date = new Date(time);
    const month = date.toLocaleString("en-US", { month: "2-digit" });
    const hours = date.toLocaleString("en-GB", { hour: "2-digit" });
    // const seconds = (date.toLocaleString("zh-CN",{second:"2-digit"}))

    // const month = (date.getMonth() + 1)<10?`0${(date.getMonth() + 1)}`:(date.getMonth() + 1)
    // const hours = (date.getHours())<10?`0${date.getHours()}`:(date.getHours())
    const minutes =
      date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    const seconds =
      date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();
    return `${date.getFullYear()}-${month}-${date.getDate()} ${hours}:${minutes}:${seconds}`;
  },
};
export const TimeToYMDhms = (data: any) => {
  if (!data) return "";
  const date = new Date(data);
  // const month = date.toLocaleString("en-US", { month: "2-digit" });
  // const hours = date.toLocaleString("en-GB", { hour: "2-digit" });
  // const seconds = (date.toLocaleString("zh-CN",{second:"2-digit"}))

  const month =
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  const minutes =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  const seconds =
    date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();
  return `${date.getFullYear()}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};
