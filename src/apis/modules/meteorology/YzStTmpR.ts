import request from "@/apis/request";

// 查询气温水温列表
export function listYzStTmpR(query:any) {
  return request({
    url: '/meteorology/YzStTmpR/list',
    method: 'post',
    data: query
  })
}

// 查询气温水温详细
export function getYzStTmpR(query:any) {
  return request({
    url: '/meteorology/YzStTmpR/getInfo' ,
    method: 'post',
    data: query
  })
}

// 新增气温水温
export function addYzStTmpR(data:any) {
  return request({
    url: '/meteorology/YzStTmpR',
    method: 'post',
    data: data
  })
}

// 修改气温水温
export function updateYzStTmpR(data:any) {
  return request({
    url: '/meteorology/YzStTmpR',
    method: 'put',
    data: data
  })
}

// 删除气温水温
export function delYzStTmpR(data:any) {
  return request({
    url: '/meteorology/YzStTmpR/remove',
    method: 'post',
    data: data
  })
}
// 导出气温水温
export function exportYzStTmpR(data: any) {
  return request({
    url: "/meteorology/YzStTmpR/export",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导出导入模板气温水温
export function importTemplateYzStTmpR(data: any) {
  return request({
    url: "/meteorology/YzStTmpR/importTemplate",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导入气温水温
export function importYzStTmpR(data: any) {
  return request({
    url: "/meteorology/YzStTmpR/importData",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}
