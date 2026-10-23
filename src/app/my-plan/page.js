"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Clock, Flame, Star, Trash2, Check, ArrowRight } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function MyPlan() {
    const [activeTab, setActiveTab] = useState("plan"); // 'plan' or 'saved'
    const [planItems, setPlanItems] = useState([]);
    const [savedItems, setSavedItems] = useState([]);
    const [doneItems, setDoneItems] = useState({});

    useEffect(() => {
        const storedPlan = JSON.parse(localStorage.getItem("fitlog_plan")) || [];
        const storedSaved = JSON.parse(localStorage.getItem("fitlog_saved")) || [];
        const storedDone = JSON.parse(localStorage.getItem("fitlog_done")) || {};

        setPlanItems(storedPlan);
        setSavedItems(storedSaved);
        setDoneItems(storedDone);
    }, []);

    const handleRemovePlan = (id) => {
        const updated = planItems.filter((item) => (item.id || item._id) !== id);
        setPlanItems(updated);
        localStorage.setItem("fitlog_plan", JSON.stringify(updated));
        toast.success("Removed from today's plan");
    };

    const handleToggleDone = (id) => {
        const updatedDone = { ...doneItems, [id]: !doneItems[id] };
        setDoneItems(updatedDone);
        localStorage.setItem("fitlog_done", JSON.stringify(updatedDone));
        if (updatedDone[id]) {
            toast.success("Workout marked as done! 💪");
        }
    };


    const totalExercises = planItems.length;
    const totalMinutes = planItems.reduce((acc, item) => acc + parseInt(item.duration || 0), 0);
    const totalCalories = planItems.reduce((acc, item) => acc + parseInt(item.calories || item.calorie || 0), 0);
    const currentList = activeTab === "plan" ? planItems : savedItems;

    return (
        <div className="min-h-screen flex flex-col bg-[#0b0f19]">
            <Toaster position="bottom-right" />
            <Navbar planCount={planItems.length} savedCount={savedItems.length} />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-grow w-full space-y-8">


                <div>
                    <h1 className="text-3xl font-black text-white uppercase tracking-tight">MY PLAN</h1>
                    <p className="text-gray-400 text-sm mt-1">Cap of five lifts for today. Finish them, then load more[cite: 2].</p>
                </div>


                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-[#131826] border border-gray-800 p-5 rounded-2xl flex items-center justify-between">
                        <div>
                            <p className="text-xs text-gray-400 font-semibold uppercase">Exercises</p>
                            <h3 className="text-2xl font-black text-white mt-1">{totalExercises}</h3>
                        </div>
                        <div className="bg-[#ccff00]/10 text-[#ccff00] p-3 rounded-xl font-bold">
                            🏋️
                        </div>
                    </div>
                    <div className="bg-[#131826] border border-gray-800 p-5 rounded-2xl flex items-center justify-between">
                        <div>
                            <p className="text-xs text-gray-400 font-semibold uppercase">Minutes</p>
                            <h3 className="text-2xl font-black text-white mt-1">{totalMinutes}</h3>
                        </div>
                        <div className="bg-blue-500/10 text-blue-400 p-3 rounded-xl font-bold">
                            ⏱️
                        </div>
                    </div>
                    <div className="bg-[#131826] border border-gray-800 p-5 rounded-2xl flex items-center justify-between">
                        <div>
                            <p className="text-xs text-gray-400 font-semibold uppercase">Calories</p>
                            <h3 className="text-2xl font-black text-white mt-1">{totalCalories}</h3>
                        </div>
                        <div className="bg-orange-500/10 text-orange-400 p-3 rounded-xl font-bold">
                            🔥
                        </div>
                    </div>
                </div>


                <div className="flex border-b border-gray-800 gap-8">
                    <button
                        onClick={() => setActiveTab("plan")}
                        className={`pb-3 text-sm font-bold border-b-2 transition-colors ${activeTab === "plan" ? "border-[#ccff00] text-[#ccff00]" : "border-transparent text-gray-400 hover:text-white"}`}
                    >
                        Today's Plan ({planItems.length})
                    </button>
                    <button
                        onClick={() => setActiveTab("saved")}
                        className={`pb-3 text-sm font-bold border-b-2 transition-colors ${activeTab === "saved" ? "border-[#ccff00] text-[#ccff00]" : "border-transparent text-gray-400 hover:text-white"}`}
                    >
                        Saved ({savedItems.length})
                    </button>
                </div>


                {currentList.length === 0 ? (
                    <div className="bg-[#131826] border border-gray-800 rounded-2xl p-12 text-center space-y-4 max-w-lg mx-auto my-12">
                        <h3 className="text-xl font-black text-white uppercase">NOTHING HERE YET</h3>
                        <p className="text-gray-400 text-sm">Browse the library and add a lift to get today moving[cite: 2].</p>
                        <div>
                            <Link href="/" className="inline-flex items-center gap-2 bg-[#ccff00] text-black font-bold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity">
                                <span>Go to workouts</span>
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {currentList.map((item) => {
                            const itemId = item.id || item._id;
                            const isDone = doneItems[itemId];

                            return (
                                <div
                                    key={itemId}
                                    className={`bg-[#131826] border rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all ${isDone ? "border-green-500/50 bg-green-950/10 opacity-75" : "border-gray-800"}`}
                                >
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={item.image || item.thumbnail || "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=200&auto=format&fit=crop"}
                                            alt={item.name}
                                            className="w-16 h-16 rounded-xl object-cover bg-gray-800"
                                        />
                                        <div className="space-y-1">
                                            <h4 className={`font-bold text-base uppercase text-white ${isDone ? "line-through text-gray-400" : ""}`}>
                                                {item.name}
                                            </h4>
                                            <p className="text-xs text-gray-400">{item.equipment}</p>

                                            <div className="flex items-center gap-4 text-xs text-gray-300 pt-1">
                                                <div className="flex items-center gap-1">
                                                    <Clock className="w-3 h-3 text-[#ccff00]" />
                                                    <span>{item.duration}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Flame className="w-3 h-3 text-orange-400" />
                                                    <span>{item.calorie}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                                                    <span>{item.rating}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                                        <Link
                                            href={`/workout/${itemId}`}
                                            className="px-3.5 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-white text-xs font-semibold transition-colors"
                                        >
                                            View Details
                                        </Link>

                                        {activeTab === "plan" && (
                                            <button
                                                onClick={() => handleToggleDone(itemId)}
                                                className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1 transition-colors ${isDone ? "bg-green-500 text-black border-green-500" : "border-gray-700 text-gray-300 hover:border-gray-500"}`}
                                                title="Mark as Done"
                                            >
                                                <Check className="w-4 h-4" />
                                            </button>
                                        )}

                                        {activeTab === "plan" && (
                                            <button
                                                onClick={() => handleRemovePlan(itemId)}
                                                className="p-2 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors"
                                                title="Remove"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

            </main>

            <Footer />
        </div>
    );
}