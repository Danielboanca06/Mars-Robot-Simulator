import { createContext, ReactNode, useContext, Dispatch, useReducer} from 'react';

interface ResetState {
  reset: boolean;
}

type ResetAction = { type: string; reset: boolean };

interface ResetContextType {
  resetState: ResetState;
  dispatchReset: Dispatch<ResetAction>;
}

const ResetContext = createContext<ResetContextType | undefined>(undefined);

interface ResetProviderProps {
  children: ReactNode;
}

const initialResetState: ResetState = {
  reset: false,
};

const reducer = (resetState: ResetState, action: ResetAction): ResetState => {
  switch (action.type) {
    case 'SET_RESET':
      return { ...resetState, reset: action.reset };
    default:
      return resetState;
  }
};

export function ResetProvider({ children }: ResetProviderProps) {
  const [resetState, dispatchReset] = useReducer(reducer, initialResetState);

  return (
    <ResetContext.Provider value={{ resetState, dispatchReset }}>
      {children}
    </ResetContext.Provider>
  );
}

export function useResetContext() {
    const context = useContext(ResetContext);
    if (context === undefined) {
      throw new Error('useResetContext must be used within a ResetProvider');
    }
    return context;
  }
  