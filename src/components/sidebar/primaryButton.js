import React from "react";
import styled, { css } from "styled-components";

const style = ({ theme, color, ...rest }) => css`
  background-color: ${theme.baseColors[color]};
  width: 100%;
  height: ${theme.navbarHeight};
  padding: 0px;
  text-decoration: none;
  display: flex;
  align-items: center;

  :hover {
    background-color: ${theme.hoverColors[color]};
  }
`;

const ButtonBase = styled.span([style]);

function PrimaryButton({color, children}) {
  return (<ButtonBase className="sidebar-large-button" color={color}>{children}</ButtonBase>)
};

export default PrimaryButton