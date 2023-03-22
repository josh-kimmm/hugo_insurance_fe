import { useCallback, useMemo, useState } from "react";

import { connect, ConnectedProps } from "react-redux";
import { _updateApplication, _nextStep } from "state/actions/application";

import { TextField, Container, Button, List, ListItem, Typography } from "@mui/material";

import { MAX_VEHICLE_YEAR, MIN_VEHICLE_YEAR } from "constsants";

import { useApplicationState } from "hooks";

import { useNavigate } from "react-router-dom";

import type { VehicleModel } from "../state/types";


const EMPTY_VEHICLE: VehicleModel = {
  vin: "",
  year: "",
  make: "",
  model: ""
};

type PropsFromRedux = ConnectedProps<typeof connector>;
type VehiclesPropTypes = PropsFromRedux;

const Vehicles = (props: VehiclesPropTypes) => {
  const { _updateApplication, _nextStep } = props;

  const appState = useApplicationState();
  const { vehicles: initAllVehicles } = appState;

  const navigate = useNavigate();
  
  const [allVehicles, setAllVehicles] = useState<VehicleModel[]>(initAllVehicles || []);
  const [vehicleToAdd, setVehicleToAdd] = useState<VehicleModel>({...EMPTY_VEHICLE});
  const [errorYear, setErrorYear] = useState("");
  
  const isVehicleFormValid = useMemo(() => {
    const { vin, year, make, model } = vehicleToAdd;
    if(!vin || !year || !make || !model)
      return false;

    const parsedYear = parseInt(year);
    if(parsedYear < MIN_VEHICLE_YEAR || parsedYear > MAX_VEHICLE_YEAR){
      setErrorYear(`Vehicle year must be within ${MIN_VEHICLE_YEAR} - ${MAX_VEHICLE_YEAR}`);
      return false;
    }
      
    return true
  }, [vehicleToAdd]);
  const addVehicle = useCallback(async () => {
    setAllVehicles([...allVehicles, vehicleToAdd]);
    setVehicleToAdd({...EMPTY_VEHICLE});
  }, [allVehicles, vehicleToAdd])
  

  const isFormValid = useMemo(() => {
    if(!allVehicles.length)
      return false;

    return true;
  }, [allVehicles]);
  const onSubmission = useCallback(async () => {
    const payload = {
      vehicles: allVehicles
    }
    await _updateApplication(payload);
    await _nextStep(navigate);

    console.log("successfully updated application");
  }, [allVehicles, navigate, _updateApplication, _nextStep]);

  const RenderedVehicles = allVehicles.map(vehicle => {
    const { vin, model, make, year } = vehicle;
    return <ListItem key={vin}>
      {`${make} ${model} ${year}`}
    </ListItem>
  })
  const VehicleListHeader = <ListItem sx={{ fontWeight: "bold" }}>
    {allVehicles.length > 0 ? "Vehicles To Add" : "Please add a Vehicle"}
  </ListItem>

  return (
    <>
      <Typography variant="h3">Vehicles</Typography>
      <List subheader={VehicleListHeader}>
        {RenderedVehicles}
      </List>
      <Container>
        <TextField 
          required
          placeholder="Vin"
          value={vehicleToAdd.vin || ""}
          onChange={(e) => setVehicleToAdd({
            ...vehicleToAdd,
            vin: e.target.value
          })}
        />
        <TextField 
          required
          placeholder="Make"
          value={vehicleToAdd.make || ""}
          onChange={(e) => setVehicleToAdd({
            ...vehicleToAdd,
            make: e.target.value
          })}
        />
        <TextField 
          required
          placeholder="Model"
          value={vehicleToAdd.model || ""}
          onChange={(e) => setVehicleToAdd({
            ...vehicleToAdd,
            model: e.target.value
          })}
        />
        <TextField 
          required 
          placeholder="Year"
          value={vehicleToAdd.year || ""}
          onChange={(e) => {
            setErrorYear("");
            setVehicleToAdd({
              ...vehicleToAdd,
              year: e.target.value
            });
          }}
          error={!!errorYear}
          helperText={errorYear}
          type="number"
        />
        <Button 
          onClick={addVehicle}
          variant="contained"
          disabled={!isVehicleFormValid}
          sx={{ alignSelf: "end", margin: "1rem" }}
        >
          Add Vehicle
        </Button>
      </Container>
      <Button 
        onClick={onSubmission}
        variant="contained"
        disabled={!isFormValid}
      >
        Continue
      </Button>
    </>
  )

};

const mapDispatchToProps = {
  _updateApplication,
  _nextStep
};

const connector = connect(null, mapDispatchToProps);

export default connector(Vehicles);