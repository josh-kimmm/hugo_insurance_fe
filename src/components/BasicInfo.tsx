import { useCallback, useMemo, useState } from "react";
import type { Dayjs } from "../wrappers/dayjs";

import dayjs from "../wrappers/dayjs";

import { _updateApplication, _nextStep } from "state/actions/application";

import { TextField, Container, Button, Typography} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { VALID_USER_AGE_DAYJS } from "constsants";
import { connect, ConnectedProps } from "react-redux";
import { useApplicationState } from "hooks";
import { UserModel } from "state/types";
import { useNavigate } from "react-router-dom";


type PropsFromRedux = ConnectedProps<typeof connector>;
type BasicInfoPropTypes = PropsFromRedux;

const BasicInfo = (props: BasicInfoPropTypes) => {
  const { _updateApplication, _nextStep } = props;

  const appState = useApplicationState();
  const { 
    email: initEmail, 
    first_name: initFirstName, 
    last_name: initLastName, 
    dob: initDob
  } = appState.user as UserModel;

  const navigate = useNavigate();
  
  const [email, setEmail] = useState(initEmail);
  const [firstName, setFirstName] = useState(initFirstName);
  const [lastName, setLastName] = useState(initLastName);
  const [dob, setDob] = useState<Dayjs | null>(dayjs(initDob));
  const [dobError, setDobError] = useState<string | null>("");
  
  const isFormValid = useMemo(() => {
    if(!email || !firstName || !lastName || !dob || dobError)
      return false

    return true;
  }, [email, firstName, lastName, dob, dobError]);

  const onSubmission = useCallback(async () => {
    const payload = {
      user: {
        email,
        first_name: firstName,
        last_name: lastName,
        dob: dob?.format("MM-DD-YYYY")
      }
    }
    await _updateApplication(payload);
    await _nextStep(navigate);

    console.log("successfully updated application");
  }, [email, firstName, lastName, dob, navigate, _updateApplication, _nextStep]);

  return (
    <>
      <Typography variant="h3">BasicInfo</Typography>
      <Container>
        <TextField 
          required
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField 
          required 
          placeholder="First Name" 
          onChange={(e) => setFirstName(e.target.value)} 
        />
        <TextField 
          required
          placeholder="Last Name"
          onChange={e => setLastName(e.target.value)}
        />
        <DatePicker 
          label="Enter your Date of Birth"
          format="MM/DD/YYYY"
          slotProps={{
            textField: {
              helperText: dobError,
              type: "error"
            }
          }}
          onError={() => setDobError("You must be at least 16 in order to apply.")}
          onChange={(value: Dayjs | null) => {
            setDobError(null);
            setDob(value);
          }}
          maxDate={VALID_USER_AGE_DAYJS}
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

export default connector(BasicInfo);