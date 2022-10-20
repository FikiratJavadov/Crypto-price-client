//! Wait socket ot be ready befgore start sending

export function sendMessage(ws, msg) {
  // Wait until the state of the socket is not ready and send the message when it is...
  waitForSocketConnection(ws, function () {
    console.log("message sent!!!");
    ws.send(msg);
  });
}

// Make the function wait until the connection is made...
function waitForSocketConnection(socket, callback) {
  setTimeout(function () {
    if (socket.readyState === 1) {
      console.log("Connection is made");
      if (callback != null) {
        callback();
      }
    } else {
      console.log("wait for connection...");
      waitForSocketConnection(socket, callback);
    }
  }, 5); // wait 5 milisecond for the connection...
}

export const convertToDraggableLayout = (layout) => {
  return layout.reduce((a, c) => {
    a.i = `BinanceCoins-BTCUSDT`;
    a.push(c);
    return a;
  }, []);
};

export const buildLayout = (coins, index) => {
  if (index === 0) {
    let x = 0;
    const layouts = coins.map((c) => {
      if (x % 2 === 0) {
        return {
          x: x++,
          i: `${c.type}-${c.symbol}`,
          y: 0,
          w: 1,
          h: 1,
          static: false,
        };
      } else {
        return {
          x: x--,
          i: `${c.type}-${c.symbol}`,
          y: 0,
          w: 1,
          h: 1,
          static: false,
        };
      }
    });
    return layouts;
  } else if (index === 1) {
    const layouts = coins.map((c) => {
      return {
        x: 0,
        i: `${c.type}-${c.symbol}`,
        y: 0,
        w: 2,
        h: 1,
        static: false,
      };
    });

    return layouts;
  }
};
