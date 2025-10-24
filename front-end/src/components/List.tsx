import React from "react";
interface ListProps {
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

const List = ({ icon, children }: ListProps) => {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <p>{children}</p>
    </div>
  );
};

export default List;
