import { Dumbbell } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-[#07090e] border-t border-gray-800 py-8 mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">

                {/* Left */}
                <div className="flex items-center gap-2">
                    <div className="bg-[#ccff00] p-1.5 rounded text-black">
                        <Dumbbell className="w-4 h-4" />
                    </div>
                    <span className="font-extrabold tracking-wider text-white">FITLOG</span>
                </div>

                {/* Right */}
                <p className="text-xs text-gray-500 text-center sm:text-right">
                    © 2026 FitLog — Workout Library. Train hard, log honest.
                </p>

            </div>
        </footer>
    );
}