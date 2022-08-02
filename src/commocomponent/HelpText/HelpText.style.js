import styled from "styled-components";

const colors = {
  color: "rgba(0, 0, 0, 0.6)"
};

export const HelpTextWraperStyle = styled.div`
  position: relative;
  display: inline-flex;
  color: ${colors.color};
  padding-left: 15px;
  position: absolute;
  top: calc(100% + 4px);
`;
