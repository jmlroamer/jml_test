import path from "path";
import type { Plugin, ResolvedConfig } from "vite";

interface Options {
	// 压缩文件保存路径
	zipFileDir?: string;
	// 压缩文件名称
	zipFileName?: string;
	success?: () => void;
}

/**
 * 打包自动压缩插件，保存到根目录build-zip
 * @param opts
 * @returns
 */
export default function myPlugin(opts: Options = {}): Plugin {
	let outputPath: string;
	let config: ResolvedConfig;

	return {
		apply: "serve",
		enforce: "post",
		name: "my-plugin",
		configResolved(resolvedConfig) {
			config = resolvedConfig;
			outputPath = path.isAbsolute(config.build.outDir)
				? config.build.outDir
				: path.join(config.root, config.build.outDir);
			console.log(outputPath);

		},
		closeBundle: {
			sequential: true,
			async handler() {
				const cwd = process.cwd();
			}
		}
	};
}
