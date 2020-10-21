import { badgeSelectItemBuilder } from '..';
import * as React from 'react';

function badgeSelectItemBuilderWithAllProps() {
  const { id, value , overrideStyle} = badgeSelectItemBuilder({
    id: '1',
    skin: 'danger',
    text: 'text',
    subtitle: 'subtitle text',
    ellipsis: true,
  });
}
