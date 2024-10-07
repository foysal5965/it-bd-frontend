'use client'
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../theme/theme';
import { store } from '@/redux/store';
// Adjust the import based on your theme setup

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </Provider>
    );
};

export default Providers;
