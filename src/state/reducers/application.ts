import type { PayloadAction } from "@reduxjs/toolkit";
import type { AppState, ActionTypes, ActionPayloadType } from "../types";

import { APPLICATION_REDUCER_TYPES, DEFAULT_STEP_ORDER} from "constsants";

const initialState: AppState = {
  currentStep: "BASIC_INFO",
  stepOrder: DEFAULT_STEP_ORDER,
  user: {
    email: "",
    first_name: "",
    last_name: "",
    dob: ""
  },
  address: {
    street: "",
    city: "",
    state: "",
    zip: undefined
  },
  vehicles: []
};

const application = (state = initialState, action: PayloadAction<ActionPayloadType, ActionTypes>) => {
  const { type, payload } = action;

  switch(type) {
    case APPLICATION_REDUCER_TYPES.UPDATE: {
      const { user, address, vehicles, currentStep } = payload;
      return {
        ...state, 
        user: user || state.user, 
        address: address || state.address, 
        vehicles: vehicles || state.vehicles, 
        currentStep: currentStep || state.currentStep
      };
    };
    default:
      return state;
  }
};

export default application;