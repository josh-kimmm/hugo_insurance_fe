import { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";

import { URI_PATHS } from "constsants";

import { _newApplication } from "state/actions/application";

import { ThemeProvider } from "@mui/material";
import mainTheme from "styles/mainTheme";

import BasicInfo from "./BasicInfo";
import Address from "./Address";
import Vehicles from "./Vehicles";
import Submit from "./Submit";
import ErrorPage from "./ErrorPage";

type PropsFromRedux = ConnectedProps<typeof connector>;
type ApplicationPropTypes = PropsFromRedux;

const Application = (props: ApplicationPropTypes) => {
  const { _newApplication } = props;
  const navigate = useNavigate();

  useEffect(() => {
    _newApplication(navigate, {});
  }, []);

  return (
    
    <ThemeProvider theme={mainTheme}>
      <Routes >
        <Route path={URI_PATHS.HOME} element={<BasicInfo />} />
        <Route path={URI_PATHS.BASIC_INFO} element={<BasicInfo />} />
        <Route path={URI_PATHS.ADDRESS} element={<Address />} />
        <Route path={URI_PATHS.VEHICLES} element={<Vehicles />} />
        <Route path={URI_PATHS.SUBMIT} element={<Submit />} />
        <Route path={URI_PATHS.NOT_FOUND} element={<ErrorPage />} />
      </Routes>
    </ThemeProvider>
    
  )

};

const mapDispatchToProps = {
  _newApplication
};

const connector = connect(null, mapDispatchToProps);

export default connector(Application);