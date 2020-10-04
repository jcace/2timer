import React, { useContext, useState } from "react";
import styled from "styled-components";
import { SettingsContext } from "./SettingsContext";
import { colorGrey, colorPlum, colorWhite } from "./styles";
import NumberInput from "./TextInput";
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
  text-align: center;

  &.visible {
    pointer-events: all;
    opacity: 1;
  }

  h1 {
    margin-top: 10px;
    font-size: 2rem;
  }

  img {
    margin-top: 1rem;
  }
`;

const StyledCloseModalButton = styled.div`
  position: fixed;
  bottom: 0;
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

const StyledInputContainer = styled.div`
  margin-top: 35vh;
  display: flex;
  justify-content: center;
`;

interface Props {
  setTimingState: (newState: TimingState) => void;
}

const TimerControls: React.FC<Props> = ({ setTimingState }) => {
  const [settingsOpened, setSettingsOpened] = useState(true);
  const { initialTime, setInitialTime } = useContext(SettingsContext);

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
        <h1>2ty.me 2-Sided Timer</h1>

        <h2>Designed and built by Jason Cihelka</h2>

        <a href="https://github.com/jcace/2timer" target="_blank">
          <img src="/github.png" width="30px" />
        </a>

        <StyledInputContainer>
          <NumberInput
            initialValue={initialTime}
            label="Initial Timer Value"
            onSubmit={(val) => setInitialTime(val)}
          />
        </StyledInputContainer>

        <StyledCloseModalButton onClick={() => setSettingsOpened(false)}>
          <p>CLOSE</p>
        </StyledCloseModalButton>
      </StyledModal>
    </>
  );
};

export default TimerControls;
