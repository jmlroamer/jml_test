import { type VNode, watch, render } from "vue";

/**
 * 首字母大写
 * @param string
 * @returns
 */
export const capitalizeFirstLetter = (string: string) => {
	if (!string || typeof string.charAt !== "function") {
		return string;
	}
	return string.charAt(0).toUpperCase() + string.slice(1);
};

/**
 * 监听props，调用对应的leafletElement方法
 * @param methods
 * @param leafletElement
 * @param props
 */
export const propsBinder = (
	methods: Record<string, (...arg: any[]) => any>,
	leafletElement: Record<string, any>,
	props: Record<string, unknown>
) => {
	for (const key in props) {
		const setMethodName = "set" + capitalizeFirstLetter(key);
		if (methods[setMethodName]) {
			watch(
				() => props[key],
				(newVal, oldVal) => {
					methods[setMethodName](newVal, oldVal);
				}
			);
		} else if (leafletElement[setMethodName]) {
			watch(
				() => props[key],
				(newVal) => {
					leafletElement[setMethodName](newVal);
				}
			);
		}
	}
};

/**
 * 将组件的事件 对应为 leaflet事件
 * @param contextAttrs
 * @returns
 */
export const remapEvents = (contextAttrs: Record<string, unknown>) => {
	const result: Record<string, (event: Event) => void> = {};
	for (const attrName in contextAttrs) {
		if (attrName.startsWith("on") && !attrName.startsWith("onUpdate") && attrName !== "onReady") {
			const eventName = attrName.slice(2).toLocaleLowerCase();
			result[eventName] = contextAttrs[attrName] as (event: Event) => void;
		}
	}
	return result;
};

/**
 * 将vNode渲染到元素上
 * @param vNode
 * @returns
 */
export const renderToElement = (vNode: VNode, type = "div") => {
	const el = document.createElement(type);
	render(vNode, el);
	return (el.firstChild?.nodeType === 3 ? el : el.firstChild) as HTMLElement;
};

type ScheduleFn = {
	(...arg: any[]): void;
	stop: () => void;
};

/**
 * 创建一个调度执行函数
 * @param fn
 * @returns
 */
export const createSchedule = (fn: (...arg: any[]) => any) => {
	let p: Promise<any> | null = Promise.resolve();
	// 队列是否在刷新
	let isFinish = false;
	const execute: ScheduleFn = (...arg: any[]) => {
		if (isFinish) return;
		// 标志队列正在刷新
		isFinish = true;
		p &&
			p
				.then(() => fn(arg))
				.finally(() => {
					// 重置状态
					isFinish = false;
				});
	};
	execute.stop = () => {
		p = null;
	};

	return execute;
};
