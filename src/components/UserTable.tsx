import User from "@/objs/User";
import Link from "next/link";
import formatUserType from "@/objs/formatUserType";

interface UserProps {
    user: User;
}

const UserTable = (props: UserProps) => {
    return (
        <tr>
            <td className="py-4 px-6 text-sm font-medium text-theme-darkgrey whitespace-nowrap">{props.user.username}</td>
            <td className="py-4 px-6 text-sm font-medium text-theme-blue whitespace-nowrap">{formatUserType(props.user.userType)}</td>
            <td className="py-4 px-6 text-sm font-medium text-center whitespace-nowrap">
                <Link href={`/umu/${props.user.username}`} className="p-2 mr-2 rounded-sm border-2 bg-theme-blue bg-opacity-20 border-theme-black text-theme-yellow hover:underline">Edit</Link>
                <Link href={`/umu/delete/${props.user.username}`} className="p-2 border-2 bg-theme-blue bg-opacity-20 border-theme-black text-theme-yellow hover:underline">Delete</Link>
            </td>
        </tr>
    )
}

export default UserTable;