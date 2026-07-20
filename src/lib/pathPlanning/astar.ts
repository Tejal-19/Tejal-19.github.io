/*
  A* search, implemented as a JS *generator* (`function*` / `yield`) rather
  than a function that returns one final answer. A generator can pause mid-
  computation and hand control back to whoever is iterating it — here, that
  lets the demo draw one animation frame per search step instead of running
  the whole search instantly and only showing the result. Same algorithm
  either way; the generator is just what makes it visualizable.
*/

export interface Cell {
  row: number;
  col: number;
}

export type Grid = boolean[][]; // true = walkable

export interface AStarFrame {
  open: Cell[];
  closed: Cell[];
  current: Cell | null;
  path: Cell[] | null; // set only on the final frame, once a path is found (or [] if none exists)
}

function key(c: Cell) {
  return `${c.row},${c.col}`;
}

function heuristic(a: Cell, b: Cell) {
  // Euclidean distance — admissible for 8-directional movement, unlike
  // Manhattan distance which would overestimate diagonal moves.
  return Math.hypot(a.row - b.row, a.col - b.col);
}

const DIRECTIONS: Array<{ dr: number; dc: number; cost: number }> = [
  { dr: -1, dc: 0, cost: 1 },
  { dr: 1, dc: 0, cost: 1 },
  { dr: 0, dc: -1, cost: 1 },
  { dr: 0, dc: 1, cost: 1 },
  { dr: -1, dc: -1, cost: Math.SQRT2 },
  { dr: -1, dc: 1, cost: Math.SQRT2 },
  { dr: 1, dc: -1, cost: Math.SQRT2 },
  { dr: 1, dc: 1, cost: Math.SQRT2 },
];

function neighbors(cell: Cell, grid: Grid): Array<{ cell: Cell; cost: number }> {
  const rows = grid.length;
  const cols = grid[0].length;
  const out: Array<{ cell: Cell; cost: number }> = [];

  for (const { dr, dc, cost } of DIRECTIONS) {
    const row = cell.row + dr;
    const col = cell.col + dc;
    if (row < 0 || row >= rows || col < 0 || col >= cols) continue;
    if (!grid[row][col]) continue; // obstacle

    // A diagonal move is only valid if both cells forming that corner are
    // walkable too — otherwise the path visually cuts through a wall corner.
    const isDiagonal = dr !== 0 && dc !== 0;
    if (isDiagonal && (!grid[cell.row][col] || !grid[row][cell.col])) continue;

    out.push({ cell: { row, col }, cost });
  }
  return out;
}

function reconstructPath(cameFrom: Map<string, Cell>, current: Cell): Cell[] {
  const path = [current];
  let k = key(current);
  while (cameFrom.has(k)) {
    const prev = cameFrom.get(k)!;
    path.unshift(prev);
    k = key(prev);
  }
  return path;
}

export function* aStarSteps(grid: Grid, start: Cell, goal: Cell): Generator<AStarFrame> {
  const gScore = new Map<string, number>([[key(start), 0]]);
  const cameFrom = new Map<string, Cell>();
  const open = new Map<string, Cell>([[key(start), start]]);
  const closed = new Map<string, Cell>();

  while (open.size > 0) {
    // Pick the open cell with the lowest f = g + h.
    let currentKey = '';
    let current: Cell | null = null;
    let bestF = Infinity;
    for (const [k, cell] of open) {
      const f = (gScore.get(k) ?? Infinity) + heuristic(cell, goal);
      if (f < bestF) {
        bestF = f;
        currentKey = k;
        current = cell;
      }
    }
    if (!current) break;

    if (current.row === goal.row && current.col === goal.col) {
      const path = reconstructPath(cameFrom, current);
      yield { open: [...open.values()], closed: [...closed.values()], current, path };
      return;
    }

    open.delete(currentKey);
    closed.set(currentKey, current);

    for (const { cell: next, cost } of neighbors(current, grid)) {
      const nKey = key(next);
      if (closed.has(nKey)) continue;
      const tentativeG = (gScore.get(currentKey) ?? Infinity) + cost;
      if (tentativeG < (gScore.get(nKey) ?? Infinity)) {
        cameFrom.set(nKey, current);
        gScore.set(nKey, tentativeG);
        open.set(nKey, next);
      }
    }

    yield { open: [...open.values()], closed: [...closed.values()], current, path: null };
  }

  // Open set exhausted with no path found.
  yield { open: [], closed: [...closed.values()], current: null, path: [] };
}
