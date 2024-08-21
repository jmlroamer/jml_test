import request from "@/apis/request";

// 查询水库水情实时列表
export function listYzStRsvrRReal(query:any) {
  return request({
    url: '/meteorology/YzStRsvrRReal/list',
    method: 'post',
    data: query
  })
}

// 查询水库水情实时详细
export function getYzStRsvrRReal(query:any) {
  return request({
    url: '/meteorology/YzStRsvrRReal/getInfo' ,
    method: 'post',
    data: query
  })
}

// 新增水库水情实时
export function addYzStRsvrRReal(data:any) {
  return request({
    url: '/meteorology/YzStRsvrRReal',
    method: 'post',
    data: data
  })
}

// 修改水库水情实时
export function updateYzStRsvrRReal(data:any) {
  return request({
    url: '/meteorology/YzStRsvrRReal',
    method: 'put',
    data: data
  })
}

// 删除水库水情实时
export function delYzStRsvrRReal(data:any) {
  return request({
    url: '/meteorology/YzStRsvrRReal/remove',
    method: 'post',
    data: data
  })
}
// 导出水库水情实时
export function exportYzStRsvrRReal(data: any) {
  return request({
    url: "/meteorology/YzStRsvrRReal/export",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导出导入模板水库水情实时
export function importTemplateYzStRsvrRReal(data: any) {
  return request({
    url: "/meteorology/YzStRsvrRReal/importTemplate",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导入水库水情实时
export function importYzStRsvrRReal(data: any) {
  return request({
    url: "/meteorology/YzStRsvrRReal/importData",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}
