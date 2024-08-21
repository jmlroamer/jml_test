import request from "@/apis/request";

// 查询冰雹列表
export function listYzStHailR(query:any) {
  return request({
    url: '/meteorology/YzStHailR/list',
    method: 'post',
    data: query
  })
}

// 查询冰雹详细
export function getYzStHailR(query:any) {
  return request({
    url: '/meteorology/YzStHailR/getInfo' ,
    method: 'post',
    data: query
  })
}

// 新增冰雹
export function addYzStHailR(data:any) {
  return request({
    url: '/meteorology/YzStHailR',
    method: 'post',
    data: data
  })
}

// 修改冰雹
export function updateYzStHailR(data:any) {
  return request({
    url: '/meteorology/YzStHailR',
    method: 'put',
    data: data
  })
}

// 删除冰雹
export function delYzStHailR(data:any) {
  return request({
    url: '/meteorology/YzStHailR/remove',
    method: 'post',
    data: data
  })
}
// 导出冰雹
export function exportYzStHailR(data: any) {
  return request({
    url: "/meteorology/YzStHailR/export",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导出导入模板冰雹
export function importTemplateYzStHailR(data: any) {
  return request({
    url: "/meteorology/YzStHailR/importTemplate",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导入冰雹
export function importYzStHailR(data: any) {
  return request({
    url: "/meteorology/YzStHailR/importData",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}
