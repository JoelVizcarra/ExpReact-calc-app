import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import useMediaQuery from '@mui/material/useMediaQuery';
import { RouterProvider } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import router from './router';
import { store } from './redux/store';

const App = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
        components: {
          MuiCssBaseline: {
            styleOverrides: `
              a {
                color: inherit;
                text-decoration: none;
              }            
            `,
          },
        },
      }),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastContainer />
      <ReduxProvider store={store}>
        <RouterProvider router={router} />
      </ReduxProvider>
    </ThemeProvider>
  );
};

export default App;
