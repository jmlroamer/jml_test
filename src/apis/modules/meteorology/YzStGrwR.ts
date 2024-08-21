import request from "@/apis/request";

// 查询地下水情列表
export function listYzStGrwR(query:any) {
  return request({
    url: '/meteorology/YzStGrwR/list',
    method: 'post',
    data: query
  })
}

// 查询地下水情详细
export function getYzStGrwR(query:any) {
  return request({
    url: '/meteorology/YzStGrwR/getInfo' ,
    method: 'post',
    data: query
  })
}

// 新增地下水情
export function addYzStGrwR(data:any) {
  return request({
    url: '/meteorology/YzStGrwR',
    method: 'post',
    data: data
  })
}

// 修改地下水情
export function updateYzStGrwR(data:any) {
  return request({
    url: '/meteorology/YzStGrwR',
    method: 'put',
    data: data
  })
}

// 删除地下水情
export function delYzStGrwR(data:any) {
  return request({
    url: '/meteorology/YzStGrwR/remove',
    method: 'post',
    data: data
  })
}
// 导出地下水情
export function exportYzStGrwR(data: any) {
  return request({
    url: "/meteorology/YzStGrwR/export",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导出导入模板地下水情
export function importTemplateYzStGrwR(data: any) {
  return request({
    url: "/meteorology/YzStGrwR/importTemplate",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导入地下水情
export function importYzStGrwR(data: any) {
  return request({
    url: "/meteorology/YzStGrwR/importData",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}
