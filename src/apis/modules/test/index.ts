import request from "@/apis/request";
//获取文件列表
export function getFileList(data: any): Promise<any> {
  return request({
    url: "/prport/dashiji",
    method: "get",
    params: data,
  });
}
//文件下载
export function downloadFileYearbook(data: any): Promise<any> {
  return request({
    url: "/prport/dashiji/lookFile",
    method: "get",
    params: data,
    responseType: "blob",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}
