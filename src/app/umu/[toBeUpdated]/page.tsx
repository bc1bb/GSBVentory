'use client';

import Sidebar from "@/components/Sidebar";
import React, {useEffect, useState} from "react";
import formatUserType from "@/objs/formatUserType";
import findUser from "@/scripts/findUser";

const ToBeUpdated = ({params}: {params: { toBeUpdated: string }}) => {
    let [isLoaded, setIsLoaded] = useState(false);
    const newUser = (params.toBeUpdated == "new");

    const [username, setUsername] = useState("");

    useEffect(() => {
        if (isLoaded) return; setIsLoaded(true);
        if (newUser) return;

        // From now on only new user
        findUser(document.cookie, params.toBeUpdated).then(
            (user) => {
                setUsername(user.username);
            }
        ).catch(console.error);
    }, []);

    return (
        <div className="flex">
            <Sidebar />
            <div className="min-h-screen p-6 flex items-center justify-center">
                <div className="container max-w-screen-lg mx-auto">
                    <div>
                        <div className="bg-theme-lightgrey bg-opacity-20 rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                                <div className="text-gray-600">
                                    <p className="font-medium text-lg">Editing user</p>
                                </div>

                                <form className="lg:col-span-2">
                                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                                        <div className="md:col-span-5">
                                            <label htmlFor="username">Username</label>
                                            <input type="text" disabled={!newUser} defaultValue={username} name="username" id="username" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                                        </div>

                                        <div className="md:col-span-5">
                                            <label htmlFor="type">Type</label>
                                            <select id="type" name="type" className="capitalize h-10 border mt-1 rounded px-4 w-full bg-gray-50">
                                                <option value={1} className="capitalize">{formatUserType(1)}</option>
                                                <option value={2} className="capitalize">{formatUserType(2)}</option>
                                                <option value={3} className="capitalize">{formatUserType(3)}</option>
                                                <option value={4} className="capitalize">{formatUserType(4)}</option>
                                            </select>
                                        </div>

                                        <div className="md:col-span-5">
                                            <input type="submit" name="submit" id="submit" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 resize-none" />
                                        </div>
                                    </div>
                                </form>

                                <hr />

                                <form className="lg:col-span-2">
                                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                                        <div className="md:col-span-3">
                                            <label htmlFor="password">Password</label>
                                            <input type="password" placeholder="******" name="password" id="password" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                                        </div>

                                        <div className="md:col-span-2">
                                            <label htmlFor="pwsubmit" className="opacity-0">send</label>
                                            <input type="submit" name="pwsubmit" id="pwsubmit" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 resize-none" />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ToBeUpdated;