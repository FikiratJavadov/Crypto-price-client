import { useEffect, useState, useRef } from 'react';
import {
  addMessageToBinanceHandler,
  addMessageToByBitHandler,
  removeMessageToByBitHandler,
  removeMessageToBinanceHandler,
} from '../api';
import { parseData } from '../api/init';
import { createChart } from "lightweight-charts";
import useResizeObserver from "use-resize-observer";
import { getInitDataForCandles } from '../api';

export const GridItem = ({ className, text, w }) => {
  const [price, setPrice] = useState(0);
  const [percent, setPercent] = useState(0)
  const [diff, setDiff] = useState(0)
  
  const { ref: chatWrapperRef, width = 1, height = 1 } = useResizeObserver();

  const [loading, setLoading] = useState(false)

  const [openChart, setOpenChart] = useState(false)

  const chartRef = useRef()
  const lightweightCharts = useRef(null);
  const candle = useRef()
  
  // const s = Observe(chatWrapperRef)

  useEffect(() => {
    if(!lightweightCharts.current) return;
    lightweightCharts.current.applyOptions({width: width})
  }, [width])
  


  useEffect(() => {
    const subscribe =
      className === 'BinanceCoins' ? addMessageToBinanceHandler : addMessageToByBitHandler;
    const unsubscribe =
      className === 'BinanceCoins' ? removeMessageToBinanceHandler : removeMessageToByBitHandler;

    //{"e":"24hrMiniTicker","E":1665737490348,"s":"ETHBTC","c":"0.06745600","o":"0.06719300","h":"0.06752000","l":"0.06553600","v":"142964.43170000","q":"9516.86462801"}


    const handler = (event) => {
      const data = parseData(event.data);
      
      if (data.type === className && data.symbol !== text) return;
      const mainData = JSON.parse(event?.data);
      
      if(candle.current){
        // candle.current.update({
        //   open:parseFloat(mainData?.o),
        //   high: parseFloat(mainData?.h),
        //   low: parseFloat(mainData?.l),
        //   close: parseFloat(mainData?.c),    
        // });
      }
      if(data.price){
        setPrice(data.price);
      }

      if(data.percent){
        setPercent(data.percent)
      } 

      if(data.diff){
        setDiff(data.diff)
      }
      
  
    };

    subscribe(handler);

    return () => {
      unsubscribe(handler);
    };
  }, [className, text, setPrice]);


    


  useEffect(() => {
    const chart = createChart(chartRef.current, {
      width: chartRef.current.clientWidth,
      height: chartRef.current.clientHeight,
      timeScale: {
        timeVisible: true,
        secondVisible: false,
      },
      layout: {
        background: {
          color: '#1a1a1a'
        },
        textColor: '#ffffff'
      }
    });

    console.log({text, className})

    lightweightCharts.current = chart;
    const candles = chart.addCandlestickSeries();
    candle.current = candles;

   if(openChart){
    getInitDataForCandles(text, setLoading)
    .then((data) => candles.setData(data))
   }

      const handleResize = () => {
				chart.applyOptions({ width: chartRef.current.clientWidth });
			};

      window.addEventListener('resize', handleResize);

    return () => {
      if(chartRef.current){
        window.removeEventListener('resize', handleResize);
        chart.remove();
        chartRef.current.innerHTML = "";
        lightweightCharts.current = null
      }
    };
  }, [openChart, text]);




  return (
    <div className={`${className} h-full w-full flex flex-col`}>
      <div className="coin-header">
                <div className="logo h-14 w-14">
                  <img className='' src="https://cryptoicons.org/api/icon/eth/200" alt="" />
                </div>
                    <div className="coin-info">
                        <p onClick={() => setOpenChart((prev) => !prev)} className="coin-name text-dark cursor-pointer dark:text-white">{text}</p>
                        <p className="coin-market">{className === "BinanceCoins" ? "binance" : "bybit"}</p>
                    </div>
                </div>

                <div className={`coin-body h-full grid gap-5  ${!openChart ? "grid-cols-1" : "grid-cols-2"} justify-center items-center`}>
                    <div className="coin-price">
                        <div  className={`price  text-dark dark:text-white ${openChart ? "text-5xl" : "text-7xl"}`}>${price ? price.toFixed(1) : 0}</div>
                        <div className={`percent ${openChart ? "text-3xl" : "text-5xl"}`}>%{percent ? percent.toFixed(2) : 0} <span>({diff.toFixed(2)}$)</span></div>
                    </div>

                    <div ref={chatWrapperRef} className={`h-[200px] w-full p-5  ${!openChart && "hidden"}`}>
                          <div ref={chartRef} className={`h-full w-full  ${loading && "hidden"}`}>
                    </div>
                    </div>
                </div>

    </div>
  );
};


