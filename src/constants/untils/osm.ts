type ArrData = Array<number | string>;

interface CalcInfo {
	niceMin: number;
	niceMax: number;
	minPoint: number;
	maxPoint: number;
	maxTicks: number;
	tickSpacing: number;
	lst: number;
	Ticks: number;
}

const OMS = {
	calMax(arr: ArrData, type?: string) {
		if (!arr.length) return 0;

		//计算echart的水位，流量最大值，用于y轴刻度分割
		let max;
		let maxval;
		let valArr = arr;

		valArr = valArr.filter((item) => !isNaN(Number(item)));
		// eslint-disable-next-line prefer-const
		max = Math.max(...(valArr as number[]));
		if (type == "q") {
			const maxint = Math.ceil(max / 10); //不让最高的值超过最上面的刻度
			maxval = maxint * 10; //让显示的刻度是整数
		} else {
			const maxint = Math.ceil(max * 10); //不让最高的值超过最下面的刻度
			maxval = (maxint / 10).toFixed(1);
		}
		return maxval as number;
	},
	calMin(arr: ArrData, type?: string) {
		if (!arr.length) return 0;

		//计算echart的水位，流量最小值，用于y轴刻度分割
		let min;
		let minval;
		let valArr = arr;

		valArr = valArr.filter((item) => !isNaN(Number(item)));
		// eslint-disable-next-line prefer-const
		min = Math.min(...(valArr as number[]));
		if (type == "q") {
			const minint = Math.floor(min / 10);
			minval = minint * 10; //让显示的刻度是整数
		} else {
			const minint = Math.floor(min * 10); //不让最高的值超过最下面的刻度
			minval = (minint / 10).toFixed(1);
		}

		return minval as number;
	},
	NiceScale(minv: number, maxv: number) {
		const self: CalcInfo = {
			maxTicks: 6,
			tickSpacing: 0,
			lst: 10,
			niceMin: 0,
			niceMax: 0,
			Ticks: 1,
			minPoint: 0,
			maxPoint: 0
		};
		// 微调最小值、最大值
		// if (minv > 100) self.minPoint = minv * (1 - 1 / minv);
		if (minv > 100) self.minPoint = minv * (1 - 1 / (minv * 10));
		else if (minv > 1 && minv <= 100) self.minPoint = minv * 0.999;
		else if (minv >= -100 && minv < -1) self.minPoint = minv * 1.001;
		else if (minv < -100) self.minPoint = minv * (1 - 1 / minv);
		else self.minPoint = minv;

		// if (maxv > 100) self.maxPoint = maxv * (1 + 1 / maxv);
		if (maxv > 100) self.maxPoint = maxv;
		else if (maxv > 1 && maxv <= 100) self.maxPoint = maxv * 1.001;
		else if (maxv >= -100 && maxv < -1) self.maxPoint = maxv * 0.99;
		else if (maxv < -100) self.maxPoint = maxv * (1 + 1 / maxv);
		else self.maxPoint = maxv;
		// 计算刻度
		return this.calculate(self);
	},
	calculate(self: CalcInfo) {
		self.lst = this.niceNum(self.maxPoint - self.minPoint, false);
		self.tickSpacing = this.niceNum(self.lst / (self.maxTicks - 1), true); // 精度问题
		const niceMin = this.correction(
			(Math.floor(self.minPoint / self.tickSpacing) * self.tickSpacing * 1000) / 1000
		); // 精度问题
		if (!Number.isNaN(niceMin)) {
			self.niceMin = niceMin;
		}
		const niceMax = this.correction(
			(Math.ceil(self.maxPoint / self.tickSpacing) * self.tickSpacing * 1000) / 1000
		); // 精度问题
		if (!Number.isNaN(niceMax)) {
			self.niceMax = niceMax;
		}

		self.Ticks = Math.round(1 + (self.niceMax - self.niceMin) / self.tickSpacing);

		if (self.Ticks >= 7) {
			self.tickSpacing = this.niceNum(self.lst / (self.maxTicks - 3), true);
			self.niceMin = this.correction(
				(Math.floor(self.minPoint / self.tickSpacing) * self.tickSpacing * 1000) / 1000
			);
			self.niceMax = this.correction(
				(Math.ceil(self.maxPoint / self.tickSpacing) * self.tickSpacing * 1000) / 1000
			);
			self.Ticks = Math.round(1 + (self.niceMax - self.niceMin) / self.tickSpacing);
		}

		if (self.Ticks < 6 && (self.niceMax - self.niceMin) % 5 != 0) {
			self.niceMax = self.niceMax + (6 - self.Ticks) * self.tickSpacing;
			self.Ticks = Math.round(1 + (self.niceMax - self.niceMin) / self.tickSpacing);
		}

		self.niceMax = Number(self.niceMax.toFixed(1));
		self.niceMin = Number(self.niceMin.toFixed(1));

		return self;
	},
	niceNum(lst: number, rround: boolean) {
		let exponent = 0;
		let fraction = 0;
		let niceFraction = 0;

		exponent = Math.floor(Math.log10(lst));
		fraction = lst / Math.pow(10, exponent);
		if (rround) {
			if (fraction < 1.5) niceFraction = 1;
			else if (fraction < 3) niceFraction = 2;
			else if (fraction < 7) niceFraction = 5;
			else niceFraction = 10;
		} else {
			if (fraction <= 1) niceFraction = 1;
			else if (fraction <= 2) niceFraction = 2;
			else if (fraction <= 5) niceFraction = 5;
			else niceFraction = 10;
		}
		return niceFraction * Math.pow(10, exponent);
	},
	correction(num: any) {
		if (num > 0 && num < 10 && parseInt(num) != num) return parseFloat(num);
		else return num;
	},
	Qformat(x: any): string | number {
		//参考长江防洪预报调度系统的数据处理方式
		x = parseFloat(x as unknown as string);
		if (x === 0) return 0;
		if (x < 0) {
			//如果为负数，递归调用该方法，参数*-1，返回时再加上'-'
			return Number("-" + OMS.Qformat(x * -1));
		}
		if (!x || isNaN(x)) return "-";
		let ttx = null;
		let tx = 0;
		if (x >= 100000) {
			tx = Math.floor(x / 1000 + 0.5);
			tx *= 1000;
			ttx = tx.toFixed(0);
		} else if (x >= 10000) {
			tx = Math.floor(x / 100 + 0.5);
			tx *= 100;
			ttx = tx.toFixed(0);
		} else if (x >= 1000) {
			tx = Math.floor(x / 10 + 0.5);
			tx *= 10;
			ttx = tx.toFixed(0);
		} else if (x >= 100) {
			tx = Math.floor(x + 0.5);
			ttx = tx.toFixed(0);
		} else if (x >= 10) {
			tx = Math.floor(x * 10 + 0.5);
			tx /= 10;
			ttx = tx.toFixed(1);
		} else if (x >= 0.1) {
			tx = Math.floor(x * 100 + 0.5);
			tx /= 100;
			ttx = tx.toFixed(2);
		} else if (x >= 0.01) {
			tx = Math.floor(x * 1000 + 0.5);
			tx /= 1000;
			ttx = tx.toFixed(3);
		} else {
			tx = Math.floor(x * 10000 + 0.5);
			tx /= 10000;
			ttx = tx.toFixed(4);
		}
		return Number(ttx);
	},
	// 水位蓄量保留两位
	Hformat(x: any) {
		if (x == 0) return 0;
		if (!x || isNaN(x)) return "-";
		const s = Math.round(x * 100);
		return Number((s / 100).toFixed(2));
	},
	// 降雨、面雨量
	RHformat(x: any): string | number {
		x = parseFloat(x as unknown as string);
		if (x === 0) return 0;
		if (x < 0) {
			return Number("-" + OMS.RHformat(x * -1));
		}
		let ttx = null;
		let tx = 0;
		if (!x || isNaN(x)) return "-";
		if (x >= 0.1) {
			tx = Math.floor(x * 10 + 0.5);
			tx /= 10;
			ttx = tx.toFixed(1);
		} else if (x >= 0.01) {
			tx = Math.floor(x * 100 + 0.5);
			tx /= 100;
			ttx = tx.toFixed(2);
		} else {
			tx = Math.floor(x * 1000 + 0.5);
			tx /= 1000;
			ttx = tx.toFixed(3);
		}
		return Number(ttx);
	},
	formatNumber(num: any) {
		if (num == null) return "-";
		return num;
	},
	/**
	 * 前端导出和显示的数据一样直接对数据进行格式化建议options传表头信息添加type
	 * @param data 数据集合
	 * @param options 每一行需要格式化的参数,type为格式化类型 [ { title: "水位", field: "z", type: "z" } ], z水位、蓄水 q流量 r降雨、面雨量
	 */
	formatData(data: Record<string, any>[], options: Record<string, any>[]) {
		for (let i = 0; i < data.length; i++) {
			const row = data[i];
			for (let j = 0; j < options.length; j++) {
				const keys = options[j];
				if (!keys.type) break;
				row[keys.field] =
					keys.type == "z"
						? this.Hformat(row[keys.field])
						: keys.type == "q"
						? this.Qformat(row[keys.field])
						: keys.type == "r"
						? this.RHformat(row[keys.field])
						: "";
			}
		}
		return data;
	},
	/**
	 * 最小二乘法做曲线拟合，返回拟合后的点坐标数组
	 * @param  {Array} arr 点坐标数组
	 * @return {Array}     拟合后的点坐标数组
	 */
	PolyFitForcast(arr: any): Array<any> {
		const arrX = [],
			arrY = [];

		for (let i = 0; i < arr.length; i++) {
			arrX.push(arr[i][0]);
			arrY.push(arr[i][1]);
		}

		const len = arrY.length;
		const m = 3;
		const a = new Array(arrX.length);
		const aa = PolyFit(arrX, arrY, len, a, m);
		const arrRes = [];
		const filterArr = [];
		for (let i = 0; i < len; i++) {
			//       arrRes.push({x: arrX[i], y: getY(arrX[i], arrX, aa, m)});
			if (filterArr.indexOf(arrX[i]) != -1) continue;
			arrRes.push([arrX[i], getY(arrX[i], arrX, aa, m).toFixed(2)]);
			filterArr.push(arrX[i]);
		}
		/**
		 * <p>
		 * 函数功能：最小二乘法曲线拟合
		 * </p>
		 * <p>
		 * 方程:Y = a(0) + a(1) * (X - X1)+ a(2) * (X - X1)^2 + ..... .+ a(m) * (X -
		 * X1)^m X1为X的平均数
		 * </p>
		 *
		 * @param x
		 *            实型一维数组,长度为 n. 存放给定 n 个数据点的 X 坐标
		 * @param y
		 *            实型一维数组,长度为 n.存放给定 n 个数据点的 Y 坐标
		 * @param n
		 *            变量。给定数据点的个数
		 * @param a
		 *            实型一维数组，长度为 m.返回 m-1 次拟合多项式的 m 个系数
		 * @param m
		 *            拟合多项式的项数，即拟合多项式的最高次数为 m-1. 要求 m<=n 且m<=20。若 m>n 或 m>20
		 *            ，则本函数自动按 m=min{n,20} 处理.
		 *            <p>
		 *            </p>
		 * @return 多项式系数存储数组
		 */
		function PolyFit(x: number[], y: number[], n: number, a: number[], m: number) {
			let i, j, k;
			let z,
				p,
				c,
				g,
				q = 0,
				d1,
				d2;
			const s = new Array(20);
			const t = new Array(20);
			const b = new Array(20);
			const dt = new Array(3);
			for (i = 0; i <= m - 1; i++) {
				a[i] = 0.0;
			}
			if (m > n) {
				m = n;
			}
			if (m > 20) {
				m = 20;
			}
			z = 0.0;
			for (i = 0; i <= n - 1; i++) {
				z = z + x[i] / (1.0 * n);
			}
			b[0] = 1.0;
			d1 = 1.0 * n;
			p = 0.0;
			c = 0.0;
			for (i = 0; i <= n - 1; i++) {
				p = p + (x[i] - z);
				c = c + y[i];
			}
			c = c / d1;
			p = p / d1;
			a[0] = c * b[0];
			if (m > 1) {
				t[1] = 1.0;
				t[0] = -p;
				d2 = 0.0;
				c = 0.0;
				g = 0.0;
				for (i = 0; i <= n - 1; i++) {
					q = x[i] - z - p;
					d2 = d2 + q * q;
					c = c + y[i] * q;
					g = g + (x[i] - z) * q * q;
				}
				c = c / d2;
				p = g / d2;
				q = d2 / d1;
				d1 = d2;
				a[1] = c * t[1];
				a[0] = c * t[0] + a[0];
			}
			for (j = 2; j <= m - 1; j++) {
				s[j] = t[j - 1];
				s[j - 1] = -p * t[j - 1] + t[j - 2];
				if (j >= 3)
					for (k = j - 2; k >= 1; k--) {
						s[k] = -p * t[k] + t[k - 1] - q * b[k];
					}
				s[0] = -p * t[0] - q * b[0];
				d2 = 0.0;
				c = 0.0;
				g = 0.0;
				for (i = 0; i <= n - 1; i++) {
					q = s[j];
					for (k = j - 1; k >= 0; k--) {
						q = q * (x[i] - z) + s[k];
					}
					d2 = d2 + q * q;
					c = c + y[i] * q;
					g = g + (x[i] - z) * q * q;
				}
				c = c / d2;
				p = g / d2;
				q = d2 / d1;
				d1 = d2;
				a[j] = c * s[j];
				t[j] = s[j];
				for (k = j - 1; k >= 0; k--) {
					a[k] = c * s[k] + a[k];
					b[k] = t[k];
					t[k] = s[k];
				}
			}
			dt[0] = 0.0;
			dt[1] = 0.0;
			dt[2] = 0.0;
			for (i = 0; i <= n - 1; i++) {
				q = a[m - 1];
				for (k = m - 2; k >= 0; k--) {
					q = a[k] + q * (x[i] - z);
				}
				p = q - y[i];
				if (Math.abs(p) > dt[2]) {
					dt[2] = Math.abs(p);
				}
				dt[0] = dt[0] + p * p;
				dt[1] = dt[1] + Math.abs(p);
			}
			return a;
		} // end
		/**
		 * <p>
		 * 对X轴数据节点球平均值
		 * </p>
		 *
		 * @param x
		 *            存储X轴节点的数组
		 *            <p>
		 *            Date:2007-12-25 20:21 PM
		 *            </p>
		 * @return 平均值
		 */
		function average(x: number[]) {
			let ave = 0;
			let sum = 0;
			if (x !== null) {
				for (let i = 0; i < x.length; i++) {
					sum += x[i];
				}
				ave = sum / x.length;
			}
			return ave;
		}

		/**
		 * <p>
		 * 由X值获得Y值
		 * </p>
		 * @param x
		 *            当前X轴输入值,即为预测的月份
		 * @param xx
		 *            当前X轴输入值的前X数据点
		 * @param a
		 *            存储多项式系数的数组
		 * @param m
		 *            存储多项式的最高次数的数组
		 *            <p>
		 *            </p>
		 * @return 对应X轴节点值的Y轴值
		 */
		function getY(x: number, xx: number[], a: number[], m: number) {
			let y = 0;
			const ave = average(xx);

			let l = 0;
			for (let i = 0; i < m; i++) {
				l = a[0];
				if (i > 0) {
					y += a[i] * Math.pow(x - ave, i);
				}
			}
			return y + l;
		}
		return arrRes;
	},
	/**
	 * canvas在直线上画箭头
	 * @param ctx ctx：Canvas绘图环境
	 * @param fromX 起点坐标（也可以换成p1，只不过它是一个数组）
	 * @param fromY 起点坐标（也可以换成p1，只不过它是一个数组）
	 * @param toX 终点坐标 (也可以换成p2，只不过它是一个数组)
	 * @param toY 终点坐标 (也可以换成p2，只不过它是一个数组)
	 * @param theta 三角斜边一直线夹角
	 * @param headlen 三角斜边长度
	 * @param width  箭头线宽度
	 * @param color 箭头颜色
	 */
	drawArrow(
		ctx: CanvasRenderingContext2D,
		fromX: number,
		fromY: number,
		toX: number,
		toY: number,
		theta: number,
		headlen: number,
		width: number,
		color: string
	) {
		theta = typeof theta != "undefined" ? theta : 30;
		headlen = typeof theta != "undefined" ? headlen : 10;
		width = typeof width != "undefined" ? width : 1;
		color = typeof color != "undefined" ? color : "#000";
		const angle = (Math.atan2(fromY - toY, fromX - toX) * 180) / Math.PI,
			angle1 = ((angle + theta) * Math.PI) / 180,
			angle2 = ((angle - theta) * Math.PI) / 180,
			topX = headlen * Math.cos(angle1),
			topY = headlen * Math.sin(angle1),
			botX = headlen * Math.cos(angle2),
			botY = headlen * Math.sin(angle2);
		ctx.save();
		ctx.beginPath();
		let arrowX = fromX - topX,
			arrowY = fromY - topY;
		ctx.moveTo(arrowX, arrowY);
		ctx.moveTo(fromX, fromY);
		ctx.lineTo(toX, toY);
		arrowX = toX + topX;
		arrowY = toY + topY;
		ctx.moveTo(arrowX, arrowY);
		ctx.lineTo(toX, toY);
		arrowX = toX + botX;
		arrowY = toY + botY;
		ctx.lineTo(arrowX, arrowY);
		ctx.strokeStyle = color;
		ctx.lineWidth = width;
		ctx.stroke();
		ctx.restore();
	}
};

export { OMS };

export function calMin(value: number, type: "q" | "z") {
	if (type == "q") {
		const minint = Math.floor(value / 10);
		value = minint * 10; //让显示的刻度是整数
	} else {
		const minint = Math.floor(value * 10); //不让最高的值超过最下面的刻度
		value = Number((minint / 10).toFixed(1));
	}

	return value;
}

export function calMax(value: number, type: "q" | "z") {
	if (type == "q") {
		const minint = Math.ceil(value / 10);
		value = minint * 10; //让显示的刻度是整数
	} else {
		const minint = Math.ceil(value * 10); //不让最高的值超过最下面的刻度
		value = Number((minint / 10).toFixed(1));
	}

	return value;
}

export const formatArrayQ = (data: number[] = []) => data.map(OMS.Qformat).map(Number);
export const formatArrayH = (data: number[] = []) => data.map(OMS.Hformat).map(Number);
