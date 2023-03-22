import { PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { API_PATHS, APPLICATION_REDUCER_TYPES, DEFAULT_STEP_ORDER, HTTP_RESPONSE_OK, HTTP_RESPONSE_REDIRECT, URI_PATHS } from "constsants";
import { NavigateFunction } from "react-router-dom";
import { 
  UserModel, 
  ActionTypes, 
  AppDispatch, 
  ActionPayloadType, 
  AppState,
  GetState
} from "state/types";


// local types
type ModelInfo = Pick<AppState, 'user' | 'vehicles' | 'address'>;
type ApplicationInfo = Pick<AppState, 'currentStep'> & ModelInfo;
type Submission = { price: number };

// actions
const updateApplicationState = (action: PayloadAction<ActionPayloadType, ActionTypes>) => ({
  type: action.type,
  payload: action.payload
});

// dispatches
const _updateApplication = (payload: ModelInfo) => async (dispatch: AppDispatch) => {
  const { data }: AxiosResponse<ModelInfo> = await axios.put(API_PATHS.UPDATE_APPLICATION, payload);

  dispatch(updateApplicationState({ 
    type: APPLICATION_REDUCER_TYPES.UPDATE, 
    payload: data
  }));
};

// even though we don't pass a payload for any instance of this, the BE route prompt said to
// allow users to update their application
const _newApplication = (navigate: NavigateFunction, payload: UserModel) => async (dispatch: AppDispatch, getState: GetState) => {
  const response: AxiosResponse<ApplicationInfo> = await axios.post(API_PATHS.NEW_USER, payload);
  const { data, status } = response;

  if(status !== HTTP_RESPONSE_OK){
    // potentially add code here for retries or prevent UI from working
    console.error(`Unable to create user application`);
    return;
  }

  if(data){
    console.log("going to redirect now")
    dispatch(updateApplicationState({
      type: APPLICATION_REDUCER_TYPES.UPDATE,
      payload: data
    }));

    const { currentStep } = getState().application;
    navigate(currentStep ? URI_PATHS[currentStep] : URI_PATHS.HOME);
    return;
  }
  console.log(`new user created with data: ${response}`);
};

const _nextStep = (navigate: NavigateFunction) => async (dispatch: AppDispatch, getState: GetState) => {
  const { currentStep, stepOrder = DEFAULT_STEP_ORDER } = getState().application;

  const currentStepIndex = stepOrder.findIndex((step) => step === currentStep);
  const nextStep = stepOrder[currentStepIndex + 1] || stepOrder.slice(-1)[0];

  dispatch(updateApplicationState({
    type: APPLICATION_REDUCER_TYPES.UPDATE,
    payload: { currentStep: nextStep }
  }));

  navigate(URI_PATHS[nextStep]);
};

const _submitApplication = () => async (dispatch: AppDispatch) => {
  const { data }: AxiosResponse<Submission> = await axios.post(API_PATHS.SUBMIT_APPLICATION);
  const { price } = data;

  return price;
};

export {
  _updateApplication,
  _newApplication,
  _nextStep,
  _submitApplication
};