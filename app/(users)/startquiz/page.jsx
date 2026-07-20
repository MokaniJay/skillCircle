"use client";

import { useState, useEffect } from "react";

export default function SkillCircleQuiz() {

  const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
  const quizSteps = [
    {
      type: "input",
      label: "Your Full Name",
      placeholder: "Enter your full name",
    },
    {
      type: "input",
      label: "Your Email",
      placeholder: "Enter your professional email",
    },
    {
      type: "select",
      label: "What is your primary skill?",
      options: [
        "Frontend Development",
        "Backend Development",
        "UI/UX Design",
        "Mobile App Development",
        "Graphic Design",
        "QA / Testing",
      ],
      multi: false,
    },
    {
      type: "select",
      label: "Which skills are you looking for in collaborators?",
      options: [
        "Frontend Development",
        "Backend Development",
        "UI/UX Design",
        "Mobile App Development",
        "Graphic Design",
        "API Development",
        "QA / Testing",
      ],
      multi: true,
    },
  ];

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [completed, setCompleted] = useState(false);
  const [matches, setMatches] = useState([]);
const [loading, setLoading] = useState(false);

  const current = quizSteps[step];

  const currentAnswer =
    answers[current?.label] ??
    (current?.type === "select" ? (current?.multi ? [] : "") : "");

  const handleOption = (opt) => {
    setAnswers((prev) => ({
      ...prev,
      [current.label]: current.multi
        ? currentAnswer.includes(opt)
          ? currentAnswer.filter((o) => o !== opt)
          : [...currentAnswer, opt]
        : opt,
    }));
  };

  const canProceed =
    current.type === "input"
      ? currentAnswer.trim()
      : current.multi
      ? currentAnswer.length > 0
      : currentAnswer;

const handleNext = () => {
  if (!canProceed) return;

  if (step === 0) {
    const name = answers["Your Full Name"]?.trim();

    if (!name || name.length < 2) {
      alert("Please enter a valid name");
      return;
    }
  }

  if (step === 1) {
    const email = answers["Your Email"]?.trim().toLowerCase();

    if (!isValidEmail(email)) {
      alert("Please enter a valid email address");
      return;
    }

    setAnswers((prev) => ({
      ...prev,
      ["Your Email"]: email,
    }));
  }

  if (step + 1 < quizSteps.length) {
    setStep(step + 1);
  } else {
    setCompleted(true);
  }
};

  const handlePrev = () => {
    if (step > 0) setStep(step - 1);
  };

useEffect(() => {
  const processQuiz = async () => {
    if (!completed) return;

    setLoading(true);

    try {
      const payload = {
        name: answers["Your Full Name"]?.trim(),
        email: answers["Your Email"]?.trim().toLowerCase(),
        primarySkill: answers["What is your primary skill?"],
        lookingForSkills:
          answers["Which skills are you looking for in collaborators?"],
      };

      const saveRes = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!saveRes.ok) {
        const errorData = await saveRes.json();
        throw new Error(errorData.error || "Failed to save user");
      }

      const res = await fetch("/api/users");

      if (!res.ok) {
        throw new Error("Failed to fetch users");
      }

      const users = await res.json();

      const mySkill =
        answers["What is your primary skill?"];

      const lookingFor =
        answers["Which skills are you looking for in collaborators?"] || [];

      const foundMatches = users
        .filter(
          (user) =>
            user.email.toLowerCase() !==
            answers["Your Email"]?.toLowerCase()
        )
        .map((user) => {
          const iNeedUser =
            lookingFor.includes(user.primarySkill);

          const userNeedsMe =
            user.lookingForSkills?.includes(mySkill);

          if (iNeedUser && userNeedsMe) {
            return {
              ...user,
              matchedSkill: user.primarySkill,
              matchType: "Perfect Match ⭐",
              score: 2,
            };
          }

          if (iNeedUser) {
            return {
              ...user,
              matchedSkill: user.primarySkill,
              matchType: "Skill Match",
              score: 1,
            };
          }

          return null;
        })
        .filter(Boolean)
        .sort((a, b) => b.score - a.score);

      setMatches(foundMatches);
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  processQuiz();
}, [completed]);

 const resetQuiz = () => {
  setStep(0);
  setAnswers({});
  setCompleted(false);
  setMatches([]);
  setLoading(false);
};

  const generateEmailLink = (user) => {
    const subject = encodeURIComponent(
      "SkillCircle Collaboration"
    );

    const body = encodeURIComponent(
      `Hi ${user.name},

I saw your profile on SkillCircle and I am interested in collaborating with you on ${user.matchedSkill} projects.

Looking forward to connecting!

Best regards`
    );

    return `mailto:${user.email}?subject=${subject}&body=${body}`;
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

            <div className="h-2 bg-gray-200 rounded mb-6 overflow-hidden">
              <div
                className="h-full bg-green-600 transition-all duration-500"
                style={{
                  width: `${((step + 1) / quizSteps.length) * 100}%`,
                }}
              />
            </div>

            <h2 className="text-lg font-semibold mb-5">
              {current.label}
            </h2>

            {current.type === "input" ? (
              <input
                className="w-full border rounded-lg px-4 py-3"
              value={currentAnswer || ""}
                placeholder={current.placeholder}
                onChange={(e) =>
                  setAnswers((prev) => ({
                    ...prev,
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
              disabled={!canProceed || loading}
                className="w-1/2 bg-green-600 text-white py-3 rounded-lg disabled:opacity-40"
              >
               {
  loading
    ? "Saving..."
    : step + 1 === quizSteps.length
    ? "Finish"
    : "Next"
}
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold mb-6 text-center">
              Matching Professionals
            </h2>

            {matches.length === 0 ? (
              <div className="text-center border-2 border-dashed border-green-500 rounded-xl p-8">
                No matches yet. Try again after more users join.
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {matches.map((u, i) => (
                  <div
                    key={i}
                    className="border-2 border-green-600 rounded-2xl p-6"
                  >
                    <h3 className="text-xl font-bold mb-2">
                      {u.name}
                    </h3>

                <p>
  <strong>Primary Skill:</strong>{" "}
  {u.primarySkill}
</p>

<p className="text-green-700 mt-2">
  Matched Skill: {u.matchedSkill}
</p>

<p
  className={`font-semibold mt-2 ${
    u.matchType === "Perfect Match ⭐"
      ? "text-green-700"
      : "text-blue-600"
  }`}
>
  {u.matchType}
</p>

<a
  href={generateEmailLink(u)}
                      className="mt-4 inline-block w-full text-center bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
                    >
                      Contact via Email
                    </a>
                  </div>
                ))}
              </div>
            )}

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