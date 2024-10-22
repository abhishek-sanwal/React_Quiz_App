import Options from "./Options";
function Question({ question, selectedAnswer, dispatch }) {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options
        selectedAnswer={selectedAnswer}
        question={question}
        dispatch={dispatch}
      />
    </div>
  );
}

export default Question;
