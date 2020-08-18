import React from 'react';
import { storiesOf } from '@storybook/react';
import TableListItem from '../TableListItem';

const commonProps = {
  options: [
    { value: 'Investing', width: '2fr', align: 'right' },
    { value: '4 posts', width: '1fr', align: 'center' },
    { value: '30 April 2020', width: '20%', align: 'left' },
  ],
};

const tests = [
  {
    describe: 'sanity',
    its: [
      {
        it: 'with everything enabled',
        props: {
          showDivider: true,
          checkbox: true,
          checked: true,
          draggable: true,
        },
      },
      {
        it: 'with everything disabled',
        props: {
          showDivider: true,
          checkbox: true,
          checkboxDisabled: true,
          draggable: true,
          dragDisabled: true,
        },
      },
    ],
  },
];

tests.forEach(({ describe, its }) => {
  its.forEach(({ it, props }) => {
    storiesOf(
      `${TableListItem.displayName}${describe ? '/' + describe : ''}`,
      module,
    ).add(it, () => <TableListItem {...commonProps} {...props} />);
  });
});
