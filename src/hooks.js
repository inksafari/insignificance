import { minify } from 'html-minifier';
import { prerendering } from '$app/env';

const minifierOptions = {
	collapseBooleanAttributes: true,
	collapseWhitespace: true,
	conservativeCollapse: true,
	decodeEntities: true,
	html5: true,
	ignoreCustomComments: [/^#/],
	minifyCSS: true,
	minifyJS: true,
	removeAttributeQuotes: true,
	removeComments: true,
	removeOptionalTags: true,
	removeRedundantAttributes: true,
	removeScriptTypeAttributes: true,
	removeStyleLinkTypeAttributes: true,
	sortAttributes: true,
	sortClassName: true
};

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ request, resolve }) {
	const response = await resolve(request);

	if (prerendering && response.headers['content-type'] === 'text/html') {
		response.body = minify(response.body, minifierOptions);
	}

	return response;
}
// @see
// https://github.com/AliciaBytes/aliciabytes.dev/blob/main/src/hooks.js
// https://github.com/TravisSpomer/SvelteKitTemplate/blob/281240678bb651956f3563b1011ccaa712436683/src/hooks.ts
// https://github.com/yehuozhili/svelte-kit-markdown/blob/main/src/hooks.ts