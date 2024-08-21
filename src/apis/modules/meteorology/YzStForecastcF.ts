import request from "@/apis/request";

// 查询水情预报成果注释列表
export function listYzStForecastcF(query:any) {
  return request({
    url: '/meteorology/YzStForecastcF/list',
    method: 'post',
    data: query
  })
}

// 查询水情预报成果注释详细
export function getYzStForecastcF(query:any) {
  return request({
    url: '/meteorology/YzStForecastcF/getInfo' ,
    method: 'post',
    data: query
  })
}

// 新增水情预报成果注释
export function addYzStForecastcF(data:any) {
  return request({
    url: '/meteorology/YzStForecastcF',
    method: 'post',
    data: data
  })
}

// 修改水情预报成果注释
export function updateYzStForecastcF(data:any) {
  return request({
    url: '/meteorology/YzStForecastcF',
    method: 'put',
    data: data
  })
}

// 删除水情预报成果注释
export function delYzStForecastcF(data:any) {
  return request({
    url: '/meteorology/YzStForecastcF/remove',
    method: 'post',
    data: data
  })
}
// 导出水情预报成果注释
export function exportYzStForecastcF(data: any) {
  return request({
    url: "/meteorology/YzStForecastcF/export",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导出导入模板水情预报成果注释
export function importTemplateYzStForecastcF(data: any) {
  return request({
    url: "/meteorology/YzStForecastcF/importTemplate",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导入水情预报成果注释
export function importYzStForecastcF(data: any) {
  return request({
    url: "/meteorology/YzStForecastcF/importData",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}
