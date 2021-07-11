<script lang="ts">
	export let from: number | undefined
	const to = (new Date()).getUTCFullYear()
	// https://github.com/TravisSpomer/sveltekit-content-site/blob/main/src/lib/components/Year.svelte
</script>

{(!from || to <= from) ? to.toString() : `${from}-${to}`}