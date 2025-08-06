export const pattern = {
  required: /\S+/,
  email: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
  name: /^[\p{L}\s]+$/u,
  minLength: (length) => new RegExp(`^.{${length},}$`),
  maxLength: (length) => new RegExp(`^.{0,${length}}$`),
};

export const validations = {
  name: [
    { message: "Name is required", pattern: pattern.required },
    {
      message: "Name must be at least 2 characters",
      pattern: pattern.minLength(2),
    },
    {
      message: "Name can only contain letters and spaces",
      pattern: pattern.name,
    },
  ],
  email: [
    { message: "Email is required", pattern: pattern.required },
    { message: "Invalid email address", pattern: pattern.email },
  ],
  message: [
    { message: "Message is required", pattern: pattern.required },
    {
      message: "Message must be at least 10 characters",
      pattern: pattern.minLength(10),
    },
    {
      message: "Message must be under 300 characters",
      pattern: pattern.maxLength(300),
    },
  ],
};
