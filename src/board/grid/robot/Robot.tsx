import { useEffect, useState } from "react";
import { useControlContext } from "../../../controls/contexts/ControlsProvider";
import { useIsPlaceInput } from "../../../CustomHooks/useIsPlaceInput";
import { useResetContext } from "../../../controls/contexts/ResetProvider";
import { useReportContext } from "../../../controls/contexts/ReportProvider";
import { usePlaceRobot } from "./usePlaceRobot";
import { useMoveRobot } from "./useMoveRobot";
import { useUpdateDirection } from "./useUpdateDirection";
import MarsRobot from "./MarsRobot";

type FacingDirection = 'north' | 'east' | 'south' | 'west';

export default function Robot() {
  const { resetState } = useResetContext();
  const { controlState } = useControlContext();
  const { reportDispatch} = useReportContext();
  

  const [screenSize, setScreenSize] = useState<number>(window.innerWidth);
  const [data, setData] = useState<string[]>(['']);
  const [x, setX] = useState<number>(0);
  const [y, setY] = useState<number>(0);
  const [direction, setDirection] = useState<FacingDirection>('east');

  let allwaysUpdatedDirection = direction;
  let allwaysUpdatedX = x;
  let allwaysUpdatedy = y;

  const sendReport = (data : string) => {
    reportDispatch({type : 'UPDATE_REPORT', payload: data })
  }
  useEffect(()=>{
    sendReport(`${allwaysUpdatedX}, ${allwaysUpdatedy}, ${allwaysUpdatedDirection}`)
  },[x, y])


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
      for(let movement of data){

        if (useIsPlaceInput(movement)) {

          const {x, y, direction} = usePlaceRobot(movement);
          allwaysUpdatedX = x;
          allwaysUpdatedy = y;
          allwaysUpdatedDirection = direction;
          setX(prevx => prevx = x);
          setY(prevy => prevy = y);
          setDirection(prevD => prevD = direction)

          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
        if (movement === 'left') {
          const {direction} = await useUpdateDirection('left', allwaysUpdatedDirection);
          allwaysUpdatedDirection = direction; 
          setDirection(prevDirection => prevDirection = direction);
          await new Promise((resolve) => setTimeout(resolve, 900));

        }else if (movement === 'right') {

          const {direction} = await useUpdateDirection('right', allwaysUpdatedDirection);
          allwaysUpdatedDirection = direction; 
          setDirection(prevDirection => prevDirection = direction);
          await new Promise((resolve) => setTimeout(resolve, 900));

        } else if (movement === 'move') {

          const {x, y} = useMoveRobot(allwaysUpdatedDirection, allwaysUpdatedX, allwaysUpdatedy);
          allwaysUpdatedX = x;
          allwaysUpdatedy = y;
          setX(prevX => prevX = x);
          setY(prevY => prevY = y);

          await new Promise((resolve) => setTimeout(resolve, 700))
        }
        
      }
    
    }
      handleMovementCommands()


    
  }, [data]);

  
  interface DivStyle {
    height: string;
    width: string;
    bottom: number;
    left: number;
    zIndex: number;
    position: 'absolute';
    transform: string;
    transition: string
  }

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

  const facingDirection: Record<FacingDirection, number> = {
    'east': 0,
    'south': 90,
    'west': 180,
    'north': 270,
  };

  const divStyle: DivStyle = {
    height: '25px',
    width: '25px',
    bottom: Small[y],
    left: Small[x],
    zIndex: 10,
    position: 'absolute',
    transform: `rotate(${facingDirection[direction]}deg)`,
    transition: 'left 0.5s ease, bottom 0.5s ease'
  };

  const mdDivStyle: DivStyle = {
    height: '35px',
    width: '35px',
    bottom: Medium[y],
    left: Medium[x],
    zIndex: 10,
    position: 'absolute',
    transform: `rotate(${facingDirection[direction]}deg)`,
    transition: 'left 0.5s ease, bottom 0.5s ease'
  };

  const lgDivStyle: DivStyle = {
    height: '50px',
    width: '50px',
    bottom: Large[y],
    left: Large[x],
    zIndex: 10,
    position: 'absolute',
    transform: `rotate(${facingDirection[direction]}deg)`,
    transition: 'left 0.5s ease, bottom 0.5s ease'
  };

  let visibleDiv;
  if (screenSize > 1024) {
    visibleDiv = <div style={lgDivStyle}><MarsRobot/></div>;
  } else if (screenSize > 768) {
    visibleDiv = <div style={mdDivStyle}><MarsRobot/></div>;
  } else {
    visibleDiv = <div style={divStyle}><MarsRobot/></div>;
  }

  return <div>{visibleDiv}</div>;
}
