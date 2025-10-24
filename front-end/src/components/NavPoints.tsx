import React from "react";

interface NavPointsProps {
  name: string;
  id?: string;
}

const NavPoints = ({ name, id }: NavPointsProps) => {
  return (
    <button
      onClick={() =>
        id &&
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
      }
      className="text-white hover:text-blue-400 transition-colors duration-300"
    >
      {name}
    </button>
  );
};

export default NavPoints;
