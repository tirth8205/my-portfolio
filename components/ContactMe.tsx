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
    <div className="min-h-screen flex relative flex-col text-center md:text-left max-w-7xl px-4 sm:px-6 md:px-10 mx-auto items-center pt-12 sm:pt-16 md:pt-20">
      <h3 className="absolute top-0 left-0 right-0 text-center pt-4 sm:pt-6 md:pt-8 uppercase tracking-[15px] sm:tracking-[20px] text-gray-500 text-lg sm:text-xl md:text-2xl lg:text-3xl">
        Contact
      </h3>

      <div className="flex flex-col items-center justify-center space-y-8 sm:space-y-10 md:space-y-12 lg:space-y-14 xl:space-y-16 2xl:space-y-18 w-full">
        <h4 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold text-center max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto">
          Ready to bring your ideas to life?{" "}
          <br className="hidden sm:block" />
          <span className="decoration-darkGreen/50 underline">Let’s connect and make it happen!</span>
        </h4>

        <div className="space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6 w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto">
          <div className="flex items-center justify-center space-x-4 sm:space-x-5">
            <PhoneIcon className="text-darkGreen h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 animate-pulse flex-shrink-0" />
            <p className="text-sm sm:text-base md:text-lg lg:text-xl">+44 7741918549</p>
          </div>
          <div className="flex items-center justify-center space-x-4 sm:space-x-5">
            <EnvelopeIcon className="text-darkGreen h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 animate-pulse flex-shrink-0" />
            <p className="text-sm sm:text-base md:text-lg lg:text-xl">
              tirthkanani18@gmail.com
            </p>
          </div>
          <div className="flex items-center justify-center space-x-4 sm:space-x-5">
            <MapPinIcon className="text-darkGreen h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 animate-pulse flex-shrink-0" />
            <p className="text-sm sm:text-base md:text-lg lg:text-xl">
              Birmingham, United Kingdom
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-3 sm:space-y-4 md:space-y-5 w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto"
        >
          <div className="flex flex-col md:flex-row md:space-x-4 space-y-3 md:space-y-0">
            <input
              {...register("name")}
              placeholder="Name"
              className="contactInput w-full text-sm sm:text-base md:text-lg"
              type="text"
            />
            <input
              {...register("email")}
              placeholder="Email"
              className="contactInput w-full text-sm sm:text-base md:text-lg"
              type="email"
            />
          </div>
          <input
            {...register("subject")}
            placeholder="Subject"
            className="contactInput w-full text-sm sm:text-base md:text-lg"
            type="text"
          />
          <textarea
            {...register("message")}
            placeholder="Message"
            className="contactInput w-full text-sm sm:text-base md:text-lg"
            rows={4}
          />
          <button className="bg-lightGreen py-2 sm:py-3 md:py-4 px-8 sm:px-10 rounded-lg text-white font-bold text-sm sm:text-base md:text-lg">
            Submit
          </button>
        </form>

        {/* Footer with "Crafted with ❤️ by Tirth" */}
        <div className="w-full text-center mt-6 sm:mt-8 md:mt-10">
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