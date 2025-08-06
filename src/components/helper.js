import { validations } from "./validations";

export const validateFields = (fields) => {
  // const fields = {
  //   name: refs.name?.value.trim(),
  //   email: refs.email?.value.trim(),
  //   message: refs.message?.value.trim(),
  // };


  const newErrors = {};

  for (const field in validations) {
    let message = "";

    validations[field].forEach((rule) => {
      if (!rule.pattern.test(fields[field]) && !message) {
        message = rule.message;
      }
    });

    if (message) {
      newErrors[field] = message;
    }
  }

  return {
    isValid: Object.keys(newErrors).length === 0,
    errors: newErrors,
  };
};
