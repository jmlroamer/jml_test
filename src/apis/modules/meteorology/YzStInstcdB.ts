import request from "@/apis/request";

// 查询单位名称编码列表
export function listYzStInstcdB(query:any) {
  return request({
    url: '/meteorology/YzStInstcdB/list',
    method: 'post',
    data: query
  })
}

// 查询单位名称编码详细
export function getYzStInstcdB(query:any) {
  return request({
    url: '/meteorology/YzStInstcdB/getInfo' ,
    method: 'post',
    data: query
  })
}

// 新增单位名称编码
export function addYzStInstcdB(data:any) {
  return request({
    url: '/meteorology/YzStInstcdB',
    method: 'post',
    data: data
  })
}

// 修改单位名称编码
export function updateYzStInstcdB(data:any) {
  return request({
    url: '/meteorology/YzStInstcdB',
    method: 'put',
    data: data
  })
}

// 删除单位名称编码
export function delYzStInstcdB(data:any) {
  return request({
    url: '/meteorology/YzStInstcdB/remove',
    method: 'post',
    data: data
  })
}
// 导出单位名称编码
export function exportYzStInstcdB(data: any) {
  return request({
    url: "/meteorology/YzStInstcdB/export",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导出导入模板单位名称编码
export function importTemplateYzStInstcdB(data: any) {
  return request({
    url: "/meteorology/YzStInstcdB/importTemplate",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导入单位名称编码
export function importYzStInstcdB(data: any) {
  return request({
    url: "/meteorology/YzStInstcdB/importData",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}
