import request from "@/apis/request";

// 查询水库水情列表
export function listYzStRsvrR5min(query:any) {
  return request({
    url: '/meteorology/YzStRsvrR5min/list',
    method: 'post',
    data: query
  })
}

// 查询水库水情详细
export function getYzStRsvrR5min(STCD:any) {
  return request({
    url: '/meteorology/YzStRsvrR5min/' + STCD,
    method: 'get'
  })
}

// 新增水库水情
export function addYzStRsvrR5min(data:any) {
  return request({
    url: '/meteorology/YzStRsvrR5min',
    method: 'post',
    data: data
  })
}

// 修改水库水情
export function updateYzStRsvrR5min(data:any) {
  return request({
    url: '/meteorology/YzStRsvrR5min',
    method: 'put',
    data: data
  })
}

// 删除水库水情
export function delYzStRsvrR5min(STCD:any) {
  return request({
    url: '/meteorology/YzStRsvrR5min/' + STCD,
    method: 'delete'
  })
}
// 导出水库水情
export function exportYzStRsvrR5min(data: any) {
  return request({
    url: "/meteorology/YzStRsvrR5min/export",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导出导入模板水库水情
export function importTemplateYzStRsvrR5min(data: any) {
  return request({
    url: "/meteorology/YzStRsvrR5min/importTemplate",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导入水库水情
export function importYzStRsvrR5min(data: any) {
  return request({
    url: "/meteorology/YzStRsvrR5min/importData",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}
