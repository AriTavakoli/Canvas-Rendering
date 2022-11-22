import DiamondIcon from '@mui/icons-material/Diamond';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
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
import CustomizedSwitches from "./Darkmode.js";
import modeReducer from "./modeReducer.js";
import { useReducer } from "react";
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

export default function Buttons({ handleClick }) {

  const dispatch = useContext(ModeDispatchContext)



  const [alignment, setAlignment] = React.useState('left');
  const [formats, setFormats] = React.useState(() => ['italic']);
  const [currentShape, setCurrentShape] = React.useState('diamond');

  const handleFormat = (event, newFormats) => {
    setFormats(newFormats);
  };

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);

  };

  const handleShape = (event, newShape) => {
    setCurrentShape(newShape);

  };







  return (
    <div>


      <Paper
        elevation={0}
        sx={{
          display: 'flex',
          aligned: 'center',
          justifyContent: 'center',
          border: (theme) => `1px solid ${theme.palette.divider}`,
          flexWrap: 'wrap',
        }}
      >
        <StyledToggleButtonGroup
          size="small"
          value={alignment}
          exclusive
          onChange={handleAlignment}
          aria-label="text alignment"
        >
          <ToggleButton value="left" aria-label="left aligned">
            <FormatAlignLeftIcon />
          </ToggleButton>

          <ToggleButton value="center" aria-label="centered">
            <FormatAlignCenterIcon />
          </ToggleButton>

          <ToggleButton value="right" aria-label="right aligned">
            <FormatAlignRightIcon />
          </ToggleButton>

          <ToggleButton value="justify" aria-label="justified" disabled>
            <FormatAlignJustifyIcon />
          </ToggleButton>

        </StyledToggleButtonGroup>



        <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />



        <StyledToggleButtonGroup
          size="small"
          value={formats}
          onChange={handleFormat}
          aria-label="text formatting"
        >

          <ToggleButton value="bold" aria-label="bold">
            <FormatBoldIcon />
          </ToggleButton>

          <ToggleButton value="italic" aria-label="italic">
            <FormatItalicIcon />
          </ToggleButton>

          <ToggleButton value="underlined" aria-label="underlined">
            <FormatUnderlinedIcon />
          </ToggleButton>


          <ToggleButton value="color" aria-label="color" disabled>
            <FormatColorFillIcon />
            <ArrowDropDownIcon />
          </ToggleButton>

        </StyledToggleButtonGroup>


        <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />


        {/* Utility Buttons */}

        <StyledToggleButtonGroup
          size="small"
          value={currentShape}
          exclusive
          onChange={handleShape}
          aria-label="text alignment"
        >


          <ToggleButton value="diamond" aria-label="diamond" onClick={() => { dispatch({ type: 'diamond' }) }} onChange = {handleShape}>
            <DiamondIcon />
          </ToggleButton>




          <ToggleButton value="triangle" aria-label="triangle"
            onClick={() => { dispatch({ type: 'triangle' }) }}>
            <ChangeHistoryIcon />
          </ToggleButton>

          <ToggleButton value="line" aria-label="line"
            onClick={() => { dispatch({ type: 'line' }) }} >
            <HorizontalRuleIcon />
          </ToggleButton>

          <ToggleButton value="X" aria-label="X"
            onClick={() => { dispatch({ type: 'X' }) }} >
            <CloseSharpIcon />
          </ToggleButton>

          <ToggleButton value="rectangle" aria-label="rectangle"
            onClick={() => { dispatch({ type: 'rectangle' }) }} >
            <CropSquareSharpIcon />
          </ToggleButton>

          <ToggleButton value="ellipse" aria-label="ellipse"
            onClick={() => { dispatch({ type: 'ellipse' }) }} >
            <Brightness1OutlinedIcon />
          </ToggleButton>

          <ToggleButton value="clear" aria-label="clear"
            onClick={() => { dispatch({ type: 'clear' }) }} >
            <DeleteOutlineOutlinedIcon />
          </ToggleButton>





          <CustomizedSwitches />



        </StyledToggleButtonGroup>
      </Paper>
    </div>
  );
}