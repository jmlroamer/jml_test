import request from "@/apis/request";

// 查询库（湖）站防洪指标列表
export function listYzStRsvrfcchB(query:any) {
  return request({
    url: '/meteorology/YzStRsvrfcchB/list',
    method: 'post',
    data: query
  })
}

// 查询库（湖）站防洪指标详细
export function getYzStRsvrfcchB(query:any) {
  return request({
    url: '/meteorology/YzStRsvrfcchB/getInfo' ,
    method: 'post',
    data: query
  })
}

// 新增库（湖）站防洪指标
export function addYzStRsvrfcchB(data:any) {
  return request({
    url: '/meteorology/YzStRsvrfcchB',
    method: 'post',
    data: data
  })
}

// 修改库（湖）站防洪指标
export function updateYzStRsvrfcchB(data:any) {
  return request({
    url: '/meteorology/YzStRsvrfcchB',
    method: 'put',
    data: data
  })
}

// 删除库（湖）站防洪指标
export function delYzStRsvrfcchB(data:any) {
  return request({
    url: '/meteorology/YzStRsvrfcchB/remove',
    method: 'post',
    data: data
  })
}
// 导出库（湖）站防洪指标
export function exportYzStRsvrfcchB(data: any) {
  return request({
    url: "/meteorology/YzStRsvrfcchB/export",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导出导入模板库（湖）站防洪指标
export function importTemplateYzStRsvrfcchB(data: any) {
  return request({
    url: "/meteorology/YzStRsvrfcchB/importTemplate",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导入库（湖）站防洪指标
export function importYzStRsvrfcchB(data: any) {
  return request({
    url: "/meteorology/YzStRsvrfcchB/importData",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}
