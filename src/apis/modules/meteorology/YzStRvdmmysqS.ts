import request from "@/apis/request";

// 查询水位流量旬月均值系列列表
export function listYzStRvdmmysqS(query:any) {
  return request({
    url: '/meteorology/YzStRvdmmysqS/list',
    method: 'post',
    data: query
  })
}

// 查询水位流量旬月均值系列详细
export function getYzStRvdmmysqS(query:any) {
  return request({
    url: '/meteorology/YzStRvdmmysqS/getInfo' ,
    method: 'post',
    data: query
  })
}

// 新增水位流量旬月均值系列
export function addYzStRvdmmysqS(data:any) {
  return request({
    url: '/meteorology/YzStRvdmmysqS',
    method: 'post',
    data: data
  })
}

// 修改水位流量旬月均值系列
export function updateYzStRvdmmysqS(data:any) {
  return request({
    url: '/meteorology/YzStRvdmmysqS',
    method: 'put',
    data: data
  })
}

// 删除水位流量旬月均值系列
export function delYzStRvdmmysqS(data:any) {
  return request({
    url: '/meteorology/YzStRvdmmysqS/remove',
    method: 'post',
    data: data
  })
}
// 导出水位流量旬月均值系列
export function exportYzStRvdmmysqS(data: any) {
  return request({
    url: "/meteorology/YzStRvdmmysqS/export",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导出导入模板水位流量旬月均值系列
export function importTemplateYzStRvdmmysqS(data: any) {
  return request({
    url: "/meteorology/YzStRvdmmysqS/importTemplate",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导入水位流量旬月均值系列
export function importYzStRvdmmysqS(data: any) {
  return request({
    url: "/meteorology/YzStRvdmmysqS/importData",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}
