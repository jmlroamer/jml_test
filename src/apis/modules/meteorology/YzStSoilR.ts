import request from "@/apis/request";

// 查询土壤墒情列表
export function listYzStSoilR(query:any) {
  return request({
    url: '/meteorology/YzStSoilR/list',
    method: 'post',
    data: query
  })
}

// 查询土壤墒情详细
export function getYzStSoilR(query:any) {
  return request({
    url: '/meteorology/YzStSoilR/getInfo' ,
    method: 'post',
    data: query
  })
}

// 新增土壤墒情
export function addYzStSoilR(data:any) {
  return request({
    url: '/meteorology/YzStSoilR',
    method: 'post',
    data: data
  })
}

// 修改土壤墒情
export function updateYzStSoilR(data:any) {
  return request({
    url: '/meteorology/YzStSoilR',
    method: 'put',
    data: data
  })
}

// 删除土壤墒情
export function delYzStSoilR(data:any) {
  return request({
    url: '/meteorology/YzStSoilR/remove',
    method: 'post',
    data: data
  })
}
// 导出土壤墒情
export function exportYzStSoilR(data: any) {
  return request({
    url: "/meteorology/YzStSoilR/export",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导出导入模板土壤墒情
export function importTemplateYzStSoilR(data: any) {
  return request({
    url: "/meteorology/YzStSoilR/importTemplate",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导入土壤墒情
export function importYzStSoilR(data: any) {
  return request({
    url: "/meteorology/YzStSoilR/importData",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}
