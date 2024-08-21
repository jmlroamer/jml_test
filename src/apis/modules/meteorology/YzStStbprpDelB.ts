import request from "@/apis/request";

// 查询待确认站点删除列表
export function listYzStStbprpDelB(query:any) {
  return request({
    url: '/meteorology/YzStStbprpDelB/list',
    method: 'post',
    data: query
  })
}

// 查询待确认站点删除详细
export function getYzStStbprpDelB(query:any) {
  return request({
    url: '/meteorology/YzStStbprpDelB/getInfo' ,
    method: 'post',
    data: query
  })
}

// 新增待确认站点删除
export function addYzStStbprpDelB(data:any) {
  return request({
    url: '/meteorology/YzStStbprpDelB',
    method: 'post',
    data: data
  })
}

// 修改待确认站点删除
export function updateYzStStbprpDelB(data:any) {
  return request({
    url: '/meteorology/YzStStbprpDelB',
    method: 'put',
    data: data
  })
}

// 删除待确认站点删除
export function delYzStStbprpDelB(data:any) {
  return request({
    url: '/meteorology/YzStStbprpDelB/remove',
    method: 'post',
    data: data
  })
}
// 导出待确认站点删除
export function exportYzStStbprpDelB(data: any) {
  return request({
    url: "/meteorology/YzStStbprpDelB/export",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导出导入模板待确认站点删除
export function importTemplateYzStStbprpDelB(data: any) {
  return request({
    url: "/meteorology/YzStStbprpDelB/importTemplate",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导入待确认站点删除
export function importYzStStbprpDelB(data: any) {
  return request({
    url: "/meteorology/YzStStbprpDelB/importData",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}
