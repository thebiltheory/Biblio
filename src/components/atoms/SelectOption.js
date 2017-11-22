import React from 'react';

const SelectOption = (props) => {
  <option value={props.value} selected={props.selected}>{props.label}</option>
}

export default SelectOption;
