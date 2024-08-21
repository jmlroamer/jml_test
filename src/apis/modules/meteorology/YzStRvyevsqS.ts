import request from "@/apis/request";

// 查询水位流量年极值系列列表
export function listYzStRvyevsqS(query:any) {
  return request({
    url: '/meteorology/YzStRvyevsqS/list',
    method: 'post',
    data: query
  })
}

// 查询水位流量年极值系列详细
export function getYzStRvyevsqS(query:any) {
  return request({
    url: '/meteorology/YzStRvyevsqS/getInfo' ,
    method: 'post',
    data: query
  })
}

// 新增水位流量年极值系列
export function addYzStRvyevsqS(data:any) {
  return request({
    url: '/meteorology/YzStRvyevsqS',
    method: 'post',
    data: data
  })
}

// 修改水位流量年极值系列
export function updateYzStRvyevsqS(data:any) {
  return request({
    url: '/meteorology/YzStRvyevsqS',
    method: 'put',
    data: data
  })
}

// 删除水位流量年极值系列
export function delYzStRvyevsqS(data:any) {
  return request({
    url: '/meteorology/YzStRvyevsqS/remove',
    method: 'post',
    data: data
  })
}
// 导出水位流量年极值系列
export function exportYzStRvyevsqS(data: any) {
  return request({
    url: "/meteorology/YzStRvyevsqS/export",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导出导入模板水位流量年极值系列
export function importTemplateYzStRvyevsqS(data: any) {
  return request({
    url: "/meteorology/YzStRvyevsqS/importTemplate",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导入水位流量年极值系列
export function importYzStRvyevsqS(data: any) {
  return request({
    url: "/meteorology/YzStRvyevsqS/importData",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}
