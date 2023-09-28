<script lang="ts">
	import fetchUser from "$lib/scripts/fetchUser";
	import {onMount} from "svelte";
	import findHardware from "$lib/scripts/findHardware";
	import Sidebar from "$lib/components/Sidebar.svelte";
	import {page} from "$app/stores";
	import findHardwareByType from "$lib/scripts/findHardwareByType";
	import HardwareTable from "$lib/components/HardwareTable.svelte";
	import type Hardware from "$lib/objs/Hardware";

	let userType = -1; // initiating int (backend will never deliver negative userType)
	let findHardwarePromise: Promise<Hardware[]>;
	let findHardwareByTypePromise: Promise<Hardware[]>;
	const typeInUrl = $page.url.searchParams.get("type");
	let typeDefined: boolean;

	onMount(async () => {
		const user = await fetchUser(document.cookie);

		// user wants a specific type
		if (typeInUrl == undefined) {
			typeDefined = false;
			findHardwarePromise = findHardware(document.cookie);
		} else {
			typeDefined = true;
			findHardwareByTypePromise = findHardwareByType(document.cookie, typeInUrl);
		}

		userType = user.userType;
	});

</script>

<svelte:head>
	<title>GSBVentory</title>
	<meta name="description" content="GSBVentory" />
</svelte:head>

{#if userType !== -1}
	<Sidebar />

	<div class="container p-[5vh]">
		<div class="flex flex-col">
			<div class="h-[90vh] overflow-y-scroll w-full align-middle">
				<table class="w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
					<thead class="bg-theme-lightgrey bg-opacity-20">
						<tr>
							<th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
								Identifiant interne
							</th>
							<th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
								Date d'achat
							</th>
							<th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
								Constructeur
							</th>
							<th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
								Modèle
							</th>
							<th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
								Numéro de série
							</th>
							<th scope="col" class="p-4">
								<span class="sr-only">Edit</span>
							</th>
						</tr>
					</thead>
					<tbody class="divide-y dark:bg-gray-800 dark:divide-gray-700">
						{#if typeDefined}
							{#await findHardwareByTypePromise then hardwareJson}
								{#each hardwareJson as i}
									<HardwareTable Hardware={i} />
								{/each}
							{/await}
						{:else}
							{#await findHardwarePromise then hardwareJson}
								{#each hardwareJson as i}
									<HardwareTable Hardware={i} />
								{/each}
							{/await}
						{/if}
					</tbody>
				</table>
			</div>
		</div>
	</div>
{/if}