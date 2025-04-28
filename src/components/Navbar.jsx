import React from "react";

const Navbar = () => {
  return (
    <div className="w-full mx-auto shadow-[0_4px_10px_#42229f] ">
      <nav className="flex text-lg text-white box bg-black justify-around items-center w-full h-12">
        <div className="logo font-bold sm:text-2xl p-2 ">
          <span className="text-[#5f33e0]">&lt; </span>
          <span>Pass</span>
          <span className="text-[#5f33e0]"> OP/&gt;</span>
        </div>

        <a href="https://github.com/Light200312/Projects">
        
          <div className="flex justify-center items-center border-2 border-white rounded-full">
            <script src="https://cdn.lordicon.com/lordicon.js"></script>

            <lord-icon
              src="https://cdn.lordicon.com/jjxzcivr.json"
              trigger="loop"
              stroke="bold"
              state="hover-pinch"
              style={{ width: "36px", height: "36px", fontBold: "bold" }}
            ></lord-icon>
            <span className="pt-0 pr-2">GitHub</span>
          </div>
        </a>
       
      </nav>
    </div>
  );
};

export default Navbar;
