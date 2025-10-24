import React from "react";
import Button from "../components/Button";

const GoRegister = () => {
  return (
    <section className="bg-[#f3ebd5] py-8 px-6 flex flex-col md:flex-row items-center justify-center gap-6">
      <div className=" text-gray-800 text-center md:text-left">
        <h1 className="text-2xl font-bold mb-2">Join Us Today!</h1>
        <p className=" mb-3">
          Register now to access exclusive features and start your journey with
          us.
        </p>
        <Button name="Register" />
      </div>
    </section>
  );
};

export default GoRegister;
