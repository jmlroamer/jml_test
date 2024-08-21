import request from "@/apis/request";

// 查询待确认站点删除列表
export function listYzStStbprpB(query:any) {
  return request({
    url: '/meteorology/YzStStbprpB/list',
    method: 'post',
    data: query
  })
}

// 查询待确认站点删除详细
export function getYzStStbprpB(query:any) {
  return request({
    url: '/meteorology/YzStStbprpB/getInfo' ,
    method: 'post',
    data: query
  })
}

// 新增待确认站点删除
export function addYzStStbprpB(data:any) {
  return request({
    url: '/meteorology/YzStStbprpB',
    method: 'post',
    data: data
  })
}

// 修改待确认站点删除
export function updateYzStStbprpB(data:any) {
  return request({
    url: '/meteorology/YzStStbprpB',
    method: 'put',
    data: data
  })
}

// 删除待确认站点删除
export function delYzStStbprpB(data:any) {
  return request({
    url: '/meteorology/YzStStbprpB/remove',
    method: 'post',
    data: data
  })
}
// 导出待确认站点删除
export function exportYzStStbprpB(data: any) {
  return request({
    url: "/meteorology/YzStStbprpB/export",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导出导入模板待确认站点删除
export function importTemplateYzStStbprpB(data: any) {
  return request({
    url: "/meteorology/YzStStbprpB/importTemplate",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导入待确认站点删除
export function importYzStStbprpB(data: any) {
  return request({
    url: "/meteorology/YzStStbprpB/importData",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}
