export const linkOrBase64 = (str) => {
  const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
  if (urlRegex.test(str)) {
    return "URL";
  }
  try {
    const decodedString = atob(str);
    if (decodedString) {
      return "Base64";
    }
  } catch (error) {
    return "Unknown";
  }
  return "Unknown";
};
