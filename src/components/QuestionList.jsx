import React, { useState, useEffect } from 'react';




import React, { useContext, useEffect, useState } from 'react';
import { FirebaseContext } from './FirebaseContext'; 
import { collection, getDocs } from 'firebase/firestore';

function QuestionList() {
  const { data } = useContext(FirebaseContext);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const db = getFirestore(); 
      const questionsCol = collection(db, 'question'); 
      const questionSnapshot = await getDocs(questionsCol);
      const questionList = questionSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setQuestions(questionList);
    };

    fetchQuestions();
  }, []);

  return (
    <div>
      <h1>Question List</h1>
      <ul>
        {questions.map((question) => (
          <li key={question.question}>
            {question.answer}
            {question.wrong1} 
            {question.wrong2}
            {question.wrong3}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QuestionList;
