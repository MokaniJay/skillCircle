import React from "react";
import Image from "next/image";
import Link from "next/link";


const AboutUs = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      
      {/* HERO SECTION */}
  <section 
  className="min-h-[50vh] bg-cover bg-center relative flex items-center"
  style={{
    backgroundImage: "linear-gradient(to right,rgb(22, 163, 74), #15803d)",
  }}
>
  {/* Overlay */}
  <div className="absolute inset-0 bg-black opacity-50 z-0"></div>

  {/* Content */}
  <div className="relative z-10 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-10">
              
              {/* LEFT TEXT */}
           <div className="md:w-1/2 text-left text-white">
  {/* Small label */}
  <p className="uppercase tracking-widest text-sm mb-4 opacity-80">
    About Us
  </p>
  

  {/* Main headline */}
  <h1 className="text-4xl sm:text-5xl md:text-4xl lg:text-7xl font-light leading-tight">
    Built on Skills. <br />
    </h1>
    <h1 className="text-4xl sm:text-5xl md:text-4xl lg:text-5xl font-light leading-tight">
    <span className="italic font-semibold text-green-300">
    Driven by Collaboration.
    </span>
  </h1>
</div>


              {/* RIGHT IMAGE */}
              <div className="md:w-1/2 flex justify-center md:justify-end">
                <Image
                  src="/about/gree.svg"
                  alt="About SkillCircle"
                  width={450}
                  height={450}
                  className="max-w-full h-auto"
                />
              </div>

            </div>
          </div>
        </div>
      </section>


      {/* OUR STORY */}
   <section className="py-20 px-4">
  <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center">
    Our Story
  </h2>

  <p className="
    max-w-4xl mx-auto 
    text-center 
    text-lg sm:text-xl md:text-2xl 
    leading-relaxed 
    text-gray-800
  ">
    SkillCircle was created to make skill-based collaboration accessible—where developers grow together by building real projects, not trading money.
  </p>
</section>

{/* Section 1: Text Left / Image Right */}
<section className="py-20 px-4 bg-white mb-20">
  <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
    
    <div className="w-full md:w-1/2">
      <p className="text-base leading-relaxed md:text-lg md:leading-loose">
        SkillCircle is an early-stage platform built with a focus on skill-based collaboration 
        among developers. It was started as a learning-driven project and is designed to help
        individuals exchange skills, work together on real projects, and build strong portfolios 
        without monetary barriers. The platform continues to evolve through hands-on development and 
        community-led growth.
      </p>
    </div>

    <div className="w-full md:w-1/2 flex justify-center">
      <img
        src="/about/team-work.svg"
        alt="Team Work"
        className="w-full max-w-lg rounded-2xl object-cover shadow-lg"
      />
    </div>

  </div>
</section>

{/* Section 2: Image Left / Text Right */}
<section className="py-20 px-4 bg-white">
  <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
    
    <div className="w-full md:w-1/2 flex justify-center">
      <img
        src="/about/collaboration.svg"
        alt="Collaboration"
        className="w-full max-w-lg rounded-2xl object-cover shadow-lg"
      />
    </div>

    <div className="w-full md:w-1/2">
      <p className="text-base leading-relaxed md:text-lg md:leading-loose">
        SkillCircle encourages meaningful collaboration by connecting developers who want to
        learn from each other, share knowledge, and build real-world projects together. The
        platform focuses on growth through contribution, helping users strengthen both technical
        and teamwork skills in a practical environment.
      </p>
    </div>

  </div>
</section>

{/* our mission */}
<section className="py-20 px-4 bg-white">
  <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center">
    Our Mission
  </h2>

  <p className="
    max-w-4xl mx-auto 
   text-left sm:text-center
 
    
    text-lg sm:text-xl md:text-2xl 
    leading-relaxed 
    text-[#1F2937]
  ">
    At SkillCircle, our mission is to empower developers by providing a platform for skill-based collaboration. We believe in the power of community-driven growth, where individuals can learn from each other and build meaningful projects together.
  </p>
</section>

{/* our values */}
<section className="py-20 px-4 bg-white">
  <h2 className="text-xl sm:text-2xl font-bold mb-16 text-center">
    Our Values
  </h2>

  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-y-24 gap-x-24 text-center">

    {/* Value 1 */}
    <div className="max-w-sm mx-auto">
      <div className="w-24 h-px bg-gray-300 mx-auto mb-6"></div>
      <h3 className="text-3xl italic font-serif mb-4">
        Community first
      </h3>
      <p className="text-[#4B5563] text-lg leading-relaxed">
        SkillCircle grows through its community of developers learning and building together.
      </p>
    </div>

    {/* Value 2 */}
    <div className="max-w-sm mx-auto">
      <div className="w-24 h-px bg-gray-300 mx-auto mb-6"></div>
      <h3 className="text-3xl italic font-serif mb-4">
        Simplify
      </h3>
      <p className="text-[#4B5563] text-lg leading-relaxed">
        We believe simple collaboration creates the strongest learning experiences.
      </p>
    </div>

    {/* Value 3 */}
    <div className="max-w-sm mx-auto">
      <div className="w-24 h-px bg-gray-300 mx-auto mb-6"></div>
      <h3 className="text-3xl italic font-serif mb-4">
        Embrace change
      </h3>
      <p className="text-[#4B5563] text-lg leading-relaxed">
        We adapt, improve, and evolve with every project and contribution.
      </p>
    </div>

    {/* Value 4 */}
    <div className="max-w-sm mx-auto">
      <div className="w-24 h-px bg-gray-300 mx-auto mb-6"></div>
      <h3 className="text-3xl italic font-serif mb-4">
        Get it done
      </h3>
      <p className="text-[#4B5563] text-lg leading-relaxed">
        We turn ideas into real projects through action and teamwork.
      </p>
    </div>

    {/* Value 5 */}
    <div className="max-w-sm mx-auto">
      <div className="w-24 h-px bg-gray-300 mx-auto mb-6"></div>
      <h3 className="text-3xl italic font-serif mb-4">
        Push limits
      </h3>
      <p className="text-[#4B5563] text-lg leading-relaxed">
        We challenge ourselves to grow beyond comfort zones.
      </p>
    </div>

    {/* Value 6 */}
    <div className="max-w-sm mx-auto">
      <div className="w-24 h-px bg-gray-300 mx-auto mb-6"></div>
      <h3 className="text-3xl italic font-serif mb-4">
        Build together
      </h3>
      <p className="text-[#4B5563] text-lg leading-relaxed">
        Progress happens faster when we learn, share, and grow as a team.
      </p>
    </div>

  </div>
</section>
{/* OUR SOCIAL IMPACT */}
<section className="py-24 px-4 bg-white">
  <div className="max-w-7xl mx-auto text-center">

    {/* Heading */}
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-gray-800 mb-20">
      Our Social Impact
    </h2>

    {/* Impact Items */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-16">

      {/* Impact 1 */}
      <div className="flex flex-col items-center">
        <img
          src="/about/social-impact/economy.svg"   
          alt="Economic Opportunity"
          className="w-22 h-22 mb-6"
        />
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Skill-Based Growth
        </h3>
        <p className="text-sm leading-relaxed text-gray-600 max-w-sm">
          SkillCircle creates opportunities for developers to grow by collaborating
          on real projects, gaining hands-on experience beyond traditional learning.
        </p>
      </div>

      {/* Impact 2 */}
      <div className="flex flex-col items-center">
        <img
          src="/about/social-impact/collaboration.svg"  
          alt="Community Well-being"
          className="w-22 h-22 mb-6"
        />
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Collaborative Well-being
        </h3>
        <p className="text-sm leading-relaxed text-gray-600 max-w-sm">
          By encouraging teamwork and peer learning, SkillCircle fosters a
          supportive environment where developers grow together.
        </p>
      </div>

      {/* Impact 3 */}
      <div className="flex flex-col items-center">
        <img
          src="/about/social-impact/world.svg"   
          alt="Real Impact"
          className="w-22 h-22 mb-6"
        />
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Real-World Impact
        </h3>
        <p className="text-sm leading-relaxed text-gray-600 max-w-sm">
          Through practical collaboration and project building, SkillCircle helps
          developers create meaningful solutions with real-world value.
        </p>
      </div>

    </div>

    {/* Button */}
    <div className="mt-16">
      


<Link
  href="/"
  className="inline-block px-6 py-3 rounded-md bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition"
>
  Learn more
</Link>

    </div>

  </div>
</section>






    
      

    </div>
  );
};

export default AboutUs;
