import React, { useState, useEffect, useRef } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  IconButton,
  InputBase,
  Typography,
} from "@mui/material";
import Typewriter from "typewriter-effect";
import { styled } from "@mui/material/styles";
import { green } from "@mui/material/colors";
import { BsFillRocketFill } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { MdFileDownloadDone } from "react-icons/md";
import RowQues from "./RowQues";
import { dsatopics } from "./data";
import { db, auth } from "../../firebase";
import { doc, onSnapshot, setDoc, getDoc } from "firebase/firestore";

const StyledTableContainer = styled(TableContainer)`
  margin-top: 16px;
`;

const StyledTable = styled(Table)`
  min-width: 650px;
`;

const StyledTableRow = styled(TableRow)`
  &:not(:last-child) {
    border-bottom: 1px solid #e0e0e0;
  }
`;

const TableView = ({ topic }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [noteValue, setNoteValue] = useState("");
  const unsubscribeRef = useRef(null);

  useEffect(() => {
    console.log("Selected Topic:", topic);
    const filtered = dsatopics.filter((item) => item.dsatopic === topic);
    setFilteredData(filtered);
  }, [topic]);

  useEffect(() => {
    console.log("Selected Topic:", topic);
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userId = user.uid;
          const userDocRef = doc(db, "users", userId);
          const snapshot = await getDoc(userDocRef);
          const userData = snapshot.data();

          const updatedData = dsatopics.map((item) => {
            const matchingTopic = Array.isArray(userData.notes)
              ? userData.notes.find((data) => data.id === item.id)
              : null;
            return {
              ...item,
              status: matchingTopic ? matchingTopic.status : false,
              note: matchingTopic ? matchingTopic.note : "",
            };
          });

          setFilteredData(updatedData);

          unsubscribeRef.current = onSnapshot(userDocRef, (snapshot) => {
            if (snapshot.exists()) {
              const userData = snapshot.data();

              const updatedData = dsatopics.map((item) => {
                const matchingTopic = Array.isArray(userData.notes)
                  ? userData.notes.find((data) => data.id === item.id)
                  : null;
                return {
                  ...item,
                  status: matchingTopic ? matchingTopic.status : false,
                  note: matchingTopic ? matchingTopic.note : "",
                };
              });

              setFilteredData(updatedData);
            }
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [topic]);

  const handleNoteClick = (id, note) => {
    if (id === editingNoteId) {
      setEditingNoteId(null);
      setNoteValue("");
    } else {
      setEditingNoteId(id);
      setNoteValue(note);
    }
  };

  const handleNoteChange = (event) => {
    setNoteValue(event.target.value);
  };

  const handleNoteSave = async (id) => {
    const updatedData = filteredData.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          note: noteValue,
        };
      }
      return item;
    });

    setFilteredData(updatedData);
    setEditingNoteId(null);
    setNoteValue("");

    try {
      const user = auth.currentUser;
      if (user) {
        const userId = user.uid;
        await setDoc(
          doc(db, "users", userId),
          {
            notes: updatedData.map((item) => ({
              id: item.id,
              note: item.note,
            })),
          },
          { merge: true }
        );
      }
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  const handleStatusChange = async (id) => {
    const updatedData = filteredData.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          status: !item.status,
        };
      }
      return item;
    });

    setFilteredData(updatedData);

    try {
      const user = auth.currentUser;
      if (user) {
        const userId = user.uid;
        await setDoc(
          doc(db, "users", userId),
          {
            notes: updatedData.map((item) => ({
              id: item.id,
              status: item.status,
            })),
          },
          { merge: true }
        );
      }
    } catch (error) {
      console.error("Error saving status:", error);
    }
  };

  let currentTopic = "";
  let questionCounter = 0;
  const filteredQuestions = filteredData.filter((item) => item.dsatopic === topic);
  const ques =
    filteredQuestions.length > 0 ? (
      filteredQuestions.map((item) => {
        if (item.dsatopic !== currentTopic) {
          questionCounter = 0;
          currentTopic = item.dsatopic;
        }
        questionCounter++;
        return (
          <RowQues
            key={item.id}
            id={item.id}
            serialNo={questionCounter}
            ques={item.problem}
            url={item.URL}
            note={item.note}
            status={item.status}
            onStatusChange={() => handleStatusChange(item.id)}
            onNoteClick={() => handleNoteClick(item.id, item.note)}
            onNoteChange={handleNoteChange}
            onNoteSave={() => handleNoteSave(item.id)}
            isEditing={editingNoteId === item.id}
            noteValue={noteValue}
          />
        );
      })
    ) : (
      <TableRow>
        <TableCell colSpan={5} align="center">
          No questions found for the selected topic.
        </TableCell>
      </TableRow>
    );

  return (
    <div>
      <Typography variant="h4" align="center">
        <Typewriter
          options={{
            strings: [topic],
            delay: 700,
            deleteSpeed: 1000,
            autoStart: true,
            loop: true,
            pauseFor: 500,
          }}
        />
      </Typography>
      <StyledTableContainer>
        <StyledTable aria-label="questions table">
          <TableHead>
            <TableRow>
              <TableCell align="center">S No.</TableCell>
              <TableCell>Question</TableCell>
              <TableCell align="center">Links</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Notes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{ques}</TableBody>
        </StyledTable>
      </StyledTableContainer>
    </div>
  );
};

export default TableView;
