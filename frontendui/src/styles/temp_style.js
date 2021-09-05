import { createMuiTheme } from '@material-ui/core';


export const theme = createMuiTheme({
    overrides: {
      MuiTableCell: {
        root: {
        fontSize:'1.4rem'
        }
      },
      MuiTypography: {
        body2: {
          fontSize: 12
        },
        body1: {
          fontSize: 15,
          fontWeight: 500
        } 
      },
      MuiSvgIcon: {
        root: {
          fontSize:24
        }
      }
    }
});