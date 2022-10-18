import { MainLayout } from '../components/Grid';
import { CustomDialog } from '../components/SearchModal';
import { createContext, useEffect, useState, useRef } from 'react';
import {
  getCoinsFromByBit,
  getCoinsFromBinance,
  subscribeByBit,
  unsubscribeByBit,
  subscribeBinance,
  unsubscribeBinance,
  messageBinanceHandlers,
  messageByBitHandlers,
} from '../api';
import { initSelectedBinance, initSelectedByBit } from '../api/init';
import useLocalStorage from '../hooks/useLocalStorage';
import { useSelector } from 'react-redux';
import { sendMessage } from '../utils/helper';

export const AppContext = createContext(null);

export  function CryptoPage() {

    const [ByBitCoins, setByBitCoins] = useState(null);
    const [BinanceCoins, setBinanceCoins] = useState(null);

    const coins = useSelector(state => state?.auth?.user?.coins)
    const binance = coins?.filter(c => c?.type.includes("Binance"))
    const bybit = coins?.filter(c => c?.type.includes("ByBit"))




  const [SelectedBinanceCoins, setSelectedBinance] = useLocalStorage(
    'SelectedBinanceCoins',
    initSelectedBinance,
  );

  const [SelectedByBitCoins, setSelectedByBit] = useLocalStorage(
    'SelectedByBitCoins',
    initSelectedByBit,
  );

    useEffect(() => {
    getCoinsFromByBit().then((ByBitCoins) => setByBitCoins(ByBitCoins));
    getCoinsFromBinance().then((BinanceCoins) => setBinanceCoins(BinanceCoins));
  }, []);


    

  
  useEffect(() => {
    let wsBinance = new WebSocket('wss://stream.binance.com:9443/ws/stream');
    let wsByBit = new WebSocket('wss://stream.bybit.com/contract/usdt/public/v3')
    
    //* Binance
    wsBinance.onopen = () => {
      if(coins){
        sendMessage(wsBinance, subscribeBinance(binance))
      }
      console.log('ws opened');
    }

    
    wsBinance.onclose = () => console.log('ws closed');

    wsBinance.onmessage = e => {
      messageBinanceHandlers.forEach((handler) => handler(e))
    };

    //* ByBit
    wsByBit.onopen = () => {
      if(coins){
        sendMessage(wsByBit, subscribeByBit(bybit))
      }
      console.log('ws opened');
    }

    
    wsByBit.onclose = () => console.log('ws closed');

    wsByBit.onmessage = e => {
      messageByBitHandlers.forEach((handler) => handler(e))
    };

    return () => {
      wsBinance.close();
      wsByBit.close();
    }
  }, [coins, binance, bybit]);

  return (
        <AppContext.Provider
          value={{
            ByBitCoins,
            BinanceCoins,
            SelectedByBitCoins,
            SelectedBinanceCoins,
            setSelectedBinance,
            setSelectedByBit,
          }}>
          <MainLayout />
          <CustomDialog />
        </AppContext.Provider>
      );
    // 
} 

