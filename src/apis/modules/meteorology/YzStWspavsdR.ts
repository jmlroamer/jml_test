import request from "@/apis/request";

// 查询堰闸（泵）站时段均值列表
export function listYzStWspavsdR(query:any) {
  return request({
    url: '/meteorology/YzStWspavsdR/list',
    method: 'post',
    data: query
  })
}

// 查询堰闸（泵）站时段均值详细
export function getYzStWspavsdR(query:any) {
  return request({
    url: '/meteorology/YzStWspavsdR/getInfo' ,
    method: 'post',
    data: query
  })
}

// 新增堰闸（泵）站时段均值
export function addYzStWspavsdR(data:any) {
  return request({
    url: '/meteorology/YzStWspavsdR',
    method: 'post',
    data: data
  })
}

// 修改堰闸（泵）站时段均值
export function updateYzStWspavsdR(data:any) {
  return request({
    url: '/meteorology/YzStWspavsdR',
    method: 'put',
    data: data
  })
}

// 删除堰闸（泵）站时段均值
export function delYzStWspavsdR(data:any) {
  return request({
    url: '/meteorology/YzStWspavsdR/remove',
    method: 'post',
    data: data
  })
}
// 导出堰闸（泵）站时段均值
export function exportYzStWspavsdR(data: any) {
  return request({
    url: "/meteorology/YzStWspavsdR/export",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导出导入模板堰闸（泵）站时段均值
export function importTemplateYzStWspavsdR(data: any) {
  return request({
    url: "/meteorology/YzStWspavsdR/importTemplate",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导入堰闸（泵）站时段均值
export function importYzStWspavsdR(data: any) {
  return request({
    url: "/meteorology/YzStWspavsdR/importData",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}
