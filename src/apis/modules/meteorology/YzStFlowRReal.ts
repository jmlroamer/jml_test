import request from "@/apis/request";

// 查询流量站实时列表
export function listYzStFlowRReal(query:any) {
  return request({
    url: '/meteorology/YzStFlowRReal/list',
    method: 'post',
    data: query
  })
}

// 查询流量站实时详细
export function getYzStFlowRReal(query:any) {
  return request({
    url: '/meteorology/YzStFlowRReal/getInfo' ,
    method: 'post',
    data: query
  })
}

// 新增流量站实时
export function addYzStFlowRReal(data:any) {
  return request({
    url: '/meteorology/YzStFlowRReal',
    method: 'post',
    data: data
  })
}

// 修改流量站实时
export function updateYzStFlowRReal(data:any) {
  return request({
    url: '/meteorology/YzStFlowRReal',
    method: 'put',
    data: data
  })
}

// 删除流量站实时
export function delYzStFlowRReal(data:any) {
  return request({
    url: '/meteorology/YzStFlowRReal/remove',
    method: 'post',
    data: data
  })
}
// 导出流量站实时
export function exportYzStFlowRReal(data: any) {
  return request({
    url: "/meteorology/YzStFlowRReal/export",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导出导入模板流量站实时
export function importTemplateYzStFlowRReal(data: any) {
  return request({
    url: "/meteorology/YzStFlowRReal/importTemplate",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导入流量站实时
export function importYzStFlowRReal(data: any) {
  return request({
    url: "/meteorology/YzStFlowRReal/importData",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}
