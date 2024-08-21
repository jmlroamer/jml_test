import request from "@/apis/request";

// 查询水位流量旬月极值系列列表
export function listYzStRvdmevsqS(query:any) {
  return request({
    url: '/meteorology/YzStRvdmevsqS/list',
    method: 'post',
    data: query
  })
}

// 查询水位流量旬月极值系列详细
export function getYzStRvdmevsqS(query:any) {
  return request({
    url: '/meteorology/YzStRvdmevsqS/getInfo' ,
    method: 'post',
    data: query
  })
}

// 新增水位流量旬月极值系列
export function addYzStRvdmevsqS(data:any) {
  return request({
    url: '/meteorology/YzStRvdmevsqS',
    method: 'post',
    data: data
  })
}

// 修改水位流量旬月极值系列
export function updateYzStRvdmevsqS(data:any) {
  return request({
    url: '/meteorology/YzStRvdmevsqS',
    method: 'put',
    data: data
  })
}

// 删除水位流量旬月极值系列
export function delYzStRvdmevsqS(data:any) {
  return request({
    url: '/meteorology/YzStRvdmevsqS/remove',
    method: 'post',
    data: data
  })
}
// 导出水位流量旬月极值系列
export function exportYzStRvdmevsqS(data: any) {
  return request({
    url: "/meteorology/YzStRvdmevsqS/export",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导出导入模板水位流量旬月极值系列
export function importTemplateYzStRvdmevsqS(data: any) {
  return request({
    url: "/meteorology/YzStRvdmevsqS/importTemplate",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导入水位流量旬月极值系列
export function importYzStRvdmevsqS(data: any) {
  return request({
    url: "/meteorology/YzStRvdmevsqS/importData",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}
