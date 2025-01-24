import styled from "styled-components";

export const PageStack = styled.div`
  position: relative;
  width: 400px;
  height: 250px;
  margin: 50px auto;
`;

export const Page = styled.div<{ index: number; total: number }>`
  position: absolute;
  width: ${({ index, total }) => 400 - index * (50 / total)}px; /* Пропорциональное уменьшение ширины */
  height: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(${({ index }) => index *5}px); /* Центрирование и смещение */
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ddd;
  z-index: ${({ total, index }) => total - index}; /* Динамический Z-index */
`;
