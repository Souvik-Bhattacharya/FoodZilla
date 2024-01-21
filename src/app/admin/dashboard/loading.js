"use client"
import { DNA } from "react-loader-spinner";
export default function Loading() {
    return (
        <div className="h-screen col-span-3 small:col-span-4 flex flex-col items-center text-center p-28">
            <DNA
                visible={true}
                height="80"
                width="80"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
            />
            <p className="text-blue-500">Loading...</p>
        </div>
    )
}