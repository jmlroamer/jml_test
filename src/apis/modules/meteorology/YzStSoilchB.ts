import request from "@/apis/request";

// 查询土壤墒情特征值列表
export function listYzStSoilchB(query:any) {
  return request({
    url: '/meteorology/YzStSoilchB/list',
    method: 'post',
    data: query
  })
}

// 查询土壤墒情特征值详细
export function getYzStSoilchB(query:any) {
  return request({
    url: '/meteorology/YzStSoilchB/getInfo' ,
    method: 'post',
    data: query
  })
}

// 新增土壤墒情特征值
export function addYzStSoilchB(data:any) {
  return request({
    url: '/meteorology/YzStSoilchB',
    method: 'post',
    data: data
  })
}

// 修改土壤墒情特征值
export function updateYzStSoilchB(data:any) {
  return request({
    url: '/meteorology/YzStSoilchB',
    method: 'put',
    data: data
  })
}

// 删除土壤墒情特征值
export function delYzStSoilchB(data:any) {
  return request({
    url: '/meteorology/YzStSoilchB/remove',
    method: 'post',
    data: data
  })
}
// 导出土壤墒情特征值
export function exportYzStSoilchB(data: any) {
  return request({
    url: "/meteorology/YzStSoilchB/export",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导出导入模板土壤墒情特征值
export function importTemplateYzStSoilchB(data: any) {
  return request({
    url: "/meteorology/YzStSoilchB/importTemplate",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导入土壤墒情特征值
export function importYzStSoilchB(data: any) {
  return request({
    url: "/meteorology/YzStSoilchB/importData",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}
