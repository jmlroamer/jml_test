import request from "@/apis/request";

// 查询水位流量多年旬月平均统计列表
export function listYzStRvdmmyavS(query:any) {
  return request({
    url: '/meteorology/YzStRvdmmyavS/list',
    method: 'post',
    data: query
  })
}

// 查询水位流量多年旬月平均统计详细
export function getYzStRvdmmyavS(query:any) {
  return request({
    url: '/meteorology/YzStRvdmmyavS/getInfo' ,
    method: 'post',
    data: query
  })
}

// 新增水位流量多年旬月平均统计
export function addYzStRvdmmyavS(data:any) {
  return request({
    url: '/meteorology/YzStRvdmmyavS',
    method: 'post',
    data: data
  })
}

// 修改水位流量多年旬月平均统计
export function updateYzStRvdmmyavS(data:any) {
  return request({
    url: '/meteorology/YzStRvdmmyavS',
    method: 'put',
    data: data
  })
}

// 删除水位流量多年旬月平均统计
export function delYzStRvdmmyavS(data:any) {
  return request({
    url: '/meteorology/YzStRvdmmyavS/remove',
    method: 'post',
    data: data
  })
}
// 导出水位流量多年旬月平均统计
export function exportYzStRvdmmyavS(data: any) {
  return request({
    url: "/meteorology/YzStRvdmmyavS/export",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导出导入模板水位流量多年旬月平均统计
export function importTemplateYzStRvdmmyavS(data: any) {
  return request({
    url: "/meteorology/YzStRvdmmyavS/importTemplate",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导入水位流量多年旬月平均统计
export function importYzStRvdmmyavS(data: any) {
  return request({
    url: "/meteorology/YzStRvdmmyavS/importData",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}
