import request from "@/apis/request";

// 查询水库水情列表
export function listYzStRsvrR(query:any) {
  return request({
    url: '/meteorology/YzStRsvrR/list',
    method: 'post',
    data: query
  })
}

// 查询水库水情详细
export function getYzStRsvrR(query:any) {
  return request({
    url: '/meteorology/YzStRsvrR/getInfo' ,
    method: 'post',
    data: query
  })
}

// 新增水库水情
export function addYzStRsvrR(data:any) {
  return request({
    url: '/meteorology/YzStRsvrR',
    method: 'post',
    data: data
  })
}

// 修改水库水情
export function updateYzStRsvrR(data:any) {
  return request({
    url: '/meteorology/YzStRsvrR',
    method: 'put',
    data: data
  })
}

// 删除水库水情
export function delYzStRsvrR(data:any) {
  return request({
    url: '/meteorology/YzStRsvrR/remove',
    method: 'post',
    data: data
  })
}
// 导出水库水情
export function exportYzStRsvrR(data: any) {
  return request({
    url: "/meteorology/YzStRsvrR/export",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导出导入模板水库水情
export function importTemplateYzStRsvrR(data: any) {
  return request({
    url: "/meteorology/YzStRsvrR/importTemplate",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导入水库水情
export function importYzStRsvrR(data: any) {
  return request({
    url: "/meteorology/YzStRsvrR/importData",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}
