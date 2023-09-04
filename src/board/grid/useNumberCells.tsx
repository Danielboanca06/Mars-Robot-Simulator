import { useState, useEffect } from "react";

export const useNumberCells = () =>{


const XNumberCells = () => {


    const [innerWidth, setInnerWidth] = useState<number>(window.innerWidth);
  
  useEffect(() => {
    const handleResize = () => {
      setInnerWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

    const cells = [];
    let topPosition;
      let leftPosition = -5
    for (let i = 0; i < 6; i++) {
      
      if (innerWidth > 1024) {
        topPosition = -70;
        if(i > 0) leftPosition += 90;

      } else if (innerWidth > 768) {
        topPosition = -65;
        if(i > 0) leftPosition += 70;

      } else {
        topPosition = -35;
        if(i > 0) leftPosition += 30;
      }
     
      
      cells.push(
        <h1
          key={i}
          className="text-black absolute lg:text-2xl md:text-xl text-sm"
          style={{ top: `${topPosition}px`, left: `${leftPosition}px` }}
        >
          {i}
        </h1>
      );
    }
    return cells;
  };

  const YNumberCells = () => {

    const [innerWidth, setInnerWidth] = useState<number>(window.innerWidth);
  
  useEffect(() => {
    const handleResize = () => {
      setInnerWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

    const cells = [];
    let topPosition;
      let leftPosition = -20
    for (let i = 5; i >= 0; i--) {
      
      if (innerWidth > 1024) {
        topPosition = -70;
        if(i < 5) leftPosition += 90;

      } else if (innerWidth > 768) {
        topPosition = -65;
        if(i < 5) leftPosition += 70;

      } else {
        topPosition = -30;
        if(i < 5) leftPosition += 30;
      }
     
      
      cells.push(
        <h1
          key={i}
          className="text-black absolute lg:text-2xl md:text-xl text-sm"
          style={{ right: `${topPosition}px`, top: `${leftPosition}px` }}
        >
          {i}
        </h1>
      );
    }
    return cells;
  };
  return {XNumberCells, YNumberCells};
}
