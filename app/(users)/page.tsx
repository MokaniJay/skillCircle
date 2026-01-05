"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaCircle } from "react-icons/fa";

const Home = () => {
  const router = useRouter();

  return (
    <main>
      {/* Full Width Hero */}
      <div className="absolute inset-y-0 left-[10px] right-[10px] -z-10">
        <Image
          src="/hero/bg.svg"
          alt="SkillCircle Background"
          fill
          className="object-cover opacity-20"
          priority
        />
      </div>

      <section className="relative w-full min-h-[50vh] bg-gray-80 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12">
            {/* Left */}
            <div className="w-full md:w-1/2 text-center md:text-left">
              <div className="inline-block mx-auto md:mx-0 max-w-full">
                <h1 className="text-2xl sm:text-3xl md:text-3xl font-semibold text-gray-800 leading-tight whitespace-nowrap">
                  <span className="text-green-600">SkillCircle</span> – A
                  Skill-Based
                </h1>

                <h2 className="text-2xl sm:text-3xl md:text-3xl font-semibold text-gray-800 leading-tight max-w-full">
                  Developer Collaboration Platform
                </h2>

                <div className="mt-3 border-b border-green-600" />
              </div>

              <p className="mt-4 text-gray-600 text-sm sm:text-base md:text-lg max-w-xl mx-auto md:mx-0">
                <span className="font-bold">Trade skills, collaborate</span> on
                projects, and build your portfolio without monetary barriers.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <button
                  onClick={() => router.push("/startquiz")}
                  className="mt-6 px-6 py-3 bg-[#559863] text-white rounded-md text-sm sm:text-base md:text-lg font-medium hover:bg-gray-500 transition"
                >
                  Start Quiz
                </button>
                <button
                  onClick={() => router.push("/project")}
                  className="mt-6  px-6 py-3 bg-[#559863] text-white rounded-md text-sm sm:text-base md:text-lg font-medium hover:bg-gray-500 transition"
                >
                  Explore Projects
                </button>
              </div>
            </div>

            {/* Right */}
            <div className="w-full md:w-1/2 flex justify-center md:justify-end">
              <Image
                src="/hero/collab.svg"
                alt="Online Collaboration"
                width={420}
                height={320}
                className="w-full max-w-sm md:max-w-md"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* The Problem */}
            <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 border-b pb-3">
                The Problem
              </h3>
              <ul className="mt-5 space-y-3">
                <li className="flex items-start gap-3 text-gray-700">
                  <FaCircle className="text-[#559863] text-[8px] mt-2" />
                  Lack of diverse skills
                </li>

                <li className="flex items-start gap-3 text-gray-700">
                  <FaCircle className="text-[#559863] text-[8px] mt-2" />
                  High cost of hiring
                </li>
                <li className="flex items-start gap-3 text-gray-700">
                  <FaCircle className="text-[#559863] text-[8px] mt-2" />
                  Few collaboration opportunities
                </li>
              </ul>
            </div>

            {/* Our Solution */}
            <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 border-b pb-3">
                Our Solution
              </h3>
              <ul className="mt-5 space-y-3">
                <li className="flex items-start gap-3 text-gray-700 font-medium">
                  <FaCircle className="text-[#559863] text-[8px] mt-2" />
                  Swap Skills, Not Money
                </li>
                <li className="flex items-start gap-3 text-gray-700 font-medium">
                  <FaCircle className="text-[#559863] text-[8px] mt-2" />
                  Instant Skill Matching
                </li>
                <li className="flex items-start gap-3 text-gray-700 font-medium">
                  <FaCircle className="text-[#559863] text-[8px] mt-2" />
                  Project-Based Learning
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>


      {/* How SkillCircle Works */}
<section className="w-full py-16 bg-white">
  <div className="max-w-7xl mx-auto px-6">
    <h2 className="text-center text-2xl sm:text-3xl font-semibold text-gray-800 mb-12">
      How SkillCircle Works
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

      {/* Shared card styling */}
      {[ 
        {
          id: "1. Take Skill Quiz",
          img: "/howitworks/checkbox.svg",
          text: "Identify your skills"
        },
        {
          id: "2. Get Matched",
          img: "/howitworks/matched.svg",
          text: "Find your perfect partner"
        },
        {
          id: "3. Swap Skills",
          img: "/howitworks/handshake.svg",
          text: "Collaborate on projects"
        },
        {
          id: "4. Showcase Work",
          img: "/howitworks/work.svg",
          text: "Build your portfolio"
        }
      ].map((step, index) => (
        <div
          key={index}
          className="bg-gray-50 p-6 rounded-xl shadow-sm text-center flex flex-col items-center"
        >
          {/* Title */}
          <h3 className="text-lg font-semibold mb-2 border-b border-gray-300 pb-2 w-full">
            {step.id}
          </h3>

          {/* Image wrapper with fixed equal height */}
          <div className="h-48 flex items-center justify-center">
            <Image
              src={step.img}
              alt={step.id}
              width={200}
              height={200}
              className="object-contain"
            />
          </div>

          {/* Description */}
          <p className="text-sm mt-4 text-[#559863]">{step.text}</p>
        </div>
      ))}

    </div>
  </div>
</section>
<div className="w-full bg-gray-50 py-12">
  <div className="max-w-2xl mx-auto text-center">
    <h2 className="text-2xl font-medium text-gray-800">
      Ready to <span className="font-semibold">collaborate without barriers?</span>
    </h2>

    <div className="mt-6 flex justify-center gap-4">
      {/* Start Quiz Button */}
      <button
                  onClick={() => router.push("/startquiz")}
                  className="bg-[#559863] text-white px-6 py-3 rounded-md font-medium shadow hover:bg-green-700 transition"
                >
                  Start Quiz
                </button>

      {/* View Showcase Button */}
     <button
                  onClick={() => router.push("/showcase")}
                  className="bg-[#559863] text-white px-6 py-3 rounded-md font-medium shadow hover:bg-green-700 transition"
                >
                   Showcase
                </button>
    </div>
  </div>
</div>


    </main>
  );
};

export default Home;
