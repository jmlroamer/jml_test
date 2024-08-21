import request from "@/apis/request";

// 查询地下水开采量统计列表
export function listYzStWgrwstatR(query:any) {
  return request({
    url: '/meteorology/YzStWgrwstatR/list',
    method: 'post',
    data: query
  })
}

// 查询地下水开采量统计详细
export function getYzStWgrwstatR(query:any) {
  return request({
    url: '/meteorology/YzStWgrwstatR/getInfo' ,
    method: 'post',
    data: query
  })
}

// 新增地下水开采量统计
export function addYzStWgrwstatR(data:any) {
  return request({
    url: '/meteorology/YzStWgrwstatR',
    method: 'post',
    data: data
  })
}

// 修改地下水开采量统计
export function updateYzStWgrwstatR(data:any) {
  return request({
    url: '/meteorology/YzStWgrwstatR',
    method: 'put',
    data: data
  })
}

// 删除地下水开采量统计
export function delYzStWgrwstatR(data:any) {
  return request({
    url: '/meteorology/YzStWgrwstatR/remove',
    method: 'post',
    data: data
  })
}
// 导出地下水开采量统计
export function exportYzStWgrwstatR(data: any) {
  return request({
    url: "/meteorology/YzStWgrwstatR/export",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导出导入模板地下水开采量统计
export function importTemplateYzStWgrwstatR(data: any) {
  return request({
    url: "/meteorology/YzStWgrwstatR/importTemplate",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导入地下水开采量统计
export function importYzStWgrwstatR(data: any) {
  return request({
    url: "/meteorology/YzStWgrwstatR/importData",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}
