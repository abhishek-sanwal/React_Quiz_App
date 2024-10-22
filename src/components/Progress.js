function Progress({ index, numQuestions, points, maxPoints, selectedAnswer }) {
  return (
    <header className="progress">
      <progress
        max={numQuestions}
        value={index + Number(selectedAnswer !== null)}
      ></progress>
      <p>
        Question<strong> {index + 1}</strong>/{numQuestions}
      </p>
      <p>
        <strong>{points}</strong>/{maxPoints}
      </p>
    </header>
  );
}

export default Progress;
