import './App.css';
import Grid from '../src/board/Grid';
import Control from './controls/Controls';
import { ControlsProvider } from './controls/contexts/ControlsProvider';
import { ResetProvider } from './controls/contexts/ResetProvider';
import { ReportProvider } from './controls/contexts/ReportProvider';

function App() {


  return (
    <ControlsProvider>
      <ResetProvider>
        <ReportProvider>
          <div className='text-4xl text-center text-black p-12'>
            Mars Robot Simulator
          </div>
          <div className='flex flex-col md:flex-row-reverse md:justify-around justify-center items-center md:items-start text-black'>
      

          <div className="flex justify-center">
          <Grid/>
        </div>
        <div className="flex">
          <Control/>
        </div>
        </div>
        </ReportProvider>
        </ResetProvider>
    </ControlsProvider>
  )
}

export default App
