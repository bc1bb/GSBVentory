'use client';

import {useEffect, useState} from "react";
import {useSearchParams} from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";
import UserTable from "@/components/UserTable";
import findUsers from "@/scripts/findUsers";

const Umu = () => {
    const searchParams = useSearchParams();
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState(<></>);

    let content: JSX.Element[] = [];
    useEffect(() => {
        if (isLoaded) return
        setIsLoaded(true);

        findUsers(document.cookie).then(
            (users) => {
                for (const user of users) {
                    content.push(<UserTable user={user} />)
                }

                setData(<tbody className="divide-y divide-black">{content}</tbody>);
            }
        )
    });

    return (
        <div className="flex">
            <Sidebar />

            <div className="container p-[5vh]">
                <div className="flex flex-col">
                    <div className="h-[90vh] overflow-y-scroll w-full align-middle">
                        <table className="table-fixed w-full divide-y divide-gray-700">
                            <thead className="bg-theme-lightgrey bg-opacity-20">
                                <tr>
                                    <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase">
                                        Name
                                    </th>
                                    <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase">
                                        User Type
                                    </th>
                                    <th scope="col" className="py-3 px-6 text-center text-xs font-medium tracking-wider text-gray-700 uppercase">
                                        <Link href="/umu/new" className="font-bold p-2 rounded-sm border-2 bg-theme-blue bg-opacity-20 border-theme-black text-theme-yellow hover:underline">Add</Link>
                                    </th>
                                </tr>
                            </thead>
                            {data}
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Umu;