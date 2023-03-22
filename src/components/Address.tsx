import { useState, useMemo, useCallback } from "react";
import { Container, TextField, Button } from "@mui/material";
import { _nextStep, _updateApplication } from "state/actions/application";
import { useNavigate } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";

type PropsFromRedux = ConnectedProps<typeof connector>;
type AddressPropTypes = PropsFromRedux;

const Address = ({_nextStep, _updateApplication}: AddressPropTypes) => {
  const navigate = useNavigate();

  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [errorZip, setErrorZip] = useState("");

  const isFormValid = useMemo(() => {
    if(!street || !city || !state || !zip || zip.length < 5)
      return false

    const validZipRegex = /^[0-9]{5}$/;
    if(!validZipRegex.test(zip)){
      setErrorZip("Zip code must contain only numbers and be 5 digits long");
      return false
    }

    return true;
  }, [street, city, state, zip]);

  const onSubmission = useCallback(async () => {
    const payload = {
      address: {
        street,
        city,
        state,
        zip: parseInt(zip)
      }
    };
    
    await _updateApplication(payload);
    await _nextStep(navigate);
  }, [street, city, state, zip, navigate, _updateApplication, _nextStep]);

  return (
    <>
      <h1>Address</h1>
      <Container>
        <TextField 
          required
          placeholder="Street"
          onChange={(e) => setStreet(e.target.value)}
          />
        <TextField 
          required
          placeholder="City"
          onChange={(e) => setCity(e.target.value)}
          />
        <TextField 
          required
          placeholder="State"
          onChange={e => setState(e.target.value)}
          />
        <TextField 
          required
          placeholder="Zip Code"
          onChange={e => {
            setErrorZip("");
            setZip(e.target.value)
          }}
          error={!!errorZip}
          helperText={errorZip}
          type="number"
          />

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

export default connector(Address);