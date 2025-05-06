import React, { useState } from "react";
import { PhoneIcon, MapPinIcon, EnvelopeIcon } from "@heroicons/react/24/solid";
import { useForm, SubmitHandler } from "react-hook-form";
import { motion } from "framer-motion";

type Props = {};

type Inputs = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function ContactMe({}: Props) {
  const { register, handleSubmit } = useForm<Inputs>();
  const [isHeartClicked, setIsHeartClicked] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = (formData) => {
    const encodedSubject = encodeURIComponent(formData.subject);
    const encodedMessage = encodeURIComponent(formData.message);
    const encodedName = encodeURIComponent(formData.name);
    window.location.href = `mailto:tirthkanani18@gmail.com?subject=${encodedSubject}&body=Hi, my name is ${encodedName}.${encodedMessage}`;
  };

  // Handle heart click for animation in footer
  const handleHeartClick = () => {
    setIsHeartClicked(true);
    setTimeout(() => setIsHeartClicked(false), 1000); // Reset after 1 second
  };

  return (
    <div className="min-h-screen flex relative flex-col text-center max-w-7xl px-4 sm:px-6 md:px-10 mx-auto items-center pt-16 sm:pt-20 md:pt-24">
      <h3 className="absolute top-0 left-0 right-0 text-center pt-4 sm:pt-6 md:pt-8 uppercase tracking-[15px] sm:tracking-[20px] text-gray-500 text-xl md:text-2xl">
        Contact
      </h3>

      <div className="flex flex-col items-center justify-center space-y-6 w-full">
        <h4 className="text-lg md:text-2xl lg:text-4xl font-semibold text-center max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto mt-4">
          Need a creative mind? Look no further!{" "}
          <br className="hidden sm:block" />
          <span className="decoration-darkGreen/50 underline">Let's join forces</span> and make magic happen. Coffee's on me – unless you prefer tea!
        </h4>

        <div className="space-y-2 w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto">
          <div className="flex items-center justify-center space-x-4 sm:space-x-5">
            <PhoneIcon className="text-darkGreen h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 animate-pulse flex-shrink-0" />
            <p className="text-sm md:text-base lg:text-lg">+44 7741918549</p>
          </div>
          <div className="flex items-center justify-center space-x-4 sm:space-x-5">
            <EnvelopeIcon className="text-darkGreen h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 animate-pulse flex-shrink-0" />
            <p className="text-sm md:text-base lg:text-lg">
              tirthkanani18@gmail.com
            </p>
          </div>
          <div className="flex items-center justify-center space-x-4 sm:space-x-5">
            <MapPinIcon className="text-darkGreen h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 animate-pulse flex-shrink-0" />
            <p className="text-sm md:text-base lg:text-lg">
              Birmingham, United Kingdom
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-2 w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto"
        >
          <div className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0">
            <input
              {...register("name")}
              placeholder="Name"
              className="contactInput w-full text-sm md:text-base lg:text-lg"
              type="text"
            />
            <input
              {...register("email")}
              placeholder="Email"
              className="contactInput w-full text-sm md:text-base lg:text-lg"
              type="email"
            />
          </div>
          <input
            {...register("subject")}
            placeholder="Subject"
            className="contactInput w-full text-sm md:text-base lg:text-lg"
            type="text"
          />
          <textarea
            {...register("message")}
            placeholder="Message"
            className="contactInput w-full text-sm md:text-base lg:text-lg"
            rows={4}
          />
          <button className="bg-lightGreen py-2 sm:py-3 md:py-4 px-8 sm:px-10 rounded-lg text-white font-bold text-sm md:text-base lg:text-lg">
            Submit
          </button>
        </form>

        {/* Footer with "Crafted with ❤️ by Tirth" */}
        <div className="w-full text-center mt-4">
          <p className="text-gray-500 text-xs sm:text-sm md:text-base flex items-center justify-center">
            Crafted with{" "}
            <motion.span
              className="inline-block align-middle mx-1 cursor-pointer"
              onClick={handleHeartClick}
              animate={
                isHeartClicked
                  ? {
                      scale: [1, 1.3, 1, 1.2, 1], // Heartbeat effect
                      y: [0, -5, 0, -3, 0], // Bounce effect
                      filter: [
                        "drop-shadow(0 0 0 transparent)",
                        "drop-shadow(0 0 5px #EF4444)",
                        "drop-shadow(0 0 0 transparent)",
                        "drop-shadow(0 0 5px #EF4444)",
                        "drop-shadow(0 0 0 transparent)",
                      ], // Glow effect
                      color: ["#9CA3AF", "#EF4444", "#9CA3AF", "#EF4444", "#9CA3AF"], // Color change
                    }
                  : { scale: 1, y: 0, filter: "drop-shadow(0 0 0 transparent)", color: "#9CA3AF" }
              }
              transition={{ duration: 1 }}
            >
              ❤️
            </motion.span>{" "}
            by Tirth
          </p>
        </div>
      </div>
    </div>
  );
}