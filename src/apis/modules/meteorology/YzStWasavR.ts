import request from "@/apis/request";

// 查询水库水情多日均值列表
export function listYzStWasavR(query:any) {
  return request({
    url: '/meteorology/YzStWasavR/list',
    method: 'post',
    data: query
  })
}

// 查询水库水情多日均值详细
export function getYzStWasavR(query:any) {
  return request({
    url: '/meteorology/YzStWasavR/getInfo' ,
    method: 'post',
    data: query
  })
}

// 新增水库水情多日均值
export function addYzStWasavR(data:any) {
  return request({
    url: '/meteorology/YzStWasavR',
    method: 'post',
    data: data
  })
}

// 修改水库水情多日均值
export function updateYzStWasavR(data:any) {
  return request({
    url: '/meteorology/YzStWasavR',
    method: 'put',
    data: data
  })
}

// 删除水库水情多日均值
export function delYzStWasavR(data:any) {
  return request({
    url: '/meteorology/YzStWasavR/remove',
    method: 'post',
    data: data
  })
}
// 导出水库水情多日均值
export function exportYzStWasavR(data: any) {
  return request({
    url: "/meteorology/YzStWasavR/export",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导出导入模板水库水情多日均值
export function importTemplateYzStWasavR(data: any) {
  return request({
    url: "/meteorology/YzStWasavR/importTemplate",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导入水库水情多日均值
export function importYzStWasavR(data: any) {
  return request({
    url: "/meteorology/YzStWasavR/importData",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}
