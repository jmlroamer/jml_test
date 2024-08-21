import request from "@/apis/request";

// 查询调度预报成果列表
export function listYzStReglatF(query:any) {
  return request({
    url: '/meteorology/YzStReglatF/list',
    method: 'post',
    data: query
  })
}

// 查询调度预报成果详细
export function getYzStReglatF(query:any) {
  return request({
    url: '/meteorology/YzStReglatF/getInfo' ,
    method: 'post',
    data: query
  })
}

// 新增调度预报成果
export function addYzStReglatF(data:any) {
  return request({
    url: '/meteorology/YzStReglatF',
    method: 'post',
    data: data
  })
}

// 修改调度预报成果
export function updateYzStReglatF(data:any) {
  return request({
    url: '/meteorology/YzStReglatF',
    method: 'put',
    data: data
  })
}

// 删除调度预报成果
export function delYzStReglatF(data:any) {
  return request({
    url: '/meteorology/YzStReglatF/remove',
    method: 'post',
    data: data
  })
}
// 导出调度预报成果
export function exportYzStReglatF(data: any) {
  return request({
    url: "/meteorology/YzStReglatF/export",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导出导入模板调度预报成果
export function importTemplateYzStReglatF(data: any) {
  return request({
    url: "/meteorology/YzStReglatF/importTemplate",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导入调度预报成果
export function importYzStReglatF(data: any) {
  return request({
    url: "/meteorology/YzStReglatF/importData",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}
