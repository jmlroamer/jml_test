import L from "leaflet";

declare module "leaflet" {
	interface HighlightMarkerOptions extends L.MarkerOptions {
		color?: string;
		width?: number;
		height?: number;
		only?: boolean;
	}
	class HighlightMarker extends L.Marker {
		constructor(latlng: L.LatLngExpression, options?: HighlightMarkerOptions);
		isHighlight(): boolean;
		highlight(zoom?: number | undefined, options?: L.ZoomPanOptions | undefined): this;
		unhighlight(zoom?: number | undefined, options?: L.ZoomPanOptions | undefined): this;
		[key: string]: any;
	}
	function highlightMarker(
		latlng: L.LatLngExpression,
		options?: HighlightMarkerOptions
	): HighlightMarker;
}

interface CreateMarkerOptions extends L.DivIconOptions {
	width: number;
	height: number;
}

/**
 * 管理高亮marker
 */
class MarkerManage {
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	private constructor() {}

	/** 高亮的marker */
	public static opens = new Map<number, L.Marker>();

	/**
	 * 获取第一个marker
	 * @returns
	 */
	private static getFirstMarker() {
		for (const [id, marker] of MarkerManage.opens) {
			return { id, marker };
		}
	}

	/**
	 * 创建用于高亮的icon
	 * @param
	 * @returns
	 */
	private static createIcon({ width, height, ...iconOption }: CreateMarkerOptions) {
		return L.divIcon({
			...iconOption,
			className: "light-marker-div",
			html: `<ul class="light" style="width:${width}px;height:${height}px;">
			<li class="light-1"></li>
			<li class="light-2"></li>
			<li class="light-3"></li>
			</ul>`
		});
	}

	/**
	 * 创建高亮marker
	 * @param id marker的id
	 * @param only 是否只打开一个
	 * @param latlng 坐标
	 * @param options
	 * @returns
	 */
	public static createMarker(
		id: number,
		only: boolean,
		latlng: L.LatLngExpression,
		options: CreateMarkerOptions
	) {
		let marker: L.Marker | undefined;
		if (only) {
			const active = MarkerManage.getFirstMarker();
			if (active) {
				marker = active.marker;
				MarkerManage.opens.delete(active.id);
				MarkerManage.opens.set(id, marker);
			}
		}
		if (marker) {
			marker.setLatLng(latlng);
			marker.setIcon(MarkerManage.createIcon(options));
		} else {
			marker = L.marker(latlng, {
				icon: MarkerManage.createIcon(options),
				zIndexOffset: -Infinity
			});
			MarkerManage.opens.set(id, marker);
		}
		return marker;
	}

	/**
	 * 删除高亮marker
	 * @param id
	 * @returns
	 */
	public static delete(id: number) {
		const marker = MarkerManage.opens.get(id);
		if (!marker) return;
		MarkerManage.opens.delete(id);
		marker.remove();
	}

	/**
	 * 清空高亮marker
	 */
	public static clear() {
		for (const [, marker] of MarkerManage.opens) {
			marker.remove();
		}
		this.opens.clear();
	}
}

/**
 * 高亮marker，继承自L.Marker
 */
class HighlightMarker<T = any> extends L.Marker<T> {
	private _markerId = L.stamp(this);

	constructor(latlng: L.LatLngExpression, options?: L.HighlightMarkerOptions) {
		const _options: L.HighlightMarkerOptions = {
			color: "red",
			width: 20,
			height: 20,
			only: true
		};
		super(latlng, Object.assign(_options, options));
	}

	onRemove(map: L.Map) {
		MarkerManage.delete(this._markerId);
		return super.onRemove(map);
	}

	/**
	 * 创建marker
	 * @param map
	 */
	private create(map: L.Map) {
		if (!map) return;
		const { width, height, icon, only } = this.options as Required<L.HighlightMarkerOptions>;
		const { iconSize, iconAnchor } = icon.options as L.IconOptions;
		MarkerManage.createMarker(this._markerId, only, this.getLatLng(), {
			width,
			height,
			iconSize,
			iconAnchor
		}).addTo(map);
	}

	/**
	 * 是否高亮
	 * @returns
	 */
	public isHighlight() {
		return MarkerManage.opens.has(this._markerId);
	}

	/**
	 * 高亮
	 * @param zoom
	 * @param options
	 * @returns
	 */
	public highlight(zoom?: number | undefined, options?: L.ZoomPanOptions | undefined) {
		if (this.isHighlight()) return this;
		const fn = () => {
			this.create(this._map);
			zoom != null && this._map.flyTo(this.getLatLng(), zoom, options);
		};
		this._map ? fn() : Promise.resolve().then(fn);
		return this;
	}

	/**
	 * 取消高亮
	 * @param zoom
	 * @param options
	 * @returns
	 */
	public unhighlight(zoom?: number | undefined, options?: L.ZoomPanOptions | undefined) {
		zoom != null && this._map.flyTo(this._map.getCenter(), zoom, options);
		if (this.isHighlight()) {
			MarkerManage.delete(this._markerId);
		}
		return this;
	}
}

(L as any).highlightMarker = function (
	latlng: L.LatLngExpression,
	options?: L.HighlightMarkerOptions
) {
	return new HighlightMarker(latlng, options);
};
