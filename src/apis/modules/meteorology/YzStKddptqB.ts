import request from "@/apis/request";

// 查询泄洪闸开启高度、水位差、流量关系列表
export function listYzStKddptqB(query:any) {
  return request({
    url: '/meteorology/YzStKddptqB/list',
    method: 'post',
    data: query
  })
}

// 查询泄洪闸开启高度、水位差、流量关系详细
export function getYzStKddptqB(query:any) {
  return request({
    url: '/meteorology/YzStKddptqB/getInfo' ,
    method: 'post',
    data: query
  })
}

// 新增泄洪闸开启高度、水位差、流量关系
export function addYzStKddptqB(data:any) {
  return request({
    url: '/meteorology/YzStKddptqB',
    method: 'post',
    data: data
  })
}

// 修改泄洪闸开启高度、水位差、流量关系
export function updateYzStKddptqB(data:any) {
  return request({
    url: '/meteorology/YzStKddptqB',
    method: 'put',
    data: data
  })
}

// 删除泄洪闸开启高度、水位差、流量关系
export function delYzStKddptqB(data:any) {
  return request({
    url: '/meteorology/YzStKddptqB/remove',
    method: 'post',
    data: data
  })
}
// 导出泄洪闸开启高度、水位差、流量关系
export function exportYzStKddptqB(data: any) {
  return request({
    url: "/meteorology/YzStKddptqB/export",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导出导入模板泄洪闸开启高度、水位差、流量关系
export function importTemplateYzStKddptqB(data: any) {
  return request({
    url: "/meteorology/YzStKddptqB/importTemplate",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导入泄洪闸开启高度、水位差、流量关系
export function importYzStKddptqB(data: any) {
  return request({
    url: "/meteorology/YzStKddptqB/importData",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}
