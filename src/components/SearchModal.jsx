import { Button } from 'primereact/button';
import { AutoComplete } from 'primereact/autocomplete';
import { Dialog } from 'primereact/dialog';
import { useCallback, useContext, useState } from 'react';
import { AppContext } from '../pages/CryptoPage';
import { addCoins, removeCoins } from '../redux/slice/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';

export const CustomDialog = ({BinanceCoins, ByBitCoins}) => {


  const [visible, setVisible] = useState(false);
  const invertVisibility = useCallback(() => setVisible((visible) => !visible), []);
  const [filteredBinanceCoins, setFilteredBinanceCoins] = useState(BinanceCoins);
  const [filteredByBitCoins, setFilteredByBitCoins] = useState(ByBitCoins);

  const coins = useSelector((state) => state?.auth?.user?.coins)
  const selectedBinanceCoins = coins?.filter(c => c.type.includes("Binance"))
  const selectedByBitCoins = coins?.filter(c => c.type.includes("ByBit"))


  
  const dispatch = useDispatch()





  const searchBinanceCoins = (event) => {
    setTimeout(() => {
      let _filteredBinanceCoins;

      if (!event.query.trim().length) {
        _filteredBinanceCoins = [...BinanceCoins];
      } else {
        _filteredBinanceCoins = BinanceCoins.filter((elem) =>
          elem.symbol.toLowerCase().startsWith(event.query.toLowerCase()),
        );
      }

      setFilteredBinanceCoins(_filteredBinanceCoins);
    }, 250);
  };

  const searchByBitCoins = (event) => {
    setTimeout(() => {
      let _filteredByBitCoins;

      if (!event.query.trim().length) {
        _filteredByBitCoins = [...ByBitCoins];
      } else {
        _filteredByBitCoins = BinanceCoins.filter((elem) =>
          elem.symbol.toLowerCase().startsWith(event.query.toLowerCase()),
        );
      }

      setFilteredByBitCoins(_filteredByBitCoins);
    }, 250);
  };


  

  return (
    <div>
      <Button
        style={{ position: 'fixed', bottom: 10, left: 10 }}
        icon='pi pi-sliders-h'
        onClick={invertVisibility}
      />
      <Dialog
        visible={visible}
        onHide={invertVisibility}
        breakpoints={{ '960px': '75vw', '640px': '100vw' }}
        style={{ width: '50vw' }}>
        <h2>Selected coins</h2>
        <br />
        <p>Coins from Binance</p>
        <br />
        <div className='p-fluid'>
          <AutoComplete
            value={selectedBinanceCoins}
            suggestions={filteredBinanceCoins}
            completeMethod={searchBinanceCoins}
            onSelect={(data) => {
              const isExist = selectedBinanceCoins?.some(c => c.symbol === data.value.symbol)
              if(isExist) return;
              const coin = {symbol: data.value.symbol, type: "BinanceCoins"}
              dispatch(addCoins(coin))
            }}
            onUnselect={(data) => {
              dispatch(removeCoins(data.value._id))

              //!Continue
              // dispatch(updateCoins(coin))
            }}
            multiple
            dropdown
            field='symbol'
            style={{ width: '100%' }}
          />
        </div>
        <br />
        <p>Coins from ByBit</p>
        <br />
        <div className='p-fluid'>
          <AutoComplete
            value={selectedByBitCoins}
            suggestions={filteredByBitCoins}
            completeMethod={searchByBitCoins}
            onSelect={(data) => {
              const isExist = selectedByBitCoins?.some(c => c.symbol === data.value.symbol)
              if(isExist) return;
              const coin = {symbol: data.value.symbol, type: "ByBitCoins"}
              dispatch(addCoins(coin))
            }}
            onUnselect={(data) => {
              dispatch(removeCoins(data.value._id))
            }}
            multiple
            dropdown
            field='symbol'
            style={{ width: '100%' }}
          />
        </div>

        <div style={{ marginTop: 30 }}>
          <Button label='Close' icon='pi pi-check' onClick={() => invertVisibility()} />
        </div>
      </Dialog>
    </div>
  );
};
