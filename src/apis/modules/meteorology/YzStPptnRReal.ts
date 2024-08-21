import request from "@/apis/request";

// 查询降水量实时列表
export function listYzStPptnRReal(query:any) {
  return request({
    url: '/meteorology/YzStPptnRReal/list',
    method: 'post',
    data: query
  })
}

// 查询降水量实时详细
export function getYzStPptnRReal(query:any) {
  return request({
    url: '/meteorology/YzStPptnRReal/getInfo' ,
    method: 'post',
    data: query
  })
}

// 新增降水量实时
export function addYzStPptnRReal(data:any) {
  return request({
    url: '/meteorology/YzStPptnRReal',
    method: 'post',
    data: data
  })
}

// 修改降水量实时
export function updateYzStPptnRReal(data:any) {
  return request({
    url: '/meteorology/YzStPptnRReal',
    method: 'put',
    data: data
  })
}

// 删除降水量实时
export function delYzStPptnRReal(data:any) {
  return request({
    url: '/meteorology/YzStPptnRReal/remove',
    method: 'post',
    data: data
  })
}
// 导出降水量实时
export function exportYzStPptnRReal(data: any) {
  return request({
    url: "/meteorology/YzStPptnRReal/export",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导出导入模板降水量实时
export function importTemplateYzStPptnRReal(data: any) {
  return request({
    url: "/meteorology/YzStPptnRReal/importTemplate",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导入降水量实时
export function importYzStPptnRReal(data: any) {
  return request({
    url: "/meteorology/YzStPptnRReal/importData",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}
