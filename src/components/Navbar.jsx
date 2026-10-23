"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dumbbell } from "lucide-react";

export default function Navbar({ planCount = 0, savedCount = 0 }) {
    const pathname = usePathname();

    return (
        <header className="sticky top-0 z-50 bg-[#0b0f19]/90 backdrop-blur-md border-b border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

                {/* Left: Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="bg-[#ccff00] p-2 rounded-lg text-black font-black flex items-center justify-center group-hover:scale-105 transition-transform">
                        <Dumbbell className="w-5 h-5" />
                    </div>
                    <span className="text-xl font-extrabold tracking-wider text-white">FIT<span className="text-[#ccff00]">LOG</span></span>
                </Link>

                {/* Middle: Links */}
                <nav className="hidden md:flex items-center gap-8">
                    <Link
                        href="/"
                        className={`text-sm font-semibold transition-colors ${pathname === "/" ? "text-[#ccff00]" : "text-gray-400 hover:text-white"}`}
                    >
                        Workout
                    </Link>
                    <Link
                        href="/my-plan"
                        className={`text-sm font-semibold transition-colors ${pathname === "/my-plan" ? "text-[#ccff00]" : "text-gray-400 hover:text-white"}`}
                    >
                        My Plan
                    </Link>
                </nav>

                {/* Right: Status Badges */}
                <div className="flex items-center gap-3">
                    <Link href="/my-plan" className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#ccff00] text-black text-xs font-bold hover:opacity-90 transition-opacity">
                        <span>Plan</span>
                        <span className="bg-black text-[#ccff00] px-1.5 py-0.2 rounded-full">{planCount}</span>
                    </Link>
                    <Link href="/my-plan" className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-700 text-gray-300 text-xs font-bold hover:border-gray-500 transition-colors">
                        <span>Saved</span>
                        <span className="bg-gray-800 text-gray-200 px-1.5 py-0.2 rounded-full">{savedCount}</span>
                    </Link>
                </div>

            </div>
        </header>
    );
}