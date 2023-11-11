// check if user profile is complete

export default async function checkProfileComplete(user) {
  if (!user) {
    return false;
  }
  for (const key in user) {
    if (user[key] === null || user[key] === undefined || user[key] === "" || user[key] === false) {
      return false;
    }
  }
  return user;
}