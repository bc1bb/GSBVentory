<script>
	import '../../app.css';
	import '$lib/images/bg.jpg';
</script>

<div class="bg-[url('bg.jpg')] flex flex-grow flex-col">
	<main class="flex flex-grow">
		<slot />
	</main>
</div>
