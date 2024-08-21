import request from "@/apis/request";

// 查询节制闸开启高度、水位差、流量关系列表
export function listYzStKdzqB(query:any) {
  return request({
    url: '/meteorology/YzStKdzqB/list',
    method: 'post',
    data: query
  })
}

// 查询节制闸开启高度、水位差、流量关系详细
export function getYzStKdzqB(query:any) {
  return request({
    url: '/meteorology/YzStKdzqB/getInfo' ,
    method: 'post',
    data: query
  })
}

// 新增节制闸开启高度、水位差、流量关系
export function addYzStKdzqB(data:any) {
  return request({
    url: '/meteorology/YzStKdzqB',
    method: 'post',
    data: data
  })
}

// 修改节制闸开启高度、水位差、流量关系
export function updateYzStKdzqB(data:any) {
  return request({
    url: '/meteorology/YzStKdzqB',
    method: 'put',
    data: data
  })
}

// 删除节制闸开启高度、水位差、流量关系
export function delYzStKdzqB(data:any) {
  return request({
    url: '/meteorology/YzStKdzqB/remove',
    method: 'post',
    data: data
  })
}
// 导出节制闸开启高度、水位差、流量关系
export function exportYzStKdzqB(data: any) {
  return request({
    url: "/meteorology/YzStKdzqB/export",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导出导入模板节制闸开启高度、水位差、流量关系
export function importTemplateYzStKdzqB(data: any) {
  return request({
    url: "/meteorology/YzStKdzqB/importTemplate",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导入节制闸开启高度、水位差、流量关系
export function importYzStKdzqB(data: any) {
  return request({
    url: "/meteorology/YzStKdzqB/importData",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}
