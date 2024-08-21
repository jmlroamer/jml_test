import request from "@/apis/request";

// 查询气温水温多日均值列表
export function listYzStTmpavR(query:any) {
  return request({
    url: '/meteorology/YzStTmpavR/list',
    method: 'post',
    data: query
  })
}

// 查询气温水温多日均值详细
export function getYzStTmpavR(query:any) {
  return request({
    url: '/meteorology/YzStTmpavR/getInfo' ,
    method: 'post',
    data: query
  })
}

// 新增气温水温多日均值
export function addYzStTmpavR(data:any) {
  return request({
    url: '/meteorology/YzStTmpavR',
    method: 'post',
    data: data
  })
}

// 修改气温水温多日均值
export function updateYzStTmpavR(data:any) {
  return request({
    url: '/meteorology/YzStTmpavR',
    method: 'put',
    data: data
  })
}

// 删除气温水温多日均值
export function delYzStTmpavR(data:any) {
  return request({
    url: '/meteorology/YzStTmpavR/remove',
    method: 'post',
    data: data
  })
}
// 导出气温水温多日均值
export function exportYzStTmpavR(data: any) {
  return request({
    url: "/meteorology/YzStTmpavR/export",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导出导入模板气温水温多日均值
export function importTemplateYzStTmpavR(data: any) {
  return request({
    url: "/meteorology/YzStTmpavR/importTemplate",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导入气温水温多日均值
export function importYzStTmpavR(data: any) {
  return request({
    url: "/meteorology/YzStTmpavR/importData",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}
