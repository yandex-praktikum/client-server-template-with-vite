import { grey } from '@material-ui/core/colors';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { blueGrey } from '@mui/material/colors';

export const useStyles = makeStyles(() => ({
  wrapper: {
    border: `1px solid ${grey['900']}`,
    display: 'flex',
    height: 'calc(100vh - 200px)',
    borderRadius: '4px',
    width: '100%',
  },
  themeList: {
    borderRight: `1px solid ${grey['900']}`,
    minWidth: '30%',
    maxWidth: '30%',
    overflow: 'auto',
  },
  themeItem: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  commentCount: {
    display: 'flex',
    width: '50px',
    marginLeft: '10px',
  },
  themeContainer: {
    padding: '20px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
  },
  themeAuthor: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '200px',
    maxWidth: '200px',
    marginRight: '20px',
  },
  themeTitle: {
    borderBottom: '1px solid red',
    marginBottom: '20px',
    paddingBottom: '10px',
    display: 'flex',
    alignItems: 'center',
  },
  themeContent: {
    backgroundColor: blueGrey['50'],
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '10px',
  },
  comments: {
    padding: '0 60px',
    display: 'flex',
    flexDirection: 'column',
  },
  comment: {
    display: 'flex',
    flexDirection: 'column',
    padding: '10px 0',
  },
  commentCreatedAt: {
    marginLeft: 'auto',
    alignSelf: 'end',
  },
  commentAuthor: {
    display: 'flex',
    alignItems: 'center',
  },
  commentAuthorName: {
    marginLeft: '10px',
  },
  commentContent: {
    borderLeft: `2px solid ${blueGrey.A100}`,
    padding: '8px',
    margin: '10px 0 10px 24px',
  },
  answers: {
    marginLeft: '16px',
  },
  btn: {
    marginLeft: 'auto !important',
    width: '100px',
    display: 'block !important',
  },
  actions: {
    display: 'flex',
    marginLeft: 'auto',
  },
  textareaAnswer: {
    margin: '10px 0 10px 24px',
  },
  emptyBlock: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
}));
