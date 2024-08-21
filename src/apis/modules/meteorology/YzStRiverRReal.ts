import request from "@/apis/request";

// 查询河道水情实时列表
export function listYzStRiverRReal(query:any) {
  return request({
    url: '/meteorology/YzStRiverRReal/list',
    method: 'post',
    data: query
  })
}

// 查询河道水情实时详细
export function getYzStRiverRReal(query:any) {
  return request({
    url: '/meteorology/YzStRiverRReal/getInfo' ,
    method: 'post',
    data: query
  })
}

// 新增河道水情实时
export function addYzStRiverRReal(data:any) {
  return request({
    url: '/meteorology/YzStRiverRReal',
    method: 'post',
    data: data
  })
}

// 修改河道水情实时
export function updateYzStRiverRReal(data:any) {
  return request({
    url: '/meteorology/YzStRiverRReal',
    method: 'put',
    data: data
  })
}

// 删除河道水情实时
export function delYzStRiverRReal(data:any) {
  return request({
    url: '/meteorology/YzStRiverRReal/remove',
    method: 'post',
    data: data
  })
}
// 导出河道水情实时
export function exportYzStRiverRReal(data: any) {
  return request({
    url: "/meteorology/YzStRiverRReal/export",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导出导入模板河道水情实时
export function importTemplateYzStRiverRReal(data: any) {
  return request({
    url: "/meteorology/YzStRiverRReal/importTemplate",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导入河道水情实时
export function importYzStRiverRReal(data: any) {
  return request({
    url: "/meteorology/YzStRiverRReal/importData",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}
