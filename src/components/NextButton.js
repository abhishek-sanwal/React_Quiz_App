function NextButton({ index, selectedAnswer, dispatch, numQuestions }) {
  if (selectedAnswer === null) return;

  const isLastQuestion = index === numQuestions - 1;
  return (
    <button
      className="btn btn-ui"
      onClick={() =>
        isLastQuestion
          ? dispatch({ type: "finish" })
          : dispatch({
              type: "nextQuestion",
            })
      }
    >
      {isLastQuestion ? "finish Quiz" : "Next Question"}
    </button>
  );
}

export default NextButton;
