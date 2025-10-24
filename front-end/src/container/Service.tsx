import React from "react";
import ServiceComponent from "../components/ServiceComponent";
import { FaSchoolLock, FaLaptopCode, FaPlane } from "react-icons/fa6";
import { SiDuolingo, SiTestin } from "react-icons/si";
import { RiVipFill } from "react-icons/ri";

const services = [
  {
    title: "General Tutor",
    description: "Kg- university ሁለገብ የጥናት አገልግሎት",
    icon: <FaSchoolLock className="text-4xl text-yellow-500" />,
  },
  {
    title: "GAT and UAT",
    description: "GAT and UAT ዝግጅቶች",
    icon: <SiTestin className="text-4xl text-blue-500" />,
  },
  {
    title: "SAT and Duolingo",
    description: "SAT and Duolingo ዝግጅቶች",
    icon: (
      <SiDuolingo className="text-4xl text-green-500 bg-yellow-100 rounded-xl" />
    ),
  },
  {
    title: "VIP Tutor",
    description: "የ VIP መምህራን ና የVIP አገልግሎቶችን አዘጋጅተናል",
    icon: <RiVipFill className="text-4xl text-purple-500" />,
  },
  {
    title: "VISA",
    description: "የ ውጪ ትምህርት እድሎችን ማመቻቸት",
    icon: <FaPlane className="text-4xl text-red-500 font-bold" />,
  },
];

const Service = () => {
  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-8">
        <h1 className="text-3xl font-bold text-center mb-12">Our Services</h1>
        <div className="flex flex-wrap justify-center gap-8 w-full">
          {services.map((service, index) => (
            <ServiceComponent
              key={index}
              icon={service.icon}
              title={service.title}
            >
              {service.description}
            </ServiceComponent>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Service;
