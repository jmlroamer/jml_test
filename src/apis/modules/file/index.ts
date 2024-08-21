import request from "@/apis/request";
//获取文件列表
export function getFileList(data: any): Promise<any> {
  return request({
    url: "/file",
    method: "get",
    data,
  });
}
//上传文件
export function uploadFile(data: any): Promise<any> {
  return request({
    url: "/file",
    method: "post",
    data,
    headers: {
      // "Content-Type": "multipart/form-data",
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}
//新增文件夹
export function addFolder(data: any): Promise<any> {
  return request({
    url: "/file/addFolder",
    method: "post",
    data,
    headers: {
      // "Content-Type": "multipart/form-data",
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}
//根据id删除文件
export function deleteFileById(data: any): Promise<any> {
  return request({
    url: "/file/deleteByIds",
    method: "post",
    data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}
//根据url删除文件
export function deleteFileByUrl(data: any): Promise<any> {
  return request({
    url: "/file/deleteFile",
    method: "post",
    data,
  });
}
//文件下载
export function downloadFile(data: any): Promise<any> {
  return request({
    url: "/file/downLoad",
    method: "get",
    params: data,
    responseType: "blob",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}
//文件下载url
export function downloadFileByUrl(data: any): Promise<any> {
  return request({
    url: data,
    method: "get",
  });
}
//获取树结构目录列表
export function getDirTreeList(data: any): Promise<any> {
  return request({
    url: "/file/getDirTree",
    method: "get",
    data,
  });
}
//获取目录列表
export function getFileDirs(data: any): Promise<any> {
  return request({
    url: "/file/getDirs",
    method: "get",
    data,
  });
}
//获取树结构列表（文件）
export function getFileTreeList(data: any): Promise<any> {
  return request({
    url: "/file/getTree",
    method: "get",
    data,
  });
}
//修改名称
export function updateByName(data: any): Promise<any> {
  return request({
    url: "/file/updateByName",
    method: "post",
    data,
    headers: {
      // "Content-Type": "multipart/form-data",
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}
//文件上传
export function uploadFileSec(data: any): Promise<any> {
  return request({
    url: "/file/upload",
    method: "post",
    data,
  });
}
