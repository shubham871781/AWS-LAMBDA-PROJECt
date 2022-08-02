import styled from "styled-components";

const colors = {
  errorText: "#dd2727"
};

export const ErrorWrapperStyled = styled.div`
  color: ${colors.errorText};
  font-size: 11px;
  line-height: 15px;
  padding-left: 15px;
  position: absolute;
  top: calc(100% + 4px);
`;
