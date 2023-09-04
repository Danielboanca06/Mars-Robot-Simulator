import './App.css';
import Board from './board/Board';
import Controls from './controls/Controls';
import { ControlsProvider } from './controls/contexts/ControlsProvider';
import { ResetProvider } from './controls/contexts/ResetProvider';
import { ReportProvider } from './controls/contexts/ReportProvider';

function App() {


  return (
    <ControlsProvider>
      <ResetProvider>
        <ReportProvider>
    <br />
    <br />
    <br />
    <div className='flex flex-col md:flex-row-reverse md:justify-around justify-center items-center md:items-start'>
 

    <div className="flex justify-center">
    <Board/>
  </div>
  <div className="flex">
    <Controls/>
  </div>
  

   

        </div>
        </ReportProvider>
        </ResetProvider>
    </ControlsProvider>
  )
}

export default App
