import React, { useRef, useCallback, useState, useEffect } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { GridItem } from './GridItem';
import {useSelector} from "react-redux"
import { useMemo } from 'react';
import useLocalStorage from "../hooks/useLocalStorage"
import { initLayout } from '../api/init';
import { useLayoutEffect } from 'react';

const ResponsiveGridLayout = WidthProvider(Responsive);

export const MainLayout = () => {  
  // const [layout, setLayout] = useState([{w:2,h:1,x:3,y:3,i:"BinanceCoins-BTCUSDT",static:false},{w:2,h:1,x:0,y:1,i:"ByBitCoins-ETHUSDT",static:false}]);

  
  
  const coins = useSelector(state => state?.auth?.user?.coins)
  const layouts = useSelector(state => state?.auth?.layouts)

  console.log({layouts})

  console.log(layouts)
  console.log({coins})

  ////

  return (
    <>
    <ResponsiveGridLayout
      layouts={layouts}
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      cols={{ lg: 2, md: 2, sm: 1, xs: 1, xxs: 1 }}
      rowHeight={300}
      style={{ minWidth: "100%" }}
      isResizable={true}
      >
      {coins?.map(({ symbol, type }, i) => (
          <div  key={`${type}-${symbol}`} className="box bg-gradient-radial-light dark:bg-gradient-radial-dark shadow-lg">
            <GridItem className={type} text={symbol} />
          </div>  
        ))}
    </ResponsiveGridLayout></>
  );
};
