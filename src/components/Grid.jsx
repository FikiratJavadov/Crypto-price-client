import React, { useCallback, useContext, useMemo, useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { AppContext } from '../pages/CryptoPage';
import { initLayout } from '../api/init';
import { GridItem } from './GridItem';
import useLocalStorage from '../hooks/useLocalStorage';
import {useSelector} from "react-redux"

const ResponsiveGridLayout = WidthProvider(Responsive);

export const MainLayout = () => {
  const { SelectedBinanceCoins, SelectedByBitCoins } = useContext(AppContext);
  const [layout, setLayout] = useLocalStorage('layout', { lg: initLayout });
  
  const state = useSelector(state => state.auth)
  const SelectedCoins = useMemo(
    () => [...SelectedBinanceCoins, ...SelectedByBitCoins],
    [SelectedBinanceCoins, SelectedByBitCoins],
  );

  



 const handleLayoutChange = useCallback((layout, layouts) => setLayout(layouts), [setLayout]);


 


  return (
    <ResponsiveGridLayout
      layouts={layout}
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      cols={{ lg: 2, md: 1, sm: 1, xs: 1, xxs: 1 }}
      rowHeight={300}
      onResize={(vl) => {
        console.log(vl)
        return;
      }}
      isResizable={true}
      
      onLayoutChange={handleLayoutChange}>
      {state?.user?.coins?.map(({ symbol, type }, i) => (
          <div key={type + symbol} className="box bg-gradient-radial-light dark:bg-gradient-radial-dark shadow-lg">
            <GridItem className={type} text={symbol} />
          </div>  
        ))}
    </ResponsiveGridLayout>
  );
};
