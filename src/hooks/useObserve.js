import React, { useEffect, useState, useRef } from "react";
import useResizeObserver from "@react-hook/resize-observer";

export function Observe(target) {
  const [size, setSize] = React.useState();

  React.useLayoutEffect(() => {
    setSize(target.current.getBoundingClientRect());
  }, [target]);

  // Where the magic happens
  // useResizeObserver(target, (entry) => setSize(entry.contentRect));
  return size;
}
