import request from "@/apis/request";

// 查询引排水量统计列表
export function listYzStWdpstatR(query:any) {
  return request({
    url: '/meteorology/YzStWdpstatR/list',
    method: 'post',
    data: query
  })
}

// 查询引排水量统计详细
export function getYzStWdpstatR(query:any) {
  return request({
    url: '/meteorology/YzStWdpstatR/getInfo' ,
    method: 'post',
    data: query
  })
}

// 新增引排水量统计
export function addYzStWdpstatR(data:any) {
  return request({
    url: '/meteorology/YzStWdpstatR',
    method: 'post',
    data: data
  })
}

// 修改引排水量统计
export function updateYzStWdpstatR(data:any) {
  return request({
    url: '/meteorology/YzStWdpstatR',
    method: 'put',
    data: data
  })
}

// 删除引排水量统计
export function delYzStWdpstatR(data:any) {
  return request({
    url: '/meteorology/YzStWdpstatR/remove',
    method: 'post',
    data: data
  })
}
// 导出引排水量统计
export function exportYzStWdpstatR(data: any) {
  return request({
    url: "/meteorology/YzStWdpstatR/export",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导出导入模板引排水量统计
export function importTemplateYzStWdpstatR(data: any) {
  return request({
    url: "/meteorology/YzStWdpstatR/importTemplate",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导入引排水量统计
export function importYzStWdpstatR(data: any) {
  return request({
    url: "/meteorology/YzStWdpstatR/importData",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}
