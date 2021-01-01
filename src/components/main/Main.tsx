import React, { useState } from "react";
import styled from "styled-components";
import { Board } from "../board/Board";
import { RestartButton } from "../restartButton/RestartButton";

export const Main = styled((props) => {
  const [restart, setRestart] = useState(false);
  return (
    <div className={props.className}>
      <Board restart={restart}></Board>
      <RestartButton onClick={() => setRestart(!restart)}>
        Restart
      </RestartButton>
    </div>
  );
})`
  width: 40%;
  background-color: white;
  margin-top: 3rem;
  padding: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;
