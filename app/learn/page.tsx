'use client'

import Link from "next/link";

export default function Learn() {
  const TOTAL_LESSONS: number = 4; // Change this to 25 after adding all the lessons
  return (
    <div className="space-y-4">
      <div className="bg-blue-500 p-4 text-white flex items-center justify-between">
        <div className="cursor-pointer" onClick={() => {
            window.history.back();
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
        </div>
        <h1 className="text-2xl mx-auto">Learn</h1> {/* This will center the 'Learn' heading */}
      </div>

      <div className="grid grid-cols-3">
        {Array.from({ length: TOTAL_LESSONS }, (_, i) => i + 1).map((lesson: number) => (
          <Link key={lesson} href={`/learn/lessons/${lesson}`} className="bg-gray-400 border-2 rounded-md p-4">
            <span className="text-center text-md text-white"> Lesson {lesson}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
