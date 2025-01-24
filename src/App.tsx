
import styled from "styled-components";
import Card from "./Components/Card";

const Container = styled.div`
  max-width: 600px; /* Ограничение ширины */
  margin: 0 auto; /* Центрирование */
  padding: 0 20px; /* Внутренние отступы */
  width: 100%; /* Заполнение доступного пространства */
  background-color: #f2f2f2;
  padding: 20px;    
`;

function App() {


  return (
    <>
      <Container>
       <Card/>
      </Container>
    </>
  );
}

export default App;
