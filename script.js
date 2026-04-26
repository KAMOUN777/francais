'use strict';

// ── NAVBAR SCROLL ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.style.background = window.scrollY > 40
    ? 'rgba(10,22,40,0.98)'
    : 'rgba(10,22,40,0.92)';
});

// ── BURGER MENU ──
const burger = document.getElementById('burger');
const navLinks = document.querySelector('.nav-links');
burger.addEventListener('click', () => {
  navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
  navLinks.style.flexDirection = 'column';
  navLinks.style.position = 'absolute';
  navLinks.style.top = '64px';
  navLinks.style.right = '1.5rem';
  navLinks.style.background = 'rgba(10,22,40,0.98)';
  navLinks.style.padding = '1rem 1.5rem';
  navLinks.style.borderRadius = '8px';
  navLinks.style.border = '1px solid rgba(0,180,216,0.2)';
});

// ── QUIZ DATA ──
const questions = [
  {
    q: "Combien d'années faut-il pour qu'une bouteille plastique se décompose en mer ?",
    answers: ["50 ans", "100 ans", "450 ans", "1 000 ans"],
    correct: 2,
    explanation: "Une bouteille plastique met 450 ans à se décomposer dans l'océan. Une lancée aujourd'hui se décomposera en 2476."
  },
  {
    q: "Combien de tonnes de plastique entrent dans les mers chaque année ?",
    answers: ["1 million", "4 millions", "8 millions", "20 millions"],
    correct: 2,
    explanation: "8 millions de tonnes de plastique entrent dans les océans chaque année. C'est comme vider un camion poubelle dans la mer toutes les minutes."
  },
  {
    q: "Que signifie 'TUDERT' en langue amazighe ?",
    answers: ["Mer", "Vie", "Soleil", "Espoir"],
    correct: 1,
    explanation: "TUDERT signifie 'Vie' en amazigh. Le nom de l'agence reflète sa mission : protéger la vie marine et naturelle."
  },
  {
    q: "Qu'est-ce qu'un USV ?",
    answers: [
      "Un sous-marin télécommandé",
      "Un bateau autonome de surface (Unmanned Surface Vehicle)",
      "Un robot sous-marin",
      "Un drone aérien maritime"
    ],
    correct: 1,
    explanation: "USV = Unmanned Surface Vehicle — un véhicule de surface qui navigue de manière autonome, sans pilote ni équipage."
  },
  {
    q: "Quelle est la capacité de collecte de Marinex par cycle ?",
    answers: ["10 kg", "15 kg", "25 kg", "50 kg"],
    correct: 2,
    explanation: "Marinex collecte 25 kg de déchets par cycle, soit l'équivalent d'environ 1 500 bouteilles plastiques."
  },
  {
    q: "Combien d'heures d'autonomie offre la batterie de Marinex ?",
    answers: ["4 heures", "6 heures", "8 heures", "12 heures"],
    correct: 2,
    explanation: "Marinex dispose de 8 heures d'autonomie continue. Une fois la batterie faible, il rentre seul à sa station, se recharge et repart."
  },
  {
    q: "Pourquoi le maillage du filet est-il de 15 mm précisément ?",
    answers: [
      "Pour aller plus vite dans l'eau",
      "Pour capturer uniquement les gros déchets",
      "Pour capturer les micro-plastiques tout en laissant passer la faune marine",
      "C'est une norme internationale obligatoire"
    ],
    correct: 2,
    explanation: "15 mm est la taille minimale pour capturer les micro-plastiques dangereux sans piéger les larves de poissons ni perturber l'écosystème marin."
  },
  {
    q: "Jusqu'à quelle force Beaufort Marinex peut-il opérer ?",
    answers: ["Force 2", "Force 3", "Force 5", "Force 7"],
    correct: 2,
    explanation: "Marinex est opérationnel jusqu'à la force 5 Beaufort, soit des vagues de 2 mètres. C'est précisément quand la pollution est la plus active."
  },
  {
    q: "Quel est le prix de vente d'une unité Marinex ?",
    answers: ["8 500 TND", "12 000 TND", "18 500 TND", "25 000 TND"],
    correct: 2,
    explanation: "18 500 TND (~5 500 €) pour une unité. C'est inférieur aux équivalents internationaux comme le WasteShark qui coûte ~8 000 €."
  },
  {
    q: "Combien de kilomètres de côtes la Tunisie possède-t-elle ?",
    answers: ["500 km", "900 km", "1 300 km", "2 000 km"],
    correct: 2,
    explanation: "La Tunisie possède plus de 1 300 km de côtes — des richesses naturelles uniques directement menacées par la pollution plastique."
  }
];

// ── QUIZ STATE ──
let currentQ = 0;
let score = 0;
let userAnswers = [];
let answered = false;

// ── QUIZ ELEMENTS ──
const startBtn = document.getElementById('startQuiz');
const restartBtn = document.getElementById('restartQuiz');
const nextBtn = document.getElementById('nextBtn');
const quizStart = document.getElementById('quiz-start');
const quizGame = document.getElementById('quiz-game');
const quizResult = document.getElementById('quiz-result');
const qNum = document.getElementById('qNum');
const scoreEl = document.getElementById('score');
const questionText = document.getElementById('questionText');
const answersDiv = document.getElementById('answers');
const feedbackBox = document.getElementById('feedback-box');
const feedbackText = document.getElementById('feedback-text');
const progressBar = document.getElementById('progressBar');
const finalScore = document.getElementById('finalScore');
const finalMsg = document.getElementById('finalMsg');
const resultDetails = document.getElementById('result-details');

function startQuiz() {
  currentQ = 0;
  score = 0;
  userAnswers = [];
  answered = false;
  quizStart.classList.add('hidden');
  quizResult.classList.add('hidden');
  quizGame.classList.remove('hidden');
  loadQuestion();
}

function loadQuestion() {
  answered = false;
  feedbackBox.classList.add('hidden');
  const q = questions[currentQ];
  qNum.textContent = currentQ + 1;
  scoreEl.textContent = score;
  progressBar.style.width = `${(currentQ / questions.length) * 100}%`;
  questionText.textContent = q.q;
  answersDiv.innerHTML = '';
  q.answers.forEach((ans, i) => {
    const btn = document.createElement('button');
    btn.className = 'answer-btn';
    btn.textContent = ans;
    btn.addEventListener('click', () => selectAnswer(i));
    answersDiv.appendChild(btn);
  });
}

function selectAnswer(idx) {
  if (answered) return;
  answered = true;
  const q = questions[currentQ];
  const btns = answersDiv.querySelectorAll('.answer-btn');

  btns.forEach(btn => btn.disabled = true);

  if (idx === q.correct) {
    btns[idx].classList.add('correct');
    score++;
    scoreEl.textContent = score;
    feedbackText.innerHTML = `✅ <strong>Correct !</strong> ${q.explanation}`;
  } else {
    btns[idx].classList.add('wrong');
    btns[q.correct].classList.add('correct');
    feedbackText.innerHTML = `❌ <strong>Pas tout à fait.</strong> ${q.explanation}`;
  }

  userAnswers.push({ q: q.q, userIdx: idx, correctIdx: q.correct, correct: idx === q.correct });
  feedbackBox.classList.remove('hidden');

  nextBtn.textContent = currentQ === questions.length - 1
    ? 'Voir mes résultats →'
    : 'Question suivante →';
}

function nextQuestion() {
  currentQ++;
  if (currentQ >= questions.length) {
    showResult();
  } else {
    loadQuestion();
  }
}

function showResult() {
  quizGame.classList.add('hidden');
  quizResult.classList.remove('hidden');
  progressBar.style.width = '100%';

  const pct = Math.round((score / questions.length) * 100);
  finalScore.textContent = `${score} / ${questions.length}`;

  let msg;
  if (pct === 100) msg = "🏆 Parfait ! Tu connais Marinex mieux que Marinex lui-même.";
  else if (pct >= 80) msg = "🎯 Excellent ! Tu es prêt pour la présentation.";
  else if (pct >= 60) msg = "👍 Bien ! Quelques révisions et tu seras au top.";
  else if (pct >= 40) msg = "📚 Pas mal. Relis la fiche technique et retente.";
  else msg = "🌊 La mer n'attend pas — il faut réviser !";
  finalMsg.textContent = msg;

  resultDetails.innerHTML = userAnswers.map(a => `
    <div class="rd-item">
      <span class="rd-icon">${a.correct ? '✅' : '❌'}</span>
      <span>${a.q}</span>
    </div>
  `).join('');
}

// ── EVENT LISTENERS ──
startBtn.addEventListener('click', startQuiz);
restartBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', nextQuestion);

// ── SMOOTH SCROLL ACTIVE NAV ──
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 100) current = s.id;
  });
  navAnchors.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current
      ? 'var(--cyan)'
      : '';
  });
}, { passive: true });
