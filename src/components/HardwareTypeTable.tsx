import Link from "next/link";
import HardwareType from "@/objs/HardwareType";

interface HardwareTypeProps {
    hardwareType: HardwareType;
}

const HardwareTypeTable = (props: HardwareTypeProps) => {
    return (
        <tr>
            <td className="capitalize py-4 px-6 text-sm font-medium text-theme-darkgrey whitespace-nowrap">{props.hardwareType.name}</td>
            <td className="py-4 px-6 text-sm font-medium text-theme-blue whitespace-nowrap">{props.hardwareType.internalId}</td>
            <td className="py-4 px-6 text-sm font-medium text-center whitespace-nowrap">
                <Link href={`/hwtype/delete/${props.hardwareType.name}`} className="p-2 border-2 bg-theme-blue bg-opacity-20 border-theme-black text-theme-yellow hover:underline">Delete</Link>
            </td>
        </tr>
    )
}

export default HardwareTypeTable;