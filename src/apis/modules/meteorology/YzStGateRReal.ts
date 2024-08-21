import request from "@/apis/request";

// 查询闸门状态日志列表
export function listYzStGateRReal(query:any) {
  return request({
    url: '/meteorology/YzStGateRReal/list',
    method: 'post',
    data: query
  })
}

// 查询闸门状态日志详细
export function getYzStGateRReal(query:any) {
  return request({
    url: '/meteorology/YzStGateRReal/getInfo' ,
    method: 'post',
    data: query
  })
}

// 新增闸门状态日志
export function addYzStGateRReal(data:any) {
  return request({
    url: '/meteorology/YzStGateRReal',
    method: 'post',
    data: data
  })
}

// 修改闸门状态日志
export function updateYzStGateRReal(data:any) {
  return request({
    url: '/meteorology/YzStGateRReal',
    method: 'put',
    data: data
  })
}

// 删除闸门状态日志
export function delYzStGateRReal(data:any) {
  return request({
    url: '/meteorology/YzStGateRReal/remove',
    method: 'post',
    data: data
  })
}
// 导出闸门状态日志
export function exportYzStGateRReal(data: any) {
  return request({
    url: "/meteorology/YzStGateRReal/export",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导出导入模板闸门状态日志
export function importTemplateYzStGateRReal(data: any) {
  return request({
    url: "/meteorology/YzStGateRReal/importTemplate",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导入闸门状态日志
export function importYzStGateRReal(data: any) {
  return request({
    url: "/meteorology/YzStGateRReal/importData",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}
