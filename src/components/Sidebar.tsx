import {useEffect, useState} from "react";
import User from "@/objs/User";
import fetchHardwareTypes from "@/scripts/fetchHardwareTypes";
import checkLogin from "@/scripts/checkLogin";
import fetchUser from "@/scripts/fetchUser";
import Link from "next/link";

export default () => {
    const [userType, setUserType] = useState(-1); // initiating int (backend will never deliver negative userType)
    const [userName, setUserName] = useState("");
    const [hardwareLinks, setHardwareLinks] = useState(<div></div>);
    const [umuLinks, setUmuLinks] = useState(<div></div>);
    const [aigris] = useState();

    useEffect(() => {
        checkLogin(document.cookie).then(
            (isLogged: boolean) => {
                if (!isLogged) document.location.href = "/";
            }
        );
        fetchUser(document.cookie).then(
            (user: User) => {
                setUserType(user.userType);
                setUserName(user.username);
            }
        );

        // If user is allowed to manage users
        if (userType>=2) {
            setUmuLinks(
                <li>
                    <a href="/umu" className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">
                        User Management
                    </a>
                </li>
            );
        }

        fetchHardwareTypes(document.cookie).then(
            (hardwareTypes) => {
                let content = [];
                for (const hardwareType of hardwareTypes) {
                    content.push(
                        <li>
                            <Link href={`/hmu?${hardwareType.name}`} className="capitalize px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                                {hardwareType.name}
                            </Link>
                        </li>
                    )
                }

                setHardwareLinks(<div>{content}</div>);
            }
        )
    }, [aigris]);
    
    return (
        <div>
            <div className="flex h-screen flex-col justify-between border-e">
                <div className="px-4 py-6">
			<span className="flex h-10">
				<div className="w-1/3"></div>
				<img src="/gsb.png" alt="Gsb" className="w-1/3" />
				<div className="w-1/3"></div>
			</span>
                    <ul className="mt-3 space-y-1">
                        <li>
                            <a href="/user" className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">
                                Dashboard
                            </a>
                        </li>
                        <li>
                            <details className="group [&_summary::-webkit-details-marker]:hidden">
                                <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                                    <Link href="/hmu">
                                        <span className="text-sm font-medium"> Hardware </span>
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
                                        <Link href="/hwtype" className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                                            Hardware Types
                                        </Link>
                                    </li>
                                </ul>
                            </details>
                        </li>
                    </ul>
                </div>
                <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
                    <div className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50">
                        <img alt="User Profile" src={`https://ui-avatars.com/api/?name=${userName}&rounded=true&background=random`} className="h-10 w-10 rounded-full object-cover"/>
                        <div>
                            <p className="text-xs">
                                <strong className="block capitalize font-medium">{userName}</strong>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}