import React, { createContext, useReducer, ReactNode, Dispatch } from 'react';


interface MyState {
  data: string[]; 
}

type MyAction = { type: string; data: string[] };


interface MyContextType {
  controlState: MyState;
  dispatchControls: Dispatch<MyAction>;
}



const ControlsContext = createContext<MyContextType | undefined>(undefined);

interface ControlsProviderProps {
  children: ReactNode;
}

const initialState: MyState = {
  data: [''], 
};

const reducer = (controlState: MyState, action: MyAction): MyState => {
  switch (action.type) {
    case 'UPDATE_CONTROLS':
      return { ...controlState, data: action.data };
    default:
      return controlState;
  }
};

export function ControlsProvider({ children }: ControlsProviderProps) {
  const [controlState, dispatchControls] = useReducer(reducer, initialState);

  return (
    <ControlsContext.Provider value={{ controlState, dispatchControls }}>
      {children}
    </ControlsContext.Provider>
  );
}

export function useControlContext() {
  const context = React.useContext(ControlsContext);
  if (context === undefined) {
    throw new Error('useMyContext must be used within a ControlsProvider');
  }
  return context;
}
