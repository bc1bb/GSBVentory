<script lang="ts">
    import type Hardware from "$lib/objs/Hardware";

    export let Hardware: Hardware;
</script>
<tr>
    <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{Hardware.internalId}</td>
    <td class="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">{Hardware.buyDate.toLocaleString().split("T")[0]}</td>
    <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{Hardware.manufacturer}</td>
    <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{Hardware.model}</td>
    <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{Hardware.serialNumber}</td>
    <td class="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
        <a href="?edit={Hardware.internalId}" class="text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
    </td>
</tr>