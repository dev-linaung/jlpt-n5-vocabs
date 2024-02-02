'use client'

import { useEffect, useState } from "react";

// Function to dynamically load lesson data
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
  const [quizVocabs, setQuizVocabs] = useState<Kotoba[]>([]);
  const [currentVocab, setCurrentVocab] = useState<Kotoba | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(1);
  const [isAnswerVisible, setIsAnswerVisible] = useState<boolean>(false);
  const [isQuizFinished, setIsQuizFinished] = useState<boolean>(false);

  useEffect(() => {
    loadLessonData(params.id).then((data) => {
      setQuizVocabs(data.sort(() => Math.random() - 0.5));
      setCurrentVocab(data[0] || null);
    });
  }, [params.id]);

  const handleCheckAnswer = () => {
    setIsAnswerVisible(true);
  };

  const handleNext = () => {
    setIsAnswerVisible(false);
    setCurrentIndex(currentIndex + 1);

    if (currentIndex === quizVocabs.length) {
      setIsQuizFinished(true);
      setCurrentIndex((currentIndex) => currentIndex - 1);
    } else {
      setCurrentVocab(quizVocabs[currentIndex]);
    }
  };

  return (
    <>
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

      <div className="flex flex-col items-center mt-8 gap-4 ">
        <div className="flex items-center justify-center w-80 h-40 rounded-md bg-gray-400 border border-gray-500">
          <div className="flex flex-col items-center justify-center">
            {!isQuizFinished && <h1 className="text-white"> {currentVocab?.word.meaning} </h1>}
            {isAnswerVisible && <h1 className="text-white"> {currentVocab?.word.hiragana} </h1>}
            {isAnswerVisible && <h1 className="text-white"> {currentVocab?.word.romaji} </h1>}
            {isQuizFinished && <h1 className="text-white"> Quiz Finished </h1>}
          </div>
        </div>
        <div className="w-60">
          <h2 className="text-center text-2xl">
            {" "}
            {currentIndex} / {quizVocabs.length}{" "}
          </h2>
        </div>
        <div className="w-60 grid grid-cols-2 gap-4">
          <button onClick={handleCheckAnswer} className="p-2 bg-slate-600 rounded-md text-white">
            Check Answer
          </button>
          <button onClick={handleNext} disabled={isQuizFinished} className="p-2 bg-slate-600 rounded-md text-white">
            Next
          </button>
        </div>
      </div>
    </>
  );
}
