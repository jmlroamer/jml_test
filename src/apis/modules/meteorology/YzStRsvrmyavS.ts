import request from "@/apis/request";

// 查询(湖)蓄水量多年日均值统计列表
export function listYzStRsvrmyavS(query:any) {
  return request({
    url: '/meteorology/YzStRsvrmyavS/list',
    method: 'post',
    data: query
  })
}

// 查询(湖)蓄水量多年日均值统计详细
export function getYzStRsvrmyavS(query:any) {
  return request({
    url: '/meteorology/YzStRsvrmyavS/getInfo' ,
    method: 'post',
    data: query
  })
}

// 新增(湖)蓄水量多年日均值统计
export function addYzStRsvrmyavS(data:any) {
  return request({
    url: '/meteorology/YzStRsvrmyavS',
    method: 'post',
    data: data
  })
}

// 修改(湖)蓄水量多年日均值统计
export function updateYzStRsvrmyavS(data:any) {
  return request({
    url: '/meteorology/YzStRsvrmyavS',
    method: 'put',
    data: data
  })
}

// 删除(湖)蓄水量多年日均值统计
export function delYzStRsvrmyavS(data:any) {
  return request({
    url: '/meteorology/YzStRsvrmyavS/remove',
    method: 'post',
    data: data
  })
}
// 导出(湖)蓄水量多年日均值统计
export function exportYzStRsvrmyavS(data: any) {
  return request({
    url: "/meteorology/YzStRsvrmyavS/export",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导出导入模板(湖)蓄水量多年日均值统计
export function importTemplateYzStRsvrmyavS(data: any) {
  return request({
    url: "/meteorology/YzStRsvrmyavS/importTemplate",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导入(湖)蓄水量多年日均值统计
export function importYzStRsvrmyavS(data: any) {
  return request({
    url: "/meteorology/YzStRsvrmyavS/importData",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}
