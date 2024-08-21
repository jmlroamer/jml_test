import request from "@/apis/request";

// 查询日降水量均值列表
export function listYzStPddmyavS(query:any) {
  return request({
    url: '/meteorology/YzStPddmyavS/list',
    method: 'post',
    data: query
  })
}

// 查询日降水量均值详细
export function getYzStPddmyavS(query:any) {
  return request({
    url: '/meteorology/YzStPddmyavS/getInfo' ,
    method: 'post',
    data: query
  })
}

// 新增日降水量均值
export function addYzStPddmyavS(data:any) {
  return request({
    url: '/meteorology/YzStPddmyavS',
    method: 'post',
    data: data
  })
}

// 修改日降水量均值
export function updateYzStPddmyavS(data:any) {
  return request({
    url: '/meteorology/YzStPddmyavS',
    method: 'put',
    data: data
  })
}

// 删除日降水量均值
export function delYzStPddmyavS(data:any) {
  return request({
    url: '/meteorology/YzStPddmyavS/remove',
    method: 'post',
    data: data
  })
}
// 导出日降水量均值
export function exportYzStPddmyavS(data: any) {
  return request({
    url: "/meteorology/YzStPddmyavS/export",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导出导入模板日降水量均值
export function importTemplateYzStPddmyavS(data: any) {
  return request({
    url: "/meteorology/YzStPddmyavS/importTemplate",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导入日降水量均值
export function importYzStPddmyavS(data: any) {
  return request({
    url: "/meteorology/YzStPddmyavS/importData",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}
