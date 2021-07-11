import staticAdapter from "@sveltejs/adapter-static"
import { mdsvex } from "mdsvex"
import mdsvexConfig from "./mdsvex.config.js"
import sveltePreprocess from "svelte-preprocess"
import { typescript } from "svelte-preprocess-esbuild"
import { imagetools } from "vite-imagetools"
import * as fs from "fs"

// TODO: Algolia search
// https://github.com/janosh/monabotros.com/blob/main/svelte.config.js
// https://github.com/janosh/ocean-artup/blob/main/svelte.config.js
// TODO: PostCSS
// https://github.com/kwangure/strawberry/blob/master/svelte.config.js

// options passed to svelte.preprocess (https://svelte.dev/docs#svelte_preprocess)
const preprocessSVX = [
	// https://github.com/pngwn/MDsveX
	mdsvex(mdsvexConfig),
	// https://github.com/lukeed/svelte-preprocess-esbuild
	typescript({
		tsconfig: "./config/tsconfig.json",
		minify: true
	}),
	// https://github.com/sveltejs/svelte-preprocess
	// https://github.com/sveltejs/svelte-preprocess/blob/18d9074ac5cd1f13058ddab8f61aded86907d613/docs/preprocessing.md#typescript
	sveltePreprocess({
		typescript: false,
		//postcss: true,
		//scss: {
		//	prependData: `@import 'src/styles/variables/index.scss';`,
		//	outputStyle: 'compressed',
		//},
	})
]

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// https://svelte.dev/docs#svelte_compile
	// compilerOptions: { ... },
	extensions: [".svelte", ...mdsvexConfig.extensions],
	preprocess: preprocessSVX,
	kit: {
		adapter: staticAdapter({ out: "build" }),
		hostHeader: "X-Forwarded-Host",
		target: "#svelte",
		prerender: {
			crawl: true,
			enabled: true,
			force: true,
			pages: ['*'],
		},
		vite: {
			plugins: [
				imagetools({ force: true })
			],
			trailingSlash: "ignore",
			//server: {
			//	hmr: {
			//		protocol: "ws",
			//		port: 9090
			//	}
			//}
		}
	}
}

// Add certificate if it's generated
// https://github.com/ptkdev-boilerplate/svelte-kit-ssr-boilerplate/blob/main/svelte.config.js
if (fs.existsSync("localhost-key.pem") && fs.existsSync("localhost.pem")) {
	config.kit.vite = {
		server: {
			https: {
				key: fs.readFileSync("localhost-key.pem"),
				cert: fs.readFileSync("localhost.pem")
			}
		}
	};
}

export default config