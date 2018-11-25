import styled, { keyframes, css } from 'styled-components';

const lampSizePx = 100;

export const LampsGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(${lampSizePx}px, 1fr));
  grid-gap: 20px;
  grid-auto-rows: ${lampSizePx}px;
`;
