import request from "@/apis/request";

// 查询测站报送任务列表
export function listYzStStsmtaskB(query:any) {
  return request({
    url: '/meteorology/YzStStsmtaskB/list',
    method: 'post',
    data: query
  })
}

// 查询测站报送任务详细
export function getYzStStsmtaskB(query:any) {
  return request({
    url: '/meteorology/YzStStsmtaskB/getInfo' ,
    method: 'post',
    data: query
  })
}

// 新增测站报送任务
export function addYzStStsmtaskB(data:any) {
  return request({
    url: '/meteorology/YzStStsmtaskB',
    method: 'post',
    data: data
  })
}

// 修改测站报送任务
export function updateYzStStsmtaskB(data:any) {
  return request({
    url: '/meteorology/YzStStsmtaskB',
    method: 'put',
    data: data
  })
}

// 删除测站报送任务
export function delYzStStsmtaskB(data:any) {
  return request({
    url: '/meteorology/YzStStsmtaskB/remove',
    method: 'post',
    data: data
  })
}
// 导出测站报送任务
export function exportYzStStsmtaskB(data: any) {
  return request({
    url: "/meteorology/YzStStsmtaskB/export",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导出导入模板测站报送任务
export function importTemplateYzStStsmtaskB(data: any) {
  return request({
    url: "/meteorology/YzStStsmtaskB/importTemplate",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导入测站报送任务
export function importYzStStsmtaskB(data: any) {
  return request({
    url: "/meteorology/YzStStsmtaskB/importData",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}
