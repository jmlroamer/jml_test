import request from "@/apis/request";

// 查询堰闸水情实时列表
export function listYzStWasRReal(query:any) {
  return request({
    url: '/meteorology/YzStWasRReal/list',
    method: 'post',
    data: query
  })
}

// 查询堰闸水情实时详细
export function getYzStWasRReal(query:any) {
  return request({
    url: '/meteorology/YzStWasRReal/getInfo' ,
    method: 'post',
    data: query
  })
}

// 新增堰闸水情实时
export function addYzStWasRReal(data:any) {
  return request({
    url: '/meteorology/YzStWasRReal',
    method: 'post',
    data: data
  })
}

// 修改堰闸水情实时
export function updateYzStWasRReal(data:any) {
  return request({
    url: '/meteorology/YzStWasRReal',
    method: 'put',
    data: data
  })
}

// 删除堰闸水情实时
export function delYzStWasRReal(data:any) {
  return request({
    url: '/meteorology/YzStWasRReal/remove',
    method: 'post',
    data: data
  })
}
// 导出堰闸水情实时
export function exportYzStWasRReal(data: any) {
  return request({
    url: "/meteorology/YzStWasRReal/export",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导出导入模板堰闸水情实时
export function importTemplateYzStWasRReal(data: any) {
  return request({
    url: "/meteorology/YzStWasRReal/importTemplate",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导入堰闸水情实时
export function importYzStWasRReal(data: any) {
  return request({
    url: "/meteorology/YzStWasRReal/importData",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}
