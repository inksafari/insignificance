<script>
	export let title;
	//export let description;

	const siteTitle = 'INKSAFARI';
	const formattedTitle = title ? `${title} | ${siteTitle}` : siteTitle;
</script>

<svelte:head>
	<title>{formattedTitle}</title>

</svelte:head>
