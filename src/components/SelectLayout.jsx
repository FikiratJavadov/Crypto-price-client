import React, { useState, useCallback, memo } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { baseLayouts, finalLayouts } from "../api/init";
import { WidthProvider, Responsive } from "react-grid-layout";
import { changeLayout } from "../redux/slice/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { buildLayout } from "../utils/helper";

const SelectLayout = () => {
  const [visible, setVisible] = useState(false);
  const invertVisibility = useCallback(
    () => setVisible((visible) => !visible),
    []
  );

  const GridLayout = WidthProvider(Responsive);

  const dispatch = useDispatch();

  const coins = useSelector((state) => state?.auth?.user?.coins);

  function chooseLayout(l, i) {
    const layout = buildLayout(coins, i)
    dispatch(changeLayout(layout))
  }

  return (
    <div className="selectLayout">
      <Button
        style={{ position: "fixed", bottom: 10, right: 10 }}
        icon="pi-align-center"
        onClick={invertVisibility}
      />
      <Dialog
        visible={visible}
        header="Templates"
        className="p-dialog-title"
        draggable={false}
        resizable={false}
        onHide={invertVisibility}
        breakpoints={{ "960px": "75vw", "640px": "100vw" }}
        style={{ maxWidth: 600, width: "70vw" }}
      >
        <div className="w-full h-full  grid md:grid-cols-2 sm:grid-cols-1 gap-5">
          {finalLayouts.map((layout, index) => (
            <div key={index} onClick={() => chooseLayout(layout, index)}>
              <GridLayout
                layouts={{ lg: layout }}
                breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                cols={{ lg: 2, md: 2, sm: 2, xs: 2, xxs: 2 }}
                rowHeight={80}
                onClick={() => chooseLayout(layout)}
                isResizable={false}
                className="selectLayout group rounded-2xl transition-all cursor-pointer hover:bg-gray-700 bg-gray-300 h-52 grid grid-cols-2 p-3 gap-3 border-10"
              >
                {layout.map((l) => (
                  <div
                    draggable={false}
                    key={l.i}
                    className={`group-hover:bg-gray-300 rounded-2xl w-full item`}
                  ></div>
                ))}
              </GridLayout>
            </div>
          ))}

          {/* <div onClick={chooseLayout} className="box group transition-all cursor-pointer hover:bg-gray-700 bg-gray-300 h-52 grid grid-cols-2 p-3 gap-3 border-10">
                <div className="rounded-xl  group-hover:bg-gray-300 col-span-2 bg-gray-700"></div>
                <div className="rounded-xl group-hover:bg-gray-300 bg-gray-700"></div>
                <div className="rounded-xl group-hover:bg-gray-300 bg-gray-700"></div>
                <div className="rounded-xl group-hover:bg-gray-300 col-span-2 bg-gray-700"></div>
            </div>

            <div onClick={chooseLayout} className="box group transition-all cursor-pointer hover:bg-gray-700 bg-gray-300 h-52 grid grid-cols-2 p-3 gap-3 border-10">
                <div className="rounded-xl group-hover:bg-gray-300 bg-gray-700"></div>
                <div className="rounded-xl group-hover:bg-gray-300 bg-gray-700"></div>
                <div className="rounded-xl group-hover:bg-gray-300 col-span-2 bg-gray-700"></div>
                <div className="rounded-xl group-hover:bg-gray-300 col-span-2 bg-gray-700"></div>
            </div> */}
        </div>
      </Dialog>
    </div>
  );
};

export default memo(SelectLayout);


