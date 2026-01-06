"use client";
import { useState, useEffect } from "react";

/* 🧠 SAFE LOCAL STORAGE HELPERS */
const isBrowser = () => typeof window !== "undefined";

const getLS = (key, fallback) => {
  if (!isBrowser()) return fallback;
  try {
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : fallback;
  } catch {
    return fallback;
  }
};

const setLS = (key, value) => {
  if (isBrowser()) localStorage.setItem(key, JSON.stringify(value));
};

const removeLS = (...keys) => {
  if (isBrowser()) keys.forEach((k) => localStorage.removeItem(k));
};

export default function SkillCircleQuiz() {
  const quizSteps = [
    {
      type: "input",
      label: "Your Full Name",
      placeholder: "Enter your full name",
    },
    {
      type: "select",
      label: "Primary Skill",
      options: [
        "Frontend Development",
        "Backend Development",
        "UI/UX Design",
        "Mobile App Development",
        "Data Analysis",
      ],
      multi: true,
    },
    {
      type: "select",
      label: "Experience Level",
      options: ["Beginner", "Intermediate", "Advanced"],
      multi: false, // only single choice
    },
    {
      type: "select",
      label: "You can help others with",
      options: [
        "Frontend Development",
        "Backend Development",
        "UI/UX Design",
        "Project Planning",
        "Debugging",
      ],
      multi: true,
    },
    {
      type: "select",
      label: "You are looking for",
      options: [
        "Frontend Development",
        "Backend Development",
        "UI/UX Design",
        "Real project collaboration",
        "Mentorship",
      ],
      multi: true,
    },
  ];

  /* 🔐 STATE (SSR SAFE) */
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [completed, setCompleted] = useState(false);
  const [matches, setMatches] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  /* 🌊 HYDRATE FROM LOCAL STORAGE (CLIENT ONLY) */
  useEffect(() => {
    setStep(getLS("sc_step", 0));
    setAnswers(getLS("sc_answers", {}));
    setCompleted(getLS("sc_completed", false));
    setMatches(getLS("sc_matches", []));
    setSelectedUser(getLS("sc_selected", null));
  }, []);

  /* 💾 SYNC TO LOCAL STORAGE */
  useEffect(() => {
    setLS("sc_step", step);
    setLS("sc_answers", answers);
    setLS("sc_completed", completed);
    setLS("sc_matches", matches);
    setLS("sc_selected", selectedUser);
  }, [step, answers, completed, matches, selectedUser]);

  const current = quizSteps[step];
  const currentAnswer =
    answers[current?.label] ??
    (current?.type === "select" ? (current?.multi ? [] : "") : "");

  /* 🎯 OPTION HANDLER */
  const handleOption = (opt) => {
    setAnswers((a) => ({
      ...a,
      [current.label]: current.multi
        ? currentAnswer.includes(opt)
          ? currentAnswer.filter((o) => o !== opt)
          : [...currentAnswer, opt]
        : opt,
    }));
  };

  /* ✅ VALIDATION */
  const canProceed =
    current.type === "input"
      ? currentAnswer.trim()
      : current.multi
      ? currentAnswer.length
      : currentAnswer;

  const handleNext = () =>
    canProceed &&
    (step + 1 < quizSteps.length ? setStep(step + 1) : setCompleted(true));

  const handlePrev = () => step > 0 && setStep(step - 1);

  /* 🔍 MATCHING LOGIC */
  useEffect(() => {
    if (!completed) return;

    const stored = getLS("skillcircle_users", []);

    const foundMatches = stored
      .map((u) => {
        const matchedSkill = u["Primary Skill"]?.find((s) =>
          answers["You are looking for"]?.includes(s)
        );
        return matchedSkill ? { ...u, matchedSkill } : null;
      })
      .filter(Boolean);

    setMatches(foundMatches);
    setLS("skillcircle_users", [...stored, answers]);
  }, [completed]);

  /* 🔁 RESET */
  const resetQuiz = () => {
    setStep(0);
    setAnswers({});
    setCompleted(false);
    setMatches([]);
    setSelectedUser(null);
    removeLS(
      "sc_step",
      "sc_answers",
      "sc_completed",
      "sc_matches",
      "sc_selected"
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center px-4 py-10">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow p-6 md:p-10">
        {!completed ? (
          <>
            <h1 className="text-xl font-semibold mb-2">
              <span className="text-green-600">SkillCircle</span> Skill Match Quiz
            </h1>

            <p className="text-sm text-gray-500 mb-4">
              Step {step + 1} of {quizSteps.length}
            </p>

            {/* PROGRESS BAR */}
            <div className="h-2 bg-gray-200 rounded mb-6 overflow-hidden">
              <div
                className="h-full bg-green-600 transition-all duration-500"
                style={{ width: `${((step + 1) / quizSteps.length) * 100}%` }}
              />
            </div>

            <h2 className="text-lg font-semibold mb-5">{current.label}</h2>

            {current.type === "input" ? (
              <input
                className="w-full border rounded-lg px-4 py-3"
                value={currentAnswer}
                placeholder={current.placeholder}
                onChange={(e) =>
                  setAnswers((a) => ({
                    ...a,
                    [current.label]: e.target.value,
                  }))
                }
              />
            ) : (
              <div className="space-y-3">
                {current.options.map((opt, i) => {
                  const active = current.multi
                    ? currentAnswer.includes(opt)
                    : currentAnswer === opt;
                  return (
                    <button
                      key={i}
                      onClick={() => handleOption(opt)}
                      className={`w-full px-4 py-3 text-left border rounded-lg transition ${
                        active
                          ? "bg-green-600 text-white border-green-600"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            )}

            {/* NAVIGATION */}
            <div className="flex gap-4 mt-8">
              <button
                onClick={handlePrev}
                disabled={!step}
                className="w-1/2 border py-3 rounded-lg disabled:opacity-40"
              >
                Previous
              </button>

              <button
                onClick={handleNext}
                disabled={!canProceed}
                className="w-1/2 bg-green-600 text-white py-3 rounded-lg disabled:opacity-40"
              >
                {step + 1 === quizSteps.length ? "Finish" : "Next"}
              </button>
            </div>
          </>
        ) : selectedUser ? (
          <>
            <button
              onClick={() => setSelectedUser(null)}
              className="mb-4 text-green-600 text-sm"
            >
              ← Back to Matches
            </button>

            <div className="border-2 border-green-600 rounded-2xl p-8 shadow">
              <h2 className="text-2xl font-bold text-center mb-6">
                {selectedUser["Your Full Name"]}
              </h2>

              <p>
                <strong>Primary Skills:</strong>{" "}
                {selectedUser["Primary Skill"].join(", ")}
              </p>
              <p>
                <strong>Looking For:</strong>{" "}
                {selectedUser["You are looking for"].join(", ")}
              </p>

              <div className="mt-6 text-center">
                <span className="bg-green-600 text-white px-5 py-2 rounded-full">
                  Matched Skill: {selectedUser.matchedSkill}
                </span>
              </div>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold mb-2 text-center">
              Matching Professionals
            </h2>
            <p className="text-center text-sm text-gray-600 mb-6">
              Based on your skills and interests, we found professionals you can
              connect with.
            </p>

            {matches.length === 0 && (
              <div className="text-center border-2 border-dashed border-green-500 rounded-xl p-8 mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  No Matches Found
                </h3>
                <p className="text-gray-600 text-sm">
                  Currently, there are no users matching your selected skills.
                  Don’t worry — as more professionals join SkillCircle, we’ll
                  help you connect with the right people.
                </p>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              {matches.map((u, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedUser(u)}
                  className="cursor-pointer border-2 border-green-600 rounded-2xl p-6 hover:shadow-xl transition hover:-translate-y-1"
                >
                  <h3 className="text-xl font-bold text-center mb-4">
                    {u["Your Full Name"]}
                  </h3>

                  <p>
                    <strong>Primary Skills:</strong> {u["Primary Skill"].join(", ")}
                  </p>
                  <p>
                    <strong>Looking For:</strong> {u["You are looking for"].join(", ")}
                  </p>

                  <div className="mt-4 text-center text-green-700 font-medium">
                    Matched Skill: {u.matchedSkill}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={resetQuiz}
              className="mt-8 w-full border py-3 rounded-lg hover:bg-gray-100"
            >
              Start Another Quiz
            </button>
          </>
        )}
      </div>
    </div>
  );
}
