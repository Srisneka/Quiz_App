const timerElement = document.getElementById('timer');
const scoreElement = document.getElementById('score');
const questionNumberElement = document.getElementById('question-number');
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const submitButton = document.getElementById('submit-btn');
const feedbackElement = document.getElementById('feedback');

let currentQuestionIndex = 0;
let score = 0;
let timer = 220; 
let timerInterval;

const quizData = [
    {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        answer: "4"
    },
    {
        question: "What is the capital of France?",
        options: ["London", "Paris", "Berlin", "Rome"],
        answer: "Paris"
    },
    {
        question: "What is the largest planet in our solar system?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        answer: "Jupiter"
    },
    {
        question: "What is the powerhouse of the cell?",
        options: ["Nucleus", "Ribosome", "Mitochondrion", "Golgi Apparatus"],
        answer: "Mitochondrion"
    },
    {
        question: "What is the chemical symbol for water?",
        options: ["H2O", "CO2", "N2", "O2"],
        answer: "H2O"
    },
    {
        question: "Who wrote 'To Kill a Mockingbird'?",
        options: ["Harper Lee", "Mark Twain", "William Shakespeare", "J.K. Rowling"],
        answer: "Harper Lee"
    },
    {
        question: "What is the top speed of a cheetah?",
        options: ["50 mph", "60 mph", "70 mph", "80 mph"],
        answer: "70 mph"
    },
    {
        question: "Which element has the chemical symbol 'Fe'?",
        options: ["Iron", "Gold", "Silver", "Copper"],
        answer: "Iron"
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Michelangelo"],
        answer: "Leonardo da Vinci"
    },
    {
        question: "What is the capital of Japan?",
        options: ["Tokyo", "Kyoto", "Osaka", "Seoul"],
        answer: "Tokyo"
    }
];

function displayQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    questionNumberElement.textContent = currentQuestionIndex + 1;
    questionElement.textContent = currentQuestion.question;
    optionsElement.innerHTML = "";
    currentQuestion.options.forEach((option, index) => {
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = 'option';
        input.value = option;
        const label = document.createElement('label');
        label.appendChild(input);
        label.appendChild(document.createTextNode(option));
        optionsElement.appendChild(label);
    });
}

function startTimer() {
    timerInterval = setInterval(() => {
        timer--;
        timerElement.textContent = timer;
        if (timer <= 0) {
            clearInterval(timerInterval);
            endQuiz();
        }
    }, 1000);
}

function endQuiz() {
    clearInterval(timerInterval);
    alert("Quiz Ended! Your score: " + score + "/10");
    score = 0;
    currentQuestionIndex = 0;
    timer = 220;
    scoreElement.textContent = score + "/10";
    feedbackElement.textContent = "";
    displayQuestion();
    startTimer();
}

function submitAnswer() {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (selectedOption) {
        const userAnswer = selectedOption.value;
        const correctAnswer = quizData[currentQuestionIndex].answer;
        
        if (userAnswer === correctAnswer) {
            score++;
            scoreElement.textContent = score + "/10";
            feedbackElement.textContent = "Your answer is correct!";
        } else {
            feedbackElement.textContent = "The correct answer is: " + correctAnswer;
        }
        selectedOption.checked = false;
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            displayQuestion();
        } else {
            endQuiz();
        }
    } else {
        alert("Please select an option.");
    }
}

submitButton.addEventListener('click', submitAnswer);

displayQuestion();
startTimer();
