export * from "./methods";
export * from "./option";

export const typeList = [
	{ val: "maxZ", name: "最高水位" },
	{ val: "minZ", name: "最低水位" },
	{ val: "avgZ", name: "平均水位" },
	{ val: "maxQ", name: "最大流量" },
	{ val: "minQ", name: "最小流量" },
	{ val: "avgQ", name: "平均流量" }
];

export const stacharList = [
	{ label: "一日", val: "1" },
	{ label: "三日", val: "2" },
	{ label: "候", val: "3" },
	{ label: "旬", val: "4" },
	{ label: "月", val: "5" },
	{ label: "年", val: "6" }
];
