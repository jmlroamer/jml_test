import request from "@/apis/request";

// 查询水情预报成果列表
export function listYzStForecayzStF(query:any) {
  return request({
    url: '/meteorology/YzStForecayzStF/list',
    method: 'post',
    data: query
  })
}

// 查询水情预报成果详细
export function getYzStForecayzStF(query:any) {
  return request({
    url: '/meteorology/YzStForecayzStF/getInfo' ,
    method: 'post',
    data: query
  })
}

// 新增水情预报成果
export function addYzStForecayzStF(data:any) {
  return request({
    url: '/meteorology/YzStForecayzStF',
    method: 'post',
    data: data
  })
}

// 修改水情预报成果
export function updateYzStForecayzStF(data:any) {
  return request({
    url: '/meteorology/YzStForecayzStF',
    method: 'put',
    data: data
  })
}

// 删除水情预报成果
export function delYzStForecayzStF(data:any) {
  return request({
    url: '/meteorology/YzStForecayzStF/remove',
    method: 'post',
    data: data
  })
}
// 导出水情预报成果
export function exportYzStForecayzStF(data: any) {
  return request({
    url: "/meteorology/YzStForecayzStF/export",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导出导入模板水情预报成果
export function importTemplateYzStForecayzStF(data: any) {
  return request({
    url: "/meteorology/YzStForecayzStF/importTemplate",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导入水情预报成果
export function importYzStForecayzStF(data: any) {
  return request({
    url: "/meteorology/YzStForecayzStF/importData",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}
