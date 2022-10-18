export const initSelectedBinance = [
  { symbol: "BTCUSDT", type: "BinanceCoins" },
  { symbol: "ETHUSDT", type: "BinanceCoins" },
];

export const initSelectedByBit = [
  { symbol: "ETHUSDT", type: "ByBitCoins" },
  { symbol: "ADAUSDT", type: "ByBitCoins" },
];

export const initLayout = [...initSelectedBinance, ...initSelectedByBit].map(
  ({ symbol, type }) => ({
    i: `${symbol}-${type}`,
    x: 0,
    y: 0,
    w: 1,
    h: 1,
  })
);

export const parseData = (response) => {
  const data = JSON.parse(response);

  console.log(data);

  if (data?.data) {
    return {
      price: +data?.data?.ask1Price,
      type: "ByBitCoins",
      symbol: data?.data?.symbol,
      percent: +data?.data?.price24hPcnt * 100,
      diff: (+data?.data?.lastPrice * +data?.data?.price24hPcnt),
    };
  } else {
    return {
      price: +data.c,
      type: "BinanceCoins",
      symbol: data.s,
      percent: ((+data.c - +data.o) / +data.o) * 100,
      diff: +data.c - +data.o,
    };
  }
};

//
