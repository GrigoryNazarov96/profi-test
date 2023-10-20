const generateProperURL = (url: string): string => {
  const regex = /^https:\/\//i;
  if (!regex.test(url)) {
    url = "https://" + url;
  }
  return url;
};

export default generateProperURL;
