<script>
	import Gsb from "$lib/images/gsb.png";
</script>
<svelte:head>
	<title>GSBVentory</title>
	<meta name="description" content="GSBVentory" />
</svelte:head>

<section class="min-w-0 flex-grow">
	<div class="h-[98vh] flex justify-center items-center">
		<div class="border-2 border-theme-darkgrey rounded-md p-5 bg-theme-lightgrey bg-opacity-20 border-opacity-25 hover:shadow-2xl">
			<div class="flex">
				<div class="w-1/3"></div>
				<img src={Gsb} alt="GSB Logo" class="flex mb-5 h-[10vh]">
				<div class="w-1/3"></div>
			</div>
			<form class="w-full max-w-sm">
				<div class="md:flex md:items-center mb-6">
					<div class="md:w-1/3">
						<label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="username">
							User
						</label>
					</div>
					<div class="md:w-2/3">
						<input class="hover:shadow-lg bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="username" type="text">
					</div>
				</div>
				<div class="md:flex md:items-center mb-6">
					<div class="md:w-1/3">
						<label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="password">
							Password
						</label>
					</div>
					<div class="md:w-2/3">
						<input class="hover:shadow-lg bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="password" type="password" placeholder="******************">
					</div>
				</div>
				<div class="md:flex md:items-center">
					<div class="md:w-2/3 flex grow">
						<button class="hover:shadow-lg border-2 border-theme-darkgrey font-bold py-2 px-4 rounded text-center grow " type="button">
							Login
						</button>
					</div>
				</div>
			</form>
		</div>
	</div>
</section>
