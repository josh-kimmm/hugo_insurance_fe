import dayjs from "dayjs";

// network
const HTTP_RESPONSE_REDIRECT = [301, 302];
const HTTP_RESPONSE_OK = 200;

// Routing
interface IUriPaths {
  [key: string]: string;
};
const URI_PATHS: IUriPaths = {
  HOME: "/",
  BASIC_INFO: "/basicinfo",
  ADDRESS: "/address",
  VEHICLES: "/vehicles",
  SUBMIT: "/submit",
  NOT_FOUND: "*"
}
const API_PATHS = {
  NEW_USER: "/user/new",
  UPDATE_APPLICATION: "/application/update",
  SUBMIT_APPLICATION: "/application/submit"
};

// Basic Info
const VALID_USER_AGE = 16;
const VALID_USER_AGE_DAYJS = dayjs().subtract(VALID_USER_AGE, "year");

// Vehicles
const MIN_VEHICLE_YEAR = 1985;
const MAX_VEHICLE_YEAR = parseInt(dayjs().add(1, 'year').format("YYYY"));

// Application state Reducer types
const APPLICATION_REDUCER_TYPES = {
  UPDATE: "UPDATE_APPLICATION",
  RESUME: "RESUME_APPLICATION",
};

const DEFAULT_STEP_ORDER = ["BASIC_INFO", "ADDRESS", "VEHICLES", "SUBMIT"];

export {
  URI_PATHS,
  API_PATHS,
  VALID_USER_AGE,
  VALID_USER_AGE_DAYJS,
  APPLICATION_REDUCER_TYPES,
  HTTP_RESPONSE_REDIRECT,
  HTTP_RESPONSE_OK,
  DEFAULT_STEP_ORDER,
  MIN_VEHICLE_YEAR,
  MAX_VEHICLE_YEAR
}