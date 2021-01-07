import styled from "styled-components";

export const Box = styled.div`
  color: ${(props: IProps) => props.color};
  background-color: ${(props: IProps) => props.backgroundColor};
  height: ${(props: IProps) => props.height};
  width: ${(props: IProps) => props.width};
  text-align: center;
  font-size: 1.3rem;
`;

interface IProps {
  height: string;
  width: string;
  color: string;
  backgroundColor: string;
}
