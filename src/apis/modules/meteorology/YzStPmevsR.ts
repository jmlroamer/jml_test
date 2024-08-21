import request from "@/apis/request";

// 查询泵站水情极值列表
export function listYzStPmevsR(query:any) {
  return request({
    url: '/meteorology/YzStPmevsR/list',
    method: 'post',
    data: query
  })
}

// 查询泵站水情极值详细
export function getYzStPmevsR(query:any) {
  return request({
    url: '/meteorology/YzStPmevsR/getInfo' ,
    method: 'post',
    data: query
  })
}

// 新增泵站水情极值
export function addYzStPmevsR(data:any) {
  return request({
    url: '/meteorology/YzStPmevsR',
    method: 'post',
    data: data
  })
}

// 修改泵站水情极值
export function updateYzStPmevsR(data:any) {
  return request({
    url: '/meteorology/YzStPmevsR',
    method: 'put',
    data: data
  })
}

// 删除泵站水情极值
export function delYzStPmevsR(data:any) {
  return request({
    url: '/meteorology/YzStPmevsR/remove',
    method: 'post',
    data: data
  })
}
// 导出泵站水情极值
export function exportYzStPmevsR(data: any) {
  return request({
    url: "/meteorology/YzStPmevsR/export",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导出导入模板泵站水情极值
export function importTemplateYzStPmevsR(data: any) {
  return request({
    url: "/meteorology/YzStPmevsR/importTemplate",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导入泵站水情极值
export function importYzStPmevsR(data: any) {
  return request({
    url: "/meteorology/YzStPmevsR/importData",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}
