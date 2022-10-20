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
    x: 1,
    y: 0,
    w: 2,
    h: 1,
  })
);

export const getInitLayout = (coins, layout) => {
  return coins?.map(({ symbol, type }, i) => ({
    i: `${type}-${symbol}`,
    ...layout[i],
  }));
};

export const parseData = (response) => {
  const data = JSON.parse(response);
  if (data?.data) {
    return {
      price: +data?.data?.ask1Price,
      type: "ByBitCoins",
      symbol: data?.data?.symbol,
      percent: +data?.data?.price24hPcnt * 100,
      diff: +data?.data?.lastPrice * +data?.data?.price24hPcnt,
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

export const baseLayouts = [
  [
    { i: "first", x: 0, y: 0, w: 2, h: 1, static: true },
    { i: "first", x: 0, y: 0, w: 1, h: 1, static: true },
    { i: "first", x: 1, y: 0, w: 1, h: 1, static: true },
    { i: "first", x: 3, y: 0, w: 2, h: 1, static: true },
  ].map((el, i) => ({ ...el, i: el.i + i })),

  [
    { i: "second", x: 0, y: 0, w: 2, h: 1, static: true },
    { i: "second", x: 0, y: 0, w: 1, h: 1, static: true },
    { i: "second", x: 1, y: 0, w: 1, h: 1, static: true },
    { i: "second", x: 0, y: 0, w: 2, h: 1, static: true },
  ].map((el, i) => ({ ...el, i: el.i + i })),

  [
    { i: "third", x: 0, y: 0, w: 1, h: 1, static: true },
    { i: "third", x: 1, y: 0, w: 1, h: 1, static: true },
    { i: "third", x: 1, y: 0, w: 2, h: 1, static: true },
    { i: "third", x: 0, y: 0, w: 2, h: 1, static: true },
  ].map((el, i) => ({ ...el, i: el.i + i })),
];

export const baseLayouts2 = [
  [
    { x: 0, y: 0, w: 1, h: 1, static: true },
    { x: 1, y: 0, w: 1, h: 1, static: true },
    { x: 0, y: 0, w: 1, h: 1, static: true },
    { x: 1, y: 0, w: 1, h: 1, static: true },
  ],
  [
    { x: 0, y: 0, w: 2, h: 1, static: true },
    { x: 0, y: 0, w: 2, h: 1, static: true },
  ],
];

export const finalLayouts = baseLayouts2.map((layout) => {
  return layout.map((l, index) => ({ ...l, i: `layout-${index}` }));
});
