import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import {
  collection,
  getDocs,
  where,
  query,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { db } from "../../firebase";
import RowQues from "./RowQues";
import PacmanLoader from "react-spinners/PacmanLoader";

const StyledTableContainer = styled(TableContainer)`
  margin-top: 16px;
`;

const StyledTable = styled(Table)`
  min-width: 650px;
`;

const BoldTableCell = styled(TableCell)`
  font-weight: bold;
`;

const TableView = ({ userId }) => {
  const { topic } = useParams();
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const userDocRef = doc(db, "users", userId);
        const userDocSnapshot = await getDoc(userDocRef);
        if (!userDocSnapshot.exists()) {
          throw new Error("User document not found");
        }

        const userData = userDocSnapshot.data();

        const questionsQuerySnapshot = await getDocs(
          query(collection(db, "questions"), where("dsatopic", "==", topic))
        );
        const questions = questionsQuerySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const updatedQuestions = questions.map((question) => {
          const userQuestion = userData.questions?.find(
            (q) => q.id === question.id
          );
          return {
            ...question,
            status: userQuestion ? userQuestion.status : false,
            note: userQuestion ? userQuestion.note : "",
          };
        });

        setFilteredData(updatedQuestions);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [topic, userId]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const updatedQuestions = filteredData.map((question) =>
        question.id === id ? { ...question, status: newStatus } : question
      );
      setFilteredData(updatedQuestions);
      await updateUserQuestions(userId, updatedQuestions);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleNoteSave = async (id, newNote) => {
    try {
      const updatedQuestions = filteredData.map((question) =>
        question.id === id ? { ...question, note: newNote } : question
      );
      setFilteredData(updatedQuestions);
      await updateUserQuestions(userId, updatedQuestions);
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const updateUserQuestions = async (userId, updatedQuestions) => {
    try {
      const simplifiedQuestions = updatedQuestions.map(
        ({ id, status, note }) => ({
          id,
          status,
          note,
        })
      );

      const userDocRef = doc(db, "users", userId);
      await updateDoc(userDocRef, { questions: simplifiedQuestions });
    } catch (error) {
      console.error("Error updating user questions:", error);
    }
  };

  return (
    <div>
      {loading ? (
        <Box
          className='loading-container'
          display='flex'
          justifyContent='center'
          alignItems='center'
          overflow='hidden'
        >
          <PacmanLoader size={25} color='#eb1777' />
        </Box>
      ) : (
        <>
          <Typography variant='h4' align='center'>
            {topic}
          </Typography>
          <StyledTableContainer>
            <StyledTable aria-label='questions table'>
              <TableHead>
                <TableRow>
                  <BoldTableCell align='center'>Status</BoldTableCell>
                  <BoldTableCell>Question</BoldTableCell>
                  <BoldTableCell align='center'>Links</BoldTableCell>
                  <BoldTableCell align='center'>Notes</BoldTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} align='center'>
                      No questions found for the selected topic.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredData.map((item) => (
                    <RowQues
                      key={item.id}
                      id={item.id}
                      ques={item.problem}
                      url={item.url}
                      note={item.note}
                      status={item.status}
                      onStatusChange={handleStatusChange}
                      onNoteSave={handleNoteSave}
                    />
                  ))
                )}
              </TableBody>
            </StyledTable>
          </StyledTableContainer>
        </>
      )}
    </div>
  );
};

export default TableView;
