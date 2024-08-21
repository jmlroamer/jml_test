import request from "@/apis/request";

// 查询库（湖）站汛限水位列表
export function listYzStRsvrfsrB(query:any) {
  return request({
    url: '/meteorology/YzStRsvrfsrB/list',
    method: 'post',
    data: query
  })
}

// 查询库（湖）站汛限水位详细
export function getYzStRsvrfsrB(query:any) {
  return request({
    url: '/meteorology/YzStRsvrfsrB/getInfo' ,
    method: 'post',
    data: query
  })
}

// 新增库（湖）站汛限水位
export function addYzStRsvrfsrB(data:any) {
  return request({
    url: '/meteorology/YzStRsvrfsrB',
    method: 'post',
    data: data
  })
}

// 修改库（湖）站汛限水位
export function updateYzStRsvrfsrB(data:any) {
  return request({
    url: '/meteorology/YzStRsvrfsrB',
    method: 'put',
    data: data
  })
}

// 删除库（湖）站汛限水位
export function delYzStRsvrfsrB(data:any) {
  return request({
    url: '/meteorology/YzStRsvrfsrB/remove',
    method: 'post',
    data: data
  })
}
// 导出库（湖）站汛限水位
export function exportYzStRsvrfsrB(data: any) {
  return request({
    url: "/meteorology/YzStRsvrfsrB/export",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导出导入模板库（湖）站汛限水位
export function importTemplateYzStRsvrfsrB(data: any) {
  return request({
    url: "/meteorology/YzStRsvrfsrB/importTemplate",
    method: "post",
    data: data,
    responseType: "blob",
  });
}
// 导入库（湖）站汛限水位
export function importYzStRsvrfsrB(data: any) {
  return request({
    url: "/meteorology/YzStRsvrfsrB/importData",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}
