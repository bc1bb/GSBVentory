'use client';

import Sidebar from "@/components/Sidebar";
import {useEffect} from "react";
import deleteUser from "@/scripts/deleteUser";

const ToBeDeleted = ({params}: {params: { toBeDeleted: string }}) => {
    useEffect(() => {
        deleteUser(document.cookie, params.toBeDeleted).then(() => {document.location = "/umu";})
    });

    return (
        <div className="flex">
            <Sidebar />
            Working...
        </div>
    )
}

export default ToBeDeleted;