/*
Mini-Project: Interactive Quiz Application
Task: Build a complete quiz application with rich interactions
Requirements:
  - Multiple choice questions with click selection
  - Keyboard navigation (1-4 keys for answers)
  - Timer with automatic submission
  - Progress bar that updates on each answer
  - Form validation before submission
  - Results screen with score and review
(Starter structure from the presenter's notes: currentQuestion, selectedAnswers, timeLeft (300), isSubmitted, questions.)

NOTE: the starter notes suggest useEffect for the timer, but useEffect is only taught in lesson 5.1.
This lesson (4.4) and earlier only teach useState and event handlers, so the timer is started from the
"Start Quiz" click handler with setInterval instead.
*/
import { useState } from 'react';

function QuizApp() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [timerId, setTimerId] = useState(null);
  const [error, setError] = useState('');

  const questions = [
    {
      id: 1,
      question: "What is the capital of France?",
      options: ["London", "Berlin", "Paris", "Madrid"],
      correct: 2
    },
    {
      id: 2,
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      correct: 1
    },
    {
      id: 3,
      question: "How many days are there in a week?",
      options: ["5", "6", "7", "8"],
      correct: 2
    },
    {
      id: 4,
      question: "Which language is used to style web pages?",
      options: ["HTML", "CSS", "SQL", "Python"],
      correct: 1
    }
  ];

  const answeredCount = Object.keys(selectedAnswers).length;
  const progress = (answeredCount / questions.length) * 100;

  // Start the quiz and the countdown timer
  const handleStart = () => {
    setHasStarted(true);
    const startTime = Date.now();
    const id = setInterval(() => {
      const remaining = 300 - Math.floor((Date.now() - startTime) / 1000);
      if (remaining <= 0) {
        // Time is up: stop the timer and submit automatically
        clearInterval(id);
        setTimeLeft(0);
        setIsSubmitted(true);
      } else {
        setTimeLeft(remaining);
      }
    }, 1000);
    setTimerId(id);
  };

  const handleAnswerSelect = (questionIndex, optionIndex) => {
    setSelectedAnswers(prev => ({ ...prev, [questionIndex]: optionIndex }));
    setError('');
  };

  const handleKeyDown = (e) => {
    if (isSubmitted || !hasStarted) return;
    const number = Number(e.key);
    if (number >= 1 && number <= 4) {
      handleAnswerSelect(currentQuestion, number - 1);
    } else if (e.key === 'ArrowRight' && currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else if (e.key === 'ArrowLeft' && currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  // Validation: every question must be answered before submitting
  const handleSubmit = (e) => {
    e.preventDefault();
    if (answeredCount < questions.length) {
      setError(`Please answer all questions (${answeredCount}/${questions.length} answered).`);
      return;
    }
    clearInterval(timerId);
    setIsSubmitted(true);
  };

  const score = questions.filter((q, index) => selectedAnswers[index] === q.correct).length;

  const formatTime = (seconds) =>
    `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setTimeLeft(300);
    setIsSubmitted(false);
    setHasStarted(false);
    setTimerId(null);
    setError('');
  };

  if (!hasStarted) {
    return (
      <div>
        <h2>Interactive Quiz</h2>
        <p>{questions.length} questions, 5 minutes. Use the 1-4 keys or click to answer.</p>
        <button onClick={handleStart}>Start Quiz</button>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div>
        <h2>Results</h2>
        <h3>Score: {score} / {questions.length}</h3>
        {questions.map((q, index) => {
          const chosen = selectedAnswers[index];
          const isCorrect = chosen === q.correct;
          return (
            <div key={q.id} style={{ marginBottom: 12 }}>
              <strong>{index + 1}. {q.question}</strong>
              <div style={{ color: isCorrect ? 'green' : 'red' }}>
                Your answer: {chosen !== undefined ? q.options[chosen] : 'No answer'} {isCorrect ? '(correct)' : '(wrong)'}
              </div>
              {!isCorrect && <div>Correct answer: {q.options[q.correct]}</div>}
            </div>
          );
        })}
        <button onClick={handleRestart}>Try Again</button>
      </div>
    );
  }

  const q = questions[currentQuestion];

  return (
    <form onSubmit={handleSubmit} tabIndex={0} onKeyDown={handleKeyDown} style={{ outline: 'none' }} autoFocus>
      <h2>Interactive Quiz</h2>
      <p>Time left: {formatTime(timeLeft)}</p>

      <div style={{ background: '#ddd', height: 10, width: 300 }}>
        <div style={{ background: '#3498db', height: 10, width: `${progress}%` }} />
      </div>
      <p>{answeredCount} of {questions.length} answered</p>

      <h3>Question {currentQuestion + 1}: {q.question}</h3>
      {q.options.map((option, optionIndex) => (
        <div key={optionIndex}>
          <button
            type="button"
            onClick={() => handleAnswerSelect(currentQuestion, optionIndex)}
            style={{
              margin: '4px 0',
              background: selectedAnswers[currentQuestion] === optionIndex ? '#bde0fe' : undefined,
            }}
          >
            {optionIndex + 1}. {option}
          </button>
        </div>
      ))}

      <div style={{ marginTop: 12 }}>
        <button type="button" disabled={currentQuestion === 0} onClick={() => setCurrentQuestion(prev => prev - 1)}>
          Previous
        </button>
        <button type="button" disabled={currentQuestion === questions.length - 1} onClick={() => setCurrentQuestion(prev => prev + 1)}>
          Next
        </button>
        <button type="submit">Submit</button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}

export default QuizApp;
