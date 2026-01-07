export const isValidEmail = (email) => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(email).toLowerCase());
};

export const isValidMobile = (mobile) => {
  // Indian mobile number: 6-9 followed by 9 digits (total 10)
  const re = /^[6-9]\d{9}$/;
  return re.test(mobile);
};

export const isValidName = (name) => {
  // At least 2 chars, letters and spaces only
  const re = /^[a-zA-Z\s]{2,50}$/;
  return re.test(name);
};

export const isValidOTP = (otp) => {
  // 4 to 6 digits
  const re = /^\d{4,6}$/;
  return re.test(otp);
};

export const isNumeric = (val) => {
  return /^\d+$/.test(val);
};
