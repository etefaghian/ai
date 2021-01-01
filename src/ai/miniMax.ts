import { getBlackEstimate, getBlackValue, getNextBoards } from "./utils";

function _minimax(
  board: number[][],
  isBlack: boolean,
  alpha: number,
  beta: number,
  level: number = 5
): { val: number; board: number[][] } {
  level--;
  let best: number = isBlack ? -Infinity : Infinity;
  let bestNextBoard: number[][] = [];
  const nextBoards: number[][][] = getNextBoards(board, isBlack);
  //leaf
  if (nextBoards.length === 0) {
    return { val: getBlackValue(board), board };
  }

  //virtual leaf
  if (level === 0) {
    return { val: getBlackEstimate(board), board };
  }

  for (let nextBoard of nextBoards) {
    const { val } = _minimax(nextBoard, !isBlack, alpha, beta, level);

    if (isBlack) {
      if (val > best) {
        bestNextBoard = nextBoard;
        best = val;
      }
      if (val >= beta) {
        break;
      }
      if (val > alpha) {
        alpha = val;
      }
    } else {
      if (val < best) {
        bestNextBoard = nextBoard;
        best = val;
      }
      if (val <= alpha) {
        break;
      }
      if (val < beta) {
        beta = val;
      }
    }
  }

  return { val: best, board: bestNextBoard };
}

export function minimax(board: number[][], isBlack: boolean): number[][] {
  const a = _minimax(board, isBlack, -Infinity, Infinity);
  return a.board;
}
