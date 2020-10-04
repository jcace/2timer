import React, { useState } from "react";
import SettingsProvider from "./SettingsContext";
import TimerBar, { TimingState } from "./TimerBar";
import TimerControls from "./TimerControls";

function App() {
  const [timingState, setTimingState] = useState(TimingState.RESET);

  return (
    <SettingsProvider>
      <TimerBar timingState={timingState} setTimingState={setTimingState} />
      <TimerControls setTimingState={setTimingState} />
    </SettingsProvider>
  );
}

export default App;
