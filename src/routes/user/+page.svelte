<script lang="ts">
	import Gsb from "$lib/images/gsb.png";
	import checkLogin from "$lib/scripts/checkLogin";
	import {onMount} from "svelte";

	onMount(async () => {
		const loggedIn = await checkLogin(document.cookie);

		 if(!loggedIn) {
			 document.location.href = "/";
		 }
	})

</script>
<svelte:head>
	<title>GSBVentory</title>
	<meta name="description" content="GSBVentory" />
</svelte:head>

<section class="min-w-0 flex-grow">
	<h1>Bonjour</h1>
</section>
