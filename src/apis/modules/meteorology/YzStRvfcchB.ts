import request from "@/apis/request";

// 查询河道站防洪指标列表
export function listYzStRvfcchB(query:any) {
  return request({
    url: '/meteorology/YzStRvfcchB/list',
    method: 'post',
    data: query
  })
}

// 查询河道站防洪指标详细
export function getYzStRvfcchB(query:any) {
  return request({
    url: '/meteorology/YzStRvfcchB/getInfo' ,
    method: 'post',
    data: query
  })
}

// 新增河道站防洪指标
export function addYzStRvfcchB(data:any) {
  return request({
    url: '/meteorology/YzStRvfcchB',
    method: 'post',
    data: data
  })
}

// 修改河道站防洪指标
export function updateYzStRvfcchB(data:any) {
  return request({
    url: '/meteorology/YzStRvfcchB',
    method: 'put',
    data: data
  })
}

// 删除河道站防洪指标
export function delYzStRvfcchB(data:any) {
  return request({
    url: '/meteorology/YzStRvfcchB/remove',
    method: 'post',
    data: data
  })
}
// 导出河道站防洪指标
export function exportYzStRvfcchB(data: any) {
  return request({
    url: "/meteorology/YzStRvfcchB/export",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导出导入模板河道站防洪指标
export function importTemplateYzStRvfcchB(data: any) {
  return request({
    url: "/meteorology/YzStRvfcchB/importTemplate",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导入河道站防洪指标
export function importYzStRvfcchB(data: any) {
  return request({
    url: "/meteorology/YzStRvfcchB/importData",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}
