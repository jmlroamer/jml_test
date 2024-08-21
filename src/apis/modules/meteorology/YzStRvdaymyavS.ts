import request from "@/apis/request";

// 查询水位流量多年日平均统计列表
export function listYzStRvdaymyavS(query:any) {
  return request({
    url: '/meteorology/YzStRvdaymyavS/list',
    method: 'post',
    data: query
  })
}

// 查询水位流量多年日平均统计详细
export function getYzStRvdaymyavS(query:any) {
  return request({
    url: '/meteorology/YzStRvdaymyavS/getInfo' ,
    method: 'post',
    data: query
  })
}

// 新增水位流量多年日平均统计
export function addYzStRvdaymyavS(data:any) {
  return request({
    url: '/meteorology/YzStRvdaymyavS',
    method: 'post',
    data: data
  })
}

// 修改水位流量多年日平均统计
export function updateYzStRvdaymyavS(data:any) {
  return request({
    url: '/meteorology/YzStRvdaymyavS',
    method: 'put',
    data: data
  })
}

// 删除水位流量多年日平均统计
export function delYzStRvdaymyavS(data:any) {
  return request({
    url: '/meteorology/YzStRvdaymyavS/remove',
    method: 'post',
    data: data
  })
}
// 导出水位流量多年日平均统计
export function exportYzStRvdaymyavS(data: any) {
  return request({
    url: "/meteorology/YzStRvdaymyavS/export",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导出导入模板水位流量多年日平均统计
export function importTemplateYzStRvdaymyavS(data: any) {
  return request({
    url: "/meteorology/YzStRvdaymyavS/importTemplate",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导入水位流量多年日平均统计
export function importYzStRvdaymyavS(data: any) {
  return request({
    url: "/meteorology/YzStRvdaymyavS/importData",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}
