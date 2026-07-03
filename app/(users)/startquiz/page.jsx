// "use client";

// import { useState, useEffect } from "react";

// /* 🧠 SAFE LOCAL STORAGE HELPERS */
// const isBrowser = () => typeof window !== "undefined";

// const getLS = (key, fallback) => {
//   if (!isBrowser()) return fallback;
//   try {
//     const val = localStorage.getItem(key);
//     return val ? JSON.parse(val) : fallback;
//   } catch {
//     return fallback;
//   }
// };

// const setLS = (key, value) => {
//   if (isBrowser()) {
//     localStorage.setItem(key, JSON.stringify(value));
//   }
// };

// export default function SkillCircleQuiz() {
//   /* 🧩 QUIZ STEPS */
//   const quizSteps = [
//     {
//       type: "input",
//       label: "Your Full Name",
//       placeholder: "Enter your full name",
//     },
//     {
//       type: "select",
//       label: "What is your primary skill?",
//       options: [
//         "Frontend Development",
//         "Backend Development",
//         "UI/UX Design",
//         "Mobile App Development",
//         "Graphic Design",
//         "QA / Testing",
//       ],
//       multi: false,
//     },
//     {
//       type: "select",
//       label: "Which skills are you looking for in collaborators?",
//       options: [
//         "Frontend Development",
//         "Backend Development",
//         "UI/UX Design",
//         "Mobile App Development",
//         "Graphic Design",
//         "API Development",
//         "QA / Testing",
//       ],
//       multi: true,
//     },
//   ];

//   /* 🔐 STATE (NO PERSISTENCE) */
//   const [step, setStep] = useState(0);
//   const [answers, setAnswers] = useState({});
//   const [completed, setCompleted] = useState(false);
//   const [matches, setMatches] = useState([]);

//   const current = quizSteps[step];
//   const currentAnswer =
//     answers[current?.label] ??
//     (current?.type === "select" ? (current?.multi ? [] : "") : "");

//   /* 🎯 OPTION HANDLER */
//   const handleOption = (opt) => {
//     setAnswers((prev) => ({
//       ...prev,
//       [current.label]: current.multi
//         ? currentAnswer.includes(opt)
//           ? currentAnswer.filter((o) => o !== opt)
//           : [...currentAnswer, opt]
//         : opt,
//     }));
//   };

//   /* ✅ VALIDATION */
//   const canProceed =
//     current.type === "input"
//       ? currentAnswer.trim()
//       : current.multi
//       ? currentAnswer.length > 0
//       : currentAnswer;

//   const handleNext = () => {
//     if (!canProceed) return;
//     step + 1 < quizSteps.length ? setStep(step + 1) : setCompleted(true);
//   };

//   const handlePrev = () => step > 0 && setStep(step - 1);

//   /* 🔍 MATCHING LOGIC (LOCAL STORAGE USERS ONLY) */
//   useEffect(() => {
//     if (!completed) return;

//     const storedUsers = getLS("skillcircle_users", []);

//     const lookingFor =
//       answers["Which skills are you looking for in collaborators?"] || [];

//     const foundMatches = storedUsers
//       .map((u) => {
//         const primarySkill = u["What is your primary skill?"];
//         return lookingFor.includes(primarySkill)
//           ? { ...u, matchedSkill: primarySkill }
//           : null;
//       })
//       .filter(Boolean);

//     setMatches(foundMatches);

//     // Save current user AFTER matching
//     setLS("skillcircle_users", [...storedUsers, answers]);
//   }, [completed, answers]);

//   /* 🔁 RESET (OPTIONAL BUTTON) */
//   const resetQuiz = () => {
//     setStep(0);
//     setAnswers({});
//     setCompleted(false);
//     setMatches([]);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex justify-center px-4 py-10">
//       <div className="w-full max-w-2xl bg-white rounded-2xl shadow p-6 md:p-10">
//         {!completed ? (
//           <>
//             <h1 className="text-xl font-semibold mb-2">
//               <span className="text-green-600">SkillCircle</span> Skill Match Quiz
//             </h1>

//             <p className="text-sm text-gray-500 mb-4">
//               Step {step + 1} of {quizSteps.length}
//             </p>

//             <div className="h-2 bg-gray-200 rounded mb-6 overflow-hidden">
//               <div
//                 className="h-full bg-green-600 transition-all duration-500"
//                 style={{
//                   width: `${((step + 1) / quizSteps.length) * 100}%`,
//                 }}
//               />
//             </div>

//             <h2 className="text-lg font-semibold mb-5">{current.label}</h2>

//             {current.type === "input" ? (
//               <input
//                 className="w-full border rounded-lg px-4 py-3"
//                 value={currentAnswer}
//                 placeholder={current.placeholder}
//                 onChange={(e) =>
//                   setAnswers((prev) => ({
//                     ...prev,
//                     [current.label]: e.target.value,
//                   }))
//                 }
//               />
//             ) : (
//               <div className="space-y-3">
//                 {current.options.map((opt, i) => {
//                   const active = current.multi
//                     ? currentAnswer.includes(opt)
//                     : currentAnswer === opt;

//                   return (
//                     <button
//                       key={i}
//                       onClick={() => handleOption(opt)}
//                       className={`w-full px-4 py-3 text-left border rounded-lg transition ${
//                         active
//                           ? "bg-green-600 text-white border-green-600"
//                           : "hover:bg-gray-100"
//                       }`}
//                     >
//                       {opt}
//                     </button>
//                   );
//                 })}
//               </div>
//             )}

//             <div className="flex gap-4 mt-8">
//               <button
//                 onClick={handlePrev}
//                 disabled={!step}
//                 className="w-1/2 border py-3 rounded-lg disabled:opacity-40"
//               >
//                 Previous
//               </button>

//               <button
//                 onClick={handleNext}
//                 disabled={!canProceed}
//                 className="w-1/2 bg-green-600 text-white py-3 rounded-lg disabled:opacity-40"
//               >
//                 {step + 1 === quizSteps.length ? "Finish" : "Next"}
//               </button>
//             </div>
//           </>
//         ) : (
//           <>
//             <h2 className="text-xl font-bold mb-6 text-center">
//               Matching Professionals
//             </h2>

//             {matches.length === 0 ? (
//               <div className="text-center border-2 border-dashed border-green-500 rounded-xl p-8">
//                 No matches yet. Try again after more users join.
//               </div>
//             ) : (
//               <div className="grid md:grid-cols-2 gap-6">
//                 {matches.map((u, i) => (
//                   <div
//                     key={i}
//                     className="border-2 border-green-600 rounded-2xl p-6"
//                   >
//                     <h3 className="text-xl font-bold mb-2">
//                       {u["Your Full Name"]}
//                     </h3>
//                     <p>
//                       <strong>Primary Skill:</strong>{" "}
//                       {u["What is your primary skill?"]}
//                     </p>
//                     <p className="text-green-700 mt-2">
//                       Matched Skill: {u.matchedSkill}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             )}

//             <button
//               onClick={resetQuiz}
//               className="mt-8 w-full border py-3 rounded-lg hover:bg-gray-100"
//             >
//               Start Another Quiz
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

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
  if (isBrowser()) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export default function SkillCircleQuiz() {
  /* 🧩 QUIZ STEPS */
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

  /* 🔐 STATE */
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [completed, setCompleted] = useState(false);
  const [matches, setMatches] = useState([]);

  const current = quizSteps[step];
  const currentAnswer =
    answers[current?.label] ??
    (current?.type === "select" ? (current?.multi ? [] : "") : "");

  /* 🎯 OPTION HANDLER */
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

  /* ✅ VALIDATION */
  const canProceed =
    current.type === "input"
      ? currentAnswer.trim()
      : current.multi
      ? currentAnswer.length > 0
      : currentAnswer;

  const handleNext = () => {
    if (!canProceed) return;
    step + 1 < quizSteps.length ? setStep(step + 1) : setCompleted(true);
  };

  const handlePrev = () => step > 0 && setStep(step - 1);

  /* 🔍 MATCHING LOGIC */
  useEffect(() => {
    if (!completed) return;

    const storedUsers = getLS("skillcircle_users", []);

    const lookingFor =
      answers["Which skills are you looking for in collaborators?"] || [];

    const foundMatches = storedUsers
      .map((u) => {
        const primarySkill = u["What is your primary skill?"];
        return lookingFor.includes(primarySkill)
          ? { ...u, matchedSkill: primarySkill }
          : null;
      })
      .filter(Boolean);

    setMatches(foundMatches);

    // Save current user
    setLS("skillcircle_users", [...storedUsers, answers]);
  }, [completed, answers]);

  /* 🔁 RESET */
  const resetQuiz = () => {
    setStep(0);
    setAnswers({});
    setCompleted(false);
    setMatches([]);
  };

  /* ✉️ EMAIL LINK GENERATOR */
  const generateEmailLink = (user) => {
    const subject = encodeURIComponent("SkillCircle Collaboration");
    const body = encodeURIComponent(
      `Hi ${user["Your Full Name"]},\n\nI saw your profile on SkillCircle and I am interested in collaborating with you on ${user.matchedSkill} projects.\n\nLooking forward to connecting!\n\nBest regards,\n[Your Name]`
    );
    return `mailto:${user["Your Email"]}?subject=${subject}&body=${body}`;
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

            <h2 className="text-lg font-semibold mb-5">{current.label}</h2>

            {current.type === "input" ? (
              <input
                className="w-full border rounded-lg px-4 py-3"
                value={currentAnswer}
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
                disabled={!canProceed}
                className="w-1/2 bg-green-600 text-white py-3 rounded-lg disabled:opacity-40"
              >
                {step + 1 === quizSteps.length ? "Finish" : "Next"}
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
                      {u["Your Full Name"]}
                    </h3>
                    <p>
                      <strong>Primary Skill:</strong>{" "}
                      {u["What is your primary skill?"]}
                    </p>
                    <p className="text-green-700 mt-2">
                      Matched Skill: {u.matchedSkill}
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