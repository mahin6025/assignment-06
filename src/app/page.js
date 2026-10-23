"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowDown, Flame, Clock, Star, ChevronDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("Duration");

  // State for counters synced with localStorage
  const [planCount, setPlanCount] = useState(0);
  const [savedCount, setSavedCount] = useState(0);

  useEffect(() => {
    // Fetch data from API
    fetch("https://api.abcz.workers.dev/api/fitlog")
      .then((res) => res.json())
      .then((data) => {
        setWorkouts(data.workouts || data); // depending on structure
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch workouts", err);
        setLoading(false);
      });

    // Load counts from local storage
    const storedPlan = JSON.parse(localStorage.getItem("fitlog_plan")) || [];
    const storedSaved = JSON.parse(localStorage.getItem("fitlog_saved")) || [];
    setPlanCount(storedPlan.length);
    setSavedCount(storedSaved.length);
  }, []);

  // Sorting logic
  const sortedWorkouts = [...workouts].sort((a, b) => {
    if (sortBy === "Duration") return parseInt(a.duration) - parseInt(b.duration);
    if (sortBy === "Calories") return parseInt(b.calories) - parseInt(a.calories);
    if (sortBy === "Rating") return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0f19]">
      <Navbar planCount={planCount} savedCount={savedCount} />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <span className="text-[#ccff00] font-bold text-xs tracking-widest uppercase bg-[#ccff00]/10 px-3 py-1 rounded-full">
            WORKOUT LIBRARY
          </span>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white uppercase font-sans">
            TRAIN WITH INTENT. LOG EVERY SET.
          </h1>
          <p className="text-gray-400 text-base sm:text-lg">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.
          </p>
          <div>
            <a
              href="#library"
              className="inline-flex items-center gap-2 bg-[#ccff00] text-black font-bold px-6 py-3.5 rounded-xl hover:opacity-90 transition-opacity"
            >
              <span>BROWSE WORKOUTS</span>
              <ArrowDown className="w-4 h-4" />
            </a>
          </div>
        </div>
        <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden border border-gray-800 bg-gray-900 flex items-center justify-center">
          <img
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop"
            alt="Gym Workout"
            className="object-cover w-full h-full opacity-60"
          />
        </div>
      </section>

      {/* Library Section */}
      <section id="library" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-wide">THE LIBRARY</h2>
            <p className="text-gray-400 text-sm mt-1">Twelve lifts covering every major muscle group.</p>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 bg-gray-900 border border-gray-800 px-3 py-2 rounded-xl text-sm">
            <span className="text-gray-400">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-white font-semibold focus:outline-none cursor-pointer"
            >
              <option value="Duration" className="bg-gray-900">Duration</option>
              <option value="Calories" className="bg-gray-900">Calories</option>
              <option value="Rating" className="bg-gray-900">Rating</option>
            </select>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-10 h-10 border-4 border-[#ccff00] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-400 text-sm animate-pulse">Loading workouts…</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedWorkouts.map((workout) => (
              <Link
                key={workout.id || workout._id}
                href={`/workout/${workout.id || workout._id}`}
                className="group bg-[#131826] border border-gray-800 rounded-2xl overflow-hidden hover:border-[#ccff00]/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="h-48 overflow-hidden relative bg-gray-800">
                    <img
                      src={workout.image || workout.thumbnail || "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600&auto=format&fit=crop"}
                      alt={workout.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-80"
                    />
                    <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
                      {workout.category?.map((cat, idx) => (
                        <span key={idx} className="bg-black/70 backdrop-blur-sm text-[#ccff00] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                          {cat}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="p-5 space-y-2">
                    <h3 className="text-lg font-bold text-white group-hover:text-[#ccff00] transition-colors uppercase">
                      {workout.name}
                    </h3>
                    <p className="text-xs text-gray-400">{workout.equipment}</p>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-3 border-t border-gray-800/60 flex items-center justify-between text-xs text-gray-300">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#ccff00]" />
                    <span>{workout.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 text-orange-400" />
                    <span>{workout.calories}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                    <span>{workout.rating}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}