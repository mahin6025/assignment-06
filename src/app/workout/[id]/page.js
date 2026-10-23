"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Bookmark, Clock, Flame, Star, Check } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function WorkoutDetail({ params }) {
    const unwrappedParams = use(params);
    const id = unwrappedParams.id;

    const [workout, setWorkout] = useState(null);
    const [loading, setLoading] = useState(true);
    const [planCount, setPlanCount] = useState(0);
    const [savedCount, setSavedCount] = useState(0);

    useEffect(() => {
        fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setWorkout(data.workout || data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Failed to fetch workout details", err);
                setLoading(false);
            });

        const storedPlan = JSON.parse(localStorage.getItem("fitlog_plan")) || [];
        const storedSaved = JSON.parse(localStorage.getItem("fitlog_saved")) || [];
        setPlanCount(storedPlan.length);
        setSavedCount(storedSaved.length);
    }, [id]);

    const handleAddToPlan = () => {
        let storedPlan = JSON.parse(localStorage.getItem("fitlog_plan")) || [];
        if (storedPlan.length >= 5) {
            toast.error("Plan is full! Maximum 5 lifts allowed for today.");
            return;
        }
        if (!storedPlan.some((item) => (item.id || item._id) === (workout.id || workout._id))) {
            storedPlan.push(workout);
            localStorage.setItem("fitlog_plan", JSON.stringify(storedPlan));
            setPlanCount(storedPlan.length);
            toast.success("Added to today's plan!");
        } else {
            toast("Already in today's plan!");
        }
    };

    const handleSaveForLater = () => {
        let storedSaved = JSON.parse(localStorage.getItem("fitlog_saved")) || [];
        if (!storedSaved.some((item) => (item.id || item._id) === (workout.id || workout._id))) {
            storedSaved.push(workout);
            localStorage.setItem("fitlog_saved", JSON.stringify(storedSaved));
            setSavedCount(storedSaved.length);
            toast.success("Saved for later!");
        } else {
            toast("Already saved!");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0b0f19]">
                <div className="w-10 h-10 border-4 border-[#ccff00] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!workout) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#0b0f19] text-white">
                <h1 className="text-2xl font-bold mb-4">Workout Not Found</h1>
                <Link href="/" className="bg-[#ccff00] text-black font-bold px-4 py-2 rounded-xl">Back to Home</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-[#0b0f19]">
            <Toaster position="bottom-right" />
            <Navbar planCount={planCount} savedCount={savedCount} />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-grow w-full">
                <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm font-semibold mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Library</span>
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Left Side: Media */}
                    <div className="rounded-2xl overflow-hidden border border-gray-800 bg-gray-900 sticky top-24">
                        <img
                            src={workout.image || workout.thumbnail || "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop"}
                            alt={workout.name}
                            className="w-full h-auto object-cover opacity-90"
                        />
                    </div>

                    {/* Right Side: Details */}
                    <div className="space-y-6">
                        <div className="flex gap-2 flex-wrap">
                            {workout.category?.map((cat, idx) => (
                                <span key={idx} className="bg-[#ccff00]/10 text-[#ccff00] text-xs font-bold px-3 py-1 rounded-full uppercase">
                                    {cat}
                                </span>
                            ))}
                        </div>

                        <h1 className="text-3xl sm:text-4xl font-black text-white uppercase">{workout.name}</h1>
                        <p className="text-gray-400 text-sm sm:text-base leading-relaxed">{workout.description}</p>

                        {/* Key Specs Table */}
                        <div className="bg-[#131826] border border-gray-800 rounded-2xl overflow-hidden divide-y divide-gray-800">
                            <div className="grid grid-cols-2 p-3.5 text-xs font-semibold">
                                <span className="text-gray-400">EQUIPMENT</span>
                                <span className="text-white text-right">{workout.equipment}</span>
                            </div>
                            <div className="grid grid-cols-2 p-3.5 text-xs font-semibold">
                                <span className="text-gray-400">DIFFICULTY</span>
                                <span className="text-white text-right">{workout.difficulty || "Intermediate"}</span>
                            </div>
                            <div className="grid grid-cols-2 p-3.5 text-xs font-semibold">
                                <span className="text-gray-400">SETS</span>
                                <span className="text-white text-right">{workout.sets || "4"}</span>
                            </div>
                            <div className="grid grid-cols-2 p-3.5 text-xs font-semibold">
                                <span className="text-gray-400">REPS</span>
                                <span className="text-white text-right">{workout.reps || "6-8"}</span>
                            </div>
                            <div className="grid grid-cols-2 p-3.5 text-xs font-semibold">
                                <span className="text-gray-400">DURATION</span>
                                <span className="text-white text-right">{workout.duration}</span>
                            </div>
                            <div className="grid grid-cols-2 p-3.5 text-xs font-semibold">
                                <span className="text-gray-400">CALORIES</span>
                                <span className="text-white text-right">{workout.calories}</span>
                            </div>
                            <div className="grid grid-cols-2 p-3.5 text-xs font-semibold">
                                <span className="text-gray-400">RATING</span>
                                <span className="text-white text-right">{workout.rating}</span>
                            </div>
                        </div>

                        {/* Instructions */}
                        {workout.instructions && workout.instructions.length > 0 && (
                            <div className="space-y-3">
                                <h3 className="text-sm font-black uppercase text-white tracking-wider">Instructions</h3>
                                <ol className="space-y-2">
                                    {workout.instructions.map((step, idx) => (
                                        <li key={idx} className="text-xs sm:text-sm text-gray-300 flex gap-3 bg-gray-900/50 p-3 rounded-xl border border-gray-800">
                                            <span className="font-bold text-[#ccff00]">{idx + 1}.</span>
                                            <span>{step}</span>
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <button
                                onClick={handleAddToPlan}
                                className="flex-1 bg-[#ccff00] text-black font-bold px-6 py-3.5 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                            >
                                <Plus className="w-5 h-5" />
                                <span>Add to today's plan</span>
                            </button>
                            <button
                                onClick={handleSaveForLater}
                                className="flex-1 border border-gray-700 text-white font-bold px-6 py-3.5 rounded-xl flex items-center justify-center gap-2 hover:border-gray-500 transition-colors"
                            >
                                <Bookmark className="w-5 h-5" />
                                <span>Save for later</span>
                            </button>
                        </div>

                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}