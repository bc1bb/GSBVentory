import Hardware from "@/objs/Hardware";
import Link from "next/link";

interface HardwareProps {
    hardware: Hardware;
}

const HardwareTable = (props: HardwareProps) => {
    return (
        <tr>
            <td className="py-4 px-6 text-sm font-medium text-theme-darkgrey whitespace-nowrap">{props.hardware.internalId}</td>
            <td className="py-4 px-6 text-sm font-medium text-theme-blue whitespace-nowrap">{props.hardware.buyDate.toLocaleString().split("T")[0]}</td>
            <td className="py-4 px-6 text-sm font-medium text-theme-blue whitespace-nowrap">{props.hardware.manufacturer}</td>
            <td className="py-4 px-6 text-sm font-medium text-theme-blue whitespace-nowrap">{props.hardware.model}</td>
            <td className="py-4 px-6 text-sm font-medium text-theme-blue whitespace-nowrap">{props.hardware.serialNumber}</td>
            <td className="py-4 px-6 text-sm font-medium text-center whitespace-nowrap">
                <Link href={`/hmu/${props.hardware.internalId}`} className="p-2 mr-2 rounded-sm border-2 bg-theme-blue bg-opacity-20 border-theme-black text-theme-yellow hover:underline">Modifier</Link>
                <Link href={`/hmu/delete/${props.hardware.internalId}`} className="p-2 border-2 bg-theme-blue bg-opacity-20 border-theme-black text-theme-yellow hover:underline">Supprimer</Link>
            </td>
        </tr>
    )
}

export default HardwareTable;