import type { ConnectedProps } from "react-redux";
import { connect } from "react-redux";
import { _submitApplication } from "state/actions/application";

import { Button, Typography, Container, Card, ThemeProvider, createTheme } from "@mui/material";
import { deepmerge } from "@mui/utils";
import dayjs from "dayjs";

import { useApplicationState } from "hooks";
import { useCallback, useState } from "react";

import mainTheme from "styles/mainTheme";

const submitTheme = createTheme({
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          flexDirection: "row",
          justifyContent: "space-evenly",
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          padding: "1rem",
          textAlign: "left"
        }
      }
    },
    MuiTypography: {
      styleOverrides: {
        h6: {
          textAlign: "center"
        }
      }
    }
  }
});
const theme = createTheme(deepmerge(mainTheme, submitTheme));

type PropsFromRedux = ConnectedProps<typeof connector>;
type SubmitPropTypes = PropsFromRedux;

const Submit = ({ _submitApplication }: SubmitPropTypes) => {
  const appState = useApplicationState();
  const { user = {}, address = {}, vehicles = [] } = appState;
  const { email, first_name, last_name, dob } = user;
  const { street, city, state, zip } = address;
  
  const [insurancePrice, setInsurancePrice] = useState<number>();

  const onSubmission = useCallback(async () => {
    const price = await _submitApplication();
    setInsurancePrice(price);
  }, [_submitApplication]);

  const RenderedVehicles = vehicles.map(vehicle => {
    const { vin, model, make, year } = vehicle;
    return <Typography variant="body1" key={vin}>
      {`${make} ${model} ${year}`}
    </Typography>
  });

  return (
    <ThemeProvider theme={theme}>
      <Typography variant="h3">Submit</Typography>
      <Container>
        <Card raised>
          <Typography variant="h6">Basic Info</Typography>
          <Typography variant="body1">
            {`Name: ${first_name} ${last_name}`}
          </Typography>
          <Typography variant="body1">
            {`Email: ${email}`}
          </Typography>
          <Typography variant="body1">
            {`DOB: ${dayjs(dob).format("M/D/YYYY")}`}
          </Typography>          
        </Card>
        <Card raised>
          <Typography variant="h6">Address</Typography>
          <Typography variant="body1">
            {street}
          </Typography>
          <Typography variant="body1">
            {`${city} ${state}, ${zip}`}
          </Typography>
        </Card>
        <Card raised>
          <Typography variant="h6">Vehicles</Typography>
          {RenderedVehicles}
        </Card>
      </Container>
      <Button
        onClick={onSubmission}
        variant="contained"
      >
        Submit
      </Button>
      <Typography variant="subtitle1">
        {insurancePrice ? `Calculated Insurance Price: $${insurancePrice}` : ""}
      </Typography>
    </ThemeProvider>
  )
};

const mapDispatchToProps = {
  _submitApplication
}

const connector = connect(null, mapDispatchToProps);


export default connector(Submit);