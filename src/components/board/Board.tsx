import { useEffect, useState } from "react";
import styled from "styled-components";
import { minimax } from "../../ai/miniMax";
import { Ball } from "./ball/Ball";
import _ from "lodash";
import { whoIsWin } from "../../ai/utils";
import { Box } from "../box/Box";

export const USBoard = (props: any) => {
  const [board, setBoard] = useState<number[][]>(generateBoard());
  const [isComputer, setIsComputer] = useState<boolean>(false);
  const [whoWin, setWhoWin] = useState<-1 | 0 | 1>(0);

  const [sel1, setSel1] = useState<{
    col: number;
    row: number;
    isSelected: boolean;
  }>({ col: -1, row: -1, isSelected: false });
  const [sel2, setSel2] = useState<{
    col: number;
    row: number;
    isSelected: boolean;
  }>({ col: -1, row: -1, isSelected: false });

  useEffect(() => {
    setBoard(generateBoard());
    setSel1({ col: -1, row: -1, isSelected: false });
    setSel2({ col: -1, row: -1, isSelected: false });
  }, [props.restart]);

  useEffect(() => {
    if (sel2.isSelected) {
      const b = _.cloneDeep(board);
      b[sel1.row][sel1.col] = 0;
      b[sel2.row][sel2.col] = -1;
      setIsComputer(true);
      sel2.isSelected = false;
      sel1.isSelected = false;
      setBoard(b);
    }
  }, [sel2]);

  useEffect(() => {
    setWhoWin(whoIsWin(board, isComputer));
  }, [board]);

  useEffect(() => {
    if (isComputer) {
      setIsComputer(false);
      setBoard(minimax(board, true));
    }
  }, [isComputer]);

  const handleClick = (rowIndex: number, columnIndex: number) => {
    if (!sel1.isSelected && board[rowIndex][columnIndex] === -1) {
      setSel1({ col: columnIndex, row: rowIndex, isSelected: true });
    } else if (
      sel1.isSelected &&
      sel1.col === columnIndex &&
      sel1.row === rowIndex
    ) {
      setSel1({ col: columnIndex, row: rowIndex, isSelected: false });
    } else if (
      board[rowIndex][columnIndex] === 1 &&
      sel1.isSelected &&
      Math.abs(rowIndex - sel1.row) + Math.abs(columnIndex - sel1.col) < 2
    ) {
      setSel2({ col: columnIndex, row: rowIndex, isSelected: true });
    }
  };

  return (
    <>
      {whoWin === -1 ? (
        <Box
          width="19rem"
          height="2rem"
          color="#f87800"
          backgroundColor="#d6d6d6"
        >
          White is Winner
        </Box>
      ) : whoWin === 1 ? (
        <Box
          width="19rem"
          height="2rem"
          color="#f87800"
          backgroundColor="black"
        >
          black is Winner
        </Box>
      ) : (
        <Box
          width="19rem"
          height="2rem"
          color="white"
          backgroundColor="#f87800"
        >
          you are white
        </Box>
      )}

      <div className={props.className}>
        {board.map((row, rowIndex) => {
          return row.map((item, columnIndex) => {
            return (
              <Ball
                isSelected={
                  sel1.isSelected &&
                  sel1.row === rowIndex &&
                  sel1.col === columnIndex
                }
                row={rowIndex}
                column={columnIndex}
                kind={item}
                handleClick={() => handleClick(rowIndex, columnIndex)}
                key={String(rowIndex) + String(columnIndex)}
              ></Ball>
            );
          });
        })}
      </div>
    </>
  );
};

export const Board = styled(USBoard)`
  display: grid;
  grid-template-columns: repeat(5, 3rem);
  grid-template-rows: repeat(6, 3rem);
  justify-content: center;
  gap: 1rem;
  justify-items: center;
  align-items: center;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;

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
