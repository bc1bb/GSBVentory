<script lang="ts">
    import Gsb from "$lib/images/gsb.png";
    import fetchHardwareTypes from "$lib/scripts/fetchHardwareTypes";
    import {onMount} from "svelte";
    import checkLogin from "$lib/scripts/checkLogin";
    import fetchUser from "$lib/scripts/fetchUser";

    let userType = -1; // initiating int (backend will never deliver negative userType)
    let userName = "";

    onMount(async () => {
        const loggedIn = await checkLogin(document.cookie);
        if (!loggedIn) document.location.href = "/";

        const user = await fetchUser(document.cookie);

        userType = user.userType;
        userName = user.username;
    })
</script>

<div class="flex h-screen flex-col justify-between border-e">
    <div class="px-4 py-6">
        <span class="flex h-10">
            <div class="w-1/3"></div>
            <img src={Gsb} alt="Gsb" class="w-1/3">
            <div class="w-1/3"></div>
        </span>

        <ul class="mt-3 space-y-1">
            <li>
                <a href="/user" class="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">
                    Dashboard
                </a>
            </li>

            <li>
                <details class="group [&_summary::-webkit-details-marker]:hidden">
                    <summary class="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                        <a href="/hmu"><span class="text-sm font-medium"> Hardware </span></a>
                        <span class="shrink-0 transition duration-300 group-open:-rotate-180">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
								<path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
             		 		</svg>
            			</span>
                    </summary>

                    <ul class="mt-2 space-y-1 px-2">
                        {#await fetchHardwareTypes(document.cookie) then hardwareTypesJson}
                            {#each hardwareTypesJson as i}
                                <li>
                                    <a href="/hmu?{i.name}" class="capitalize px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                                        {i.name}
                                    </a>
                                </li>
                            {/each}
                        {/await}
                        <li>
                            <a href="/hwtype" class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                                Hardware Types
                            </a>
                        </li>
                    </ul>
                </details>
            </li>
            {#if userType >= 2}
                <li>
                    <a href="/umu" class="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">
                        User Management
                    </a>
                </li>
            {/if}
        </ul>
    </div>

    <div class="sticky inset-x-0 bottom-0 border-t border-gray-100">
        <div class="flex items-center gap-2 bg-white p-4 hover:bg-gray-50">
            <img alt="User Profile" src="https://ui-avatars.com/api/?name={userName}&rounded=true&background=random" class="h-10 w-10 rounded-full object-cover"/>
            <div>
                <p class="text-xs">
                    <strong class="block font-medium">{userName}</strong>
                </p>
            </div>
        </div>
    </div>
</div>