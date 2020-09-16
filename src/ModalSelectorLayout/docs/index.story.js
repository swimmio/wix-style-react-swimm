import React from 'react';
import times from '../../utils/operators/times';

import ModalSelectorLayout from '..';
import Text from '../../Text';

import { storySettings } from './storySettings';

const ITEMS = times(50, i => ({
  id: i,
  title: `Title ${i}`,
  subtitle: `Subtitle ${i}`,
  extraText: `Extra Text ${i}`,
  disabled: !(i % 2),
  image: (
    <img width="100%" height="100%" src="http://via.placeholder.com/100x100" />
  ),
}));

export default {
  category: storySettings.category,
  storyName: storySettings.storyName,
  component: ModalSelectorLayout,
  componentPath: '..',

  componentProps: setState => ({
    dataHook: 'storybook-modal-selector-layout',
    height: '540px',
    onClose: () => setState({ isOpen: false }),
    onCancel: () => setState({ isOpen: false }),
    itemsPerPage: 4,
    imageSize: 'large',
    withSearch: true,
    searchDebounceMs: 150,

    dataSource: (searchQuery, offset, limit) =>
      new Promise(resolve =>
        setTimeout(() => {
          const filtered = ITEMS.filter(({ title }) =>
            title.toLowerCase().startsWith(searchQuery.toLowerCase()),
          );

          resolve({
            items: filtered.slice(offset, offset + limit),
            totalCount: filtered.length,
          });
        }, 2000),
      ),
  }),

  exampleProps: {
    onOk: data => {
      const isArray = Array.isArray(data);
      const view = i => ({ id: i.id, title: i.title, subtitle: i.substitle });

      return JSON.stringify(isArray ? data.map(view) : view(data));
    },

    onCancel: () => 'canceled',

    title: [
      {
        label: 'default title',
        value: ModalSelectorLayout.defaultProps.title,
      },
      {
        label: 'BOLD title',
        value: (
          <Text key={0} weight="bold">
            BOLD title
          </Text>
        ),
      },
    ],

    subtitle: [{ label: 'simple text', value: 'A list of items go below' }],
  },
};
