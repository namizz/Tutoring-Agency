// interface ButtonProps {
//   name: string;
//   type?: "button" | "submit" | "reset";
//   onclick?: () => void;
// }
// const Button = ({ name, type, onclick }: ButtonProps) => {
//   return (
//     <button
//       type={type || "button"}
//       onClick={onclick}
//       // { () => {
//       //   const element = document.getElementById("skills");
//       //   if (element) {
//       //     const offset = 90;
//       //     const elementPosition =
//       //       element.getBoundingClientRect().top + window.scrollY;
//       //     window.scrollTo({
//       //       top: elementPosition - offset,
//       //       behavior: "smooth",
//       //     });
//       //   }
//       // }}
//     >
//       <div className="relative group inline-block p-px leading-6 text-white bg-gray-800 shadow-sm cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95">
//         <button className="relative inline-block p-px leading-6 text-white bg-gray-800 shadow-sm cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95">
//           <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
//           <span className="relative z-10 block px-4 py-3 rounded-xl bg-gray-950">
//             <div className="relative z-10 flex items-center space-x-2">
//               <span className="transition-all duration-500 group-hover:translate-x-1">
//                 {name}
//               </span>
//               <svg
//                 className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-1"
//                 aria-hidden="true"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   clipRule="evenodd"
//                   d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
//                   fillRule="evenodd"
//                 ></path>
//               </svg>
//             </div>
//           </span>
//         </button>
//       </div>
//     </button>
//   );
// };

// export default Button;
interface ButtonProps {
  name: string;
  type?: "button" | "submit" | "reset";
  onclick?: () => void;
}

const Button = ({ name, type, onclick }: ButtonProps) => {
  return (
    <button type={type || "button"} onClick={onclick}>
      <div className="relative group inline-block p-px rounded-xl cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95 shadow-md border-1 border-[#ffffff2d]">
        <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-500 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100 shadow-lg shadow-cyan-600/40"></span>
        <span className="relative z-10 block px-6 py-3 rounded-xl bg-[#1F2D3A] text-white font-semibold">
          <div className="flex items-center justify-center space-x-2">
            <span className="transition-transform duration-500 group-hover:translate-x-1">
              {name}
            </span>
            <svg
              className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                clipRule="evenodd"
                d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                fillRule="evenodd"
              />
            </svg>
          </div>
        </span>
      </div>
    </button>
  );
};

export default Button;
