import { useEffect, useReducer } from "react";

import Error from "./Error";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Header from "./Header";
import Loader from "./Loader";
import Main from "./Main";
import NextButton from "./NextButton";
import Progress from "./Progress";
import Question from "./Question";
import Reset from "./Reset";
import StartScreen from "./StartScreen";
import Timer from "./Timer";

const SECS_PER_QUESTION = 30;
const initialState = {
  questions: [],

  // Loading, ready, error, active, finished
  status: "loading",
  index: 0,
  selectedAnswer: null,
  points: 0,
  highScore: 0,
  secondsRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived": {
      return { ...state, questions: action.payload, status: "ready" };
    }

    case "dataFailed": {
      return { ...state, status: "error" };
    }
    case "start": {
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    }
    case "setUserAnswer": {
      const question = state.questions[state.index];
      return {
        ...state,
        selectedAnswer: action.payload,
        points:
          question.correctOption === action.payload
            ? state.points + question.points
            : state.points,
      };
    }

    case "nextQuestion": {
      return { ...state, index: state.index + 1, selectedAnswer: null };
    }

    case "finish": {
      return {
        ...state,
        status: "finish",
        highScore: Math.max(state.highScore, state.points),
      };
    }

    case "restart": {
      return { ...initialState, questions: state.questions, status: "ready" };
    }

    case "tick": {
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    }

    default: {
      throw new Error("Invalid Action occurred!!");
    }
  }
}

function App() {
  const [
    {
      questions,
      status,
      index,
      selectedAnswer,
      points,
      highScore,
      secondsRemaining,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  // Derived State
  const numQuestions = questions.length;
  const maxPoints = questions.reduce((prev, curr) => prev + curr.points, 0);
  useEffect(
    () => async () => {
      try {
        // json-server should be setup before making this call.
        const response = await fetch("http://localhost:9000/questions");
        const data = await response.json();

        console.log(data);

        dispatch({ type: "dataReceived", payload: data });
      } catch (error) {
        dispatch({ type: "dataFailed" });
      }
    },
    []
  );

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen dispatch={dispatch} numQuestions={numQuestions} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPoints={maxPoints}
              selectedAnswer={selectedAnswer}
            />
            <Question
              question={questions[index]}
              selectedAnswer={selectedAnswer}
              dispatch={dispatch}
            />
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton
                index={index}
                selectedAnswer={selectedAnswer}
                dispatch={dispatch}
                numQuestions={numQuestions}
              />
            </Footer>
          </>
        )}
        {status === "finish" && (
          <>
            <FinishScreen
              points={points}
              maxPoints={maxPoints}
              highScore={highScore}
            />
            <Reset dispatch={dispatch} />
          </>
        )}
      </Main>
    </div>
  );
}

export default App;
