import request from "@/apis/request";

// 查询河道水情极值列表
export function listYzStRvevsR(query:any) {
  return request({
    url: '/meteorology/YzStRvevsR/list',
    method: 'post',
    data: query
  })
}

// 查询河道水情极值详细
export function getYzStRvevsR(query:any) {
  return request({
    url: '/meteorology/YzStRvevsR/getInfo' ,
    method: 'post',
    data: query
  })
}

// 新增河道水情极值
export function addYzStRvevsR(data:any) {
  return request({
    url: '/meteorology/YzStRvevsR',
    method: 'post',
    data: data
  })
}

// 修改河道水情极值
export function updateYzStRvevsR(data:any) {
  return request({
    url: '/meteorology/YzStRvevsR',
    method: 'put',
    data: data
  })
}

// 删除河道水情极值
export function delYzStRvevsR(data:any) {
  return request({
    url: '/meteorology/YzStRvevsR/remove',
    method: 'post',
    data: data
  })
}
// 导出河道水情极值
export function exportYzStRvevsR(data: any) {
  return request({
    url: "/meteorology/YzStRvevsR/export",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导出导入模板河道水情极值
export function importTemplateYzStRvevsR(data: any) {
  return request({
    url: "/meteorology/YzStRvevsR/importTemplate",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导入河道水情极值
export function importYzStRvevsR(data: any) {
  return request({
    url: "/meteorology/YzStRvevsR/importData",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}
