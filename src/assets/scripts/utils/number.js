export const isEvenOrOdd = (number) => {
  if (isNaN(number)) {
    return "Not a Number";
  }
  return number % 2 == 0 ? "even" : "odd";
};
