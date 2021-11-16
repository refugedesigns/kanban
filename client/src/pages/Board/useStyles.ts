import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  cardTitle: {
    marginRight: '10px',
    fontWeight: 'bolder',
    color: 'black',
    fontSize: '1.1rem',
  },

  dialogContent: {
    width: 800,
    padding: '20px 30px',
    display: 'flex',
  },

  buttonContainer: {
    marginBottom: '2rem',
  },

  operationBtnText: {
    margin: '5px 0',
    fontWeight: 'bold',
  },
  cardItemTitle: {
    fontWeight: 'bolder',
    fontSize: '0.9rem',
    color: 'black',
  },
  dialogContentText: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '5px !important',
  },
  dialogContentTextContainer: {
    marginBottom: '2rem',
  },
  textSpacing: { marginRight: '10px' },

  textArea: {
    width: '100%',
    minHeight: '4rem',
    resize: 'none',
    borderRadius: '5px',
    borderColor: '#e0e0e0',
  },

  saveButtonContainer: {
    margin: '5px',
  },
  textAreaContainer: {
    paddingLeft: '40px',
    width: '90%',
  },
  dialogTitle: {
    borderBottom: '1px solid #e0e0e0',
    position: 'relative',
    padding: '10px   15px',
  },
  closeDialogBtn: {
    position: 'absolute',
    right: 0,
    marginRight: '10px',
  },
  cardTagColor: {
    width: '100%',
    height: '0.5rem',
    borderRadius: '20px',
    marginRight: '10px',
  },
}));

export default useStyles;
