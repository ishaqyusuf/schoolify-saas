import { Icons } from "~/components/Icons";

export const fetchTransactionData = () =>
  Array(3)
    .fill(null)
    .map((i, _) => {
      const header = ["Today, Aug 28", "Aug 27, 2024", "Aug 26, 2024"][_];
      return {
        header,
        tx: Array(getRandomNumber(2, 5))
          .fill(null)
          .map((j, __) => {
            const up = getRandomNumber(1, 10) < 5;
            const amount = getRandomNumber(100, 10000);

            return {
              name: randomName(),
              amount: formatCurrency(amount),
              headline: up ? "Received money from" : "Sending money to",
              debit: up,
              Icon: up ? Icons.ArrowUp : Icons.ArrowDown,
            };
          }),
      };
    });
const formatCurrency = (number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(number);
};
const randomName = () =>
  [
    "Ishaq Yusuf",
    "Sofiyat Yusuf",
    "Abdulloh Ishaq",
    "Maryam Ishaq",
    "Haleemah Ibrohim",
    "Aishah Ibrohim Yusuf",
  ][getRandomNumber(0, 5)];
const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
