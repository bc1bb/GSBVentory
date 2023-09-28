import Hardware from "@/objs/Hardware";

interface HardwareProps {
    hardware: Hardware;
}

export default (props: HardwareProps) => {
    return (
        <tr>
            <td className="py-4 px-6 text-sm font-medium text-theme-darkgrey whitespace-nowrap">{props.hardware.internalId}</td>
            <td className="py-4 px-6 text-sm font-medium text-theme-blue whitespace-nowrap">{props.hardware.buyDate.toLocaleString().split("T")[0]}</td>
            <td className="py-4 px-6 text-sm font-medium text-theme-blue whitespace-nowrap">{props.hardware.manufacturer}</td>
            <td className="py-4 px-6 text-sm font-medium text-theme-blue whitespace-nowrap">{props.hardware.model}</td>
            <td className="py-4 px-6 text-sm font-medium text-theme-blue whitespace-nowrap">{props.hardware.serialNumber}</td>
            <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                <a href={`?edit=${props.hardware.internalId}`} className="p-2 rounded-sm border-2 bg-theme-blue bg-opacity-20 border-theme-black text-theme-yellow hover:underline">Edit</a>
            </td>
        </tr>
    )
}