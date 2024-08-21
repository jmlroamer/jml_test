import request from "@/apis/request";

// 查询水情预报成果列表
export function listYzStForecastF(query:any) {
  return request({
    url: '/meteorology/YzStForecastF/list',
    method: 'post',
    data: query
  })
}

// 查询水情预报成果详细
export function getYzStForecastF(query:any) {
  return request({
    url: '/meteorology/YzStForecastF/getInfo' ,
    method: 'post',
    data: query
  })
}

// 新增水情预报成果
export function addYzStForecastF(data:any) {
  return request({
    url: '/meteorology/YzStForecastF',
    method: 'post',
    data: data
  })
}

// 修改水情预报成果
export function updateYzStForecastF(data:any) {
  return request({
    url: '/meteorology/YzStForecastF',
    method: 'put',
    data: data
  })
}

// 删除水情预报成果
export function delYzStForecastF(data:any) {
  return request({
    url: '/meteorology/YzStForecastF/remove',
    method: 'post',
    data: data
  })
}
// 导出水情预报成果
export function exportYzStForecastF(data: any) {
  return request({
    url: "/meteorology/YzStForecastF/export",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导出导入模板水情预报成果
export function importTemplateYzStForecastF(data: any) {
  return request({
    url: "/meteorology/YzStForecastF/importTemplate",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导入水情预报成果
export function importYzStForecastF(data: any) {
  return request({
    url: "/meteorology/YzStForecastF/importData",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}
