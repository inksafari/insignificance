<!-- 
	Renders the post at /post/[slug]
-->
<script context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	import { isBefore } from 'date-fns'
	export async function load({ page }) {
		const { slug } = page.params;
		const res = await import(`./../../../content/posts/${slug}.md`)
		if (!res.metadata.published || !isBefore(new Date(res.metadata.date), new Date()) ) {
			return {
				props: {},
				redirect: '/404',
				status: 307
			}
		}
		return {
			props: {
				// frontmatter data from post
				metadata: res.metadata,
				// the processed Svelte component from mdsvex
				content: res.default
			},
			// 10 minutes
			maxage: 60 * 10
		}
	}

	//import { base } from '$app/paths';
	//export async function load({ page, fetch }) {
		//const url = `${base}/api/${page.params.slug}.json`;
		//const post = await fetch(url)
				//.then((res) => res.json());

		//if (!post || !post.published) {
			//return {
				//status: 404,
				//error: new Error('Could not load ${url}')
			//};
		//}

		//return {
			//props: {
				//post
			//}
		//};
	//}
</script>

<script>
	import PageHead from '$lib/components/PageHead.svelte';
	import ArticleTitle from '$lib/components/ArticleTitle.svelte';
	import ArticleMeta from '$lib/components/ArticleMeta.svelte';

	export let metadata
	export let content
</script>

<PageHead title={metadata.title} description={metadata.description} />

<ArticleTitle title={metadata.title} />
<ArticleMeta date={metadata.date} />
<svelte:component this={content} />

<!--
	@see
	https://github.com/biah/www.kudadam.com/blob/master/src/routes/blog/%5Bslug%5D.svelte
	https://github.com/DryCreations/svelte-kit-blog/blob/main/src/routes/blog/%5B...rest%5D.svelte
	https://github.com/jokull/blog/blob/master/src/lib/getPosts.js
-->
