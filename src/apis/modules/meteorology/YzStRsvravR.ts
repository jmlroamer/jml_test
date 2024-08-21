import request from "@/apis/request";

// 查询水库水情多日均值列表
export function listYzStRsvravR(query:any) {
  return request({
    url: '/meteorology/YzStRsvravR/list',
    method: 'post',
    data: query
  })
}

// 查询水库水情多日均值详细
export function getYzStRsvravR(query:any) {
  return request({
    url: '/meteorology/YzStRsvravR/getInfo' ,
    method: 'post',
    data: query
  })
}

// 新增水库水情多日均值
export function addYzStRsvravR(data:any) {
  return request({
    url: '/meteorology/YzStRsvravR',
    method: 'post',
    data: data
  })
}

// 修改水库水情多日均值
export function updateYzStRsvravR(data:any) {
  return request({
    url: '/meteorology/YzStRsvravR',
    method: 'put',
    data: data
  })
}

// 删除水库水情多日均值
export function delYzStRsvravR(data:any) {
  return request({
    url: '/meteorology/YzStRsvravR/remove',
    method: 'post',
    data: data
  })
}
// 导出水库水情多日均值
export function exportYzStRsvravR(data: any) {
  return request({
    url: "/meteorology/YzStRsvravR/export",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导出导入模板水库水情多日均值
export function importTemplateYzStRsvravR(data: any) {
  return request({
    url: "/meteorology/YzStRsvravR/importTemplate",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导入水库水情多日均值
export function importYzStRsvravR(data: any) {
  return request({
    url: "/meteorology/YzStRsvravR/importData",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}
