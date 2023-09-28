<script lang="ts">
    import fetchUser from "$lib/scripts/fetchUser";
	import {onMount} from "svelte";
	import fetchHardwareTypes from "$lib/scripts/fetchHardwareTypes";
	import type HardwareType from "$lib/objs/HardwareType";
	import Sidebar from "$lib/components/Sidebar.svelte";
	import findHardwareByType from "$lib/scripts/findHardwareByType";
	import findHardware from "$lib/scripts/findHardware";

	let userType = -1; // initiating int (backend will never deliver negative userType)
	let userName = "";
	let laptop = 0;
	let computers = 0;
	let hardwareTypes = 0;
	let hardwareTypesJson: HardwareType[] = [];
	let hardwareTypesLen = 0;

	onMount(async () => {
		const laptopsJson = await findHardwareByType(document.cookie, "laptop");
		const computersJson = await findHardware(document.cookie);
		const hardwareTypesJson = await fetchHardwareTypes(document.cookie);

		laptop = Object.keys(laptopsJson).length + 5;
		computers = Object.keys(computersJson).length;
		hardwareTypesLen = Object.keys(hardwareTypesJson).length;

		const user = await fetchUser(document.cookie);

		userType = user.userType;
		userName = user.username;
	});

</script>

<svelte:head>
	<title>GSBVentory</title>
	<meta name="description" content="GSBVentory" />
</svelte:head>

{#if userType !== -1}
<Sidebar />

<section class="flex flex-grow">
	<div class="w-1/5 flex-grow"></div>
	<div class="mx-auto max-w-screen-xl w-3/5 px-4 py-12 sm:px-6 md:py-16 lg:px-8">
		<div class="mx-auto max-w-3xl text-center">
			<h2 class="text-3xl font-bold text-gray-900 sm:text-4xl">
				Welcome to GSB Inventory Software
			</h2>
		</div>

		<div class="mt-8 sm:mt-12 border-2 border-theme-darkgrey rounded-md p-5 bg-theme-lightgrey bg-opacity-20 border-opacity-25 hover:shadow-2xl">
			<dl class="grid grid-cols-1 gap-4 sm:grid-cols-3">
				<div class="flex flex-col rounded-lg bg-blue-100 px-4 py-8 text-center">
					<dt class="order-last text-lg font-medium text-gray-500">
						Hardware Types
					</dt>
					<dd class="text-4xl font-extrabold text-blue-600 md:text-5xl">{hardwareTypesLen}</dd>
				</div>

				<div class="flex flex-col rounded-lg bg-blue-100 px-4 py-8 text-center">
					<dt class="order-last text-lg font-medium text-gray-500">
						Laptops
					</dt>
					<dd class="text-4xl font-extrabold text-blue-600 md:text-5xl">
						{laptop}
					</dd>
				</div>

				<div class="flex flex-col rounded-lg bg-blue-100 px-4 py-8 text-center">
					<dt class="order-last text-lg font-medium text-gray-500">
						Computers
					</dt>
					<dd class="text-4xl font-extrabold text-blue-600 md:text-5xl">{computers}</dd>
				</div>
			</dl>
		</div>
	</div>
	<div class="w-1/5 flex-grow"></div>
</section>
{/if}