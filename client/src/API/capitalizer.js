export const capitalizer = (inputString) => {
  const stringWithSpaces = inputString.replace(/([a-z])([A-Z])/g, "$1 $2");
  const stringWithCorrectSpaces = stringWithSpaces.replace(/[-_]/g, " ");
  const formattedString = stringWithCorrectSpaces.replace(
    /\b\w/g,
    function (word) {
      return word.toUpperCase();
    }
  );

  return formattedString;
};
