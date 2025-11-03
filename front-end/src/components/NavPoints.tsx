interface NavPointsProps {
  name: string;
  id?: string;
  dark?: boolean;
}

const NavPoints = ({ name, id, dark }: NavPointsProps) => {
  return (
    <button
      onClick={() =>
        id &&
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
      }
      className={`${
        dark ? "text-black" : "text-white"
      }hover:text-blue-400 transition-colors duration-300`}
    >
      {name}
    </button>
  );
};

export default NavPoints;
