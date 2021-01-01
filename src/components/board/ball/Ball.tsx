import styled, { css, keyframes } from "styled-components";
import { isPropertySignature } from "typescript";

export const Ball = styled.span.attrs((props: IProps) => ({
  onClick: props.handleClick,
}))`
  width: 2rem;
  height: 2rem;
  border-radius: 100%;

  grid-column: ${(props: IProps) => props.column + 1} /
    ${(props: IProps) => props.column + 2};
  grid-row: ${(props: IProps) => props.row + 1} /
    ${(props: IProps) => props.row + 2};

  ${(props: IProps) =>
    props.isSelected &&
    css`
      animation: ${blinkingBackground} 0.5s infinite;
    `}

  ${(props: IProps) =>
    props.kind === -1 &&
    css`
      background-color: white;
      border: solid 0.1rem black;
    `}
  ${(props: IProps) =>
    props.kind === 0 &&
    css`
      background-color: white;
      border: 0;
    `}

  ${(props: IProps) =>
    props.kind === 1 &&
    css`
      background-color: black;
    `}
`;

const blinkingBackground = keyframes`
    0%		{    background-color: #ffa600;}
    100%		{    background-color: #c37a1a;}


`;

interface IProps {
  kind: number;
  handleClick: Function;
  row: number;
  column: number;
  isSelected: boolean;
}
