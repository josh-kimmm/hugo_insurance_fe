import { useSelector } from "react-redux";

import type { RootState } from "state/types"

const useApplicationState = () => useSelector((state: RootState) => state.application);

const useCurrentStep = () => useApplicationState().currentStep;




export {
  useCurrentStep,
  useApplicationState
};