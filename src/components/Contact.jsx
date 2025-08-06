import React, { useState } from "react";
import { toast } from "react-toastify";
import { motion } from "motion/react";
import { validations, bannedWords } from "./validations";

const Contact = () => {
  const [result, setResult] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    let fieldError = "";

    validations[name].forEach((rule) => {
      if (!rule.pattern.test(value.trim()) && !fieldError) {
        fieldError = rule.message;
      }
    });

    if (
      name === "message" &&
      !fieldError &&
      bannedWords.some((word) => value.toLowerCase().includes(word))
    ) {
      fieldError = "Message contains inappropriate words.";
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: fieldError,
    }));
  };

  const validate = () => {
    const newErrors = {};

    for (const field in validations) {
      const value = formData[field].trim();
      let message = "";

      validations[field].forEach((rule) => {
        if (!rule.pattern.test(value) && !message) {
          message = rule.message;
        }
      });

      if (message) {
        newErrors[field] = message;
      }
    }

    const messageValue = formData.message.toLowerCase();
    if (
      bannedWords.some((word) => messageValue.includes(word)) &&
      !newErrors.message
    ) {
      newErrors.message = "Message contains inappropriate words.";
    }

    return newErrors;
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fix the errors in the form.");
      return;
    }

    setErrors({});
    setResult("Sending...");

    const formDataToSend = new FormData(event.target);
    formDataToSend.append("access_key", "72a1f504-c041-4580-9994-0348ee6a0782");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formDataToSend,
    });

    const data = await response.json();

    if (data.success) {
      setResult("");
      toast.success("Form Submitted Successfully");
      setFormData({ name: "", email: "", message: "" });
      event.target.reset();
    } else {
      console.log("Error", data);
      toast.error(data.message);
      setResult("");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -200 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="text-center p-6 py-20 lg:px-32 w-full overflow-hidden"
      id="Contact"
    >
      <h1 className="text-2xl sm:text-4xl font-bold mb-2 text-center">
        Contact{" "}
        <span className="underline underline-offset-4 decoration-1 under font-light">
          With us
        </span>
      </h1>
      <p className="text-center text-gray-500 mb-12 max-w-80 mx-auto">
        Ready to make a move? Let's build your future together
      </p>

      <form
        onSubmit={onSubmit}
        className="max-w-2xl mx-auto text-gray-600 pt-8"
      >
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/2 text-left">
            Your Name
            <input
              name="name"
              className="w-full border border-gray-300 rounded py-3 px-4 mt-2"
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              autoComplete="off"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div className="w-full md:w-1/2 text-left md:pl-4">
            Your Email
            <input
              name="email"
              className="w-full border border-gray-300 rounded py-3 px-4 mt-2"
              type="text"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="off"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div className="w-full my-6 text-left">
            Message
            <textarea
              className="w-full border border-gray-300 rounded py-3 px-4 mt-2 h-48 resize-none"
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
            ></textarea>
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">{errors.message}</p>
            )}
          </div>
        </div>

        <button className="bg-blue-900 text-white py-2 px-12 mb-10 rounded">
          {result ? result : "Send Message"}
        </button>
      </form>
    </motion.div>
  );
};

export default Contact;
