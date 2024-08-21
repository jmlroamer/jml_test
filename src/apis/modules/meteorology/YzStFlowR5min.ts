import request from "@/apis/request";

// 查询流量站列表
export function listYzStFlowR5min(query:any) {
  return request({
    url: '/meteorology/YzStFlowR5min/list',
    method: 'post',
    data: query
  })
}

// 查询流量站详细
export function getYzStFlowR5min(STCD:any) {
  return request({
    url: '/meteorology/YzStFlowR5min/' + STCD,
    method: 'get'
  })
}

// 新增流量站
export function addYzStFlowR5min(data:any) {
  return request({
    url: '/meteorology/YzStFlowR5min',
    method: 'post',
    data: data
  })
}

// 修改流量站
export function updateYzStFlowR5min(data:any) {
  return request({
    url: '/meteorology/YzStFlowR5min',
    method: 'put',
    data: data
  })
}

// 删除流量站
export function delYzStFlowR5min(STCD:any) {
  return request({
    url: '/meteorology/YzStFlowR5min/' + STCD,
    method: 'delete'
  })
}
// 导出流量站
export function exportYzStFlowR5min(data: any) {
  return request({
    url: "/meteorology/YzStFlowR5min/export",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导出导入模板流量站
export function importTemplateYzStFlowR5min(data: any) {
  return request({
    url: "/meteorology/YzStFlowR5min/importTemplate",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导入流量站
export function importYzStFlowR5min(data: any) {
  return request({
    url: "/meteorology/YzStFlowR5min/importData",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}
