// ============= OPTIONS ============== //

const questions = [
  {
    q: 'Which of the following is NOT a JavaScript data type?',
    choices: ['String', 'Boolean', 'Float', 'Undefined'],
    correct: 'Float'
  },
  {
    q: 'Which method is used to select an element by its ID?',
    choices: ['getElementById()', 'querySelectorAll()', 'getElementsByClassName()', 'getById()'],
    correct: 'getElementById()'
  },
  {
    q: 'What will typeof NaN return in JavaScript?',
    choices: ['"number"', '"NaN"', '"undefined"', '"object"'],
    correct: '"number"'
  },
  {
    q: 'Which of the following is used to create a constant in JavaScript?',
    choices: ['var', 'let', 'const', 'constant'],
    correct: 'const'
  },
  {
    q: 'What does the === operator do in JavaScript?',
    choices: ['Compares values only', 'Compares both value and type', 'Assigns a value', 'Checks only data type'],
    correct: 'Compares both value and type'
  }
];

// ================ VARIABLES ================= //

const timer = document.getElementById('timer');
const question = document.getElementById('question');
const questionNumber = document.getElementById('questionNumber');
const options = document.getElementById('options');
const nextBtn = document.getElementById('nextBtn');
const resultBtn = document.getElementById('resultBtn');
const resultDisplay = document.getElementById('resultDisplay');

let currentQuestion = 0;
let score = 0;
let timeLeft = 30;
let timeInterval;
let selectedAnswer = null;

// =========== LOADING THE QUESTION ============= //

const loadQuestion = () => {
  
  clearInterval(timeInterval);
  timeLeft = 30;
  timer.textContent = timeLeft;
  selectedAnswer = null;

  const que = questions[currentQuestion];

  questionNumber.textContent = `Que ${currentQuestion + 1} of ${questions.length}`;
  question.textContent = que.q;


  options.innerHTML = '';
  que.choices.forEach((choice) => {
    const btn = document.createElement('button');
    btn.classList.add('btn', 'btn-outline-primary', 'mx-1');
    btn.textContent = choice;
    btn.onclick = () => {
      selectedAnswer = choice;

      Array.from(options.children).forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
    };
    options.appendChild(btn);
  });

  startTimer();
};

// ============== TIMER FUNCTION ============= //

const startTimer = () => {
  timeInterval = setInterval(() => {
    timeLeft--;
    timer.textContent = timeLeft;

    if (timeLeft === 0) {
      clearInterval(timeInterval);
      nextQuestion();
    }
  }, 1000);
};

// ============== NEXT QUESTION =============== //

const nextQuestion = () => {
  clearInterval(timeInterval);

  if (selectedAnswer === questions[currentQuestion].correct) {
    score++;
  }

  currentQuestion++;

  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    question.textContent = 'Quiz Finished';
    options.innerHTML = '';
    nextBtn.classList.add('d-none');
    resultBtn.classList.remove('d-none');
  }
};

// ============== SHOW RESULT ================= //

const showResult = () => {

  resultDisplay.textContent = `Your score: ${score} out of ${questions.length}`;
  resultBtn.classList.add('d-none');
  resultDisplay.classList.remove('d-none');
};

nextBtn.addEventListener('click', nextQuestion);
resultBtn.addEventListener('click', showResult);


loadQuestion();
