import request from "@/apis/request";

// 查询暴雨加报列表
export function listYzStStormR(query:any) {
  return request({
    url: '/meteorology/YzStStormR/list',
    method: 'post',
    data: query
  })
}

// 查询暴雨加报详细
export function getYzStStormR(query:any) {
  return request({
    url: '/meteorology/YzStStormR/getInfo' ,
    method: 'post',
    data: query
  })
}

// 新增暴雨加报
export function addYzStStormR(data:any) {
  return request({
    url: '/meteorology/YzStStormR',
    method: 'post',
    data: data
  })
}

// 修改暴雨加报
export function updateYzStStormR(data:any) {
  return request({
    url: '/meteorology/YzStStormR',
    method: 'put',
    data: data
  })
}

// 删除暴雨加报
export function delYzStStormR(data:any) {
  return request({
    url: '/meteorology/YzStStormR/remove',
    method: 'post',
    data: data
  })
}
// 导出暴雨加报
export function exportYzStStormR(data: any) {
  return request({
    url: "/meteorology/YzStStormR/export",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导出导入模板暴雨加报
export function importTemplateYzStStormR(data: any) {
  return request({
    url: "/meteorology/YzStStormR/importTemplate",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导入暴雨加报
export function importYzStStormR(data: any) {
  return request({
    url: "/meteorology/YzStStormR/importData",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}
