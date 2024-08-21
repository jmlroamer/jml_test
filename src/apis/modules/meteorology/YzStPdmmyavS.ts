import request from "@/apis/request";

// 查询旬月降水量系列列表
export function listYzStPdmmyavS(query:any) {
  return request({
    url: '/meteorology/YzStPdmmyavS/list',
    method: 'post',
    data: query
  })
}

// 查询旬月降水量系列详细
export function getYzStPdmmyavS(query:any) {
  return request({
    url: '/meteorology/YzStPdmmyavS/getInfo' ,
    method: 'post',
    data: query
  })
}

// 新增旬月降水量系列
export function addYzStPdmmyavS(data:any) {
  return request({
    url: '/meteorology/YzStPdmmyavS',
    method: 'post',
    data: data
  })
}

// 修改旬月降水量系列
export function updateYzStPdmmyavS(data:any) {
  return request({
    url: '/meteorology/YzStPdmmyavS',
    method: 'put',
    data: data
  })
}

// 删除旬月降水量系列
export function delYzStPdmmyavS(data:any) {
  return request({
    url: '/meteorology/YzStPdmmyavS/remove',
    method: 'post',
    data: data
  })
}
// 导出旬月降水量系列
export function exportYzStPdmmyavS(data: any) {
  return request({
    url: "/meteorology/YzStPdmmyavS/export",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导出导入模板旬月降水量系列
export function importTemplateYzStPdmmyavS(data: any) {
  return request({
    url: "/meteorology/YzStPdmmyavS/importTemplate",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导入旬月降水量系列
export function importYzStPdmmyavS(data: any) {
  return request({
    url: "/meteorology/YzStPdmmyavS/importData",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}
