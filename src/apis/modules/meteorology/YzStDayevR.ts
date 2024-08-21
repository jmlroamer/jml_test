import request from "@/apis/request";

// 查询日蒸发量列表
export function listYzStDayevR(query:any) {
  return request({
    url: '/meteorology/YzStDayevR/list',
    method: 'post',
    data: query
  })
}

// 查询日蒸发量详细
export function getYzStDayevR(query:any) {
  return request({
    url: '/meteorology/YzStDayevR/getInfo' ,
    method: 'post',
    data: query
  })
}

// 新增日蒸发量
export function addYzStDayevR(data:any) {
  return request({
    url: '/meteorology/YzStDayevR',
    method: 'post',
    data: data
  })
}

// 修改日蒸发量
export function updateYzStDayevR(data:any) {
  return request({
    url: '/meteorology/YzStDayevR',
    method: 'put',
    data: data
  })
}

// 删除日蒸发量
export function delYzStDayevR(data:any) {
  return request({
    url: '/meteorology/YzStDayevR/remove',
    method: 'post',
    data: data
  })
}
// 导出日蒸发量
export function exportYzStDayevR(data: any) {
  return request({
    url: "/meteorology/YzStDayevR/export",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导出导入模板日蒸发量
export function importTemplateYzStDayevR(data: any) {
  return request({
    url: "/meteorology/YzStDayevR/importTemplate",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导入日蒸发量
export function importYzStDayevR(data: any) {
  return request({
    url: "/meteorology/YzStDayevR/importData",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}
