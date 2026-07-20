import { aStarSteps, type Cell, type Grid, type AStarFrame } from './astar';

type Mode = 'wall' | 'start' | 'goal' | 'erase';

const COLS = 32;
const ROWS = 16;

const COLOR = {
  bg: '#0b0d10',
  grid: '#1c2027',
  wall: '#2a3038',
  wallBorder: '#3a4150',
  open: 'rgba(79, 209, 224, 0.28)',
  closed: 'rgba(94, 104, 120, 0.28)',
  current: '#f2a93c',
  start: '#4fd1e0',
  goal: '#f2a93c',
  path: '#4fd1e0',
};

export function initPlanningDemo(root: HTMLElement) {
  const canvas = root.querySelector('canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d')!;
  const modeButtons = root.querySelectorAll<HTMLButtonElement>('[data-mode]');
  const runBtn = root.querySelector<HTMLButtonElement>('[data-action="run"]')!;
  const clearBtn = root.querySelector<HTMLButtonElement>('[data-action="clear"]')!;
  const randomBtn = root.querySelector<HTMLButtonElement>('[data-action="random"]')!;
  const statusEl = root.querySelector<HTMLElement>('[data-status]')!;

  let grid: Grid = makeGrid();
  let start: Cell = { row: 2, col: 2 };
  let goal: Cell = { row: ROWS - 3, col: COLS - 3 };
  let mode: Mode = 'wall';
  let isPointerDown = false;
  let cellSize = 20;

  let currentFrame: AStarFrame | null = null;
  let animId = 0;
  let running = false;

  function makeGrid(): Grid {
    return Array.from({ length: ROWS }, () => Array.from({ length: COLS }, () => true));
  }

  function scatterObstacles() {
    grid = makeGrid();
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        if (isStartOrGoal({ row, col })) continue;
        if (Math.random() < 0.22) grid[row][col] = false;
      }
    }
  }

  function isStartOrGoal(c: Cell) {
    return (c.row === start.row && c.col === start.col) || (c.row === goal.row && c.col === goal.col);
  }

  function resize() {
    const width = root.clientWidth;
    cellSize = Math.floor(width / COLS);
    const dpr = window.devicePixelRatio || 1;
    canvas.width = COLS * cellSize * dpr;
    canvas.height = ROWS * cellSize * dpr;
    canvas.style.width = `${COLS * cellSize}px`;
    canvas.style.height = `${ROWS * cellSize}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    draw();
  }

  function cellFromEvent(e: PointerEvent): Cell | null {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const col = Math.floor(x / cellSize);
    const row = Math.floor(y / cellSize);
    if (row < 0 || row >= ROWS || col < 0 || col >= COLS) return null;
    return { row, col };
  }

  function applyMode(cell: Cell) {
    if (mode === 'start') {
      grid[cell.row][cell.col] = true; // never let start land inside a wall
      start = cell;
    } else if (mode === 'goal') {
      grid[cell.row][cell.col] = true; // never let goal land inside a wall
      goal = cell;
    } else if (mode === 'wall') {
      if (!isStartOrGoal(cell)) grid[cell.row][cell.col] = false;
    } else if (mode === 'erase') {
      if (!isStartOrGoal(cell)) grid[cell.row][cell.col] = true;
    }
    currentFrame = null;
    draw();
  }

  canvas.addEventListener('pointerdown', (e) => {
    isPointerDown = true;
    const cell = cellFromEvent(e);
    if (cell) applyMode(cell);
  });
  window.addEventListener('pointerup', () => (isPointerDown = false));
  canvas.addEventListener('pointermove', (e) => {
    if (!isPointerDown || mode === 'start' || mode === 'goal') return;
    const cell = cellFromEvent(e);
    if (cell) applyMode(cell);
  });

  modeButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      mode = btn.dataset.mode as Mode;
      modeButtons.forEach((b) => b.classList.toggle('is-active', b === btn));
    });
  });

  clearBtn.addEventListener('click', () => {
    stop();
    grid = makeGrid();
    currentFrame = null;
    statusEl.textContent = 'grid cleared';
    draw();
  });

  randomBtn.addEventListener('click', () => {
    stop();
    scatterObstacles();
    currentFrame = null;
    statusEl.textContent = 'obstacles randomized';
    draw();
  });

  runBtn.addEventListener('click', () => run());

  function stop() {
    running = false;
    cancelAnimationFrame(animId);
  }

  function run() {
    stop();
    running = true;
    const gen = aStarSteps(grid, start, goal);
    let lastStep = 0;
    const stepEveryMs = 12;

    function tick(t: number) {
      if (!running) return;
      if (t - lastStep > stepEveryMs) {
        lastStep = t;
        const next = gen.next();
        if (next.done) {
          running = false;
          return;
        }
        currentFrame = next.value;
        draw();
        if (currentFrame.path) {
          running = false;
          statusEl.textContent = currentFrame.path.length
            ? `path found — ${currentFrame.path.length} cells, ${currentFrame.closed.length} expanded`
            : 'no path exists between start and goal';
          return;
        }
      }
      animId = requestAnimationFrame(tick);
    }

    statusEl.textContent = 'searching…';
    animId = requestAnimationFrame(tick);
  }

  function draw() {
    ctx.fillStyle = COLOR.bg;
    ctx.fillRect(0, 0, COLS * cellSize, ROWS * cellSize);

    // grid lines
    ctx.strokeStyle = COLOR.grid;
    ctx.lineWidth = 1;
    for (let c = 0; c <= COLS; c++) {
      ctx.beginPath();
      ctx.moveTo(c * cellSize, 0);
      ctx.lineTo(c * cellSize, ROWS * cellSize);
      ctx.stroke();
    }
    for (let r = 0; r <= ROWS; r++) {
      ctx.beginPath();
      ctx.moveTo(0, r * cellSize);
      ctx.lineTo(COLS * cellSize, r * cellSize);
      ctx.stroke();
    }

    // obstacles
    ctx.fillStyle = COLOR.wall;
    ctx.strokeStyle = COLOR.wallBorder;
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        if (!grid[row][col]) {
          fillCell({ row, col }, COLOR.wall);
        }
      }
    }

    if (currentFrame) {
      currentFrame.closed.forEach((c) => fillCell(c, COLOR.closed));
      currentFrame.open.forEach((c) => fillCell(c, COLOR.open));
      if (currentFrame.current) fillCell(currentFrame.current, COLOR.current);
      if (currentFrame.path && currentFrame.path.length) drawPath(currentFrame.path);
    }

    fillCell(start, COLOR.start, true);
    fillCell(goal, COLOR.goal, true);
  }

  function fillCell(cell: Cell, color: string, ring = false) {
    const x = cell.col * cellSize;
    const y = cell.row * cellSize;
    ctx.fillStyle = color;
    ctx.fillRect(x + 1, y + 1, cellSize - 2, cellSize - 2);
    if (ring) {
      ctx.strokeStyle = '#0b0d10';
      ctx.lineWidth = 2;
      ctx.strokeRect(x + 2, y + 2, cellSize - 4, cellSize - 4);
    }
  }

  function drawPath(path: Cell[]) {
    ctx.strokeStyle = COLOR.path;
    ctx.lineWidth = Math.max(2, cellSize * 0.12);
    ctx.setLineDash([cellSize * 0.35, cellSize * 0.25]);
    ctx.beginPath();
    path.forEach((cell, i) => {
      const x = cell.col * cellSize + cellSize / 2;
      const y = cell.row * cellSize + cellSize / 2;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
    ctx.setLineDash([]);
  }

  scatterObstacles();
  const ro = new ResizeObserver(resize);
  ro.observe(root);
  resize();
}
