import { createContext, useReducer, Dispatch, FC } from "react";

import {
  motivationReducer,
  vocabularyReducer,
  personalReducer,
  childrenReducer,
  timeReducer,
  analyzeReducer,
  emailReducer,
  progressReducer,
} from "./reducers";

import {
  IProviderProps,
  InitialStateType,
  TApplicationActions,
  TApplicationType,
} from "./types";

const initialState: TApplicationType = {
  motivation: {
    language: "",
    motivation: [],
    aspects: [],
    notes: null,
    englishEnvironment: null,
    statements: [],
  },
  vocabulary: {
    a: [],
    b1: [],
    b2: [],
  },
  personal: {
    name: "",
    age: "",
  },
  children: {
    have: null,
    count: "",
    childrenAge: [],
  },
  time: {
    time: {
      from: "09:00",
      to: "21:00",
    },
    often: "",
    howMuch: "",
    topics: [],
    activityLevel: "",
  },
  analyze: "",
  email: "",
  step: 1,
};

const AppContext = createContext<{
  state: TApplicationType;
  dispatch: Dispatch<TApplicationActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainAppReducer = (
  {
    motivation,
    vocabulary,
    personal,
    children,
    time,
    analyze,
    email,
    step,
  }: InitialStateType,
  action: TApplicationActions,
) => ({
  motivation: motivationReducer(motivation, action),
  vocabulary: vocabularyReducer(vocabulary, action),
  personal: personalReducer(personal, action),
  children: childrenReducer(children, action),
  time: timeReducer(time, action),
  analyze: analyzeReducer(analyze, action),
  email: emailReducer(email, action),
  step: progressReducer(step, action),
});

const AppProvider: FC<IProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(mainAppReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
