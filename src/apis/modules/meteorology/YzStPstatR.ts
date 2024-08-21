import request from "@/apis/request";

// 查询降水量统计列表
export function listYzStPstatR(query:any) {
  return request({
    url: '/meteorology/YzStPstatR/list',
    method: 'post',
    data: query
  })
}

// 查询降水量统计详细
export function getYzStPstatR(query:any) {
  return request({
    url: '/meteorology/YzStPstatR/getInfo' ,
    method: 'post',
    data: query
  })
}

// 新增降水量统计
export function addYzStPstatR(data:any) {
  return request({
    url: '/meteorology/YzStPstatR',
    method: 'post',
    data: data
  })
}

// 修改降水量统计
export function updateYzStPstatR(data:any) {
  return request({
    url: '/meteorology/YzStPstatR',
    method: 'put',
    data: data
  })
}

// 删除降水量统计
export function delYzStPstatR(data:any) {
  return request({
    url: '/meteorology/YzStPstatR/remove',
    method: 'post',
    data: data
  })
}
// 导出降水量统计
export function exportYzStPstatR(data: any) {
  return request({
    url: "/meteorology/YzStPstatR/export",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导出导入模板降水量统计
export function importTemplateYzStPstatR(data: any) {
  return request({
    url: "/meteorology/YzStPstatR/importTemplate",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导入降水量统计
export function importYzStPstatR(data: any) {
  return request({
    url: "/meteorology/YzStPstatR/importData",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}
