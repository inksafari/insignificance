<script>
	import VisuallyHidden from '$lib/components/VisuallyHidden.svelte';
	export let date;
	const options = {
		day: 'numeric',
		month: 'long',
		year: 'numeric'
	};
	let formattedDate = new Date(date).toLocaleDateString('en-US', options);
	let wdayDisplay = new Date(date).toLocaleDateString('ko-KR', { weekday: 'short' });
	let dateISO = new Date(date).toISOString()
</script>

<p>
	<span class="date">
		<VisuallyHidden text="發表於" />
		<time datetime={dateISO} title={formattedDate}>
			{wdayDisplay}, {formattedDate}
		</time>
	</span>
</p>

<style>
	p {
		margin: 0;
		margin-bottom: calc(var(--spacing-unit) * 4);
	}

	.date {
		color: var(--color-text-secondary);
	}
</style>
