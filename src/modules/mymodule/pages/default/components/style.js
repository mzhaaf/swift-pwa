import { makeStyles } from '@material-ui/core/styles';
import {
    FlexColumn,
} from '@theme_mixins';

const useStyles = makeStyles(() => ({
    border: {
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
        borderRadius: '5px',
        padding: '10px',
        margin: '10px',
        width: '350px !important',
        height: 'auto !important',
        ...FlexColumn,
        alignItems: 'center',
    },
    title: {
        textAlign: 'center',
        font: '15px Arial',
    },
}));

export default useStyles;
