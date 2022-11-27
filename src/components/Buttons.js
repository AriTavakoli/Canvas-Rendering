import DiamondIcon from '@mui/icons-material/Diamond';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import Brightness1OutlinedIcon from '@mui/icons-material/Brightness1Outlined';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import CropSquareSharpIcon from '@mui/icons-material/CropSquareSharp';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { ModeContext, ModeDispatchContext } from './ModeContext';
import { useContext } from 'react';



const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  '& .MuiToggleButtonGroup-grouped': {
    margin: theme.spacing(0.5),
    border: 0,
    '&.Mui-disabled': {
      border: 0,
    },
    '&:not(:first-of-type)': {
      borderRadius: theme.shape.borderRadius,
    },
    '&:first-of-type': {
      borderRadius: theme.shape.borderRadius,
    },
  },
}));

export default function Buttons({ handleLocalStorage, handleClear }) {

  const dispatch = useContext(ModeDispatchContext)


  const fontSize = '20px'


  const [currentShape, setCurrentShape] = useState('diamond');


  const handleShape = (event, newShape) => {
    setCurrentShape(newShape);

  };



  return (

    <Paper
      elevation={0}
      sx={{
        display: 'flex',
        direction: 'row',
        justifyContent: 'center',



        padding: '10px',

        border: (theme) => `1px solid ${theme.palette.divider}`,


      }}
    >


      <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />


      {/* Utility Buttons */}

      <StyledToggleButtonGroup

        size="small"
        value={currentShape}
        exclusive
        onChange={handleShape}
        aria-label="text alignment"
      >

        <ToggleButton value="diamond" aria-label="diamond" onClick={() => { dispatch({ type: 'diamond' }) }} onChange={handleShape}>
          <DiamondIcon style={{ fontSize: fontSize }} />
        </ToggleButton>


        <ToggleButton value="triangle" aria-label="triangle"
          onClick={() => { dispatch({ type: 'triangle' }) }}>
          <ChangeHistoryIcon style={{ fontSize: fontSize }} />
        </ToggleButton>

        <ToggleButton value="line" aria-label="line"
          onClick={() => { dispatch({ type: 'line' }) }} >
          <HorizontalRuleIcon style={{ fontSize: fontSize }} />
        </ToggleButton>



        <ToggleButton value="X" aria-label="X"
          onClick={() => { dispatch({ type: 'X' }) }} >
          <CloseSharpIcon style={{ fontSize: fontSize }} />
        </ToggleButton>

        <ToggleButton value="rectangle" aria-label="rectangle"
          onClick={() => { dispatch({ type: 'rectangle' }) }} >
          <CropSquareSharpIcon style={{ fontSize: fontSize }} />
        </ToggleButton>

        <ToggleButton value="ellipse" aria-label="ellipse"
          onClick={() => { dispatch({ type: 'ellipse' }) }} >
          <Brightness1OutlinedIcon style={{ fontSize: fontSize }} />
        </ToggleButton>

        <ToggleButton value="clear" aria-label="clear"
          onClick={() => { dispatch({ type: 'selection' }) }} >
          <DeleteOutlineOutlinedIcon style={{ fontSize: fontSize }} />
        </ToggleButton>


      </StyledToggleButtonGroup>
    </Paper>

  );
}