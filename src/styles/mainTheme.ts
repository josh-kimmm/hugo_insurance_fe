import { createTheme } from "@mui/material";

const theme = createTheme({
  components: {
    MuiContainer: {
      styleOverrides: {
        root:{
          display: "flex",
          flexDirection: "column"
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          margin: "1rem 1rem"
        }
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          // fontSize: "3rem"
        }
      }
    }
  }
});

export default theme;