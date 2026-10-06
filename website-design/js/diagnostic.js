/* ============================================================
   OPS DETOX™ — demo diagnostic

   A working, front-end-only version of the OPS Detox Diagnostic™:
   seven statements (one per module), a 1–5 scale, a module-level
   score profile and the two biggest friction points named.

   The questions below are PLACEHOLDERS written to demonstrate the
   flow. Final wording and scoring come from the real diagnostic
   tool once the platform is chosen (Typeform / Scoreapp / custom).
   ============================================================ */
(function () {
  'use strict';

  var shell = document.getElementById('diagnostic');
  if (!shell) return;

  var QUESTIONS = [
    { module: 'Meetings',              text: 'Our meetings end in a decision, with a clear owner and a date.' },
    { module: 'Decisions',             text: 'Decisions are made at the level where the work happens, not escalated upward.' },
    { module: 'Communication',         text: 'Information reaches the people who need it without rework or chasing.' },
    { module: 'Reporting',             text: 'The reports we produce are actually read and lead to decisions.' },
    { module: 'Tool stack',            text: 'Our tools work together, and every one of them has a clear purpose.' },
    { module: 'Psychological Safety',  text: 'People say the uncomfortable thing out loud, early, while it is still cheap to fix.' },
    { module: 'Ownership',             text: 'Every recurring process has one named owner who can act without permission.' }
  ];

  var SCALE = [
    { value: 1, label: 'Never' },
    { value: 2, label: 'Rarely' },
    { value: 3, label: 'Sometimes' },
    { value: 4, label: 'Often' },
    { value: 5, label: 'Always' }
  ];

  var form = shell.querySelector('.diag-form');
  var result = shell.querySelector('.diag-result');
  var progress = shell.querySelector('.diag-progress i');
  var stepEl = shell.querySelector('.diag-step');
  var questionEl = shell.querySelector('.diag-question');
  var scaleEl = shell.querySelector('.diag-scale');
  var backBtn = shell.querySelector('.diag-back');
  var restartBtn = shell.querySelector('.diag-restart');

  var answers = [];
  var index = 0;

  /* ---------- Build the 1–5 scale once ---------- */
  SCALE.forEach(function (option) {
    var button = document.createElement('button');
    button.type = 'button';
    button.dataset.value = option.value;
    button.innerHTML = '<strong>' + option.value + '</strong><small>' + option.label + '</small>';
    button.addEventListener('click', function () { answer(option.value); });
    scaleEl.appendChild(button);
  });

  var scaleButtons = scaleEl.querySelectorAll('button');

  function render() {
    var question = QUESTIONS[index];
    stepEl.textContent = 'Question ' + (index + 1) + ' of ' + QUESTIONS.length + ' · ' + question.module + ' Detox';
    questionEl.textContent = question.text;
    progress.style.width = (index / QUESTIONS.length * 100) + '%';
    backBtn.hidden = index === 0;

    scaleButtons.forEach(function (button) {
      button.classList.toggle('is-selected', Number(button.dataset.value) === answers[index]);
    });
  }

  function answer(value) {
    answers[index] = value;

    if (index < QUESTIONS.length - 1) {
      index++;
      render();
    } else {
      finish();
    }
  }

  function finish() {
    progress.style.width = '100%';
    form.hidden = true;
    result.classList.add('is-visible');

    // Friction = the inverse of the score. 5/5 means no friction.
    var total = answers.reduce(function (sum, value) { return sum + value; }, 0);
    var clarity = Math.round(total / (QUESTIONS.length * 5) * 100);

    result.querySelector('.diag-score').textContent = clarity + '%';
    result.querySelector('.diag-verdict').textContent =
      clarity >= 75 ? 'Largely clean. A targeted detox on one or two modules will do.'
      : clarity >= 50 ? 'Moderate operational clutter. A full cleanse has clear room to work.'
      : 'Heavy operational clutter. This is where OPS Detox returns the most time.';

    var bars = result.querySelector('.diag-bars');
    bars.innerHTML = '';

    QUESTIONS.forEach(function (question, i) {
      var score = Math.round(answers[i] / 5 * 100);
      var row = document.createElement('div');
      row.innerHTML =
        '<span>' + question.module + ' Detox</span>' +
        '<i style="width:' + score + '%"></i>' +
        '<b>' + score + '%</b>';
      bars.appendChild(row);
    });

    // Name the two weakest modules — the diagnostic's core output.
    var weakest = QUESTIONS
      .map(function (question, i) { return { module: question.module, score: answers[i] }; })
      .sort(function (a, b) { return a.score - b.score; })
      .slice(0, 2)
      .map(function (item) { return item.module + ' Detox'; });

    result.querySelector('.diag-friction').textContent = weakest.join(' · ');
    result.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  backBtn.addEventListener('click', function () {
    if (index > 0) { index--; render(); }
  });

  restartBtn.addEventListener('click', function () {
    answers = [];
    index = 0;
    form.hidden = false;
    result.classList.remove('is-visible');
    render();
    shell.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  render();
})();
