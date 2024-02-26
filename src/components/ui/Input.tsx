import { styled } from '@mui/system';
import { COLOR_PALLETE } from '@utils/constants';

const { grey } = COLOR_PALLETE

const Input = styled('input')(
  ({ theme }) => `
  box-sizing: border-box;
    width: 100%;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 4px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};

    &:hover {
      border-color: black;
    }

    &:focus {
      border-color: black;
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? grey[600] : grey[200]};
    }

    // firefox
    &:focus-visible {
      outline: 0;
    }
`,
);

export default Input
