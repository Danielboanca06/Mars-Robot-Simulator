import {useState, useRef, useEffect } from "react";
import { useControlContext } from "../contexts/ControlsProvider";
import { useIsPlaceInput } from "../../CustomHooks/useIsPlaceInput";
import { useResetContext } from "../contexts/ResetProvider";
import { useReportContext } from "../contexts/ReportProvider";

export default function PlaceInput () {
    type Place = string[];
    const initialState : Place = [''];

    const { dispatchControls } = useControlContext();
    const { dispatchReset } = useResetContext();
    const {reportState} = useReportContext();
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const [direction, setDirection] = useState<any>(initialState);
    const [firstCommand, setFirstCommand] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [cords, setCords] = useState(['']);

    useEffect(() => {
      setCords(reportState.report.split(", "))
    }, [reportState.report])


    const sendControlData = (data : string[]) => {
        dispatchControls({ type: 'UPDATE_CONTROLS', data: data });
      };

    const sendResetData = (reset : boolean) => {
        dispatchReset({ type: 'SET_RESET', reset: reset });
    };
   
    function handleSubmit(e: any) {
        e.preventDefault();
        
        let directionData = [];

        for(let i = 0; i < direction.length; i++){

            let placeDirection = '';

            
            
            if (direction[i] === 'place') {
                
                if (!isNaN(direction[i + 1]) && !isNaN(direction[i + 2])) {
                 
                  if (['north', 'south', 'east', 'west'].includes(direction[i + 3])) {
                   
                    placeDirection = `${direction[i]} ${direction[i + 1]} ${direction[i + 2]} ${direction[i + 3]}`;
                    i += 3; 
                  }
                }
              }

            else if(firstCommand || directionData.length > 0 || placeDirection[0] === 'p'){
                if(direction[i] === 'move') directionData.push(direction[i]);
            
                if(direction[i] === 'left') directionData.push(direction[i]);

                if(direction[i] === 'right') directionData.push(direction[i]);

                if(direction[i] === 'report') directionData.push(direction[i]);
            }
            
            if(useIsPlaceInput(placeDirection)){
                setFirstCommand(true);
                directionData.push(placeDirection);
            }

        }
        
        if(directionData){
          sendControlData(directionData);
          sendResetData(false)
        }

        directionData = [];
        setInputValue('');
        setDirection(initialState);
    }


    function handleChange (event: any) {
        const inputValue = event.target.value.toLowerCase().split(/[\s,]+/); 
        setInputValue(event.target.value);
        adjustTextareaHeight();
 
        setDirection(inputValue);
       
          
        }

        function handleReset() {
          setFirstCommand(false);
          sendResetData(true);
        }
        const adjustTextareaHeight = () => {
          if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${Math.min(
            textareaRef.current.scrollHeight,
              400
            )}px`;
          }
        };
        

    return <>
        <div className="flex flex-col items-center m-10">
          <div>Current postion </div>
          <div>X:   {cords[0]}</div>
          <div>Y:   {cords[1]}</div>
          <div className="pb-10">F:   {cords[2].toUpperCase()}</div>
  <h2>Move Your Robot!</h2>
  <form onSubmit={handleSubmit} className="pt-10">
    <div className="w-full">
      <textarea
        ref={textareaRef}
        id="place"
        defaultValue=""
        value={inputValue}
        onChange={handleChange}
        placeholder={firstCommand ? 'Place x,y North, Move Left Right' : 'Place x,y North'}
        className="border-2 border-black resize-y w-80 max-h-[400px] md:text-xl"
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
          }
        }}
      />
    </div>
    <div className="w-full text-center mt-2">
      <button type="submit" className="hover:text-blue-500 text-black text-xl">Submit</button>
    </div>
  </form>

  <button onClick={handleReset} className="text-black text-xl mt-2 hover:text-red-500">
    Reset
  </button>
</div>

    </>
}