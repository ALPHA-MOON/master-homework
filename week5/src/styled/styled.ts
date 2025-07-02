import styled from "styled-components";

export const Form = styled.form`
  max-width: 500px;
  margin: 4rem auto;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 1rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
`;

export const TitleStyled = styled.h2`
  font-size: 1.8rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 2rem;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
`;

export const Label = styled.label`
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: #333;
`;

export const InputField = styled.input`
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  transition: border-color 0.2s;
  &:focus {
    border-color: #4caf50;
    outline: none;
  }
  &:disabled {
    background-color: #f5f5f5;
    color: #888;
  }
`;

export const BaseButton = styled.button`
  font-size: 1rem;
  font-weight: bold;
  padding: 0.75rem;
  border-radius: 0.5rem;
  cursor: pointer;
  margin-top: 1rem;
  width: 100%;
  transition: background-color 0.2s ease, color 0.2s ease;
`;

export const PrimaryButton = styled(BaseButton)`
  background-color: #4caf50;
  color: white;
  border: none;

  &:hover {
    background-color: #388e3c;
  }
`;

export const OutlineButton = styled(BaseButton)`
  background-color: white;
  color: #4caf50;
  border: 2px solid #4caf50;

  &:hover {
    background-color: #e8f5e9;
  }
`;

export const MessageStyled = styled.p`
  color: #f44336;
  font-size: 0.9rem;
  margin-top: -1rem;
  margin-bottom: 1rem;
  text-align: left;
`;
