"use client";

import React, { useState, useEffect } from "react";

async function loadLessonData(lessonId: number) {
  try {
    const lesson = await import(`../../../../data/lesson${lessonId}.json`);
    return lesson.default;
  } catch (error) {
    console.error("Error loading lesson data:", error);
    return [];
  }
}

export default function Lesson({ params }: { params: { id: number } }) {
  const [vocabs, setVocabs] = useState([]);

  useEffect(() => {
    loadLessonData(params.id).then((data) => {
      setVocabs(data);
    });
  }, [params.id]);

  return (
    <div className="">
      <div className="bg-blue-500 p-4 text-white flex items-center justify-between">
        <div
          className="cursor-pointer"
          onClick={() => {
            window.history.back();
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
        </div>
        <h1 className="text-2xl mx-auto">Lesson {params.id}</h1> {/* This will center the 'Learn' heading */}
      </div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Word
              </th>
              <th scope="col" className="px-6 py-3">
                Meaning
              </th>
            </tr>
          </thead>
          <tbody>
            {vocabs.map((vocab: Kotoba) => (
              <tr key={vocab.id} className="bg-white border-b  dark:border-gray-700">
                <td className="px-6 py-4">{vocab.word.hiragana}</td>
                <td className="px-6 py-4">{vocab.word.meaning}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
