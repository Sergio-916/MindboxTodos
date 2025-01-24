import styled from "styled-components";

export const Header = styled.h1`
  font-size: 2rem;
  color: #E9D9D8;
  text-align: center;
  font-family: "Nunito Sans", sans-serif;
  font-weight: bold;
  padding: 20px 0;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
    padding: 15px 0;
  }
`;


export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  &::before {
    content: "⮟";
    position: absolute;
    left: 25px;  /* Смещение влево */
    top: 50%;
    transform: translateY(-50%);
    font-size: 20px;  /* Размер стрелки должен совпадать с текстом */
    color: #ccc;
    font-family: "Nunito Sans", sans-serif;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 20px 20px 12px 60px;  /* Учитываем место для стрелки */
  margin: 8px 0;
  height: 30px;
  display: inline-block;
  box-sizing: border-box;
  font-family: "Nunito Sans", sans-serif;
  font-style: italic;
  font-size: 18px;
  color: #333;
  border: none;
  outline: none;

  /* Выравнивание текста */
  line-height: 1.5;
  vertical-align: middle;
   &::placeholder {
    color: #ccc;  /* Задаем цвет */
    font-style: normal;  /* Можно убрать курсив */
    opacity: 1;  /* Устанавливаем полную непрозрачность */
  }
`;


interface TodoProps {
  $completed: boolean;
}

export const Todo = styled.div<TodoProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
    font-size: 18px;
  text-decoration: ${({ $completed }) =>
    $completed ? "line-through" : "none"};
  color: ${({ $completed }) => ($completed ? "#ccc" : "#4E4E4E")};
  font-family: "Nunito Sans", sans-serif;
`;

export const TodoElement = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  padding: 0px 20px;
  background-color: white; 
  gap: 15px;

`;

export const PageStack = styled.div<{index: number}>`
  position: relative;
  height: 5px;
  margin-bottom: ${({ index }) => index * 4}px;

`;

export const TodoContainer = styled.div`
  background-color: #fff;
  max-width: 100%; /* Ограничение ширины */
  width: 600px;
  height: auto;
  // border-top: 1px solid #E9E9E9;
  // border-left: 1px solid #E9E9E9;
  // border-right: 1px solid #E9E9E9;
   box-shadow: 
    -2px 2px 4px rgba(0, 0, 0, 0.05),  /* Слева */
     2px 2px 4px rgba(0, 0, 0, 0.05),  /* Справа */
     2px 0 4px rgba(0, 0, 0, 0.05);    

     
    
   
  box-sizing: border-box;
  overflow: hidden; /* Предотвращает выход контента */
  margin: 0 auto; /* Центрирование */

  @media (max-width: 768px) {
    width: 90%;
  }

  @media (max-width: 480px) {
    width: 100%;
    padding: 10px;
  }
`;

export const Page = styled.div<{ index: number; total: number }>`
  position: absolute;
  width: ${({ index, total }) => `calc(100% - ${index * (50 / total)}px)`};
  max-width: 600px;  /* Ограничение максимальной ширины */
  height: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(${({ index }) => index * 5}px);
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  // border-bottom: 1px solid #E9E9E9;
  // border-left: 1px solid #E9E9E9;
  // border-right: 1px solid #E9E9E9;
  z-index: ${({ total, index }) => total - index};
  box-sizing: border-box;
    box-shadow: 
    -2px 2px 4px rgba(0, 0, 0, 0.05),  /* Слева */
     2px 2px 4px rgba(0, 0, 0, 0.05),  /* Справа */
     0 2px 4px rgba(0, 0, 0, 0.05);     /* Снизу */
    


  @media (max-width: 768px) {
    width: ${({ index, total }) => `calc(90% - ${index * (40 / total)}px)`}; /* Уменьшение ширины */
    transform: translateX(-50%) translateY(${({ index }) => index * 4}px);
  }

  @media (max-width: 480px) {
    width: ${({ index, total }) => `calc(100% - ${index * (30 / total)}px)`}; /* Еще меньше ширина */
    transform: translateX(-50%) translateY(${({ index }) => index * 3}px);
  }
`;



export const BottomBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  font-family: "Nunito Sans", sans-serif;
  flex-wrap: wrap; /* Элементы переходят на новую строку при нехватке места */
  color: #C2C2C2;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
    gap: 10px;
    
  }
`;


export const ActionsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 25px;
  font-family: "Nunito Sans", sans-serif;
`;

export const ListItem = styled.li<{ $active: boolean }>`
  padding: 3px 7px;
  cursor: pointer;
  border: 1px solid transparent; /* Прозрачная рамка по умолчанию */

  ${({ $active }) =>
    $active &&
    `
    border-color: #F0E0E0; /* Цвет рамки при выборе */
    border-radius: 5px;
  `}
`;

export const StyledCheckbox = styled.input.attrs({ type: "checkbox" })`
  appearance: none;
  width: 20px;
  height: 20px;
  border: 1px solid #D9D9D9;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  outline: none;
  transition: all 0.3s ease;

  &:checked {
    border-color: #8fc1a9;
  }

  &:checked::after {
    content: "✔";
    font-size: 16px;
    color: #77C0AF;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const TodoListContainer = styled.div`
  max-height: 450px;
  overflow-y: auto;
  margin-bottom: 10px;
  min-height: 150px;
`;

export const Divider = styled.hr`
  border-top: 1px solid #E9E9E9;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1); /* Тень */
  margin: 15px 0;
`;