import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-4">
      <div className="bg-blue-500 p-4 text-white">
        <h1 className="text-center text-2xl">JLPT Vocab Quiz</h1>
      </div>
      <div className="flex flex-col items-center gap-4">
        <Link href="/learn" className="text-white text-2xl">
          <button className="bg-gray-400 border-2 rounded-md p-8 w-40">Learn</button>
        </Link>
        <Link href="/quiz" className="text-white text-2xl">
          <button className="bg-gray-400 border-2 rounded-md p-8 w-40">Quiz</button>
        </Link>
      </div>
    </div>
  );
}
