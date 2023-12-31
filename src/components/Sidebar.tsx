import {useEffect, useState} from "react";
import User from "@/objs/User";
import fetchHardwareTypes from "@/scripts/fetchHardwareTypes";
import checkLogin from "@/scripts/checkLogin";
import fetchUser from "@/scripts/fetchUser";
import Link from "next/link";
import formatUserType from "@/objs/formatUserType";

const Sidebar = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [userName, setUserName] = useState("");
    const [userType, setUserType] = useState(0);
    const [hardwareLinks, setHardwareLinks] = useState(<div></div>);
    const [umuLinks, setUmuLinks] = useState(<div></div>);

    useEffect(() => {
        if (isLoaded) return
        setIsLoaded(true);

        checkLogin(document.cookie).then(
            (isLogged: boolean) => {
                if (!isLogged) document.location.href = "/";
            }
        ).catch(console.error);
        fetchUser(document.cookie).then(
            (user: User) => {
                setUserName(user.username);
                setUserType(user.userType);

                // If user is allowed to manage users
                if (user.userType >= 2) {
                    setUmuLinks(
                        <li>
                            <Link href="/umu" className="rounded-lg px-4 py-2 text-sm font-medium text-gray-500">
                                User Management
                            </Link>
                        </li>
                    );
                }
            }
        ).catch(console.error);

        fetchHardwareTypes(document.cookie).then(
            (hardwareTypes) => {
                let content = [];
                for (const hardwareType of hardwareTypes) {
                    content.push(
                        <li key={content.length}>
                            <Link href={`/hmu?type=${hardwareType.name}`} className="capitalize px-4 py-2 text-sm font-medium text-gray-500">
                                {hardwareType.name}
                            </Link>
                        </li>
                    )
                }

                setHardwareLinks(<div>{content}</div>);
            }
        ).catch(console.error);
    });
    
    return (
        <div className="flex h-screen min-w-[12rem] flex-col justify-between border-e">
            <div className="px-4 py-6">
		<span className="flex h-10">
			<div className="w-1/3" />
			<img src="/gsb.png" alt="Gsb" className="w-1/3" />
			<div className="w-1/3" />
		</span>
                <ul className="mt-3 space-y-1">
                    <li key={1}>
                        <Link href="/dash" className="px-4 py-2 text-sm font-medium text-gray-500">
                            Dashboard
                        </Link>
                    </li>
                    <li key={2}>
                        <details className="group [&_summary::-webkit-details-marker]:hidden">
                            <summary className="flex cursor-pointer items-center justify-between px-4 py-2">
                                <Link href="/hmu">
                                    <span className="text-sm font-medium text-gray-500"> Hardware </span>
                                </Link>
                                <span className="shrink-0 transition duration-300 group-open:-rotate-180">
							<svg
                                xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
								<path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
							</svg>
						</span>
                            </summary>
                            <ul className="mt-2 space-y-1 px-2">
                                {hardwareLinks}
                                <li>
                                    <Link href="/hwtype" className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500">
                                        Hardware Types
                                    </Link>
                                </li>
                            </ul>
                        </details>
                    </li>
                    {umuLinks}
                </ul>
            </div>
            <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
                <div className="flex items-center gap-2 p-4">
                    <img alt="User Profile" src={`https://ui-avatars.com/api/?name=${userName}&rounded=true&background=random`} className="h-10 w-10 rounded-full object-cover" />
                    <div>
                        <p className="text-xs">
                            <strong className="block capitalize font-medium">{userName}</strong>
                            <span className="block capitalize font-thin">{formatUserType(userType)}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;