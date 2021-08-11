import React from 'react';
import styled from 'styled-components';

const EmailList = ({ email, id, removeEmail }) => {
  return (
    <Email>
      {email.email}
      <RemoveEmail onClick={() => email.removeEmail(email.id)}>
        &times;
      </RemoveEmail>
    </Email>
  );
};

export default EmailList;

const Email = styled.div`
  display: inline-block;
  margin: 2px;
  padding: 4px 10px 8px;
  text-align: right;
  font-size: 11px;
  color: #fff;
  background-color: #1dbe8e;
  border-radius: 14px;

  span {
    position: relative;
    top: 0.5px;
    font-size: 14px;
    margin-left: 6px;
    opacity: 0.5;
  }
`;

const RemoveEmail = styled.span`
  &:hover {
    cursor: pointer;
  }
`;
