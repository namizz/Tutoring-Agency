import React from "react";
import List from "../components/List";
import { LuBrain } from "react-icons/lu";
import { BsBook } from "react-icons/bs";
import { RiHeartLine } from "react-icons/ri";
import { LiaChalkboardSolid } from "react-icons/lia";

const Value = () => {
  const darkBlue = "#1F2D3A";

  return (
    <section className="bg-white text-[#1F2D3A] py-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 px-8 md:px-20">
        {/* Left Text Section */}
        <div className="space-y-6 md:max-w-lg">
          <h1 className="text-3xl md:text-4xl font-bold">
            For your Children’s Growth
          </h1>

          <List icon={<LuBrain className="text-[#1F2D3A] text-2xl mr-4" />}>
            የ ዕውቀታቸውን ማህደር የሚያሰፋ
          </List>

          <List icon={<BsBook className="text-[#1F2D3A] text-2xl mr-4" />}>
            የ ግንዛቤ ደረጃቸውን የሚጨምሩ
          </List>

          <List icon={<RiHeartLine className="text-[#1F2D3A] text-2xl mr-4" />}>
            የ ህይውት ልምዳቸውን የሚያካፍሉ ና
          </List>

          <List
            icon={
              <LiaChalkboardSolid className="text-[#1F2D3A] text-2xl mr-4" />
            }
          >
            ትምህርት በተዋዛ ና ስርዓት በተሞላበት መልኩ የሚያስጨብጡ መምህራንን ይዘንሎት በአዲስ ዓመት፡ በአዲስ
            መንገድ መጥተናል
          </List>
        </div>

        {/* Right Image Section */}
        <div className="flex-shrink-0">
          <img
            src="/Teacher 3D cartoon.jpg"
            alt="Tutoring session illustration"
            className="w-72 md:w-96 h-auto object-contain rounded-xl shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default Value;
