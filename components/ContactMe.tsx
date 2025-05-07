import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useForm, SubmitHandler } from "react-hook-form";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

// Dynamically import Heroicons with SSR disabled
const PhoneIcon = dynamic(() => import("@heroicons/react/24/solid").then((mod) => mod.PhoneIcon), { ssr: false });
const MapPinIcon = dynamic(() => import("@heroicons/react/24/solid").then((mod) => mod.MapPinIcon), { ssr: false });
const EnvelopeIcon = dynamic(() => import("@heroicons/react/24/solid").then((mod) => mod.EnvelopeIcon), { ssr: false });

type Props = {};

type Inputs = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function ContactMe({}: Props) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Inputs>();
  const [isHeartClicked, setIsHeartClicked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);

  useEffect(() => {
    emailjs.init("cRWCBKWsBFk_Ns1k9");
  }, []);

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await emailjs.send(
        "service_viiik3f",
        "template_r2t4t8e",
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }
      );
      setSubmitStatus("success");
      reset();
    } catch (error) {
      console.error("EmailJS error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleHeartClick = () => {
    setIsHeartClicked(true);
    setTimeout(() => setIsHeartClicked(false), 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="h-screen relative flex flex-col text-center md:text-left md:flex-row max-w-7xl px-4 sm:px-6 md:px-10 justify-evenly mx-auto items-center"
    >
      <h3 className="absolute top-16 sm:top-20 md:top-24 uppercase tracking-[12px] sm:tracking-[15px] md:tracking-[20px] text-gray-500 text-base sm:text-lg md:text-xl lg:text-2xl">
        Contact
      </h3>

      <div className="flex flex-col space-y-5 sm:space-y-6 md:space-y-8 lg:space-y-10 w-full mt-24 sm:mt-20 md:mt-0">
        <h4 className="text-base sm:text-lg md:text-xl lg:text-3xl font-semibold text-center">
          Need a creative mind? Look no further!{" "}
          <span className="decoration-darkGreen/50 underline">Let&apos;s join forces</span> and make magic happen. Coffee&apos;s on me – unless you prefer tea!
        </h4>

        <div className="space-y-2 sm:space-y-3 md:space-y-4">
          <div className="flex items-center justify-center space-x-2 sm:space-x-3 md:space-x-4">
            <PhoneIcon className="text-darkGreen h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-7 lg:w-7 animate-pulse" />
            <p className="text-xs sm:text-sm md:text-base lg:text-lg">+44 7741918549</p>
          </div>
          <div className="flex items-center justify-center space-x-2 sm:space-x-3 md:space-x-4">
            <EnvelopeIcon className="text-darkGreen h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-7 lg:w-7 animate-pulse" />
            <p className="text-xs sm:text-sm md:text-base lg:text-lg">tirthkanani18@gmail.com</p>
          </div>
          <div className="flex items-center justify-center space-x-2 sm:space-x-3 md:space-x-4">
            <MapPinIcon className="text-darkGreen h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-7 lg:w-7 animate-pulse" />
            <p className="text-xs sm:text-sm md:text-base lg:text-lg">London, United Kingdom</p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-2 sm:space-y-3 md:space-y-4 w-full px-4 mx-auto"
        >
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 md:space-x-4">
            <input
              {...register("name", { required: true })}
              placeholder="Name"
              className="contactInput text-xs sm:text-sm md:text-base"
              type="text"
            />
            <input
              {...register("email", { required: true })}
              placeholder="Email"
              className="contactInput text-xs sm:text-sm md:text-base"
              type="email"
            />
          </div>
          <input
            {...register("subject")}
            placeholder="Subject"
            className="contactInput text-xs sm:text-sm md:text-base"
            type="text"
          />
          <textarea
            {...register("message")}
            placeholder="Message"
            className="contactInput text-xs sm:text-sm md:text-base"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-darkGreen to-lightGreen py-2 sm:py-3 md:py-4 px-4 sm:px-6 md:px-10 rounded-md text-white font-bold text-xs sm:text-sm md:text-base"
          >
            Submit
          </button>
        </form>

        <div className="w-full text-center mt-4 sm:mt-6 md:mt-8">
          <p className="text-gray-500 text-xs sm:text-sm md:text-base flex items-center justify-center">
            Crafted with{" "}
            <motion.span
              className="inline-block mx-1 cursor-pointer"
              onClick={handleHeartClick}
              animate={
                isHeartClicked
                  ? {
                      scale: [1, 1.3, 1, 1.2, 1],
                      y: [0, -5, 0, -3, 0],
                      filter: [
                        "drop-shadow(0 0 0 transparent)",
                        "drop-shadow(0 0 5px #EF4444)",
                        "drop-shadow(0 0 0 transparent)",
                        "drop-shadow(0 0 5px #EF4444)",
                        "drop-shadow(0 0 0 transparent)",
                      ],
                      color: ["#9CA3AF", "#EF4444", "#9CA3AF", "#EF4444", "#9CA3AF"],
                    }
                  : {}
              }
              transition={{ duration: 1 }}
            >
              ❤️
            </motion.span>{" "}
            by Tirth
          </p>
        </div>
      </div>
    </motion.div>
  );
}
