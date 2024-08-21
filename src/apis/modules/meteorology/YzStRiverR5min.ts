import request from "@/apis/request";

// 查询河道水情列表
export function listYzStRiverR5min(query:any) {
  return request({
    url: '/meteorology/YzStRiverR5min/list',
    method: 'post',
    data: query
  })
}

// 查询河道水情详细
export function getYzStRiverR5min(STCD:any) {
  return request({
    url: '/meteorology/YzStRiverR5min/' + STCD,
    method: 'get'
  })
}

// 新增河道水情
export function addYzStRiverR5min(data:any) {
  return request({
    url: '/meteorology/YzStRiverR5min',
    method: 'post',
    data: data
  })
}

// 修改河道水情
export function updateYzStRiverR5min(data:any) {
  return request({
    url: '/meteorology/YzStRiverR5min',
    method: 'put',
    data: data
  })
}

// 删除河道水情
export function delYzStRiverR5min(STCD:any) {
  return request({
    url: '/meteorology/YzStRiverR5min/' + STCD,
    method: 'delete'
  })
}
// 导出河道水情
export function exportYzStRiverR5min(data: any) {
  return request({
    url: "/meteorology/YzStRiverR5min/export",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导出导入模板河道水情
export function importTemplateYzStRiverR5min(data: any) {
  return request({
    url: "/meteorology/YzStRiverR5min/importTemplate",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导入河道水情
export function importYzStRiverR5min(data: any) {
  return request({
    url: "/meteorology/YzStRiverR5min/importData",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}
