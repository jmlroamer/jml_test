//物流
export const leftmenu = [
  {
    id: "8000000",
    label: "综合",
    path: "comprehensive",
    component: "views/comprehensive/DataScreen",
    icon: "DataLine",
    meta: {
      keepAlive: true,
    },
    children: [
      {
        id: "8000001",
        label: "地图",
        path: "comprehensivemap",
        component: "views/comprehensive/map",
        icon: "",
        meta: {
          keepAlive: true,
        },
      },
      {
        id: "8000002",
        label: "图表",
        path: "echarts",
        component: "views/comprehensive/echarts",
        icon: "",
        meta: {
          keepAlive: true,
        },
      },
      {
        id: "8000003",
        label: "表格",
        path: "vextable",
        component: "views/comprehensive/vextable",
        icon: "",
        meta: {
          keepAlive: true,
        },
      },
    ],
  },
  {
    id: "9000000",
    label: "测试",
    path: "testlist",
    component: "views/statistical/DataScreen",
    icon: "DataLine",
    meta: {
      keepAlive: true,
    },
    children: [
      {
        id: "9000001",
        label: "年报文件下载",
        path: "test01",
        component: "views/test/testYear_book",
        icon: "",
        meta: {
          keepAlive: true,
        },
      },
      {
        id: "9000002",
        label: "自定义指令",
        path: "test02",
        component: "views/test/test_tools",
        icon: "",
        meta: {
          keepAlive: true,
        },
      },
      {
        id: "9000003",
        label: "去阅读",
        path: "test03",
        component: "views/test/toread",
        icon: "",
        meta: {
          keepAlive: true,
        },
      },
      {
        id: "9000004",
        label: "类",
        path: "test04",
        component: "views/test/testclass",
        icon: "",
        meta: {
          keepAlive: true,
        },
      },
      {
        id: "9000004",
        label: "测试vueuse",
        path: "test05",
        component: "views/test/testanything",
        icon: "",
        meta: {
          keepAlive: true,
        },
      },
      {
        id: "9000005",
        label: "测试",
        path: "test06",
        component: "views/test/test",
        icon: "",
        meta: {
          keepAlive: true,
        },
      },
    ],
  },
  {
    id: "1000",
    label: "文档电子化",
    path: "pusdfs3ers",
    component: "views/statistical/DataScreen",
    icon: "DataLine",
    meta: {
      keepAlive: true,
    },
    children: [
      {
        id: "1010",
        label: "文件管理",
        path: "docmanage",
        component: "views/ElectronicDocument/index",
        icon: "",
        meta: {
          keepAlive: true,
        },
      },
    ],
  },
  {
    id: "2000",
    label: "数据入库",
    path: "testkeepalive1",
    component: "views/ElectronicDocument/index",
    icon: "Document",
    meta: {
      keepAlive: true,
    },
    children: [
      // {
      //   id: "20022221",
      //   label: "降水",
      //   path: "precipitation",
      //   component: "views/DataEntry/precipitation",
      //   icon: "el-icon-more",
      //   meta: {
      //     keepAlive: true,
      //   },
      // },
      // {
      //   id: "200222",
      //   label: "水位",
      //   path: "waterlevel",
      //   component: "views/DataEntry/waterlevel",
      //   icon: "el-icon-more",
      //   meta: {
      //     keepAlive: true,
      //   },
      // },
      // {
      //   id: "2002223",
      //   label: "旱情",
      //   path: "uns24dfdit",
      //   component: "views/meteorology/YzStForecastcF/index",
      //   icon: "el-icon-more",
      //   meta: {
      //     keepAlive: true,
      //   },
      // },
      // {
      //   id: "2002224",
      //   label: "模板",
      //   path: "demo",
      //   component: "views/DataEntry/demo",
      //   icon: "el-icon-more",
      //   meta: {
      //     keepAlive: true,
      //   },
      // },
      // {
      //   id: "2002225",
      //   label: "测试",
      //   path: "text",
      //   component: "views/DataEntry/text",
      //   icon: "el-icon-more",
      //   meta: {
      //     keepAlive: true,
      //   },
      // },
      {
        id: "2001",
        label: "水情预报成果注释",
        path: "YzStForecastcF",
        component: "views/meteorology/YzStForecastcF/index",
        icon: "el-icon-more",
        meta: {
          keepAlive: true,
        },
      },
      {
        id: "2002",
        label: "水情预报成果",
        path: "YzStForecastF",
        component: "views/meteorology/YzStForecastF/index",
        icon: "el-icon-more",
        meta: {
          keepAlive: true,
        },
      },
      {
        id: "2003",
        label: "洪水频率分析参数",
        path: "YzStFraparB",
        component: "views/meteorology/YzStFraparB/index",
        icon: "el-icon-more",
        meta: {
          keepAlive: true,
        },
      },
      {
        id: "2004",
        label: "闸门启闭情况",
        path: "YzStGateR",
        component: "views/meteorology/YzStGateR/index",
        icon: "el-icon-more",
        meta: {
          keepAlive: true,
        },
      },
      {
        id: "2005",
        label: "闸门状态日志",
        path: "YzStGateRReal",
        component: "views/meteorology/YzStGateRReal/index",
        icon: "el-icon-more",
        meta: {
          keepAlive: true,
        },
      },
      {
        id: "2006",
        label: "地下水情",
        path: "YzStGrwR",
        component: "views/meteorology/YzStGrwR/index",
        icon: "el-icon-more",
        meta: {
          keepAlive: true,
        },
      },
      {
        id: "2007",
        label: "冰雹",
        path: "YzStHailR",
        component: "views/meteorology/YzStHailR/index",
        icon: "el-icon-more",
        meta: {
          keepAlive: true,
        },
      },
      {
        id: "2008",
        label: "图像站数据",
        path: "YzStImgR",
        component: "views/meteorology/YzStImgR/index",
        icon: "el-icon-more",
        meta: {
          keepAlive: true,
        },
      },
      {
        id: "2009",
        label: "泄洪闸开启高度、水位差、流量关系",
        path: "YzStKddptqB",
        component: "views/meteorology/YzStKddptqB/index",
        icon: "el-icon-more",
        meta: {
          keepAlive: true,
        },
      },
      {
        id: "2010",
        label: "节制闸开启高度、水位差、流量关系",
        path: "YzStKdzqB",
        component: "views/meteorology/YzStKdzqB/index",
        icon: "el-icon-more",
        meta: {
          keepAlive: true,
        },
      },
      {
        id: "2011",
        label: "降水量",
        path: "YzStPptnR",
        component: "views/meteorology/YzStPptnR/index",
        icon: "el-icon-more",
        meta: {
          keepAlive: true,
        },
      },
      {
        id: "2012",
        label: "河道水情",
        path: "YzStRiverR",
        component: "views/meteorology/YzStRiverR/index",
        icon: "el-icon-more",
        meta: {
          keepAlive: true,
        },
      },
      {
        id: "2013",
        label: "库（湖）站汛限水位",
        path: "YzStRsvrfsrB",
        component: "views/meteorology/YzStRsvrfsrB/index",
        icon: "el-icon-more",
        meta: {
          keepAlive: true,
        },
      },
      {
        id: "2014",
        label: "水库水情",
        path: "YzStRsvrR",
        component: "views/meteorology/YzStRsvrR/index",
        icon: "el-icon-more",
        meta: {
          keepAlive: true,
        },
      },
      {
        id: "2015",
        label: "水位流量多年日平均统计",
        path: "YzStRvdaymyavS",
        component: "views/meteorology/YzStRvdaymyavS/index",
        icon: "el-icon-more",
        meta: {
          keepAlive: true,
        },
      },
      {
        id: "2016",
        label: "河道站防洪指标",
        path: "YzStRvfcchB",
        component: "views/meteorology/YzStRvfcchB/index",
        icon: "el-icon-more",
        meta: {
          keepAlive: true,
        },
      },
      {
        id: "2017",
        label: "待确认站点删除",
        path: "YzStStbprpB",
        component: "views/meteorology/YzStStbprpB/index",
        icon: "el-icon-more",
        meta: {
          keepAlive: true,
        },
      },
      {
        id: "2018",
        label: "日蒸发量",
        path: "YzStDayevR",
        component: "views/meteorology/YzStDayevR/index",
        icon: "el-icon-more",
        meta: {
          keepAlive: true,
        },
      },
      {
        id: "2019",
        label: "蒸发量统计",
        path: "YzStEstatR",
        component: "views/meteorology/YzStEstatR/index",
        icon: "el-icon-more",
        meta: {
          keepAlive: true,
        },
      },
      {
        id: "2020",
        label: "洪水频率分析成果",
        path: "YzStFfrarB",
        component: "views/meteorology/YzStFfrarB/index",
        icon: "el-icon-more",
        meta: {
          keepAlive: true,
        },
      },
      {
        id: "2021",
        label: "流量站",
        path: "YzStFlowR",
        component: "views/meteorology/YzStFlowR/index",
        icon: "el-icon-more",
        meta: {
          keepAlive: true,
        },
      },
      // {
      //   id: "20211",
      //   label: "流量站5min",
      //   path: "YzStFlowR5min",
      //   component: "views/meteorology/YzStFlowR5min/index",
      //   icon: "el-icon-more",
      //   meta: {
      //     keepAlive: true,
      //   },
      // },
      {
        id: "2022",
        label: "流量站实时",
        path: "YzStFlowRReal",
        component: "views/meteorology/YzStFlowRReal/index",
        icon: "el-icon-more",
        meta: {
          keepAlive: true,
        },
      },
      {
        id: "2023",
        label: "洪水传播时间",
        path: "YzStFsdrB",
        component: "views/meteorology/YzStFsdrB/index",
        icon: "el-icon-more",
        meta: {
          keepAlive: true,
        },
      },
      {
        id: "2024",
        label: "图像站实时",
        path: "YzStImgRReal",
        component: "views/meteorology/YzStImgRReal/index",
        icon: "el-icon-more",
        meta: {
          keepAlive: true,
        },
      },
      {
        id: "2025",
        label: "单位名称编码",
        path: "YzStInstcdB",
        component: "views/meteorology/YzStInstcdB/index",
        icon: "el-icon-more",
        meta: {
          keepAlive: true,
        },
      },
      {
        id: "2026",
        label: "日降水量均值",
        path: "YzStPddmyavS",
        component: "views/meteorology/YzStPddmyavS/index",
        icon: "el-icon-more",
        meta: {
          keepAlive: true,
        },
      },
      {
        id: "2027",
        label: "旬月降水量系列1",
        path: "YzStPdmmyavS",
        component: "views/meteorology/YzStPdmmyavS/index",
        icon: "el-icon-more",
        meta: {
          keepAlive: true,
        },
      },
      {
        id: "2028",
        label: "旬月降水量系列2",
        path: "YzStPdmmysqS",
        component: "views/meteorology/YzStPdmmysqS/index",
        icon: "el-icon-more",
        meta: {
          keepAlive: true,
        },
      },
      {
        id: "2029",
        label: "泵站水情极值",
        path: "YzStPmevsR",
        component: "views/meteorology/YzStPmevsR/index",
        icon: "el-icon-more",
        meta: {
          keepAlive: true,
        },
      },
      {
        id: "2030",
        label: "降水量实时",
        path: "YzStPptnRReal",
        component: "views/meteorology/YzStPptnRReal/index",
        icon: "el-icon-more",
        meta: {
          keepAlive: true,
        },
      },
      {
        id: "2031",
        label: "降水量统计",
        path: "YzStPstatR",
        component: "views/meteorology/YzStPstatR/index",
        icon: "el-icon-more",
        meta: {
          keepAlive: true,
        },
      },
      {
        id: "2032",
        label: "泵站水情",
        path: "YzStPumpR",
        component: "views/meteorology/YzStPumpR/index",
        icon: "el-icon-more",
        meta: {
          keepAlive: true,
        },
      },
      {
        id: "2033",
        label: "调度预报成果",
        path: "YzStReglatF",
        component: "views/meteorology/YzStReglatF/index",
        icon: "el-icon-more",
        meta: {
          keepAlive: true,
        },
      },
      // {
      //   id: "2034",
      //   label: "河道水情5min",
      //   path: "YzStRiverR5min",
      //   component: "views/meteorology/YzStRiverR5min/index",
      //   icon: "el-icon-more",
      //   meta: {
      //     keepAlive: true,
      //   },
      // },
      {
        id: "2035",
        label: "河道水情实时",
        path: "YzStRiverRReal",
        component: "views/meteorology/YzStRiverRReal/index",
        icon: "el-icon-more",
        meta: {
          keepAlive: true,
        },
      },
      {
        id: "2036",
        label: "水库水情多日均值",
        path: "YzStRsvravR",
        component: "views/meteorology/YzStRsvravR/index",
        icon: "el-icon-more",
        meta: {
          keepAlive: true,
        },
      },
      {
        id: "2037",
        label: "水库水情极值",
        path: "YzStRsvrevsR",
        component: "views/meteorology/YzStRsvrevsR/index",
        icon: "el-icon-more",
        meta: {
          keepAlive: true,
        },
      },
      {
        id: "2038",
        label: "库（湖）站防洪指标",
        path: "YzStRsvrfcchB",
        component: "views/meteorology/YzStRsvrfcchB/index",
        icon: "el-icon-more",
        meta: {
          keepAlive: true,
        },
      },
      {
        id: "2039",
        label: "(湖)蓄水量多年日均值统计",
        path: "YzStRsvrmyavS",
        component: "views/meteorology/YzStRsvrmyavS/index",
        icon: "el-icon-more",
        meta: {
          keepAlive: true,
        },
      },
      // {
      //   id: "2040",
      //   label: "水库水情5min",
      //   path: "YzStRsvrR5min",
      //   component: "views/meteorology/YzStRsvrR5min/index",
      //   icon: "el-icon-more",
      //   meta: {
      //     keepAlive: true,
      //   },
      // },
      {
        id: "2041",
        label: "水库水情实时",
        path: "YzStRsvrRReal",
        component: "views/meteorology/YzStRsvrRReal/index",
        icon: "el-icon-more",
        meta: {
          keepAlive: true,
        },
      },
      {
        id: "2042",
        label: "河道水情多日均值",
        path: "YzStRvavR",
        component: "views/meteorology/YzStRvavR/index",
        icon: "el-icon-more",
        meta: {
          keepAlive: true,
        },
      },
      {
        id: "2043",
        label: "水位流量旬月极值系列",
        path: "YzStRvdmevsqS",
        component: "views/meteorology/YzStRvdmevsqS/index",
        icon: "el-icon-more",
        meta: {
          keepAlive: true,
        },
      },
      {
        id: "2044",
        label: "水位流量多年旬月平均统计",
        path: "YzStRvdmmyavS",
        component: "views/meteorology/YzStRvdmmyavS/index",
        icon: "el-icon-more",
        meta: {
          keepAlive: true,
        },
      },
      {
        id: "2045",
        label: "水位流量旬月均值系列2",
        path: "YzStRvdmmysqS",
        component: "views/meteorology/YzStRvdmmysqS/index",
        icon: "el-icon-more",
        meta: {
          keepAlive: true,
        },
      },
      {
        id: "2046",
        label: "河道水情极值",
        path: "YzStRvevsR",
        component: "views/meteorology/YzStRvevsR/index",
        icon: "el-icon-more",
        meta: {
          keepAlive: true,
        },
      },
      {
        id: "2047",
        label: "大断面测验成果",
        path: "YzStRvsectB",
        component: "views/meteorology/YzStRvsectB/index",
        icon: "el-icon-more",
        meta: {
          keepAlive: true,
        },
      },
      {
        id: "2048",
        label: "水位流量年极值系列",
        path: "YzStRvyevsqS",
        component: "views/meteorology/YzStRvyevsqS/index",
        icon: "el-icon-more",
        meta: {
          keepAlive: true,
        },
      },
      {
        id: "2049",
        label: "土壤墒情特征值",
        path: "YzStSoilchB",
        component: "views/meteorology/YzStSoilchB/index",
        icon: "el-icon-more",
        meta: {
          keepAlive: true,
        },
      },
      {
        id: "2050",
        label: "土壤墒情",
        path: "YzStSoilR",
        component: "views/meteorology/YzStSoilR/index",
        icon: "el-icon-more",
        meta: {
          keepAlive: true,
        },
      },
      {
        id: "2051",
        label: "测站基本属性",
        path: "YzStStbprpBBak",
        component: "views/meteorology/YzStStbprpBBak/index",
        icon: "el-icon-more",
        meta: {
          keepAlive: true,
        },
      },
      {
        id: "2052",
        label: "待确认站点删除2",
        path: "YzStStbprpDelB",
        component: "views/meteorology/YzStStbprpDelB/index",
        icon: "el-icon-more",
        meta: {
          keepAlive: true,
        },
      },
      {
        id: "2053",
        label: "暴雨加报",
        path: "YzStStormR",
        component: "views/meteorology/YzStStormR/index",
        icon: "el-icon-more",
        meta: {
          keepAlive: true,
        },
      },
      {
        id: "2054",
        label: "测站报送任务",
        path: "YzStStsmtaskB",
        component: "views/meteorology/YzStStsmtaskB/index",
        icon: "el-icon-more",
        meta: {
          keepAlive: true,
        },
      },
      {
        id: "2055",
        label: "气温水温多日均值",
        path: "YzStTmpavR",
        component: "views/meteorology/YzStTmpavR/index",
        icon: "el-icon-more",
        meta: {
          keepAlive: true,
        },
      },
      {
        id: "2056",
        label: "气温水温极值",
        path: "YzStTmpevsR",
        component: "views/meteorology/YzStTmpevsR/index",
        icon: "el-icon-more",
        meta: {
          keepAlive: true,
        },
      },
      {
        id: "2057",
        label: "气温水温",
        path: "YzStTmpR",
        component: "views/meteorology/YzStTmpR/index",
        icon: "el-icon-more",
        meta: {
          keepAlive: true,
        },
      },
      {
        id: "2058",
        label: "水库水情多日均值2",
        path: "YzStWasavR",
        component: "views/meteorology/YzStWasavR/index",
        icon: "el-icon-more",
        meta: {
          keepAlive: true,
        },
      },
      {
        id: "2059",
        label: "堰闸水情极值",
        path: "YzStWasevsR",
        component: "views/meteorology/YzStWasevsR/index",
        icon: "el-icon-more",
        meta: {
          keepAlive: true,
        },
      },
      {
        id: "2060",
        label: "堰闸水情Bak",
        path: "YzStWasRBak",
        component: "views/meteorology/YzStWasRBak/index",
        icon: "el-icon-more",
        meta: {
          keepAlive: true,
        },
      },
      {
        id: "2061",
        label: "堰闸水情",
        path: "YzStWasR",
        component: "views/meteorology/YzStWasR/index",
        icon: "el-icon-more",
        meta: {
          keepAlive: true,
        },
      },
      {
        id: "2062",
        label: "堰闸水情实时",
        path: "YzStWasRReal",
        component: "views/meteorology/YzStWasRReal/index",
        icon: "el-icon-more",
        meta: {
          keepAlive: true,
        },
      },
      {
        id: "2063",
        label: "引排水量统计",
        path: "YzStWdpstatR",
        component: "views/meteorology/YzStWdpstatR/index",
        icon: "el-icon-more",
        meta: {
          keepAlive: true,
        },
      },
      {
        id: "2064",
        label: "地下水开采量统计",
        path: "YzStWgrwstatR",
        component: "views/meteorology/YzStWgrwstatR/index",
        icon: "el-icon-more",
        meta: {
          keepAlive: true,
        },
      },
      {
        id: "2065",
        label: "堰闸（泵）站时段均值",
        path: "YzStWspavsdR",
        component: "views/meteorology/YzStWspavsdR/index",
        icon: "el-icon-more",
        meta: {
          keepAlive: true,
        },
      },
      {
        id: "2066",
        label: "水位流量关系曲线",
        path: "YzStZqrlB",
        component: "views/meteorology/YzStZqrlB/index",
        icon: "el-icon-more",
        meta: {
          keepAlive: true,
        },
      },
      {
        id: "2067",
        label: "库(湖)容曲线",
        path: "YzStZvarlB",
        component: "views/meteorology/YzStZvarlB/index",
        icon: "el-icon-more",
        meta: {
          keepAlive: true,
        },
      },
      // {
      //   id: "2068",
      //   label: "test69",
      //   path: "YzStZvarlB",
      //   component: "views/meteorology/YzStZvarlB/index",
      //   icon: "el-icon-more",
      //   meta: {
      //     keepAlive: true,
      //   },
      // },
      // {
      //   id: "2069",
      //   label: "test70",
      //   path: "test70",
      //   component: "views/meteorology/test70/index",
      //   icon: "el-icon-more",
      //   meta: {
      //     keepAlive: true,
      //   },
      // },
    ],
  },
];
