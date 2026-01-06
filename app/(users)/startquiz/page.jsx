"use client";
import { useState, useEffect } from "react";

export default function SkillCircleQuiz() {
  const quizSteps = [
    {
      type: "input",
      label: "Your Full Name",
      placeholder: "Enter your full name"
    },
    {
      type: "select",
      label: "Primary Skill",
      options: [
        "Frontend Development",
        "Backend Development",
        "UI/UX Design",
        "Mobile App Development",
        "Data Analysis"
      ]
    },
    {
      type: "select",
      label: "Experience Level",
      options: ["Beginner", "Intermediate", "Advanced"]
    },
    {
      type: "select",
      label: "You can help others with",
      options: [
        "Frontend Development",
        "Backend Development",
        "UI/UX Design",
        "Project Planning",
        "Debugging"
      ]
    },
    {
      type: "select",
      label: "You are looking for",
      options: [
        "Frontend Development",
        "Backend Development",
        "UI/UX Design",
        "Real project collaboration",
        "Mentorship"
      ]
    }
  ];

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [completed, setCompleted] = useState(false);
  const [match, setMatch] = useState(null);

  const current = quizSteps[step];

  const handleNext = (value) => {
    setAnswers((prev) => ({ ...prev, [current.label]: value }));

    if (step + 1 < quizSteps.length) {
      setStep(step + 1);
    } else {
      setCompleted(true);
    }
  };

  useEffect(() => {
    if (!completed) return;

    const stored =
      JSON.parse(localStorage.getItem("skillcircle_users")) || [];

    const foundMatch = stored.find(
      (u) =>
        u["Primary Skill"] === answers["You are looking for"] &&
        u["You are looking for"] === answers["Primary Skill"]
    );

    if (foundMatch) {
      setMatch(foundMatch);
    }

    localStorage.setItem(
      "skillcircle_users",
      JSON.stringify([...stored, answers])
    );
  }, [completed]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow p-6 md:p-10">

        {!completed ? (
          <>
            <h1 className="text-xl font-semibold text-gray-800 mb-1">
              <span className="text-green-600">SkillCircle</span> Skill Match Quiz
            </h1>

            <p className="text-sm text-gray-500 mb-6">
              Step {step + 1} of {quizSteps.length}
            </p>

            <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-5">
              {current.label}
            </h2>

            {current.type === "input" && (
              <input
                type="text"
                placeholder={current.placeholder}
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-600"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.target.value.trim()) {
                    handleNext(e.target.value);
                  }
                }}
              />
            )}

            {current.type === "select" && (
              <div className="space-y-3">
                {current.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleNext(opt)}
                    className="w-full text-left px-4 py-3 border rounded-lg hover:bg-gray-100 transition"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4 text-center">
              Welcome, {answers["Your Full Name"]} 👋
            </h2>

            {/* USER SUMMARY */}
            <div className="bg-gray-50 rounded-xl p-5 mb-6 text-sm">
              <p><strong>Your Skill:</strong> {answers["Primary Skill"]}</p>
              <p><strong>Experience:</strong> {answers["Experience Level"]}</p>
              <p><strong>Looking For:</strong> {answers["You are looking for"]}</p>
            </div>

            {/* MATCH CARD */}
            {match ? (
              <div className="border border-green-600 bg-green-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-green-700 mb-3">
                  🎯 You’ve Found a Match
                </h3>

                <div className="text-sm text-gray-700 space-y-2 mb-4">
                  <p>
                    <strong>{match["Your Full Name"]}</strong> specializes in{" "}
                    <strong>{match["Primary Skill"]}</strong>.
                  </p>

                  <p>
                    They are currently looking for{" "}
                    <strong>{match["You are looking for"]}</strong>, which aligns
                    perfectly with what you offer.
                  </p>

                  <p>
                    This mutual requirement makes you a strong match for
                    collaboration.
                  </p>
                </div>

                <button
                  className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition"
                >
                  Express Interest
                </button>
              </div>
            ) : (
              <p className="text-center text-gray-500">
                No suitable match yet. As more users join SkillCircle, your
                chances of matching will improve.
              </p>
            )}

            <button
              onClick={() => {
                setStep(0);
                setAnswers({});
                setCompleted(false);
                setMatch(null);
              }}
              className="mt-6 w-full border py-3 rounded-lg hover:bg-gray-100 transition"
            >
              Start Another Quiz
            </button>
          </>
        )}
      </div>
    </div>
  );
}
