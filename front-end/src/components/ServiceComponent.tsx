import React from "react";

interface ServiceProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const ServiceComponent = ({ title, icon, children }: ServiceProps) => {
  return (
    <div className="bg-gradient-to-tl from-[#fff] to-[#fff] p-6 rounded-xl shadow-xs hover:shadow-md hover:scale-102 transition-transform duration-300 flex flex-col items-center text-center w-64">
      <div className="mb-4 ">{icon}</div>
      <h2 className="text-xl text-[#1F2D3A] font-semibold mb-2">{title}</h2>
      <p className="text-gray-600">{children}</p>
    </div>
  );
};

export default ServiceComponent;
