import request from "@/apis/request";

// 查询图像站实时列表
export function listYzStImgRReal(query:any) {
  return request({
    url: '/meteorology/YzStImgRReal/list',
    method: 'post',
    data: query
  })
}

// 查询图像站实时详细
export function getYzStImgRReal(query:any) {
  return request({
    url: '/meteorology/YzStImgRReal/getInfo' ,
    method: 'post',
    data: query
  })
}

// 新增图像站实时
export function addYzStImgRReal(data:any) {
  return request({
    url: '/meteorology/YzStImgRReal',
    method: 'post',
    data: data
  })
}

// 修改图像站实时
export function updateYzStImgRReal(data:any) {
  return request({
    url: '/meteorology/YzStImgRReal',
    method: 'put',
    data: data
  })
}

// 删除图像站实时
export function delYzStImgRReal(data:any) {
  return request({
    url: '/meteorology/YzStImgRReal/remove',
    method: 'post',
    data: data
  })
}
// 导出图像站实时
export function exportYzStImgRReal(data: any) {
  return request({
    url: "/meteorology/YzStImgRReal/export",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导出导入模板图像站实时
export function importTemplateYzStImgRReal(data: any) {
  return request({
    url: "/meteorology/YzStImgRReal/importTemplate",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导入图像站实时
export function importYzStImgRReal(data: any) {
  return request({
    url: "/meteorology/YzStImgRReal/importData",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}
