import { minimax } from "./miniMax";

const generateBoard = (): number[][] => {
  return [
    [-1, 1, -1, 1, -1],
    [1, -1, 1, -1, 1],
    [-1, 1, -1, 1, -1],
    [1, -1, 1, -1, 1],
    [-1, 1, -1, 1, -1],
    [1, -1, 1, -1, 1],
  ];
};

const display = (board: number[][]) => {
  for (let i = 0; i < board.length; i++) {
    console.log(board[i].join(" "));
  }
};

const board = generateBoard();

display(minimax(board, true));
