import request from "@/apis/request";

// 查询旬月降水量系列列表
export function listYzStPdmmysqS(query:any) {
  return request({
    url: '/meteorology/YzStPdmmysqS/list',
    method: 'post',
    data: query
  })
}

// 查询旬月降水量系列详细
export function getYzStPdmmysqS(query:any) {
  return request({
    url: '/meteorology/YzStPdmmysqS/getInfo' ,
    method: 'post',
    data: query
  })
}

// 新增旬月降水量系列
export function addYzStPdmmysqS(data:any) {
  return request({
    url: '/meteorology/YzStPdmmysqS',
    method: 'post',
    data: data
  })
}

// 修改旬月降水量系列
export function updateYzStPdmmysqS(data:any) {
  return request({
    url: '/meteorology/YzStPdmmysqS',
    method: 'put',
    data: data
  })
}

// 删除旬月降水量系列
export function delYzStPdmmysqS(data:any) {
  return request({
    url: '/meteorology/YzStPdmmysqS/remove',
    method: 'post',
    data: data
  })
}
// 导出旬月降水量系列
export function exportYzStPdmmysqS(data: any) {
  return request({
    url: "/meteorology/YzStPdmmysqS/export",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导出导入模板旬月降水量系列
export function importTemplateYzStPdmmysqS(data: any) {
  return request({
    url: "/meteorology/YzStPdmmysqS/importTemplate",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导入旬月降水量系列
export function importYzStPdmmysqS(data: any) {
  return request({
    url: "/meteorology/YzStPdmmysqS/importData",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}
