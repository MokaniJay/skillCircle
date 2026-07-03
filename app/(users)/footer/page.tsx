import Link from "next/link";

const Footer = () => {
  return (
<footer className="w-full bg-[#0e4a22] text-white">

      
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row md:justify-between gap-6">

          {/* Left Links */}
          <div className="flex flex-col gap-2 text-left">
            <Link href="/" className="hover:underline">Home</Link>
            <Link href="/about" className="hover:underline">About</Link>
         
            <Link href="/showcase" className="hover:underline">Showcase</Link>
          </div>

          {/* Right Content (optional) */}
          {/* <div className="text-left md:text-right">
            <h1 className="text-lg font-semibold">SkillCircle</h1>
            <p className="text-sm opacity-90">
              Academic Kona Project
            </p>
          </div> */}

        </div>
      </div>

      {/* Bottom Copyright */}
      {/* <div className="border-t border-black-500 py-4 text-center text-sm opacity-90">
        
        © {new Date().getFullYear()} SkillCircle · All Rights Reserved
      </div> */}



      <div className="border-t border-black-500 py-4 px-6">
  <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between text-sm">
    <p className="opacity-90">
      © {new Date().getFullYear()} SkillCircle · All Rights Reserved
    </p>

   <p className="text-[1w1px]  opacity-170 mt-1 md:mt-0">
  Built with Next.js & Tailwind CSS
</p>

  </div>
</div>


    </footer>
  );
};

export default Footer;
