<script lang="ts">
	import Gsb from "$lib/images/gsb.png";
	import {PUBLIC_BACKEND_URL} from "$env/static/public";

	const handleSubmit = async (event: Event) => {
		event.preventDefault();

		let username = (document.getElementById("username") as HTMLInputElement).value;
		let password = (document.getElementById("password") as HTMLInputElement).value;

		const details = {username, password};
		//@ts-ignore
		const formBody = Object.keys(details).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(details[key])).join('&');

		try {
			const response = await fetch(PUBLIC_BACKEND_URL + "/login", {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
				},
				body: formBody,
			});

			if (response.ok) {
				const token = JSON.parse(JSON.stringify(await response.json())).token;
				// What in the fucking hell is this absolute fucking piece of trash

				document.cookie = `token=${token}; path=/; max-age=1209600`; // 14 days
				document.location = "/user";
			}
		} catch (error) {
			console.error(error);
		}
	}
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
			<form class="w-full max-w-sm" on:submit|preventDefault={handleSubmit}>
				<div class="md:flex md:items-center mb-6">
					<div class="md:w-1/3">
						<label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="username">
							User
						</label>
					</div>
					<div class="md:w-2/3">
						<input required class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="username" type="text">
					</div>
				</div>
				<div class="md:flex md:items-center mb-6">
					<div class="md:w-1/3">
						<label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="password">
							Password
						</label>
					</div>
					<div class="md:w-2/3">
						<input required class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="password" type="password" placeholder="************">
					</div>
				</div>
				<div class="md:flex md:items-center">
					<div class="md:w-2/3 flex grow">
						<button class="border-2 border-theme-darkgrey font-bold py-2 px-4 rounded text-center grow" type="submit">
							Login
						</button>
					</div>
				</div>
			</form>
		</div>
	</div>
</section>
