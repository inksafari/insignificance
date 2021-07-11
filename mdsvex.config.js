import remarkAbbr from "remark-abbr"
import rehypeSlug from "rehype-slug"
import rehypeAutolink from "rehype-autolink-headings"
import rehypeMinify from "rehype-preset-minify"

const config = {
	extensions: [".svx", ".md", ".svelte.md"],
	smartypants: {
		dashes: "oldschool",
	},
	remarkPlugins: [
		remarkAbbr,
	],
	rehypePlugins: [
		rehypeSlug,
		[
			rehypeAutolink,
			{
				behavior: "wrap"
			},
		],
		rehypeMinify
	]
}
export default config;
// https://github.com/c-bandy/website/blob/main/mdsvex.config.js
// https://github.com/mattjennings/mattjennings.io/blob/master/mdsvex.config.js
// https://github.com/mattjennings/mattjennings.io/remark-plugins
// https://github.com/nemo-omen/trainingmontage.dev/blob/main/mdsvex.config.js
// https://github.com/kwshi/kshi.xyz/blob/main/config/mdsvex.js
// https://github.com/kyythane/blog/blob/main/mdsvex.config.cjs
// https://github.com/StarsiegePlayers/www/blob/main/rollup.config.js
// https://github.com/foxfriends/blog/blob/master/svelte.config.js
// https://github.com/michael0liver/michaeloliver.dev/blob/bbd143a26a68cf2d6c7ee068be5a81c2c81d0d28/mdsvex.js
// https://zenn.dev/thiragi/scraps/4150e766090adb