import request from "@/apis/request";

// 查询大断面测验成果列表
export function listYzStRvsectB(query:any) {
  return request({
    url: '/meteorology/YzStRvsectB/list',
    method: 'post',
    data: query
  })
}

// 查询大断面测验成果详细
export function getYzStRvsectB(query:any) {
  return request({
    url: '/meteorology/YzStRvsectB/getInfo' ,
    method: 'post',
    data: query
  })
}

// 新增大断面测验成果
export function addYzStRvsectB(data:any) {
  return request({
    url: '/meteorology/YzStRvsectB',
    method: 'post',
    data: data
  })
}

// 修改大断面测验成果
export function updateYzStRvsectB(data:any) {
  return request({
    url: '/meteorology/YzStRvsectB',
    method: 'put',
    data: data
  })
}

// 删除大断面测验成果
export function delYzStRvsectB(data:any) {
  return request({
    url: '/meteorology/YzStRvsectB/remove',
    method: 'post',
    data: data
  })
}
// 导出大断面测验成果
export function exportYzStRvsectB(data: any) {
  return request({
    url: "/meteorology/YzStRvsectB/export",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导出导入模板大断面测验成果
export function importTemplateYzStRvsectB(data: any) {
  return request({
    url: "/meteorology/YzStRvsectB/importTemplate",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导入大断面测验成果
export function importYzStRvsectB(data: any) {
  return request({
    url: "/meteorology/YzStRvsectB/importData",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}
