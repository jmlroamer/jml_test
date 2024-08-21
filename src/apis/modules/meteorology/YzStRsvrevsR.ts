import request from "@/apis/request";

// 查询水库水情极值列表
export function listYzStRsvrevsR(query:any) {
  return request({
    url: '/meteorology/YzStRsvrevsR/list',
    method: 'post',
    data: query
  })
}

// 查询水库水情极值详细
export function getYzStRsvrevsR(query:any) {
  return request({
    url: '/meteorology/YzStRsvrevsR/getInfo' ,
    method: 'post',
    data: query
  })
}

// 新增水库水情极值
export function addYzStRsvrevsR(data:any) {
  return request({
    url: '/meteorology/YzStRsvrevsR',
    method: 'post',
    data: data
  })
}

// 修改水库水情极值
export function updateYzStRsvrevsR(data:any) {
  return request({
    url: '/meteorology/YzStRsvrevsR',
    method: 'put',
    data: data
  })
}

// 删除水库水情极值
export function delYzStRsvrevsR(data:any) {
  return request({
    url: '/meteorology/YzStRsvrevsR/remove',
    method: 'post',
    data: data
  })
}
// 导出水库水情极值
export function exportYzStRsvrevsR(data: any) {
  return request({
    url: "/meteorology/YzStRsvrevsR/export",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导出导入模板水库水情极值
export function importTemplateYzStRsvrevsR(data: any) {
  return request({
    url: "/meteorology/YzStRsvrevsR/importTemplate",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导入水库水情极值
export function importYzStRsvrevsR(data: any) {
  return request({
    url: "/meteorology/YzStRsvrevsR/importData",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}
