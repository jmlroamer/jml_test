import request from "@/apis/request";

// 查询流量站列表
export function listYzStFlowR(query:any) {
  return request({
    url: '/meteorology/YzStFlowR/list',
    method: 'post',
    data: query
  })
}

// 查询流量站详细
export function getYzStFlowR(query:any) {
  return request({
    url: '/meteorology/YzStFlowR/getInfo' ,
    method: 'post',
    data: query
  })
}

// 新增流量站
export function addYzStFlowR(data:any) {
  return request({
    url: '/meteorology/YzStFlowR',
    method: 'post',
    data: data
  })
}

// 修改流量站
export function updateYzStFlowR(data:any) {
  return request({
    url: '/meteorology/YzStFlowR',
    method: 'put',
    data: data
  })
}

// 删除流量站
export function delYzStFlowR(data:any) {
  return request({
    url: '/meteorology/YzStFlowR/remove',
    method: 'post',
    data: data
  })
}
// 导出流量站
export function exportYzStFlowR(data: any) {
  return request({
    url: "/meteorology/YzStFlowR/export",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导出导入模板流量站
export function importTemplateYzStFlowR(data: any) {
  return request({
    url: "/meteorology/YzStFlowR/importTemplate",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导入流量站
export function importYzStFlowR(data: any) {
  return request({
    url: "/meteorology/YzStFlowR/importData",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}
