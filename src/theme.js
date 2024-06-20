import {
    createTheme
} from '@material-ui/core/styles';
import {
    ThemeProvider
} from '@emotion/react';
import tailwindConfig from '../tailwind.config';

const tailwindTheme = createTheme({
    typography: {
        fontFamily: tailwindConfig.theme.fontFamily.sans,
    },
});

export default tailwindTheme;
