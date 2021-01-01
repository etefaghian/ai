import _ from "lodash";
export const getNextBoards = (
  board: number[][],
  isBlack: boolean
): number[][][] => {
  const nextBoards: number[][][] = new Array();

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      const newBoardU = canMoveUp(board, isBlack, [i, j]);
      if (newBoardU) nextBoards.push(newBoardU);
      const newBoardD = canMoveDown(board, isBlack, [i, j]);
      if (newBoardD) nextBoards.push(newBoardD);
      const newBoardL = canMoveLeft(board, isBlack, [i, j]);
      if (newBoardL) nextBoards.push(newBoardL);
      const newBoardR = canMoveRight(board, isBlack, [i, j]);
      if (newBoardR) nextBoards.push(newBoardR);
    }
  }
  return nextBoards;
};

const canMoveUp = (
  board: number[][],
  isBlack: boolean,
  position: [number, number]
): number[][] | null => {
  if (position[0] < 1) {
    return null;
  }

  if (
    isBlack &&
    board[position[0] - 1][position[1]] === -1 &&
    board[position[0]][position[1]] === 1
  ) {
    const newArray = _.cloneDeep(board);
    newArray[position[0]][position[1]] = 0;
    newArray[position[0] - 1][position[1]] = 1;
    return newArray;
  }
  if (
    !isBlack &&
    board[position[0] - 1][position[1]] === 1 &&
    board[position[0]][position[1]] === -1
  ) {
    const newArray = _.cloneDeep(board);
    newArray[position[0]][position[1]] = 0;
    newArray[position[0] - 1][position[1]] = -1;
    return newArray;
  }
  return null;
};

const canMoveDown = (
  board: number[][],
  isBlack: boolean,
  position: [number, number]
): number[][] | null => {
  if (position[0] > board.length - 2) {
    return null;
  }

  if (
    isBlack &&
    board[position[0] + 1][position[1]] === -1 &&
    board[position[0]][position[1]] === 1
  ) {
    const newArray = _.cloneDeep(board);
    newArray[position[0]][position[1]] = 0;
    newArray[position[0] + 1][position[1]] = 1;
    return newArray;
  }
  if (
    !isBlack &&
    board[position[0] + 1][position[1]] === 1 &&
    board[position[0]][position[1]] === -1
  ) {
    const newArray = _.cloneDeep(board);
    newArray[position[0]][position[1]] = 0;
    newArray[position[0] + 1][position[1]] = -1;
    return newArray;
  }
  return null;
};

const canMoveLeft = (
  board: number[][],
  isBlack: boolean,
  position: [number, number]
): number[][] | null => {
  if (position[1] < 1) {
    return null;
  }

  if (
    isBlack &&
    board[position[0]][position[1] - 1] === -1 &&
    board[position[0]][position[1]] === 1
  ) {
    const newArray = copyArray(board);
    newArray[position[0]][position[1]] = 0;
    newArray[position[0]][position[1] - 1] = 1;
    return newArray;
  }
  if (
    !isBlack &&
    board[position[0]][position[1] - 1] === 1 &&
    board[position[0]][position[1]] === -1
  ) {
    const newArray = copyArray(board);
    newArray[position[0]][position[1]] = 0;
    newArray[position[0]][position[1] - 1] = -1;
    return newArray;
  }
  return null;
};

const canMoveRight = (
  board: number[][],
  isBlack: boolean,
  position: [number, number]
): number[][] | null => {
  if (position[1] > board[0].length - 2) {
    return null;
  }

  if (
    isBlack &&
    board[position[0]][position[1] + 1] === -1 &&
    board[position[0]][position[1]] === 1
  ) {
    const newArray = copyArray(board);
    newArray[position[0]][position[1]] = 0;
    newArray[position[0]][position[1] + 1] = 1;
    return newArray;
  }
  if (
    !isBlack &&
    board[position[0]][position[1] + 1] === 1 &&
    board[position[0]][position[1]] === -1
  ) {
    const newArray = copyArray(board);
    newArray[position[0]][position[1]] = 0;
    newArray[position[0]][position[1] + 1] = -1;
    return newArray;
  }
  return null;
};

export const copyArray = (array: number[][]): number[][] => {
  const copiedArray: number[][] = [];
  for (let i = 0; i < array.length; i++) {
    copiedArray[i] = [];
    for (let j = 0; j < array[i].length; j++) {
      copiedArray[i][j] = array[i][j];
    }
  }
  return copiedArray;
};

export const getBlackValue = (board: number[][]): number => {
  let blackCount = 0;
  let whiteCount = 0;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      board[i][j] === 1 && blackCount++;

      board[i][j] === -1 && whiteCount++;
    }
  }
  return blackCount - whiteCount;
};

export const getBlackEstimate = (board: number[][]): number => {
  return getNextBoards(board, true).length;
};
