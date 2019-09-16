import { createMuiTheme, responsiveFontSizes, makeStyles as muiMakeStyles } from '@material-ui/core/styles';
import { Styles } from '@material-ui/styles/withStyles';

export const Theme = responsiveFontSizes(createMuiTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#69f0ae',
    },
  },
  typography: {
    fontFamily: ['Source Code Pro', 'monospace'].join(','),
  },
}));


export const makeStyles = <Props extends {} = {}>(styles: Styles<typeof Theme, Props>) => muiMakeStyles<typeof Theme, Props>(styles);