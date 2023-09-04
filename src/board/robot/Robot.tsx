import { useEffect, useState } from "react";
import { useControlContext } from "../../controls/contexts/ControlsProvider";
import { useIsPlaceInput } from "../../CustomHooks/useIsPlaceInput";
import { useResetContext } from "../../controls/contexts/ResetProvider";
import { useReportContext } from "../../controls/contexts/ReportProvider";
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

  async function updateDirection(turnDirection: string) {
    let newDirection;

    switch (allwaysUpdatedDirection) {
      case 'north':
        newDirection = turnDirection === 'left' ? 'west' : 'east';
        break;
      case 'east':
        newDirection = turnDirection === 'left' ? 'north' : 'south';
        break;
      case 'south':
        newDirection = turnDirection === 'left' ? 'east' : 'west';
        break;
      case 'west':
        newDirection = turnDirection === 'left' ? 'south' : 'north';
        break;
      default:
        newDirection = direction;

    }
   
    setDirection(newDirection as FacingDirection);
    allwaysUpdatedDirection = newDirection as FacingDirection;

    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  useEffect(() => {
    async function handleMovementCommands() {
      for(let movement of data){
        console.log(movement);
        if (useIsPlaceInput(movement)) {
          const splitPlace = movement.split(' ');
          console.log(splitPlace);
          const [_, newX, newY, newDirection] = splitPlace;
          setX(Number.parseInt(newX));
          allwaysUpdatedX = Number.parseInt(newX);
          setY(Number.parseInt(newY));
          allwaysUpdatedy = Number.parseInt(newY)
          setDirection(newDirection as FacingDirection);
          allwaysUpdatedDirection = newDirection as FacingDirection;
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
        if (movement === 'left') {
          await updateDirection('left');
        } else if (movement === 'right') {
          await updateDirection('right');

        } else if (movement === 'move') {
          let d = allwaysUpdatedDirection;
          let x = allwaysUpdatedX;
          let y = allwaysUpdatedy;

          if (d === 'north' && y <= 4) {
            setY((prevY) => prevY + 1);
            allwaysUpdatedy++;
          } else if (d === 'south' && y >= 1) {
            setY((prevY) => prevY - 1);
            allwaysUpdatedy--;
          } else if (d === 'east' && x <= 4) {
            setX((prevX) => prevX + 1);
            allwaysUpdatedX++;
          } else if (d === 'west' && x >= 1) {
            setX((prevX) => prevX - 1);
            allwaysUpdatedX--;
          }

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
