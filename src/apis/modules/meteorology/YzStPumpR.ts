import request from "@/apis/request";

// 查询泵站水情列表
export function listYzStPumpR(query:any) {
  return request({
    url: '/meteorology/YzStPumpR/list',
    method: 'post',
    data: query
  })
}

// 查询泵站水情详细
export function getYzStPumpR(query:any) {
  return request({
    url: '/meteorology/YzStPumpR/getInfo' ,
    method: 'post',
    data: query
  })
}

// 新增泵站水情
export function addYzStPumpR(data:any) {
  return request({
    url: '/meteorology/YzStPumpR',
    method: 'post',
    data: data
  })
}

// 修改泵站水情
export function updateYzStPumpR(data:any) {
  return request({
    url: '/meteorology/YzStPumpR',
    method: 'put',
    data: data
  })
}

// 删除泵站水情
export function delYzStPumpR(data:any) {
  return request({
    url: '/meteorology/YzStPumpR/remove',
    method: 'post',
    data: data
  })
}
// 导出泵站水情
export function exportYzStPumpR(data: any) {
  return request({
    url: "/meteorology/YzStPumpR/export",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导出导入模板泵站水情
export function importTemplateYzStPumpR(data: any) {
  return request({
    url: "/meteorology/YzStPumpR/importTemplate",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导入泵站水情
export function importYzStPumpR(data: any) {
  return request({
    url: "/meteorology/YzStPumpR/importData",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}
