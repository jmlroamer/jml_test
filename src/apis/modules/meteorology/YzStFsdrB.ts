import request from "@/apis/request";

// 查询洪水传播时间列表
export function listYzStFsdrB(query:any) {
  return request({
    url: '/meteorology/YzStFsdrB/list',
    method: 'post',
    data: query
  })
}

// 查询洪水传播时间详细
export function getYzStFsdrB(query:any) {
  return request({
    url: '/meteorology/YzStFsdrB/getInfo' ,
    method: 'post',
    data: query
  })
}

// 新增洪水传播时间
export function addYzStFsdrB(data:any) {
  return request({
    url: '/meteorology/YzStFsdrB',
    method: 'post',
    data: data
  })
}

// 修改洪水传播时间
export function updateYzStFsdrB(data:any) {
  return request({
    url: '/meteorology/YzStFsdrB',
    method: 'put',
    data: data
  })
}

// 删除洪水传播时间
export function delYzStFsdrB(data:any) {
  return request({
    url: '/meteorology/YzStFsdrB/remove',
    method: 'post',
    data: data
  })
}
// 导出洪水传播时间
export function exportYzStFsdrB(data: any) {
  return request({
    url: "/meteorology/YzStFsdrB/export",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导出导入模板洪水传播时间
export function importTemplateYzStFsdrB(data: any) {
  return request({
    url: "/meteorology/YzStFsdrB/importTemplate",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导入洪水传播时间
export function importYzStFsdrB(data: any) {
  return request({
    url: "/meteorology/YzStFsdrB/importData",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}
