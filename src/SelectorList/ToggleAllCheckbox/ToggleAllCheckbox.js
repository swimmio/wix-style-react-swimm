import React from 'react';
import { Checkbox } from '../..';
import { dataHooks } from '../SelectorList.helpers';

const ToggleAllCheckbox = ({
  selectAllText,
  deselectAllText,
  enabledItems,
  selectedEnabledItems,
  selectAll,
  deselectAll,
  dataHook,
}) => {
  const cases = {
    select: {
      text: selectAllText,
      number: enabledItems.length,
      onChange: selectAll,
      indeterminate: false,
      checked: false,
    },

    deselect: {
      text: deselectAllText,
      number: selectedEnabledItems.length,
      onChange: deselectAll,
      indeterminate: selectedEnabledItems.length < enabledItems.length,
      checked: true,
    },
  };

  const {
    text,
    number: num,
    onChange,
    checked,
    indeterminate,
  } = selectedEnabledItems.length ? cases.deselect : cases.select;

  return (
    <Checkbox
      dataHook={dataHook}
      checked={checked}
      onChange={onChange}
      indeterminate={indeterminate}
    >
      {` ${text} (${num})`}
    </Checkbox>
  );
};

ToggleAllCheckbox.defaultProps = {
  selectAllText: 'Select All',
  deselectAllText: 'Deselect All',
  dataHook: dataHooks.toggleAllCheckbox,
};

export default ToggleAllCheckbox;
