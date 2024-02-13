import React, { useState, useEffect } from "react";
import { collection, query, getDocs, setDoc } from "firebase/firestore";
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
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

const StyledTableContainer = styled(TableContainer)`
  margin-top: 16px;
`;

const StyledTable = styled(Table)`
  min-width: 650px;
`;

const TableView = ({ topic }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestionsAndUserData = async () => {
      try {
        setLoading(true);

        // Fetch questions
        const q = query(collection(db, "questions"));
        const querySnapshot = await getDocs(q);
        const questions = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Filter questions based on the topic
        const filteredQuestions = questions.filter(
          (question) => question.dsatopic === topic
        );

        // Set filtered questions
        setFilteredData(filteredQuestions);

        // Fetch user data
        const userQ = query(collection(db, "users"));
        const userQuerySnapshot = await getDocs(userQ);

        // Check if userQuerySnapshot.docs array is not empty
        if (userQuerySnapshot.docs.length > 0) {
          const userData = userQuerySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))[0];

          // Update status and notes
          const updatedQuestions = filteredQuestions.map((question) => {
            const userQuestion = userData.questions.find(
              (q) => q.id === question.id
            );
            return {
              ...question,
              status: userQuestion ? userQuestion.status : false,
              note: userQuestion ? userQuestion.note : "",
            };
          });

          // Set filtered data with updated status and notes
          setFilteredData(updatedQuestions);
        } else {
          // If no user data, set status to false and notes to empty string
          const updatedQuestions = filteredQuestions.map((question) => ({
            ...question,
            status: false,
            note: "",
          }));
          setFilteredData(updatedQuestions);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchQuestionsAndUserData();
  }, [topic]);

  // Function to handle status change
  // Function to handle status change
  const handleStatusChange = async (id, newStatus) => {
    try {
      const userQ = query(collection(db, "users"));
      const userQuerySnapshot = await getDocs(userQ);

      if (!userQuerySnapshot.empty) {
        const userData = userQuerySnapshot.docs[0].data();
        const userDocRef = userQuerySnapshot.docs[0].ref;

        // Initialize the questions array if it's not already initialized
        userData.questions = userData.questions || [];

        const questionIndex = userData.questions.findIndex((q) => q.id === id);

        if (questionIndex !== -1) {
          userData.questions[questionIndex].status = newStatus;
        } else {
          // If the question does not exist in user data, create a new entry
          userData.questions.push({ id, status: newStatus, note: "" });
        }

        await setDoc(userDocRef, { questions: userData.questions });
      } else {
        console.log("User data document does not exist.");
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // Function to handle note save
  const handleNoteSave = async (id, newNote) => {
    try {
      const userQ = query(collection(db, "users"));
      const userQuerySnapshot = await getDocs(userQ);

      if (!userQuerySnapshot.empty) {
        const userData = userQuerySnapshot.docs[0].data();
        const userDocRef = userQuerySnapshot.docs[0].ref;

        // Initialize the questions array if it's not already initialized
        userData.questions = userData.questions || [];

        const questionIndex = userData.questions.findIndex((q) => q.id === id);

        if (questionIndex !== -1) {
          userData.questions[questionIndex].note = newNote;
        } else {
          // If the question does not exist in user data, create a new entry
          userData.questions.push({ id, status: false, note: newNote });
        }

        await setDoc(userDocRef, { questions: userData.questions });
      } else {
        console.log("User data document does not exist.");
      }
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  return (
    <div>
      <Typography variant='h4' align='center'>
        {topic}
      </Typography>
      <StyledTableContainer>
        <StyledTable aria-label='questions table'>
          <TableHead>
            <TableRow>
              <TableCell align='center'>Status</TableCell>
              <TableCell>Question</TableCell>
              <TableCell align='center'>Links</TableCell>
              <TableCell align='center'>Notes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <Box
                className='loading-container'
                display='flex'
                justifyContent='center'
                alignItems='center'
                height='50vh'
                width='100vw'
                overflow='hidden'
              >
                <Box className='loading-spinner'>
                  <ClimbingBoxLoader size={30} color='#eb1777' />
                </Box>
              </Box>
            ) : filteredData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align='center'>
                  No questions found for the selected topic.
                </TableCell>
              </TableRow>
            ) : (
              filteredData.map((item, index) => (
                <RowQues
                  key={item.id}
                  id={item.id}
                  serialNo={index + 1}
                  ques={item.problem}
                  url={item.URL}
                  note={item.note}
                  status={item.status}
                  onStatusChange={handleStatusChange}
                  onNoteSave={handleNoteSave} // Pass onNoteSave function
                />
              ))
            )}
          </TableBody>
        </StyledTable>
      </StyledTableContainer>
    </div>
  );
};

export default TableView;
