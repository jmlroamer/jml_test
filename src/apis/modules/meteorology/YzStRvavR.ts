import request from "@/apis/request";

// 查询河道水情多日均值列表
export function listYzStRvavR(query:any) {
  return request({
    url: '/meteorology/YzStRvavR/list',
    method: 'post',
    data: query
  })
}

// 查询河道水情多日均值详细
export function getYzStRvavR(query:any) {
  return request({
    url: '/meteorology/YzStRvavR/getInfo' ,
    method: 'post',
    data: query
  })
}

// 新增河道水情多日均值
export function addYzStRvavR(data:any) {
  return request({
    url: '/meteorology/YzStRvavR',
    method: 'post',
    data: data
  })
}

// 修改河道水情多日均值
export function updateYzStRvavR(data:any) {
  return request({
    url: '/meteorology/YzStRvavR',
    method: 'put',
    data: data
  })
}

// 删除河道水情多日均值
export function delYzStRvavR(data:any) {
  return request({
    url: '/meteorology/YzStRvavR/remove',
    method: 'post',
    data: data
  })
}
// 导出河道水情多日均值
export function exportYzStRvavR(data: any) {
  return request({
    url: "/meteorology/YzStRvavR/export",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导出导入模板河道水情多日均值
export function importTemplateYzStRvavR(data: any) {
  return request({
    url: "/meteorology/YzStRvavR/importTemplate",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导入河道水情多日均值
export function importYzStRvavR(data: any) {
  return request({
    url: "/meteorology/YzStRvavR/importData",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}
