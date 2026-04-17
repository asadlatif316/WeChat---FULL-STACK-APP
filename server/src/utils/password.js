import bcrypt from 'bcryptjs';

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(password, salt);
  return hashPass;
};


