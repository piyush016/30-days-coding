import React from "react";
import {
  TableRow,
  TableCell,
  Checkbox,
  IconButton,
  InputBase,
} from "@mui/material";
import { BiEdit } from "react-icons/bi";
import { MdFileDownloadDone } from "react-icons/md";
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
  onNoteClick,
  onNoteChange,
  onNoteSave,
  isEditing,
  noteValue,
}) => {
  return (
    <StyledTableRow key={id}>
      <TableCell align="center">{serialNo}</TableCell>
      <TableCell>{ques}</TableCell>
      <TableCell align="center">
        <IconButton
          aria-label="download"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <MdFileDownloadDone />
        </IconButton>
      </TableCell>
      <TableCell align="center">
        <Checkbox
          checked={status}
          onChange={onStatusChange}
          color="primary"
        />
      </TableCell>
      <TableCell align="center">
        {isEditing ? (
          <div>
            <InputBase
              multiline
              fullWidth
              value={noteValue}
              onChange={onNoteChange}
              autoFocus
            />
            <IconButton
              aria-label="save"
              size="small"
              onClick={onNoteSave}
            >
              <MdFileDownloadDone />
            </IconButton>
          </div>
        ) : (
          <div>
            {note}
            <IconButton
              aria-label="edit"
              size="small"
              onClick={onNoteClick}
            >
              <BiEdit />
            </IconButton>
          </div>
        )}
      </TableCell>
    </StyledTableRow>
  );
};

export default RowQues;
