export const getOption = (data: any) => {
  return {
    backgroundColor: "transparent",
    axisPointer: {
      link: [
        {
          xAxisIndex: "all",
        },
      ],
    },

    xAxis: [
      {
        data: data.xAxisData,
        gridIndex: 0,
        show: false,
      },
      {
        data: data.xAxisData,
        gridIndex: 1,
        show: false,
      },
      {
        data: data.xAxisData,
        gridIndex: 2,
      },
    ],
    legend: {
      top: 0,
      data: ["水位", "瞬时流量", "平滑流量", "平均流速"],
    },
    yAxis: [
      {
        gridIndex: 0,
        name: "水位(m)",
        scale: true,
        nameGap: 6,
      },
      {
        name: "平均流速(m/s)",
        gridIndex: 1,
        nameGap: 6,
      },
      {
        gridIndex: 2,
        name: "流量(m³/s)",
        nameGap: 6,
      },
    ],
    grid: [
      {
        top: "7%",
        left: "5%",
        right: "5%",
        bottom: "73%",
      },
      {
        top: "35%",
        bottom: "43%",
        left: "5%",
        right: "5%",
      },
      {
        top: "64%",
        left: "5%",
        right: "5%",
        bottom: "7%",
      },
    ],
    visualMap: {
      seriesIndex: 2,
      show: false,
      dimension: 0,
      pieces: [],
    },
    series: [
      {
        type: "line",
        name: "水位",
        data: data.yAxisDataZ,
        barMinWidth: 15,
        xAxisIndex: 0,
        yAxisIndex: 0,
        itemStyle: {
          color: "#59b7f3",
        },
      },
      {
        type: "line",
        name: "瞬时流量",
        data: data.yAxisDataS,
        xAxisIndex: 2,
        yAxisIndex: 2,
        // showSymbol: false,
        // connectNulls: true,
        itemStyle: {
          color: "#88E7FC",
        },
      },
      {
        type: "line",
        name: "平滑流量",
        data: data.yAxisDataP,
        xAxisIndex: 2,
        yAxisIndex: 2,
        // showSymbol: false,
        // connectNulls: true,
        itemStyle: {
          color: "#BF444C",
        },
      },
      {
        type: "line",
        showSymbol: false,
        xAxisIndex: 1,
        yAxisIndex: 1,
        name: "平均流速",
        connectNulls: true,
        data: data.yAxisDataPJ,
        itemStyle: {
          color: "#7477fa",
        },
      },
    ],
    // tooltip: {
    //   trigger: 'axis',
    //   textStyle: {
    //     align: 'left'
    //   }
    // },
    tooltip: {
      trigger: "axis",
      formatter: function (params: string | any[]) {
        if (params) {
          let htmlStr = "";
          htmlStr += params[0].name + "<br/>";
          for (let i = 0; i < params.length; i++) {
            let param = params[i];
            let seriesName = param.seriesName;
            let value = param.value ? param.value : "";
            let color = param.color;
            if (value) {
              htmlStr += '<div style="text-align: left">';
              htmlStr +=
                '<span style="margin-right:5px;display:inline-block;width:10px;height:10px;border-radius:5px;background-color:' +
                color +
                ';"></span>';
              htmlStr +=
                '<span style="display:inline-block;width:70px;text-align:left">' +
                seriesName +
                "</span>" +
                '<span style="display:inline-block;width:100px;text-align: right;font-weight: bold;">' +
                value;
              switch (seriesName) {
                case "水位":
                  htmlStr += " " + "m" + "</span>";
                  break;
                case "瞬时流量":
                  htmlStr += " " + "m³/s" + "</span>";
                  break;
                case "平均流速":
                  htmlStr += " " + "m/s" + "</span>";
                  break;
                case "平滑流量":
                  htmlStr += " " + "m³/s" + "</span>";
                  break;
              }
              htmlStr += "</div>";
            }
          }
          return htmlStr;
        } else return;
      },
    },
  };
};
