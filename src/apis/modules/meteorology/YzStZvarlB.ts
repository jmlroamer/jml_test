import request from "@/apis/request";

// 查询库(湖)容曲线列表
export function listYzStZvarlB(query:any) {
  return request({
    url: '/meteorology/YzStZvarlB/list',
    method: 'post',
    data: query
  })
}

// 查询库(湖)容曲线详细
export function getYzStZvarlB(query:any) {
  return request({
    url: '/meteorology/YzStZvarlB/getInfo' ,
    method: 'post',
    data: query
  })
}

// 新增库(湖)容曲线
export function addYzStZvarlB(data:any) {
  return request({
    url: '/meteorology/YzStZvarlB',
    method: 'post',
    data: data
  })
}

// 修改库(湖)容曲线
export function updateYzStZvarlB(data:any) {
  return request({
    url: '/meteorology/YzStZvarlB',
    method: 'put',
    data: data
  })
}

// 删除库(湖)容曲线
export function delYzStZvarlB(data:any) {
  return request({
    url: '/meteorology/YzStZvarlB/remove',
    method: 'post',
    data: data
  })
}
// 导出库(湖)容曲线
export function exportYzStZvarlB(data: any) {
  return request({
    url: "/meteorology/YzStZvarlB/export",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导出导入模板库(湖)容曲线
export function importTemplateYzStZvarlB(data: any) {
  return request({
    url: "/meteorology/YzStZvarlB/importTemplate",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导入库(湖)容曲线
export function importYzStZvarlB(data: any) {
  return request({
    url: "/meteorology/YzStZvarlB/importData",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}
