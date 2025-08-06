export const pattern = {
  required: /^(?!\s*$).+/,
  email: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
  name: /^[a-zA-Z\s]+$/,
  minLength: (length) => new RegExp(`^.{${length},}$`),
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
  ],
};

export const bannedWords = ["buy now", "free money", "spam", "scam"];
