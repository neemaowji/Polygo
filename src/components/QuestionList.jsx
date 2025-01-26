

import { collection, getDocs } from 'firebase/firestore';
// import { Question } from '/firebase';
import { getFirestore } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
//import { FirebaseContext } from './FirebaseContext'; 

function QuestionList() {
  
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const db = getFirestore(); 
      const questionsCol = collection(db, 'Question'); 
      const questionSnapshot = await getDocs(questionsCol);
      const questionList = questionSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setQuestions(questionList);
    };

    fetchQuestions();
  }, []);
  console.log(questions)
  return (
    <div>
      {/* <h1>Question List</h1>
      <ul>
        {questions.map((question) => (
          <li key={question.question}>
            {question.answer}
            {question.wrong1} 
            {question.wrong2}
            {question.wrong3}
          </li>
        ))}
      </ul> */}
    </div>
  );

}

export default QuestionList;
