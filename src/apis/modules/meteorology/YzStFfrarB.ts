import request from "@/apis/request";

// 查询洪水频率分析成果列表
export function listYzStFfrarB(query:any) {
  return request({
    url: '/meteorology/YzStFfrarB/list',
    method: 'post',
    data: query
  })
}

// 查询洪水频率分析成果详细
export function getYzStFfrarB(query:any) {
  return request({
    url: '/meteorology/YzStFfrarB/getInfo' ,
    method: 'post',
    data: query
  })
}

// 新增洪水频率分析成果
export function addYzStFfrarB(data:any) {
  return request({
    url: '/meteorology/YzStFfrarB',
    method: 'post',
    data: data
  })
}

// 修改洪水频率分析成果
export function updateYzStFfrarB(data:any) {
  return request({
    url: '/meteorology/YzStFfrarB',
    method: 'put',
    data: data
  })
}

// 删除洪水频率分析成果
export function delYzStFfrarB(data:any) {
  return request({
    url: '/meteorology/YzStFfrarB/remove',
    method: 'post',
    data: data
  })
}
// 导出洪水频率分析成果
export function exportYzStFfrarB(data: any) {
  return request({
    url: "/meteorology/YzStFfrarB/export",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导出导入模板洪水频率分析成果
export function importTemplateYzStFfrarB(data: any) {
  return request({
    url: "/meteorology/YzStFfrarB/importTemplate",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导入洪水频率分析成果
export function importYzStFfrarB(data: any) {
  return request({
    url: "/meteorology/YzStFfrarB/importData",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}
