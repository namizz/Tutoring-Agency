// import React from "react";
// import ServiceComponent from "../components/ServiceComponent";
// import { FaSchoolLock } from "react-icons/fa6";

// const SpecialService = () => {
//   return (
//     <section className="border-1">
//       <h1>Special Service</h1>
//       <div>
//         <ServiceComponent icon={<FaSchoolLock />} title={"dsabo"}>
//           adsnvpsaidvpo
//         </ServiceComponent>
//       </div>
//     </section>
//   );
// };

// export default SpecialService;

import React from "react";
import ServiceComponent from "../components/ServiceComponent";
import { FaSchoolLock, FaLaptopCode, FaPlane } from "react-icons/fa6";
import { SiDuolingo, SiTestin } from "react-icons/si";
import { RiVipFill } from "react-icons/ri";

const services = [
  {
    title: "6th Ministry Exam",
    description: "Kg- university ሁለገብ የጥናት አገልግሎት",
    icon: <FaSchoolLock className="text-4xl text-yellow-500" />,
  },
];

const Service = () => {
  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-8">
        <h1 className="text-3xl font-bold text-center mb-12">
          Special Services
        </h1>
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
