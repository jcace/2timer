import React, { useState } from "react";
import styled from "styled-components";
import { colorBlue, colorPlum, colorWhite } from "./styles";

interface Props {
  initialValue: number;
  label: string;
  onSubmit: (result: number) => void;
}

const StyledNumberInput = styled.div`
  position: relative;
  display: flex;
  align-items: bottom;

  label {
    top: -1.2rem;
    position: absolute;
  }
`;

const StyledInputField = styled.input`
  height: 4rem;
  font-size: 3rem;
  width: 120px;
  background-color: ${colorWhite};
  border: none;
`;

const StyledButton = styled.button`
  height: 4rem;
  width: 80px;
  border: none;
  font-size: 1.6rem;
  background-color: ${colorBlue};
  color: ${colorWhite};
`;

const NumberInput: React.FC<Props> = ({ initialValue, label, onSubmit }) => {
  const [value, setValue] = useState(initialValue);

  return (
    <StyledNumberInput>
      <label>{label}</label>
      <StyledInputField
        type="number"
        value={value}
        onChange={(e) => {
          const num = Number(e.target.value);
          if (num > 999) {
            setValue(999);
          } else if (num < 1) {
            setValue(1);
          } else {
            setValue(num);
          }
        }}
      />
      <StyledButton
        onClick={() => {
          onSubmit(value);
        }}
      >
        Set
      </StyledButton>
    </StyledNumberInput>
  );
};

export default NumberInput;
