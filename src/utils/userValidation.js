export const invalidEmail = (email) => {
  const atposition = email.indexOf("@");
  const dotposition = email.lastIndexOf(".");
  if (
    email &&
    (atposition < 1 ||
      dotposition < atposition + 2 ||
      dotposition + 2 >= email.length)
  )
    return "Invalid email format";

  return false;
};
