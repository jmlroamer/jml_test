import request from "@/apis/request";

// 查询堰闸水情列表
export function listYzStWasRBak(query:any) {
  return request({
    url: '/meteorology/YzStWasRBak/list',
    method: 'post',
    data: query
  })
}

// 查询堰闸水情详细
export function getYzStWasRBak(query:any) {
  return request({
    url: '/meteorology/YzStWasRBak/getInfo' ,
    method: 'post',
    data: query
  })
}

// 新增堰闸水情
export function addYzStWasRBak(data:any) {
  return request({
    url: '/meteorology/YzStWasRBak',
    method: 'post',
    data: data
  })
}

// 修改堰闸水情
export function updateYzStWasRBak(data:any) {
  return request({
    url: '/meteorology/YzStWasRBak',
    method: 'put',
    data: data
  })
}

// 删除堰闸水情
export function delYzStWasRBak(data:any) {
  return request({
    url: '/meteorology/YzStWasRBak/remove',
    method: 'post',
    data: data
  })
}
// 导出堰闸水情
export function exportYzStWasRBak(data: any) {
  return request({
    url: "/meteorology/YzStWasRBak/export",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导出导入模板堰闸水情
export function importTemplateYzStWasRBak(data: any) {
  return request({
    url: "/meteorology/YzStWasRBak/importTemplate",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导入堰闸水情
export function importYzStWasRBak(data: any) {
  return request({
    url: "/meteorology/YzStWasRBak/importData",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}
