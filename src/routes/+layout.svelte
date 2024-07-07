<script>
	import { setContext } from 'svelte'
	import '../app.css';

	let lang="fa"

	setContext('lang', lang)

	let dir= lang == 'fa' ? "rtl" : "ltr"
	
</script>

<div {dir}>
	<slot></slot>
</div>

<style></style>
