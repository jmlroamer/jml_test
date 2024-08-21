export interface H5player {
  player: any;
  url: string;
}
export class h5player {
  private player: any;
  private url: string;
  constructor(id: string, url: string) {
    this.url = url;
    // @ts-ignore
    this.player = new JSPlugin({
      szId: id, //需要英文字母开头，唯一性，必填
      // szBasePath: "../h5player", // 必填,与h5player.min.js的引用目录一致
      szBasePath: "./h5player", // 必填,与h5player.min.js的引用目录一致
      bSupporDoubleClickFull: true, //是否支持双击全屏，默认true
      // 当容器div#play_window有固定宽高时，可不传iWidth和iHeight，窗口大小将自适应容器宽高
      openDebug: true,
      iWidth: 1560,
      iHeight: 728,
      // 分屏播放，默认最大分屏4*4
      // iMaxSplit: 4,
      // iCurrentSplit: 1,
    });
  }
  protected play() {
    this.player
      .JS_Play(
        this.url,
        {
          playURL: this.url, // 流媒体播放时必传
          mode: 1, // 解码类型：0=普通模式; 1=高级模式 默认为0
          // ...
        },
        0
        // "2023-05-16T00:00:00Z",
        // "2023-06-16T00:00:00Z"
      )
      .then(
        () => {
          console.info("JS_Play success");
          // do you want...
        },
        (err: any) => {
          console.info("JS_Play failed:", err);
          this.player.JS_Stop().then(
            () => {
              console.log("stop realplay success");
            },
            (e: any) => {
              console.error(e);
            }
          );
          // do you want...
        }
      );
  }
}
