import Hardware from "@/objs/Hardware";

interface HardwareProps {
    hardware: Hardware;
}

export default (props: HardwareProps) => {
    return (
        <tr>
            <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">{props.hardware.internalId}</td>
            <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap">{props.hardware.buyDate.toLocaleString().split("T")[0]}</td>
            <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap">{props.hardware.manufacturer}</td>
            <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap">{props.hardware.model}</td>
            <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap">{props.hardware.serialNumber}</td>
            <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                <a href={`?edit=${props.hardware.internalId}`} className="text-blue-600 hover:underline">Edit</a>
            </td>
        </tr>
    )
}