import React from "react";
import InputField from "../components/InputField";
import Button from "../components/Button";

export default function Login() {
  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
    <div className="relative py-3 sm:max-w-xl sm:mx-auto">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
      <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
        <div className="max-w-md mx-auto">
          <div>
            <h1 className="text-2xl font-semibold">Login</h1>
          </div>
          <div className="divide-y divide-gray-200">
            <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
              <InputField
                id="email"
                name="email"
                type="text"
                placeholder="Email address"
              />
              <InputField
                id="password"
                name="password"
                type="password"
                placeholder="Password"
              />
              <Button text="Submit" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}
