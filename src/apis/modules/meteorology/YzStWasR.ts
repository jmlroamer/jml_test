import request from "@/apis/request";

// 查询堰闸水情列表
export function listYzStWasR(query:any) {
  return request({
    url: '/meteorology/YzStWasR/list',
    method: 'post',
    data: query
  })
}

// 查询堰闸水情详细
export function getYzStWasR(query:any) {
  return request({
    url: '/meteorology/YzStWasR/getInfo' ,
    method: 'post',
    data: query
  })
}

// 新增堰闸水情
export function addYzStWasR(data:any) {
  return request({
    url: '/meteorology/YzStWasR',
    method: 'post',
    data: data
  })
}

// 修改堰闸水情
export function updateYzStWasR(data:any) {
  return request({
    url: '/meteorology/YzStWasR',
    method: 'put',
    data: data
  })
}

// 删除堰闸水情
export function delYzStWasR(data:any) {
  return request({
    url: '/meteorology/YzStWasR/remove',
    method: 'post',
    data: data
  })
}
// 导出堰闸水情
export function exportYzStWasR(data: any) {
  return request({
    url: "/meteorology/YzStWasR/export",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导出导入模板堰闸水情
export function importTemplateYzStWasR(data: any) {
  return request({
    url: "/meteorology/YzStWasR/importTemplate",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导入堰闸水情
export function importYzStWasR(data: any) {
  return request({
    url: "/meteorology/YzStWasR/importData",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}
