import { makeStyles } from '@material-ui/core/styles';

const FormButtonsStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    marginRight: '5px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    '&$disabled': {
      background: 'rgba(0, 0, 0, 0.12)',
      color: 'white',
      boxShadow: 'none',
    },
  },
  label: {
    textTransform: 'capitalize',
  },
  disabled: {}
});

export default FormButtonsStyles;