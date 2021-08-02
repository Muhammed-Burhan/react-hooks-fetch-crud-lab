import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";
function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then((question) => {
        setQuestions(question);
      });
  }, []);
  const handleDelte = (id) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "delete",
    })
      .then((r) => r.json())
      .then(() => {
        const updateQuestions = questions.filter((question) => {
          return question.id !== id;
        });
        setQuestions(updateQuestions);
      });
  };
  const questionItem = questions.map((question) => {
    return (
      <QuestionItem
        key={question.id}
        question={question}
        deleteIt={handleDelte}
        onAnswerIt={handleAnswerChange}
      />
    );
  });

  function handleAnswerChange(id, correctIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex }),
    })
      .then((r) => r.json())
      .then((updatedQuestion) => {
        const updatedQuestions = questions.map((q) => {
          if (q.id === updatedQuestion.id) return updatedQuestion;
          return q;
        });
        setQuestions(updatedQuestions);
      });
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionItem}</ul>
    </section>
  );
}

export default QuestionList;
