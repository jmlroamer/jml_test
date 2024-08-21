import request from "@/apis/request";

// 查询降水量列表
export function listYzStPptnR(query:any) {
  return request({
    url: '/meteorology/YzStPptnR/list',
    method: 'post',
    data: query
  })
}

// 查询降水量详细
export function getYzStPptnR(query:any) {
  return request({
    url: '/meteorology/YzStPptnR/getInfo' ,
    method: 'post',
    data: query
  })
}

// 新增降水量
export function addYzStPptnR(data:any) {
  return request({
    url: '/meteorology/YzStPptnR',
    method: 'post',
    data: data
  })
}

// 修改降水量
export function updateYzStPptnR(data:any) {
  return request({
    url: '/meteorology/YzStPptnR',
    method: 'put',
    data: data
  })
}

// 删除降水量
export function delYzStPptnR(data:any) {
  return request({
    url: '/meteorology/YzStPptnR/remove',
    method: 'post',
    data: data
  })
}
// 导出降水量
export function exportYzStPptnR(data: any) {
  return request({
    url: "/meteorology/YzStPptnR/export",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导出导入模板降水量
export function importTemplateYzStPptnR(data: any) {
  return request({
    url: "/meteorology/YzStPptnR/importTemplate",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导入降水量
export function importYzStPptnR(data: any) {
  return request({
    url: "/meteorology/YzStPptnR/importData",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}
