import * as XLSX from "xlsx";
//导入
// 把文件按照二进制进行读取
function readFile(file: any) {
  return new Promise((resolve) => {
    let reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (ev) => {
      resolve(ev.target!.result);
    };
  });
}
// const upload = ref<UploadInstance>();
export const jmlimportExcel = async (ev: any) => {
  let file = ev.raw; //这里面就是数据
  //打印的file如图所示:https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/49f13a6210b44a6390ba0aca5e7a0f6a~tplv-k3u1fbpfcp-watermark.image?
  //   console.log("file", file);
  // 将file变成二进制读取到的
  let data = await readFile(file);
  // 将得到的二进制转化一下
  let workbook = XLSX.read(data, { type: "binary" });
  //打印的workbook如图所示:https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8587ef9092424bcfb02d75d5513333ef~tplv-k3u1fbpfcp-watermark.image?
  //   console.log("workbook", workbook); //这里就是可读取的文件了
  // 最后把数据转成json格式的
  let worksheet = workbook.Sheets[workbook.SheetNames[0]]; //这里是表格的名字,这里取第一个表格,1就是第二个表格数据
  //打印的worksheet如图所示:https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a3de2e1f5b6c490faadc76604193d0ab~tplv-k3u1fbpfcp-watermark.image?
  //   console.log("worksheet", worksheet);
  //将得到的worksheet转化为json格式
  data = XLSX.utils.sheet_to_json(worksheet);

  //打印的data如图所示:https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d90617a9e01b4aa99dd577a647b85407~tplv-k3u1fbpfcp-watermark.image?
  //   console.log("data", data);

  return data;
};

//导出
export const jmlexportExcel = (id: string) => {
  const wb = XLSX.utils.table_to_book(document.getElementById(id)); // 关联dom节点
  Object.keys(wb.Sheets.Sheet1).forEach(function (key) {
    if (
      wb.Sheets.Sheet1[key].v &&
      (wb.Sheets.Sheet1[key].v == "操作" ||
        wb.Sheets.Sheet1[key].v == "编辑删除" ||
        wb.Sheets.Sheet1[key].v == "编辑下载删除")
    ) {
      delete wb.Sheets.Sheet1[key];
    }
  });
  /* get binary string as output */
  const wbout = XLSX.write(wb, {
    bookType: "xlsx",
    bookSST: true,
    type: "array",
  });
  saveAsExcelFile(wbout, "table_data");
};
export function saveAsExcelFile(buffer: any, fileName: any) {
  const data = new Blob([buffer], { type: "application/octet-stream" });
  const url = window.URL.createObjectURL(data);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", fileName + ".xlsx");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
export function saveAsFile(buffer: any, fileName: any, fileType: any) {
  const data = new Blob([buffer], { type: "application/octet-stream" });
  const url = window.URL.createObjectURL(data);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", fileName + "." + fileType);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
export function formatBytes(bytes: any, decimals = 2) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}
