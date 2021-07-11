<script>
	import { page } from '$app/stores';
	import Year from '$lib/components/Year.svelte';
</script>

<header>
	<a href="/"><h1 class:small={$page.path !== '/'}>INKSAFARI</h1></a>
</header>

<main>
	<slot />
</main>

<footer>
	<p>
		Copyright &#169; 林晗俞(<a href="https://twitter.com/inksafari">@inksafari</a>), <Year from={2021} />
	</p>
</footer>

<style>
	:global(:root) {
		--spacing-unit: 4px;
		--color-background: #e5e5e5;
		--color-text-primary: #212121;
		--color-text-secondary: #5a5a5a;
	}

	:global(body) {
		margin: 0 auto;
		max-width: 75ch;
		padding: calc(var(--spacing-unit) * 8);
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
			'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;

		background-color: var(--color-background);
		color: var(--color-text-primary);
		line-height: 1.51;
		font-size: 18px;
	}

	:global(a) {
		text-decoration: none;
		color: var(--color-text-primary);
		font-weight: 700;
	}

	:global(a:visited) {
		text-decoration: none;
		color: var(--color-text-primary);
		font-weight: 700;
	}

	:global(a:active) {
		text-decoration: none;
		color: var(--color-text-primary);
		font-weight: 700;
	}

	:global(a:hover) {
		text-decoration: underline;
	}

	.small {
		font-size: 1.6rem;
	}

	footer {
		margin-top: calc(var(--spacing-unit) * 8);
	}
</style>