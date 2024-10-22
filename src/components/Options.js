function Options({ question, selectedAnswer, dispatch }) {
  const hasAnswered = selectedAnswer !== null;
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option ${
            index === selectedAnswer ? "answer " : " "
          } ${
            hasAnswered
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          disabled={hasAnswered}
          key={option.id}
          onClick={() => dispatch({ type: "setUserAnswer", payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
