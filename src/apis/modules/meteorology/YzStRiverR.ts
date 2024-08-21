import request from "@/apis/request";

// 查询河道水情列表
export function listYzStRiverR(query:any) {
  return request({
    url: '/meteorology/YzStRiverR/list',
    method: 'post',
    data: query
  })
}

// 查询河道水情详细
export function getYzStRiverR(query:any) {
  return request({
    url: '/meteorology/YzStRiverR/getInfo' ,
    method: 'post',
    data: query
  })
}

// 新增河道水情
export function addYzStRiverR(data:any) {
  return request({
    url: '/meteorology/YzStRiverR',
    method: 'post',
    data: data
  })
}

// 修改河道水情
export function updateYzStRiverR(data:any) {
  return request({
    url: '/meteorology/YzStRiverR',
    method: 'put',
    data: data
  })
}

// 删除河道水情
export function delYzStRiverR(data:any) {
  return request({
    url: '/meteorology/YzStRiverR/remove',
    method: 'post',
    data: data
  })
}
// 导出河道水情
export function exportYzStRiverR(data: any) {
  return request({
    url: "/meteorology/YzStRiverR/export",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导出导入模板河道水情
export function importTemplateYzStRiverR(data: any) {
  return request({
    url: "/meteorology/YzStRiverR/importTemplate",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导入河道水情
export function importYzStRiverR(data: any) {
  return request({
    url: "/meteorology/YzStRiverR/importData",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}
