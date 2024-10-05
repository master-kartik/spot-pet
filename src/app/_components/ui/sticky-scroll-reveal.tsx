// "use client";
// import React, { useEffect, useRef, useState } from "react";
// import { useMotionValueEvent, useScroll } from "framer-motion";
// import { motion } from "framer-motion";
// import { cn } from "../../lib/utils";

// export const StickyScroll = ({
//   content,
//   contentClassName,
// }: {
//   content: {
//     title: string;
//     description: string;
//     content?: React.ReactNode | any;
//   }[];
//   contentClassName?: string;
// }) => {
//   const [activeCard, setActiveCard] = React.useState(0);
//   const ref = useRef<any>(null);
//   const { scrollYProgress } = useScroll({
//     // uncomment line 22 and comment line 23 if you DONT want the overflow container and want to have it change on the entire page scroll
//     // target: ref,
//     container: ref,
//     offset: ["start start", "end start"],
//   });
//   const cardLength = content.length;

//   useMotionValueEvent(scrollYProgress, "change", (latest) => {
//     const cardsBreakpoints = content.map((_, index) => index /( cardLength*1.4));
//     const closestBreakpointIndex = cardsBreakpoints.reduce(
//       (acc, breakpoint, index) => {
//         const distance = Math.abs(latest - breakpoint);
//         if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
//           return index;
//         }
//         return acc;
//       },
//       0
//     );
//     setActiveCard(closestBreakpointIndex);
//   });

//   const backgroundColors = [
//     "#050016",
  
//   ];
//   const linearGradients = [
//     "linear-gradient(to bottom right, var(--cyan-500), var(--emerald-500))",
//     "linear-gradient(to bottom right, var(--pink-500), var(--indigo-500))",
//     "linear-gradient(to bottom right, var(--orange-500), var(--yellow-500))",
//   ];

//   const [backgroundGradient, setBackgroundGradient] = useState(
//     linearGradients[0]
//   );

//   useEffect(() => {
//     setBackgroundGradient(linearGradients[activeCard % linearGradients.length]);
//   }, [activeCard]);

//   return (
//     <motion.div
//       animate={{
//         backgroundColor: backgroundColors[activeCard % backgroundColors.length],
//       }}
//       className="h-[90vh] w-full no-scrollbar overflow-y-auto flex my-auto justify-between px-10 relative space-x-10 "
//       ref={ref}
//     >
//       <div className="div relative flex items-start px-4">
//         <div className="w-[40vw]">
//           {content.map((item, index) => (
//             <div key={item.title + index} className="my-20">
//               <motion.h2
//                 initial={{
//                   opacity: 0,
//                 }}
//                 animate={{
//                   opacity: activeCard === index ? 1 : 0.3,
//                 }}
//                 className="text-9xl w-[90vw] font-neueregrade font-bold uppercase tracking-tighter text-softWhite"
//               >
//                 {item.title}
//               </motion.h2>
//               <motion.p
//                 initial={{
//                   opacity: 0,
//                 }}
//                 animate={{
//                   opacity: activeCard === index ? 1 : 0.3,
//                 }}
//                 className="text-base tracking-tight text-softWhite max-w-sm mt-8"
//               >
//                 {item.description}
//               </motion.p>
//             </div>
//           ))}
//           <div className="h-40" />
//         </div>
//       </div>
//       <div
//         style={{ background: backgroundGradient }}
//         className={cn(
//           "hidden lg:block h-96 w-[30vw] rounded-md  sticky top-20 overflow-hidden",
//           contentClassName
//         )}
//       >
//         {content[activeCard].content ?? null}
//       </div>
//     </motion.div>
//   );
// };
"use client";
import React, { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    title: string;
    description: string;
    content?: React.ReactNode | any;
  }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef<any>(null);
  
  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end start"],
  });
  
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index /( cardLength*1.4));
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0
    );
    setActiveCard(closestBreakpointIndex);
  });

  const backgroundColors = [
    "#FFF9E6",
  
  ];
  
  const linearGradients = [
    "linear-gradient(to bottom right, var(--cyan-500), var(--emerald-500))",
    "linear-gradient(to bottom right, var(--pink-500), var(--indigo-500))",
    "linear-gradient(to bottom right, var(--orange-500), var(--yellow-500))",
  ];

  const [backgroundGradient, setBackgroundGradient] = useState(
    linearGradients[0]
  );

  useEffect(() => {
    setBackgroundGradient(linearGradients[activeCard % linearGradients.length]);
  }, [activeCard]);

  return (
    <motion.div
      animate={{
        backgroundColor: backgroundColors[activeCard % backgroundColors.length],
      }}
      className="h-[90vh] w-full no-scrollbar overflow-y-auto flex my-auto justify-between px-10 relative space-x-10 scroll-smooth "
      ref={ref}
    >
      <div className="div relative flex items-start px-4">
        <div className="w-[40vw]">
          {content.map((item, index) => (
            <div key={item.title + index} className="my-20 ">
              <motion.h2
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                transition={{ duration: 0.5 }} // Smooth transition
                className="text-9xl w-[90vw] font-neueregrade font-bold uppercase tracking-tighter text-[#1A2A40]"
              >
              <div className="flex gap-2">  <div className="text-sm w-[1%] mb-[-2rem] flex justify-between relative top-0 italic"><div>{index+1 }</div></div> 
                 <div>

                {item.title}
                 </div></div>
              </motion.h2>
              <motion.p
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                transition={{ duration: 0.5 }} // Smooth transition
                className="text-base tracking-tight text-[#4A4A4A] max-w-sm mt-8"
              >
                {item.description}
              </motion.p>
            </div>
          ))}
          <div className="h-40" />
        </div>
      </div>
      <div
        style={{ background: backgroundGradient }}
        className={cn(
          "hidden lg:block h-96 w-[30vw] rounded-md sticky top-20 overflow-hidden",
          contentClassName
        )}
      >
        {content[activeCard].content ?? null}
      </div>
    </motion.div>
  );
};
