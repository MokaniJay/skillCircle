import React from "react";

const AboutUs = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section with Full Width and Height */}
          <section
  className="h-screen bg-cover bg-center relative ml-4 mr-4 sm:ml-2 sm:mr-2"
  style={{
    backgroundImage: 'linear-gradient(to right, #16a34a, #15803d)', // Using your primary green colors
  }}
>
  {/* Overlay for text to appear on top of the background gradient */}
  <div className="absolute inset-0 bg-black opacity-50"></div>

  <div className="relative z-10 text-center text-white py-16 px-4 sm:px-8 md:px-16">
    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
      Welcome to <span className="text-yellow-300">SkillCircle</span>
    </h1>
    <p className="text-lg sm:text-xl mb-6">
      SkillCircle is a skill-based collaboration platform connecting learners, creators, and professionals. Build projects, find mentors, and grow together.
    </p>
    <button className="bg-yellow-300 text-gray-800 py-2 px-6 rounded-lg font-semibold hover:bg-yellow-400">
      Start Your Skill Match Quiz
    </button>
  </div>
</section>

      {/* Other Sections */}
      <section className="py-16 px-4 text-center">
        <h2 className="text-2xl font-bold mb-4">Our Story</h2>
        <p className="text-lg max-w-3xl mx-auto text-gray-700">
          SkillCircle was created to solve the problem of finding genuine collaborators based on skills, not resumes. We believe that everyone should have the opportunity to grow through collaboration. Whether you're a developer, designer, or someone new, SkillCircle connects you with the right people to learn and build real projects together.
        </p>
      </section>

      {/* Why SkillCircle Section */}
      <section className="py-16 bg-gray-100 text-center">
        <h2 className="text-2xl font-bold mb-4">Why SkillCircle?</h2>
        <div className="max-w-3xl mx-auto space-y-4">
          <p className="text-lg text-gray-700">
            <strong>Skill-based Matching:</strong> We match you based on your real skills and what you want to work on.
          </p>
          <p className="text-lg text-gray-700">
            <strong>Real Collaboration:</strong> Say goodbye to cold messaging. SkillCircle makes it easy to connect with like-minded collaborators.
          </p>
          <p className="text-lg text-gray-700">
            <strong>Learning Opportunities:</strong> Whether you're just starting or a seasoned pro, SkillCircle helps you grow by working on real projects with real people.
          </p>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 text-center">
        <h2 className="text-2xl font-bold mb-4">How It Works</h2>
        <div className="max-w-2xl mx-auto space-y-6 text-lg text-gray-700">
          <div>
            <strong>1. Take a short quiz</strong> to share your skills and what you're looking for.
          </div>
          <div>
            <strong>2. Get matched</strong> with collaborators, mentors, and people who can help you.
          </div>
          <div>
            <strong>3. Start working together</strong> on real projects and build your portfolio.
          </div>
          <div>
            <strong>4. Connect, learn, and grow</strong> with SkillCircle's collaborative community.
          </div>
        </div>
      </section>

      {/* Our Vision Section */}
      <section className="py-16 bg-gray-200 text-center">
        <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
        <p className="text-lg max-w-3xl mx-auto text-gray-700">
          At SkillCircle, we envision a world where collaboration is at the heart of personal growth. Our mission is to make skills, not titles, the currency of professional development. Join us in making collaboration easy, effective, and fun.
        </p>
      </section>

      {/* Team Section (Optional) */}
      <section className="py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Meet the Team</h2>
        <div className="max-w-4xl mx-auto text-gray-700">
          <p className="text-lg">
            SkillCircle is powered by a passionate team of creators, developers, and dreamers. Together, we aim to make collaboration a cornerstone of personal and professional development.
          </p>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="py-10 text-center bg-green-600 text-white">
        <p>&copy; 2026 SkillCircle | All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default AboutUs;
