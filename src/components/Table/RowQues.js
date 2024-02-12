import React, { useState } from "react";
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

const RowQues = ({
  id,
  serialNo,
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

  const handleCheckboxChange = () => {
    const newStatus = !isChecked;
    setIsChecked(newStatus);
    onStatusChange(id, newStatus);
  };

  const handleNoteClick = () => {
    setIsEditing(true);
  };

  const handleNoteBlur = () => {
    setIsEditing(false);
    onNoteSave(id, noteValue);
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
      <TableCell>{ques}</TableCell>
      <TableCell align='center'>
        <a href={url} target='_blank' rel='noopener noreferrer'>
          <IconButton aria-label='rocket'>
            <MdRocket />
          </IconButton>
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
                disableUnderline: true,
              }}
            />
          </div>
        )}
      </TableCell>
    </StyledTableRow>
  );
};

export default RowQues;
