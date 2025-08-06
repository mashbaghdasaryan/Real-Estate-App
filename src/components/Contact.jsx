import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import { motion } from "motion/react";
import { validateFields } from "./helper";

const Contact = () => {
  const formRefs = useRef({
    name: "",
    email: "",
    message: "",
  });

  const [result, setResult] = useState("");
  const [errors, setErrors] = useState({});

  const handleBlur = (e) => {
    const { name } = e.target;
    const { errors: validationErrors } = validateFields(formRefs.current);

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validationErrors[name],
    }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    const { isValid, errors: validationErrors } = validateFields(
      formRefs.current
    );

    if (!isValid) {
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
      event.target.reset();
    } else {
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
        onChange={(e) => (formRefs.current[e.target.name] = e.target.value)}
        onBlur={handleBlur}
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
              autoComplete="off"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div className="w-full my-6 text-left">
            Message
            <textarea
              name="message"
              className="w-full border border-gray-300 rounded py-3 px-4 mt-2 h-48 resize-none"
              placeholder="Message"
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
