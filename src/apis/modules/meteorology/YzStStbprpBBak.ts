import request from "@/apis/request";

// 查询测站基本属性列表
export function listYzStStbprpBBak(query:any) {
  return request({
    url: '/meteorology/YzStStbprpBBak/list',
    method: 'post',
    data: query
  })
}

// 查询测站基本属性详细
export function getYzStStbprpBBak(query:any) {
  return request({
    url: '/meteorology/YzStStbprpBBak/getInfo' ,
    method: 'post',
    data: query
  })
}

// 新增测站基本属性
export function addYzStStbprpBBak(data:any) {
  return request({
    url: '/meteorology/YzStStbprpBBak',
    method: 'post',
    data: data
  })
}

// 修改测站基本属性
export function updateYzStStbprpBBak(data:any) {
  return request({
    url: '/meteorology/YzStStbprpBBak',
    method: 'put',
    data: data
  })
}

// 删除测站基本属性
export function delYzStStbprpBBak(data:any) {
  return request({
    url: '/meteorology/YzStStbprpBBak/remove',
    method: 'post',
    data: data
  })
}
// 导出测站基本属性
export function exportYzStStbprpBBak(data: any) {
  return request({
    url: "/meteorology/YzStStbprpBBak/export",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导出导入模板测站基本属性
export function importTemplateYzStStbprpBBak(data: any) {
  return request({
    url: "/meteorology/YzStStbprpBBak/importTemplate",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导入测站基本属性
export function importYzStStbprpBBak(data: any) {
  return request({
    url: "/meteorology/YzStStbprpBBak/importData",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}
