//Get initial data for canldes
export const getInitDataForCandles = async (text, setLoading) => {
  setLoading(true);
  try {
    const res = await fetch(
      `https://api.binance.com/api/v3/klines?symbol=${text}&interval=1m&limit=1000`
    );
    const data = await res.json();
    const cdata = data.map((d) => {
      return {
        time: d[0] / 1000,
        open: parseFloat(d[1]),
        high: parseFloat(d[2]),
        low: parseFloat(d[3]),
        close: parseFloat(d[4]),
      };
    });
    setLoading(false);

    return cdata;
  } catch (error) {
    console.log(error);
    setLoading(false);
  }
};

// -------------------------------------- Binance --------------------------------------
export const getCoinsFromBinance = () => {
  // const BinanceCoins = localStorage.getItem("BinanceCoins");
  // if (BinanceCoins) return Promise.resolve(JSON.parse(BinanceCoins));

  return fetch(`https://api.binance.com/api/v1/exchangeInfo`)
    .then((res) => res.json())
    .then(({ symbols }) => {
      const BinanceCoins = symbols.map(({ symbol }) => ({ symbol }));
      // localStorage.setItem("BinanceCoins", JSON.stringify(BinanceCoins));
      return BinanceCoins;
    });
};

export const subscribeBinance = (symbols) => {
  return JSON.stringify({
    method: "SUBSCRIBE",
    params: symbols?.map((e) => `${e.symbol.toLowerCase()}@miniTicker`) || [
      "btcusdt@miniTicker",
    ],
    id: 1,
  });
};

export const unsubscribeBinance = (symbols) =>
  JSON.stringify({
    method: "UNSUBSCRIBE",
    params: symbols?.map((e) => `${e.symbol.toLowerCase()}@miniTicker`) || [
      "btcusdt@miniTicker",
    ],
    id: 312,
  });

// -------------------------------------- ByBit --------------------------------------
export const getCoinsFromByBit = () => {
  // const ByBitCoins = localStorage.getItem("ByBitCoins");
  // console.log(ByBitCoins);
  // if (ByBitCoins) return Promise.resolve(JSON.parse(ByBitCoins));

  return fetch(`https://api.bybit.com/spot/v3/public/symbols`)
    .then((res) => res.json())
    .then(({ result }) => {
      const ByBitCoins = result.list.map(({ name }) => ({ symbol: name }));
      // console.log(ByBitCoins);
      // localStorage.setItem("ByBitCoins", JSON.stringify(ByBitCoins));
      return ByBitCoins;
    });
};

export const subscribeByBit = (symbols) =>
  JSON.stringify({
    op: "subscribe",
    args: symbols.map((e) => `tickers.${e.symbol}`),
    req_id: "customised_id",
  });

export const unsubscribeByBit = (symbols) =>
  JSON.stringify({
    op: "unsubscribe",
    args: symbols?.map((e) => `tickers.${e.symbol}`),
    req_id: "customised_id",
  });

// Event bus for socket handlers
export const messageBinanceHandlers = new Set();

export const addMessageToBinanceHandler = (handler) =>
  messageBinanceHandlers.add(handler);
export const removeMessageToBinanceHandler = (handler) =>
  messageBinanceHandlers.delete(handler);

export const messageByBitHandlers = new Set();
export const addMessageToByBitHandler = (handler) =>
  messageByBitHandlers.add(handler);
export const removeMessageToByBitHandler = (handler) =>
  messageByBitHandlers.delete(handler);
