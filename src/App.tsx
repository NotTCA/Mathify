import { useState } from "react";

export default function App() {
  function question(notThisOne?: any): {
    a: number;
    operation: string;
    b: number;
    answer: any;
  } {
    const a = Math.floor(Math.random() * 15) + 1;
    const b = Math.floor(Math.random() * 15) + 1;
    const operation = ["*", "+", "/", "-"][Math.floor(Math.random() * 4)];
    const answer = eval(a + operation + b);
    if (answer === notThisOne) return question(notThisOne);
    return {
      a,
      operation,
      b,
      answer,
    };
  }

  const [currentQuestion, setCurrentQuestion] = useState(question());
  const [lost, setLost] = useState(false);

  function handleSubmit(e: any) {
    e.preventDefault();
    checkAnswer(e.target[0].valueAsNumber, e.target[0]);
  }

  function handleKeyDown(e: any) {
    e.preventDefault();
    checkAnswer(e.currentTarget.valueAsNumber, e.currentTarget);
  }

  function checkAnswer(answerByUser: number, input: any) {
    const { answer } = currentQuestion;
    if (answerByUser === answer) {
      setCurrentQuestion(question(answer));
      setLost(false);
      input.value = "";
    } else setLost(true);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="h-screen flex flex-col justify-center items-center"
    >
      <h1 className="text-7xl font-bold">
        {currentQuestion.a} {currentQuestion.operation} {currentQuestion.b}
      </h1>
      <div className="p-3" />
      <input
        type="number"
        className={`outline outline-2 ${
          lost ? "outline-red-600" : "outline-black"
        } focus:outline-2 rounded-full text-center text-xl py-2 w-48`}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            setCurrentQuestion(question(currentQuestion.answer));
            setLost(false);
            e.currentTarget.value = "";
          }
          if (e.key === "Enter") handleKeyDown(e);
        }}
      />
      <div className="p-1" />
      <button
        type="submit"
        className="py-2 px-4 bg-black text-white rounded-full"
      >
        Submit
      </button>
    </form>
  );
}
