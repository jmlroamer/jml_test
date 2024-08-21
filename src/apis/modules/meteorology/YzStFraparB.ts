import request from "@/apis/request";

// 查询洪水频率分析参数列表
export function listYzStFraparB(query:any) {
  return request({
    url: '/meteorology/YzStFraparB/list',
    method: 'post',
    data: query
  })
}

// 查询洪水频率分析参数详细
export function getYzStFraparB(query:any) {
  return request({
    url: '/meteorology/YzStFraparB/getInfo' ,
    method: 'post',
    data: query
  })
}

// 新增洪水频率分析参数
export function addYzStFraparB(data:any) {
  return request({
    url: '/meteorology/YzStFraparB',
    method: 'post',
    data: data
  })
}

// 修改洪水频率分析参数
export function updateYzStFraparB(data:any) {
  return request({
    url: '/meteorology/YzStFraparB',
    method: 'put',
    data: data
  })
}

// 删除洪水频率分析参数
export function delYzStFraparB(data:any) {
  return request({
    url: '/meteorology/YzStFraparB/remove',
    method: 'post',
    data: data
  })
}
// 导出洪水频率分析参数
export function exportYzStFraparB(data: any) {
  return request({
    url: "/meteorology/YzStFraparB/export",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导出导入模板洪水频率分析参数
export function importTemplateYzStFraparB(data: any) {
  return request({
    url: "/meteorology/YzStFraparB/importTemplate",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导入洪水频率分析参数
export function importYzStFraparB(data: any) {
  return request({
    url: "/meteorology/YzStFraparB/importData",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}
