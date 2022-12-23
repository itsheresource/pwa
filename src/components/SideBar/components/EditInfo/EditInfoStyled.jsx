import styled from 'styled-components';
import * as C from 'scss/colors';

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 4rem;
  margin-bottom: 20px;
  overflow: auto;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 12px;
  width: 100%;
`;

export const Label = styled.h4`
  font-size: 10px;
  margin-left: 10px;
  opacity: 39%;
  color: ${C.colorWarmGrey};
`;

export const Input = styled.input`
  border-radius: 9px;
  border: 1px solid ${C.colorGrey1};
  height: 24px;
  font-size: 12px;
  width: 100%;
  padding: 5px;
  font-weight: 700;
  color: ${C.colorWarmGrey};
  &:focus {
    outline: none;
  }
`;

export const Button = styled.button`
  background-color: ${C.buttonGreen};
  color: ${C.colorWhite};
  border-radius: 2.4rem;
  border: 0;
  padding: 0.8rem;
  width: 50%;
  font-size: 1.9rem;
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 23px;
  &:focus {
    outline: 0;
  }
  &:active {
    background-color: ${C.colorBlueMedium};
  }
`;
