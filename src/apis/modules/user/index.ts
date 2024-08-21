import request from "@/apis/request";

interface LoginData {
  username: string;
  password: string;
}
export function login(data: any): Promise<any> {
  return request({
    url: "/login",
    method: "post",
    data,
  });
}

// 查询菜单列表
export function listMenu(query: any) {
  return request({
    url: "/system/menu/treeselect",
    method: "get",
    params: query,
  });
}
