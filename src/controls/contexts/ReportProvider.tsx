import React, { createContext, useContext, useReducer, ReactNode, Dispatch } from 'react';

type ReportState = {
  report: string;
};

type ReportAction = { type: 'UPDATE_REPORT'; payload: string };


type ContextType = {
    reportState: ReportState;
    reportDispatch: Dispatch<ReportAction>;
};

const ReportContext = createContext<ContextType | undefined>(undefined);


export const useReportContext = () => {
  const context = useContext(ReportContext);
  if (!context) {
    throw new Error('useReportContext must be used within a ReportProvider');
  }
  return context;
};

const initialState: ReportState = {
  report: '',
};

const reportReducer = (reportState: ReportState, action: ReportAction): ReportState => {
  switch (action.type) {
    case 'UPDATE_REPORT':
      return { ...reportState, report: action.payload };
    default:
      return reportState;
  }
};

type ReportProviderProps = {
  children: ReactNode;
};

export const ReportProvider: React.FC<ReportProviderProps> = ({ children }) => {
  const [reportState, reportDispatch] = useReducer(reportReducer, initialState);

  return (
    <ReportContext.Provider value={{ reportState, reportDispatch }}>
      {children}
    </ReportContext.Provider>
  );
};
