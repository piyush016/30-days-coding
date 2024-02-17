import React, { useState, useEffect } from "react";
import "./Table.css";
import {
  TableRow,
  TableCell,
  Checkbox,
  IconButton,
  TextField,
} from "@mui/material";
import { MdRocket } from "react-icons/md";
import { styled } from "@mui/material/styles";

const StyledTableRow = styled(TableRow)`
  &:nth-of-type(odd) {
    background-color: #f2f2f2;
  }
`;

const VibratingIconButton = styled(IconButton)`
  transition: transform 0.3s;

  &:hover {
    animation: vibrate 0.3s infinite;
  }

  @keyframes vibrate {
    0% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(-3px);
    }
    50% {
      transform: translateX(0);
    }
    75% {
      transform: translateX(3px);
    }
    100% {
      transform: translateX(0);
    }
  }
`;

const RowQues = ({
  id,
  ques,
  url,
  note,
  status,
  onStatusChange,
  onNoteSave,
}) => {
  const [isChecked, setIsChecked] = useState(status);
  const [isEditing, setIsEditing] = useState(false);
  const [noteValue, setNoteValue] = useState(note);
  const [isStrike, setIsStriked] = useState(status);

  useEffect(() => {
    setIsStriked(status);
  }, [status]);

  const handleCheckboxChange = () => {
    const newStatus = !isChecked;
    setIsChecked(newStatus);
    setIsStriked(newStatus);
    onStatusChange(id, newStatus);
  };

  const handleNoteClick = () => {
    setIsEditing(true);
  };

  const handleNoteBlur = () => {
    setIsEditing(false);
    onNoteSave(id, noteValue);
  };

  const handleRocketClick = () => {
    // Move the rocket up here (e.g., change its position)
    window.open(url, "_blank"); // Open a new page
  };

  return (
    <StyledTableRow key={id}>
      <TableCell align='center'>
        <Checkbox
          checked={isChecked}
          onChange={handleCheckboxChange}
          color='primary'
          inputProps={{ "aria-label": "controlled" }}
        />
      </TableCell>
      <TableCell className={isStrike ? "strike" : ""}>{ques}</TableCell>
      <TableCell align='center'>
        <a href={url} target='_blank' rel='noopener noreferrer'>
          <VibratingIconButton aria-label='rocket' onClick={handleRocketClick}>
            <MdRocket />
          </VibratingIconButton>
        </a>
      </TableCell>
      <TableCell align='center'>
        {isEditing ? (
          <TextField
            fullWidth
            value={noteValue}
            onChange={(e) => setNoteValue(e.target.value)}
            onBlur={handleNoteBlur}
          />
        ) : (
          <div onClick={handleNoteClick}>
            <TextField
              fullWidth
              value={noteValue}
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
        )}
      </TableCell>
    </StyledTableRow>
  );
};

export default RowQues;
