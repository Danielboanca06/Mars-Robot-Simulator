import { useEffect, useState } from "react";
import { useControlContext } from "../../../controls/contexts/ControlsProvider";
import { useResetContext } from "../../../controls/contexts/ResetProvider";
import { useReportContext } from "../../../controls/contexts/ReportProvider";
import { usePlaceRobot } from "./usePlaceRobot";
import { useMoveRobot } from "./useMoveRobot";
import { useUpdateDirection } from "./useUpdateDirection";
import { useConfirmingIsPlaceInput } from "./useConfirmingIsPlaceInput";
import MarsRobot from "./MarsRobot";

type FacingDirection = 'north' | 'east' | 'south' | 'west';

const Robot = () => {
  const { resetState } = useResetContext();
  const { controlState } = useControlContext();
  const { reportDispatch } = useReportContext();

  const [screenSize, setScreenSize] = useState<number>(window.innerWidth);
  const [data, setData] = useState<string[]>(['']);
  const [x, setX] = useState<number>(0);
  const [y, setY] = useState<number>(0);
  const [direction, setDirection] = useState<FacingDirection>('east');


  const sendReport = (data: string) => {
    reportDispatch({ type: 'UPDATE_REPORT', payload: data });
  };

  useEffect(() => {
    sendReport(`${x}, ${y}, ${direction}`);
  }, [x, y, direction]);

  useEffect(() => {
    if (controlState.data) {
      setData(controlState.data);
    }
  }, [controlState.data]);

  useEffect(() => {
    if (resetState.reset) {
      setData(['']);
      setX(0);
      setY(0);
      setDirection('east');
    }
  }, [resetState]);

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    async function handleMovementCommands() {
      let newX = x;
      let newY = y;
      let newDirection = direction;
  
      for (let movement of data) {
        if (useConfirmingIsPlaceInput(movement)) {
          const { placeX, placeY, placeDirection } = await usePlaceRobot(movement);
          newX = placeX;
          newY = placeY;
          newDirection = placeDirection;
        } else if (movement === 'left' || movement === 'right') {
          const { turingDirection } = await useUpdateDirection(
            movement,
            newDirection
          );
          newDirection = turingDirection;
        } else if (movement === 'move') {
          const { moveX, moveY } = await useMoveRobot(newDirection, newX, newY);
          newX = moveX;
          newY = moveY;
        }
      }
  
      // Update the state in a single batch after processing all movements
      setX(newX);
      setY(newY);
      setDirection(newDirection)
     
    }
    
    handleMovementCommands();
  }, [data]);
  
//diferant coordinates for the three sizes availabe 
  const Small: Record<number, number> = {
    0: -10,
    1: 20,
    2: 50,
    3: 80,
    4: 110,
    5: 140,
  };

  const Medium: Record<number, number> = {
    0: -15,
    1: 55,
    2: 125,
    3: 195,
    4: 265,
    5: 335,
  };

  const Large: Record<number, number> = {
    0: -20,
    1: 70,
    2: 160,
    3: 250,
    4: 340,
    5: 430,
  };

  const divStyle:any = {
    height: '25px',
    width: '25px',
    bottom: Small[y],
    left: Small[x],
    zIndex: 10,
    position: 'absolute',
    transform: `rotate(${{
      east: 0,
      south: 90,
      west: 180,
      north: 270,
    }[direction]}deg)`,
    transition: 'left 1s ease, bottom 1s ease',
  };

  const mdDivStyle:any = {
    height: '35px',
    width: '35px',
    bottom: Medium[y],
    left: Medium[x],
    zIndex: 10,
    position: 'absolute',
    transform: `rotate(${{
      east: 0,
      south: 90,
      west: 180,
      north: 270,
    }[direction]}deg)`,
    transition: 'left 1s ease, bottom 1s ease',
  };

  const lgDivStyle:any = {
    height: '50px',
    width: '50px',
    bottom: Large[y],
    left: Large[x],
    zIndex: 10,
    position: 'absolute',
    transform: `rotate(${{
      east: 0,
      south: 90,
      west: 180,
      north: 270,
    }[direction]}deg)`,
    transition: 'left 1s ease, bottom 1s ease',
  };

  let visibleDiv;

  if (screenSize > 1024) {
    visibleDiv = <div style={lgDivStyle}><MarsRobot /></div>;
  } else if (screenSize > 768) {
    visibleDiv = <div style={mdDivStyle}><MarsRobot /></div>;
  } else {
    visibleDiv = <div style={divStyle}><MarsRobot /></div>;
  }

  return <div>{visibleDiv}</div>;
}

export default Robot;