//@ts-ignore
import domtoimage from "dom-to-image";
import dayjs from "dayjs";
export function domtoimg(ref: any) {
  domtoimage
    .toPng(ref, { filter: filterPrintHide })
    .then((dataUrl: any) => {
      downloadFile(dataUrl);
    })
    .catch(function (error: any) {
      console.error("生成失败", error);
    });
}

export async function domtogetimg(ref: any) {
  const dataurl = await domtoimage.toPng(ref, { filter: filterPrintHide });
  return dataUrlToBlob(dataurl);
}
const filterPrintHide = (node: Node): boolean => {
  // 如果节点有类名为 printHide，则不包括在内
  return !(node instanceof Element && node.id === "printHide");
};
export function downloadFile(dataUrl: any) {
  const blob = dataUrlToBlob(dataUrl);
  const url = URL.createObjectURL(blob);
  createDownloadLink(url, "output.png");
}
export function downloadFileByBlob(blob: any, type: any = "png") {
  const url = URL.createObjectURL(blob);
  //获取当前时间
  const fileName = "PPT" + dayjs().format("YYYYMMDDHHmmss");
  createDownloadLink(url, fileName);
}

// 将DataURL转换为Blob
function dataUrlToBlob(dataUrl: any) {
  const parts = dataUrl.split(";base64,");
  const contentType = parts[0].split(":")[1];
  const raw = window.atob(parts[1]);
  const rawLength = raw.length;
  const uInt8Array = new Uint8Array(rawLength);

  for (let i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }

  return new Blob([uInt8Array], { type: contentType });
}
function createDownloadLink(url: any, fileName: any) {
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
