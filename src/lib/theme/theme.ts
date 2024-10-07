import { createTheme } from '@mui/material/styles';
import { green, purple } from '@mui/material/colors';

export const theme = createTheme({
    palette: {
        primary: {
            main: '#4ECDC4',
        },
        secondary: {
            main: '#666f73',
            light: '#f8f8f8',
        },
    },
    components: {
        MuiButton: {
            defaultProps: {
                variant: 'contained'
            },
            styleOverrides: {
                root: {
                    padding: '8px 24px',
                    textTransform: 'none',
                }
            }
        },
        MuiContainer: {
            defaultProps: {
                maxWidth:'lg'
            },
           
          },
        MuiStack: {
            styleOverrides: {
                root: {
                    textTransform: 'none'
                }
            }
        },
        MuiTextField: {
            defaultProps: {
                variant: 'outlined',
                margin: 'normal',
                fullWidth: true,
            },
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: '#5b5b5b', // Default border color
                        },
                        '&:hover fieldset': {
                            borderColor: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', // Border color when hovering
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#ffbaba', // Border color when focused
                        },
                    },
                    '& .MuiInputLabel-root': {
                        color: 'black', // Label color
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                        color: 'black', // Label color when focused
                    },
                },
            },
        },
    },
    typography: {
        body1: {
            color: '#0B1134CC',
        },
    }
});
theme.shadows[1] = '0px 5px 22px lightgray';
