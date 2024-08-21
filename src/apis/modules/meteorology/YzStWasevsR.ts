import request from "@/apis/request";

// 查询堰闸水情极值列表
export function listYzStWasevsR(query:any) {
  return request({
    url: '/meteorology/YzStWasevsR/list',
    method: 'post',
    data: query
  })
}

// 查询堰闸水情极值详细
export function getYzStWasevsR(query:any) {
  return request({
    url: '/meteorology/YzStWasevsR/getInfo' ,
    method: 'post',
    data: query
  })
}

// 新增堰闸水情极值
export function addYzStWasevsR(data:any) {
  return request({
    url: '/meteorology/YzStWasevsR',
    method: 'post',
    data: data
  })
}

// 修改堰闸水情极值
export function updateYzStWasevsR(data:any) {
  return request({
    url: '/meteorology/YzStWasevsR',
    method: 'put',
    data: data
  })
}

// 删除堰闸水情极值
export function delYzStWasevsR(data:any) {
  return request({
    url: '/meteorology/YzStWasevsR/remove',
    method: 'post',
    data: data
  })
}
// 导出堰闸水情极值
export function exportYzStWasevsR(data: any) {
  return request({
    url: "/meteorology/YzStWasevsR/export",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导出导入模板堰闸水情极值
export function importTemplateYzStWasevsR(data: any) {
  return request({
    url: "/meteorology/YzStWasevsR/importTemplate",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导入堰闸水情极值
export function importYzStWasevsR(data: any) {
  return request({
    url: "/meteorology/YzStWasevsR/importData",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}
