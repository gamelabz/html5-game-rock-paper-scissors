(() => {
  'use strict';

  const canvas = document.getElementById('game');
  const ctx = canvas.getContext('2d');
  const messageEl = document.getElementById('message');
  const winsEl = document.getElementById('wins');
  const lossesEl = document.getElementById('losses');
  const drawsEl = document.getElementById('draws');

  const W = canvas.width, H = canvas.height;
  const EMOJI = { rock: '✊', paper: '✋', scissors: '✌️' };
  const BEAT = { rock: 'scissors', paper: 'rock', scissors: 'paper' };

  let wins = 0, losses = 0, draws = 0;
  let you = null, ai = null, result = '', anim = 0;

  function play(h) {
    you = h;
    const opts = ['rock', 'paper', 'scissors'];
    ai = opts[Math.floor(Math.random() * 3)];
    if (you === ai) { result = 'Draw!'; draws++; }
    else if (BEAT[you] === ai) { result = 'You win! 🎉'; wins++; }
    else { result = 'AI wins!'; losses++; }
    winsEl.textContent = String(wins);
    lossesEl.textContent = String(losses);
    drawsEl.textContent = String(draws);
    messageEl.textContent = `${EMOJI[you]} vs ${EMOJI[ai]} — ${result}`;
    anim = 1;
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    const g = ctx.createLinearGradient(0, 0, W, H);
    g.addColorStop(0, '#141a3a'); g.addColorStop(1, '#0a0c1d');
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);

    let scale = 1;
    if (anim > 0) { anim -= 0.04; scale = 1 + anim * 0.25; }

    const size = 70 * scale;
    ctx.font = `${size}px system-ui`;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillStyle = '#4cc9f0';
    ctx.fillText(you ? EMOJI[you] : '❔', W * 0.28, H / 2);
    ctx.fillStyle = '#ff9e3d';
    ctx.fillText(ai ? EMOJI[ai] : '❔', W * 0.72, H / 2);

    ctx.fillStyle = '#9aa0c3';
    ctx.font = '600 24px system-ui';
    ctx.fillText('YOU', W * 0.28, H - 16);
    ctx.fillText('AI', W * 0.72, H - 16);
    requestAnimationFrame(draw);
  }

  document.querySelectorAll('.hand').forEach(b =>
    b.addEventListener('click', () => play(b.dataset.h)));
  draw();
})();
