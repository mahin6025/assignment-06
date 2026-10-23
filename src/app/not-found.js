import Link from "next/link";
import { Dumbbell, ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#0b0f19] text-white p-4 text-center">
            <div className="bg-[#ccff00] p-3 rounded-2xl text-black mb-6">
                <Dumbbell className="w-8 h-8" />
            </div>
            <h1 className="text-5xl font-black tracking-tight mb-2">404</h1>
            <h2 className="text-xl font-bold text-gray-300 mb-4">Page Not Found</h2>
            <p className="text-gray-400 text-sm max-w-md mb-8">
                Looks like you wandered out of the gym floor. This lift doesn't exist in our library.
            </p>
            <Link
                href="/"
                className="inline-flex items-center gap-2 bg-[#ccff00] text-black font-bold px-6 py-3.5 rounded-xl hover:opacity-95 transition-opacity"
            >
                <ArrowLeft className="w-4 h-4" />
                <span>Return to Workouts</span>
            </Link>
        </div>
    );
}