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
      "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn't get modified?",
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

// Codice prima pagina (welcome)
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
      alert('Per favore accetta i termini e poi premi il tasto "proceed".');
    }
  }
});

// Codice seconda pagina
let userAnswers = []; // Array per salvare le risposte dell'utente
let currentQuestionIndex = 0;
let timer = 60;  /* Durata del timer in secondi */
let elapsed = 0;  /* Tempo trascorso in millisecondi */
let timerInterval;
let progressInterval;
let score = 0;  /* Variabili per tenere traccia del punteggio */
let wrongAnswers = 0;  /* Variabili per tenere traccia delle risposte sbagliate */
const timeElement = document.getElementById('time');
const progressElement = document.getElementById('progress');
const questionContainers = document.querySelectorAll(".h3Answer");
const answerContainers = document.querySelectorAll(".conteinerAnswer");
const footerElement = document.getElementById('footerQuiz'); /* Elemento footer per il contatore */

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
  // Salva la risposta dell'utente nell'array
  userAnswers[currentQuestionIndex] = selectedAnswer;

  if (selectedAnswer === correctAnswer) {
    score++; /* Incrementa il punteggio per risposta corretta */
  } else {
    wrongAnswers++; /* Incrementa il conteggio delle risposte sbagliate */
  }

  /* Passa immediatamente alla prossima domanda senza ritardo */
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
  timer = 60;
  elapsed = 0;
  timeElement.textContent = timer;
  progressElement.style.background = "conic-gradient(#00FFFF 0deg, rgba(169, 169, 169, 0.3) 0deg)";
  clearInterval(progressInterval);
  clearInterval(timerInterval);
  progressInterval = setInterval(updateTimer, 50);
}

function startQuiz() {
  score = 0;
  wrongAnswers = 0;
  resetTimer();
  displayQuestion();
}

window.onload = startQuiz;

function displayFinalResults() {
  const correctAnswersCount = score;
  const wrongAnswersCount = wrongAnswers;
  const totalQuestions = questions.length;
  const correctPercentage = ((correctAnswersCount / totalQuestions) * 100).toFixed(2);

  document.body.innerHTML = ''; // Cancella il contenuto attuale

  const resultsContainer = document.createElement('div');
  resultsContainer.style.display = 'flex';
  resultsContainer.style.justifyContent = 'space-between';
  resultsContainer.style.alignItems = 'flex-start';
  resultsContainer.style.padding = '20px';

  // Contenitore della tabella
  const tableContainer = document.createElement('div');
  tableContainer.style.width = '60%';

  let tableHTML = `
    <h2>Riepilogo Risposte</h2>
    <p class="correct-answers">Risposte Corrette: ${correctAnswersCount} su ${totalQuestions}</p>
    <table border="1" style="width: 100%; text-align: center; border-collapse: collapse;">
      <thead>
        <tr>
          <th>Domanda</th>
          <th>Tua Risposta</th>
          <th>Risposta Corretta</th>
          <th>Esito</th>
        </tr>
      </thead>
      <tbody>
  `;

  questions.forEach((question, index) => {
    const userAnswer = userAnswers[index] || 'Nessuna risposta';
    const isCorrect = userAnswer === question.correct_answer;
    tableHTML += `
      <tr>
        <td>${question.question}</td>
        <td>${userAnswer}</td>
        <td>${question.correct_answer}</td>
        <td style="color: ${isCorrect ? 'green' : 'red'};">
          ${isCorrect ? '✔️' : '❌'}
        </td>
      </tr>
    `;
  });

  tableHTML += '</tbody></table>';
  tableContainer.innerHTML = tableHTML;

  // Contenitore del grafico
  const chartContainer = document.createElement('div');
  chartContainer.style.width = '35%';
  chartContainer.innerHTML = `
    <h2>Grafico Risposte</h2>
    <canvas id="resultsChart"></canvas>
  `;

  // Aggiungere il messaggio di percentuale e risultato sotto al grafico
  const resultSummary = document.createElement('div');
  resultSummary.style.textAlign = 'center';
  resultSummary.style.marginTop = '20px';

  const resultText = correctPercentage >= 80 ? 'Esame Superato 🎉' : 'Esame Non Superato ❌';
  resultSummary.innerHTML = `
  <p class="correct-answers">Risposte Corrette: ${correctAnswersCount} su ${totalQuestions}</p>
  <p class="correct-percentage">Percentuale Risposte Corrette: ${correctPercentage}%</p>
  <p class="result-message ${correctPercentage >= 80 ? 'pass' : 'fail'}">
    ${resultText}
  </p>
`;

  // Aggiungere i contenitori alla pagina
  chartContainer.appendChild(resultSummary);
  resultsContainer.appendChild(tableContainer);
  resultsContainer.appendChild(chartContainer);
  document.body.appendChild(resultsContainer);

  // Creazione del grafico a torta
  const ctx = document.getElementById('resultsChart').getContext('2d');
  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Risposte Corrette', 'Risposte Sbagliate'],
      datasets: [{
        data: [correctAnswersCount, wrongAnswersCount],
        backgroundColor: ['#00FF00', '#FF0000']
      }]
    },
    options: {
      plugins: {
        legend: {
          position: 'top',
          labels: { font: { size: 14 } }
        }
      }
    }
  });
}
