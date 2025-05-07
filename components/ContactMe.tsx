import React, { useState, useEffect } from "react";
import { PhoneIcon, MapPinIcon, EnvelopeIcon } from "@heroicons/react/24/solid";
import { useForm, SubmitHandler } from "react-hook-form";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

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

  // Initialize EmailJS with your Public Key
  useEffect(() => {
    emailjs.init("cRWCBKWsBFk_Ns1k9"); // Your EmailJS Public Key
  }, []);

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await emailjs.send(
        "service_viiik3f", // Your EmailJS Service ID
        "template_r2t4t8e", // Your EmailJS Template ID
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }
      );
      setSubmitStatus("success");
      reset(); // Clear the form after successful submission
    } catch (error) {
      console.error("EmailJS error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle heart click for animation in footer
  const handleHeartClick = () => {
    setIsHeartClicked(true);
    setTimeout(() => setIsHeartClicked(false), 1000); // Reset after 1 second
  };

  return (
    <div className="h-screen flex relative flex-col text-center max-w-7xl px-3 sm:px-4 md:px-8 lg:px-10 mx-auto items-center pt-12 sm:pt-16 md:pt-20 pb-12 sm:pb-16 md:pb-20">
      <h3 className="absolute top-10 sm:top-12 md:top-16 left-0 right-0 text-center pt-2 sm:pt-3 md:pt-4 uppercase tracking-[12px] sm:tracking-[15px] md:tracking-[20px] text-gray-500 text-base sm:text-lg md:text-xl lg:text-2xl">
        Contact
      </h3>

      <div className="flex flex-col items-center justify-center space-y-4 sm:space-y-5 md:space-y-6 w-full h-full">
        <h4 className="text-sm sm:text-base md:text-lg lg:text-3xl font-semibold text-center max-w-[90%] sm:max-w-xs md:max-w-sm lg:max-w-md mx-auto mt-5 sm:mt-6 md:mt-7">
          Need a creative mind? Look no further!{" "}
          <br className="hidden sm:block" />
          <span className="decoration-darkGreen/50 underline">Let’s join forces</span> and make magic happen. Coffee’s on me – unless you prefer tea!
        </h4>

        <div className="space-y-1 sm:space-y-2 md:space-y-3 w-full max-w-[90%] sm:max-w-xs md:max-w-sm lg:max-w-md mx-auto">
          <div className="flex items-center justify-center space-x-2 sm:space-x-3 md:space-x-4">
            <PhoneIcon className="text-darkGreen h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 animate-pulse flex-shrink-0" />
            <p className="text-[10px] sm:text-xs md:text-sm lg:text-base">+44 7741918549</p>
          </div>
          <div className="flex items-center justify-center space-x-2 sm:space-x-3 md:space-x-4">
            <EnvelopeIcon className="text-darkGreen h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 animate-pulse flex-shrink-0" />
            <p className="text-[10px] sm:text-xs md:text-sm lg:text-base">
              tirthkanani18@gmail.com
            </p>
          </div>
          <div className="flex items-center justify-center space-x-2 sm:space-x-3 md:space-x-4">
            <MapPinIcon className="text-darkGreen h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 animate-pulse flex-shrink-0" />
            <p className="text-[10px] sm:text-xs md:text-sm lg:text-base">
              Birmingham, United Kingdom
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-1 sm:space-y-2 md:space-y-3 w-full max-w-[90%] sm:max-w-xs md:max-w-sm lg:max-w-md mx-auto"
        >
          <div className="flex flex-col md:flex-row md:space-x-3 space-y-1 sm:space-y-2 md:space-y-0">
            <div className="w-full">
              <input
                {...register("name")}
                placeholder="Name"
                className="contactInput w-full text-[10px] sm:text-xs md:text-sm lg:text-base"
                type="text"
              />
            </div>
            <div className="w-full">
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Please enter a valid email address",
                  },
                })}
                placeholder="Email"
                className="contactInput w-full text-[10px] sm:text-xs md:text-sm lg:text-base"
                type="email"
              />
              {errors.email && (
                <p className="text-red-600 text-[10px] sm:text-xs mt-0.5">{errors.email.message}</p>
              )}
            </div>
          </div>
          <input
            {...register("subject")}
            placeholder="Subject"
            className="contactInput w-full text-[10px] sm:text-xs md:text-sm lg:text-base"
            type="text"
          />
          <textarea
            {...register("message")}
            placeholder="Message"
            className="contactInput w-full text-[10px] sm:text-xs md:text-sm lg:text-base"
            rows={3}
          />
          <button
            className="bg-lightGreen py-0.5 sm:py-1 md:py-2 px-4 sm:px-6 md:px-8 rounded-lg text-white font-bold text-[10px] sm:text-xs md:text-sm lg:text-base disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Submit"}
          </button>
        </form>

        {submitStatus === "success" && (
          <p className="text-green-600 text-[10px] sm:text-xs md:text-sm mt-0.5 sm:mt-1">
            Message sent successfully! I&apos;ll get back to you soon.
          </p>
        )}
        {submitStatus === "error" && (
          <p className="text-red-600 text-[10px] sm:text-xs md:text-sm mt-0.5 sm:mt-1">
            Failed to send message. Please try again later.
          </p>
        )}

        {/* Footer with "Crafted with ❤️ by Tirth" */}
        <div className="w-full text-center mt-2 sm:mt-3 md:mt-4">
          <p className="text-gray-500 text-[10px] sm:text-xs md:text-sm flex items-center justify-center">
            Crafted with{" "}
            <motion.span
              className="inline-block align-middle mx-0.5 sm:mx-1 cursor-pointer"
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