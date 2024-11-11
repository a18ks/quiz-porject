const questions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        correctAnswer: "Paris",
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        correctAnswer: "Mars",
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        options: ["Shakespeare", "Dickens", "Austen", "Hemingway"],
        correctAnswer: "Shakespeare",
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        correctAnswer: "Pacific Ocean",
    },
    {
        question: "What is the square root of 64?",
        options: ["6", "7", "8", "9"],
        correctAnswer: "8",
    },
];

let currentQuestionIndex = 0;
let score = 0;
let timerInterval;
let timeLeft = 30;
let answered = false;

const questionContainer = document.getElementById("question-container");
const optionsContainer = document.getElementById("options");
const nextButton = document.getElementById("next-btn");
const resultContainer = document.getElementById("result");
const scoreDisplay = document.getElementById("score");
const totalQuestionsDisplay = document.getElementById("total-questions");
const retryButton = document.getElementById("retry-btn");
const timerDisplay = document.getElementById("time");

// Start Quiz
function startQuiz() {
    score = 0;
    currentQuestionIndex = 0;
    timeLeft = 30;
    answered = false;
    nextButton.style.display = "inline-block";
    resultContainer.classList.add("hidden");
    showQuestion();
    startTimer();
}

// Show a question
function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById("question").textContent = currentQuestion.question;

    optionsContainer.innerHTML = ""; // Clear previous options
    currentQuestion.options.forEach((option) => {
        const optionButton = document.createElement("button");
        optionButton.textContent = option;
        optionButton.classList.add("option-btn");
        optionButton.onclick = () => selectAnswer(option);
        optionsContainer.appendChild(optionButton);
    });
}

// Handle selecting an answer
function selectAnswer(selectedOption) {
    if (answered) return; // Prevent multiple answers

    answered = true;
    const correctAnswer = questions[currentQuestionIndex].correctAnswer;
    const optionButtons = optionsContainer.querySelectorAll("button");

    optionButtons.forEach((button) => {
        button.disabled = true;
        if (button.textContent === selectedOption) {
            button.classList.add(selectedOption === correctAnswer ? "selected" : "incorrect");
        }
        if (button.textContent === correctAnswer) {
            button.classList.add("correct");
        }
    });

    if (selectedOption === correctAnswer) {
        score++;
    }

    // Show "Next Question" button after answering
    nextButton.style.display = "inline-block";
}

// Handle timer
function startTimer() {
    timerInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            timerDisplay.textContent = timeLeft;
        } else {
            clearInterval(timerInterval);
            nextButton.style.display = "inline-block";
        }
    }, 1000);
}

// Move to next question
nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        answered = false;
        nextButton.style.display = "none";
        showQuestion();
        resetOptions();
    } else {
        endQuiz();
    }
});

// Reset options for next question
function resetOptions() {
    const optionButtons = optionsContainer.querySelectorAll("button");
    optionButtons.forEach((button) => {
        button.disabled = false;
        button.classList.remove("selected", "correct", "incorrect");
    });
}

// End the quiz
function endQuiz() {
    clearInterval(timerInterval);
    resultContainer.classList.remove("hidden");
    scoreDisplay.textContent = score;
    totalQuestionsDisplay.textContent = questions.length;
    nextButton.style.display = "none";
}

// Retry the quiz
retryButton.addEventListener("click", () => {
    startQuiz();
});

// Start the quiz when the page loads
startQuiz();
