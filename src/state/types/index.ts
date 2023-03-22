import store from "../store";
import { APPLICATION_REDUCER_TYPES } from "constsants";

// Models based off DB
interface UserModel {
  email?: string;
  first_name?: string;
  last_name?: string;
  dob?: string;
}
interface AddressModel {
  street?: string;
  city?: string;
  state?: string;
  zip?: number;
}
interface VehicleModel {
  id?: string;
  vin?: string;
  year?: string;
  make?: string;
  model?: string;
};


// Redux types
interface AppState {
  currentStep?: string;
  stepOrder?: string[];
  user?: UserModel;
  address?: AddressModel;
  vehicles?: VehicleModel[];
};
type ActionPayloadType = AppState;
type ActionTypes = typeof APPLICATION_REDUCER_TYPES.UPDATE | typeof APPLICATION_REDUCER_TYPES.RESUME;

type GetState = typeof store.getState;
type RootState = ReturnType<GetState>;
type AppDispatch = typeof store.dispatch;

export type { 
  UserModel,
  AddressModel,
  VehicleModel,
  AppState,
  RootState,
  GetState,
  AppDispatch,
  ActionTypes,
  ActionPayloadType
};