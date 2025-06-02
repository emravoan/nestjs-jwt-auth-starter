export const pwdHash = async (pwd: string): Promise<string> => {
  const bcrypt = await import('bcrypt');
  return bcrypt.hash(pwd, 10);
};

export const pwdCompare = async (pwd: string, hash: string): Promise<boolean> => {
  const bcrypt = await import('bcrypt');
  return bcrypt.compare(pwd, hash);
};
