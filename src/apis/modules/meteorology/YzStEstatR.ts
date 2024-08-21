import request from "@/apis/request";

// 查询蒸发量统计列表
export function listYzStEstatR(query:any) {
  return request({
    url: '/meteorology/YzStEstatR/list',
    method: 'post',
    data: query
  })
}

// 查询蒸发量统计详细
export function getYzStEstatR(query:any) {
  return request({
    url: '/meteorology/YzStEstatR/getInfo' ,
    method: 'post',
    data: query
  })
}

// 新增蒸发量统计
export function addYzStEstatR(data:any) {
  return request({
    url: '/meteorology/YzStEstatR',
    method: 'post',
    data: data
  })
}

// 修改蒸发量统计
export function updateYzStEstatR(data:any) {
  return request({
    url: '/meteorology/YzStEstatR',
    method: 'put',
    data: data
  })
}

// 删除蒸发量统计
export function delYzStEstatR(data:any) {
  return request({
    url: '/meteorology/YzStEstatR/remove',
    method: 'post',
    data: data
  })
}
// 导出蒸发量统计
export function exportYzStEstatR(data: any) {
  return request({
    url: "/meteorology/YzStEstatR/export",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导出导入模板蒸发量统计
export function importTemplateYzStEstatR(data: any) {
  return request({
    url: "/meteorology/YzStEstatR/importTemplate",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导入蒸发量统计
export function importYzStEstatR(data: any) {
  return request({
    url: "/meteorology/YzStEstatR/importData",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}
