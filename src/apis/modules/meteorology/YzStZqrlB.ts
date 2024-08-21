import request from "@/apis/request";

// 查询水位流量关系曲线列表
export function listYzStZqrlB(query:any) {
  return request({
    url: '/meteorology/YzStZqrlB/list',
    method: 'post',
    data: query
  })
}

// 查询水位流量关系曲线详细
export function getYzStZqrlB(query:any) {
  return request({
    url: '/meteorology/YzStZqrlB/getInfo' ,
    method: 'post',
    data: query
  })
}

// 新增水位流量关系曲线
export function addYzStZqrlB(data:any) {
  return request({
    url: '/meteorology/YzStZqrlB',
    method: 'post',
    data: data
  })
}

// 修改水位流量关系曲线
export function updateYzStZqrlB(data:any) {
  return request({
    url: '/meteorology/YzStZqrlB',
    method: 'put',
    data: data
  })
}

// 删除水位流量关系曲线
export function delYzStZqrlB(data:any) {
  return request({
    url: '/meteorology/YzStZqrlB/remove',
    method: 'post',
    data: data
  })
}
// 导出水位流量关系曲线
export function exportYzStZqrlB(data: any) {
  return request({
    url: "/meteorology/YzStZqrlB/export",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导出导入模板水位流量关系曲线
export function importTemplateYzStZqrlB(data: any) {
  return request({
    url: "/meteorology/YzStZqrlB/importTemplate",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导入水位流量关系曲线
export function importYzStZqrlB(data: any) {
  return request({
    url: "/meteorology/YzStZqrlB/importData",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}
