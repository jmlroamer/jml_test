import request from "@/apis/request";

// 查询闸门启闭情况列表
export function listYzStGateR(query:any) {
  return request({
    url: '/meteorology/YzStGateR/list',
    method: 'post',
    data: query
  })
}

// 查询闸门启闭情况详细
export function getYzStGateR(query:any) {
  return request({
    url: '/meteorology/YzStGateR/getInfo' ,
    method: 'post',
    data: query
  })
}

// 新增闸门启闭情况
export function addYzStGateR(data:any) {
  return request({
    url: '/meteorology/YzStGateR',
    method: 'post',
    data: data
  })
}

// 修改闸门启闭情况
export function updateYzStGateR(data:any) {
  return request({
    url: '/meteorology/YzStGateR',
    method: 'put',
    data: data
  })
}

// 删除闸门启闭情况
export function delYzStGateR(data:any) {
  return request({
    url: '/meteorology/YzStGateR/remove',
    method: 'post',
    data: data
  })
}
// 导出闸门启闭情况
export function exportYzStGateR(data: any) {
  return request({
    url: "/meteorology/YzStGateR/export",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导出导入模板闸门启闭情况
export function importTemplateYzStGateR(data: any) {
  return request({
    url: "/meteorology/YzStGateR/importTemplate",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导入闸门启闭情况
export function importYzStGateR(data: any) {
  return request({
    url: "/meteorology/YzStGateR/importData",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}
