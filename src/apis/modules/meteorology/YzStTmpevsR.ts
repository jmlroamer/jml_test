import request from "@/apis/request";

// 查询气温水温极值列表
export function listYzStTmpevsR(query:any) {
  return request({
    url: '/meteorology/YzStTmpevsR/list',
    method: 'post',
    data: query
  })
}

// 查询气温水温极值详细
export function getYzStTmpevsR(query:any) {
  return request({
    url: '/meteorology/YzStTmpevsR/getInfo' ,
    method: 'post',
    data: query
  })
}

// 新增气温水温极值
export function addYzStTmpevsR(data:any) {
  return request({
    url: '/meteorology/YzStTmpevsR',
    method: 'post',
    data: data
  })
}

// 修改气温水温极值
export function updateYzStTmpevsR(data:any) {
  return request({
    url: '/meteorology/YzStTmpevsR',
    method: 'put',
    data: data
  })
}

// 删除气温水温极值
export function delYzStTmpevsR(data:any) {
  return request({
    url: '/meteorology/YzStTmpevsR/remove',
    method: 'post',
    data: data
  })
}
// 导出气温水温极值
export function exportYzStTmpevsR(data: any) {
  return request({
    url: "/meteorology/YzStTmpevsR/export",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导出导入模板气温水温极值
export function importTemplateYzStTmpevsR(data: any) {
  return request({
    url: "/meteorology/YzStTmpevsR/importTemplate",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导入气温水温极值
export function importYzStTmpevsR(data: any) {
  return request({
    url: "/meteorology/YzStTmpevsR/importData",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}
