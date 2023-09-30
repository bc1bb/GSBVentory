'use client';

import Sidebar from "@/components/Sidebar";
import React, {useState} from "react";
import getCookie from "@/scripts/getCookie";

const ToBeUpdated = ({params}: {params: { toBeUpdated: string }}) => {
    const PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
    const [name, setName] = useState("");
    const [internalId, setInternalId] = useState("");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formBody = `name=${name}&internalId=${internalId}`;

        const response = await fetch(PUBLIC_BACKEND_URL + "/hmu/type", {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                'Authorization': getCookie("token", document.cookie)
            },
            body: formBody,
        });

        if (response.ok) {
            document.location = "/hwtype";
        }
    }

    return (
        <div className="flex">
            <Sidebar />
            <div className="min-h-screen p-6 flex items-center justify-center">
                <div className="container max-w-screen-lg mx-auto">
                    <div>
                        <div className="bg-theme-lightgrey bg-opacity-20 rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                                <div className="text-gray-600">
                                    <p className="font-medium text-lg">Creating Hardware Type</p>
                                </div>

                                <div className="lg:col-span-2">
                                    <form onSubmit={handleSubmit}>
                                        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                                            <div className="md:col-span-5">
                                                <label htmlFor="name">Name</label>
                                                <input type="text" onChange={e=>setName(e.target.value)} value={name} name="name" id="name" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                                            </div>

                                            <div className="md:col-span-5">
                                                <label htmlFor="username">Username</label>
                                                <input type="text" onChange={e=>setInternalId(e.target.value)} value={internalId} name="internalId" id="internalId" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                                            </div>


                                            <div className="md:col-span-5">
                                                <input type="submit" name="submit" id="submit" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ToBeUpdated;