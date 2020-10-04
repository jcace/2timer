import React, { useState } from "react";
import styled from "styled-components";
import { colorGrey, colorPlum, colorWhite } from "./styles";
import { TimingState } from "./TimerBar";

const StyledControls = styled.div`
  width: 100%;
  height: 10vh;
  color: ${colorWhite};
  text-align: center;

  img {
    display: inline-block;
  }
`;

const StyledResetButton = styled.div`
  height: 100%;
  width: 80%;
  background-color: ${colorPlum};
  display: flex;
  align-items: center;
  justify-content: center;

  h2 {
    margin: auto;
    font-size: 1.5rem;
  }
`;

const StyledSettingsButton = styled.div`
  height: 100%;
  width: 20%;
  background-color: ${colorGrey};
  float: left;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledModal = styled.div`
  opacity: 0;
  position: fixed;
  transition: opacity 0.5s ease-in-out;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  pointer-events: none;
  color: ${colorWhite};

  &.visible {
    pointer-events: all;
    opacity: 1;
  }
`;

const StyledCloseModalButton = styled.div`
  display: fixed;
  top: 20px;
  height: 10vh;
  width: 100%;
  background-color: ${colorPlum};
  display: flex;
  align-items: center;
  justify-content: center;

  p {
    margin: auto;
    font-size: 1.5rem;
  }
`;

interface Props {
  setTimingState: (newState: TimingState) => void;
}

const TimerControls: React.FC<Props> = ({ setTimingState }) => {
  const [settingsOpened, setSettingsOpened] = useState(false);
  const onPressReset = () => {
    setTimingState(TimingState.RESET);
  };

  return (
    <>
      <StyledControls>
        <StyledSettingsButton onClick={() => setSettingsOpened(true)}>
          <img src="/settings.svg" width="42px" />
        </StyledSettingsButton>
        <StyledResetButton onClick={onPressReset}>
          <h2>RESET</h2>
        </StyledResetButton>
      </StyledControls>

      <StyledModal className={settingsOpened ? "visible" : ""}>
        <h1>Tug-o-War Timer</h1>

        <p>Designed and built by Jason Cihelka</p>
        <StyledCloseModalButton onClick={() => setSettingsOpened(false)}>
          <p>CLOSE</p>
        </StyledCloseModalButton>
      </StyledModal>
    </>
  );
};

export default TimerControls;
