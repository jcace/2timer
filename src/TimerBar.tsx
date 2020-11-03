/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { SettingsContext } from "./SettingsContext";
import { colorRed, colorBlue, colorGrey, colorWhite } from "./styles";

interface StyleProps {
  percent: number;
}

const StyledTugBar = styled.div<StyleProps>`
  position: relative;
  width: 100%;
  height: 90vh;
  color: ${colorWhite};

  h2 {
    width: 100%;
    text-align: center;
    font-size: 3rem;
  }

  h3 {
    width: 100%;
    font-size: 1.6rem;
  }

  .red-section {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    background-color: ${colorRed};
    width: 100%;
    height: ${(props) => `${props.percent}%`};
    max-height: 85%;
    min-height: 15%;
  }
  .blue-section {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    background-color: ${colorBlue};
    width: 100%;
    height: ${(props) => `calc(100% - ${props.percent}%)`};
    max-height: 85%;
    min-height: 15%;
  }
`;

const StyledPausedIndicator = styled.div`
  position: absolute;
  font-size: 2.3rem;
  transform: translateY(-2rem);
  padding: 0.5rem 0;
  background-color: ${colorWhite};
  color: ${colorGrey};
  width: 100%;
  text-align: center;
`;

export enum TimingState {
  RESET = "reset",
  PAUSE = "pause",
  TIMING_RED = "timing_red",
  TIMING_BLUE = "timing_blue",
}

interface Props {
  timingState: TimingState;
  setTimingState: (newState: TimingState) => void;
}

const clearTimers = (timer: undefined | number) => {
  if (timer) clearInterval(timer);
};
const TimerBar: React.FC<Props> = ({ timingState, setTimingState }) => {
  const { initialTime } = useContext(SettingsContext);
  const [runningTimer, setRunningTimer] = useState<number>();
  const [timerRed, setTimerRed] = useState(initialTime);
  const [timerBlue, setTimerBlue] = useState(initialTime);

  const maxTime = 2 * initialTime;
  const redWins = timerRed === 2 * initialTime;
  const blueWins = timerBlue === 2 * initialTime;

  const onPressStartBlue = () => {
    if (redWins || blueWins) setTimingState(TimingState.RESET);
    else if (runningTimer !== 0) setTimingState(TimingState.PAUSE);
    else {
      setTimingState(TimingState.TIMING_BLUE);
    }
  };

  const onPressStartRed = () => {
    if (redWins || blueWins) setTimingState(TimingState.RESET);
    else if (runningTimer !== 0) setTimingState(TimingState.PAUSE);
    else {
      setTimingState(TimingState.TIMING_RED);
    }
  };

  useEffect(() => {
    clearTimers(runningTimer);
    switch (timingState) {
      case TimingState.RESET:
        setTimerRed(initialTime);
        setTimerBlue(initialTime);
        setRunningTimer(0);
        break;
      case TimingState.TIMING_BLUE:
        const blueTimer = setInterval(() => {
          setTimerRed((currentTime) =>
            currentTime > 0.1 ? currentTime - 0.1 : 0
          );
          setTimerBlue((currentTime) =>
            currentTime < maxTime ? currentTime + 0.1 : maxTime
          );
        }, 100);
        setRunningTimer(blueTimer);
        break;
      case TimingState.TIMING_RED:
        const redTimer = setInterval(() => {
          setTimerBlue((currentTime) =>
            currentTime > 0.1 ? currentTime - 0.1 : 0
          );
          setTimerRed((currentTime) =>
            currentTime < maxTime ? currentTime + 0.1 : maxTime
          );
        }, 100);
        setRunningTimer(redTimer);
        break;
      case TimingState.PAUSE:
      default:
        setRunningTimer(0);
    }
  }, [timingState]);

  useEffect(() => {
    setTimingState(TimingState.RESET);
    setTimerRed(initialTime);
    setTimerBlue(initialTime);
    setRunningTimer(0);
  }, [initialTime]);

  return (
    <div>
      <StyledTugBar percent={(timerRed / maxTime) * 100}>
        <div className="red-section" onClick={onPressStartRed}>
          <h2>{timerRed > 0 ? `${timerRed.toFixed(1)}s` : ""}</h2>
          <div>
            {redWins && (
              <h3>
                <span role="img" aria-label="sparkler">
                  🎉
                </span>{" "}
                Red Wins!
              </h3>
            )}
          </div>
        </div>
        {timingState === TimingState.PAUSE && (
          <StyledPausedIndicator>PAUSED</StyledPausedIndicator>
        )}
        <div className="blue-section" onClick={onPressStartBlue}>
          <h2>{timerBlue > 0 ? `${timerBlue.toFixed(1)}s` : ""}</h2>
          <div>
            {blueWins && (
              <h3>
                <span role="img" aria-label="sparkler">
                  🎉
                </span>{" "}
                Blue Wins!
              </h3>
            )}
          </div>
        </div>
      </StyledTugBar>
    </div>
  );
};

export default TimerBar;
