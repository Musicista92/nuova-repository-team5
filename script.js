    const questions = [
      {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question: "What does CPU stand for?",
        correct_answer: "Central Processing Unit",
        incorrect_answers: [
          "Central Process Unit",
          "Computer Personal Unit",
          "Central Processor Unit",
        ],
      },
      {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question:
          "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn&#039;t get modified?",
        correct_answer: "Final",
        incorrect_answers: ["Static", "Private", "Public"],
      },
      {
        category: "Science: Computers",
        type: "boolean",
        difficulty: "easy",
        question: "The logo for Snapchat is a Bell.",
        correct_answer: "False",
        incorrect_answers: ["True"],
      },
      {
        category: "Science: Computers",
        type: "boolean",
        difficulty: "easy",
        question:
          "Pointers were not used in the original C programming language; they were added later on in C++.",
        correct_answer: "False",
        incorrect_answers: ["True"],
      },
      {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question:
          "What is the most preferred image format used for logos in the Wikimedia database?",
        correct_answer: ".svg",
        incorrect_answers: [".png", ".jpeg", ".gif"],
      },
      {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question: "In web design, what does CSS stand for?",
        correct_answer: "Cascading Style Sheet",
        incorrect_answers: [
          "Counter Strike: Source",
          "Corrective Style Sheet",
          "Computer Style Sheet",
        ],
      },
      {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question:
          "What is the code name for the mobile operating system Android 7.0?",
        correct_answer: "Nougat",
        incorrect_answers: [
          "Ice Cream Sandwich",
          "Jelly Bean",
          "Marshmallow",
        ],
      },
      {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question: "On Twitter, what is the character limit for a Tweet?",
        correct_answer: "140",
        incorrect_answers: ["120", "160", "100"],
      },
      {
        category: "Science: Computers",
        type: "boolean",
        difficulty: "easy",
        question: "Linux was first created as an alternative to Windows XP.",
        correct_answer: "False",
        incorrect_answers: ["True"],
      },
      {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question:
          "Which programming language shares its name with an island in Indonesia?",
        correct_answer: "Java",
        incorrect_answers: ["Python", "C", "Jakarta"],
      },
    ];
//codice prima pagina(welcome)//
document.addEventListener('DOMContentLoaded', function() {
  const checkbox = document.getElementById('proceedCheckbox');
  const proceedButton = document.getElementById('proceedButton');


  proceedButton.addEventListener('click', function() {
    handleProceed(checkbox, 'next_page.html');
  });


  function handleProceed(checkboxElement, nextPageUrl) {
    if (checkboxElement.checked) {
      window.location.href = 'quizErisposte.html';
    } else {
      alert('per favore accetta i termini e poi premi il tasto "proceed".');
    }
  }
});
    

    
   
// codice seconda pagina//
let currentQuestionIndex = 0;
let timer = 60;  /* Durata del timer in secondi */
let elapsed = 0;  /* Tempo trascorso in millisecondi */
let timerInterval;
let progressInterval;
let score = 0;  /* Variabili per tenere traccia del punteggio*/
let wrongAnswers = 0;  /*Variabili per tenere traccia delle risposte sbagliate*/
const timeElement = document.getElementById('time');
const progressElement = document.getElementById('progress');
const questionContainers = document.querySelectorAll(".h3Answer");
const answerContainers = document.querySelectorAll(".conteinerAnswer");
const footerElement = document.getElementById('footerQuiz'); /*Elemento footer per il contatore*/
function updatefooterQuizCounter() {
    footerElement.innerHTML = "<p>QUESTION " + (currentQuestionIndex + 1) + " <span class='spanFooterCounter'>/ " + questions.length + "</span></p>";
}


function displayQuestion() {
    /* Nascondi tutte le domande e risposte*/
    questionContainers.forEach(question => question.classList.add('hidden'));
    answerContainers.forEach(container => container.classList.add('hidden'));

    /*Mostra la domanda corrente*/
    questionContainers[currentQuestionIndex].classList.remove('hidden');
    answerContainers[currentQuestionIndex].classList.remove('hidden');
    const currentQuestion = questions[currentQuestionIndex];
    const allAnswers = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer];
    /* Mescola le risposte*/
    allAnswers.sort(() => Math.random() - 0.5);
    /*Visualizza le risposte*/
    answerContainers[currentQuestionIndex].innerHTML = '';
    for (let i = 0; i < allAnswers.length; i++) {
        const button = document.createElement('input');
        button.type = "button";
        button.value = allAnswers[i];
        button.classList.add('inputButton');
        button.onclick = () => checkAnswer(allAnswers[i], currentQuestion.correct_answer);
        answerContainers[currentQuestionIndex].appendChild(button);
    }

    /* Riporta il timer a 60 secondi per ogni domanda*/
    resetTimer();

    /* Aggiorna il contatore delle domande nel footer*/
    updatefooterQuizCounter();
}

function checkAnswer(selectedAnswer, correctAnswer) {
    if (selectedAnswer === correctAnswer) {
        score++;  /* Incrementa il punteggio per risposta corretta*/
    } else {
        wrongAnswers++;  /* Incrementa il conteggio delle risposte sbagliate*/
    }
    /* Passa immediatamente alla prossima domanda senza ritardo*/
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
    } else {
        displayFinalResults();
    }
}

function updateTimer() {
    if (elapsed < 60000) {
        elapsed += 50;
        const progressPercentage = (elapsed / 60000) * 360;
        progressElement.style.background = `conic-gradient(#00FFFF ${progressPercentage}deg, rgba(169, 169, 169, 0.3) ${progressPercentage}deg)`; // Anima solo i bordi
        if (elapsed % 1000 === 0) {
            timer--;
            timeElement.textContent = timer; // Aggiorna solo il testo al centro
        }
    } else {
        clearInterval(progressInterval);
        clearInterval(timerInterval);
        wrongAnswers++; /* Se il tempo scade, considera la risposta come errata */
        /* Passa alla prossima domanda */
        setTimeout(() => {
            if (currentQuestionIndex < questions.length - 1) {
                currentQuestionIndex++;
                displayQuestion();
            } else {
                displayFinalResults();
            }
        }, 1000);
    }
}

function resetTimer() {
    /* Resetta i valori del timer e della barra */
    timer = 60;
    elapsed = 0;
    timeElement.textContent = timer;
    progressElement.style.background = "conic-gradient(#00FFFF 0deg, rgba(169, 169, 169, 0.3) 0deg)";
    /* Avvia gli intervalli per aggiornare barra e timer */
    clearInterval(progressInterval);
    clearInterval(timerInterval);
    progressInterval = setInterval(updateTimer, 50);
}

function startQuiz() {
    score = 0;  /* Reset del punteggio*/
    wrongAnswers = 0;  /*Reset delle risposte sbagliate*/
    resetTimer(); 
    displayQuestion();
}

window.onload = startQuiz;

   