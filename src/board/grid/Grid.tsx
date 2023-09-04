import Robot from '../robot/Robot';
import { useNumberCells } from './useNumberCells';
import GridCells from './GridCells';

export default function Grid() {
  const { YNumberCells, XNumberCells } = useNumberCells();

  return (
    <div className="border-2 border-black content-center p-[30px] m-0 md:p-[70px] lg:p-[90px]">
      <div className="border-2 border-slate-200 relative">
       
        <XNumberCells />
        <YNumberCells />
    
        <Robot />

        <GridCells />
      </div>
    </div>
  );
}
