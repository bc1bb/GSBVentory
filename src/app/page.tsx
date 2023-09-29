'use client';

import LoginResponse from "@/objs/LoginResponse";
import React from "react";

export default function Home() {
  const PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let username = (document.getElementById("username") as HTMLInputElement).value;
    let password = (document.getElementById("password") as HTMLInputElement).value;

    const details = {username, password};
    //@ts-ignore
    const formBody = Object.keys(details).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(details[key])).join('&');

    try {
      const response = await fetch(PUBLIC_BACKEND_URL + "/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formBody,
      });

      if (response.ok) {
        const token = (await response.json() as LoginResponse).token;

        document.cookie = `token=${token}; path=/; max-age=1209600`; // 14 days
        document.location = "/dash";
      } else {
        document.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
      <section className="min-w-0 flex-grow">
        <div className="h-[98vh] flex justify-center items-center">
          <div className="border-2 border-theme-darkgrey rounded-md p-5 bg-theme-lightgrey bg-opacity-20 border-opacity-25 hover:shadow-2xl">
            <div className="flex">
              <div className="w-1/3"></div>
              <img src="/gsb.png" alt="GSB Logo" className="flex mb-5 h-[10vh]" />
                <div className="w-1/3"></div>
            </div>
            <form className="w-full max-w-sm" onSubmit={handleSubmit}>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="username">
                  User
                </label>
              </div>
              <div className="md:w-2/3">
                <input required className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="username" type="text" />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="password">
                  Password
                </label>
              </div>
              <div className="md:w-2/3">
                <input required className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="password" type="password" placeholder="************" />
              </div>
            </div>
            <div className="md:flex md:items-center">
              <div className="md:w-2/3 flex grow">
                <button className="border-2 border-theme-darkgrey font-bold py-2 px-4 rounded text-center grow" type="submit">
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
</section>
  )
}
