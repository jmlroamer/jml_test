import request from "@/apis/request";

// 查询图像站数据列表
export function listYzStImgR(query:any) {
  return request({
    url: '/meteorology/YzStImgR/list',
    method: 'post',
    data: query
  })
}

// 查询图像站数据详细
export function getYzStImgR(query:any) {
  return request({
    url: '/meteorology/YzStImgR/getInfo' ,
    method: 'post',
    data: query
  })
}

// 新增图像站数据
export function addYzStImgR(data:any) {
  return request({
    url: '/meteorology/YzStImgR',
    method: 'post',
    data: data
  })
}

// 修改图像站数据
export function updateYzStImgR(data:any) {
  return request({
    url: '/meteorology/YzStImgR',
    method: 'put',
    data: data
  })
}

// 删除图像站数据
export function delYzStImgR(data:any) {
  return request({
    url: '/meteorology/YzStImgR/remove',
    method: 'post',
    data: data
  })
}
// 导出图像站数据
export function exportYzStImgR(data: any) {
  return request({
    url: "/meteorology/YzStImgR/export",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导出导入模板图像站数据
export function importTemplateYzStImgR(data: any) {
  return request({
    url: "/meteorology/YzStImgR/importTemplate",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导入图像站数据
export function importYzStImgR(data: any) {
  return request({
    url: "/meteorology/YzStImgR/importData",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}
