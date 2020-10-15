import React from 'react';

import {
  header,
  tabs,
  tab,
  description,
  playground,
  api,
  testkit,
  importExample,
  divider,
  example as baseExample,
  title,
} from 'wix-storybook-utils/Sections';

import * as examples from './examples';

import allComponents from '../../../stories/utils/allComponents';

import { storySettings } from './storySettings';

import SelectorList from '..';

const example = config => baseExample({ components: allComponents, ...config });

const dataSource = (searchQuery, offset, limit) =>
  new Promise(resolve =>
    setTimeout(() => {
      const items = Array(50)
        .fill(0)
        .map((_, i) => ({
          id: i,
          title: `Title ${i}`,
          subtitle: `Subtitle ${i}`,
          extraText: `Extra Text ${i}`,
          disabled: !(i % 2),
          image: (
            <img
              width="100%"
              height="100%"
              src="http://via.placeholder.com/100x100"
            />
          ),
        }));

      const filtered = items.filter(({ title }) =>
        title.toLowerCase().startsWith(searchQuery.toLowerCase()),
      );

      resolve({
        items: filtered.slice(offset, offset + limit),
        totalCount: filtered.length,
      });
    }, 2000),
  );

export default {
  category: storySettings.category,
  storyName: storySettings.storyName,

  component: SelectorList,
  componentPath: '..',
  componentProps: {
    dataHook: 'storybook-selector-list',
    height: '540px',
    itemsPerPage: 4,
    imageSize: 'large',
    withSearch: true,
    searchDebounceMs: 150,
    dataSource,
  },

  sections: [
    header({}),
    tabs([
      tab({
        title: 'Description',
        sections: [
          description(
            'Selector List enables the user to select one or multiple elements from a list, as well as the ability to search in the list in order to select a specific option.',
          ),

          importExample(),

          divider(),

          title('Examples'),

          example({
            title: 'Single select',
            source: examples.single,
          }),

          example({
            title: 'Multi select',
            source: examples.multi,
          }),

          example({
            title: 'Inside modal',
            source: examples.modal,
          }),

          example({
            title: 'With methods',
            source: examples.methods,
          }),
        ],
      }),

      ...[
        { title: 'API', sections: [api()] },
        { title: 'Testkit', sections: [testkit()] },
        { title: 'Playground', sections: [playground()] },
      ].map(tab),
    ]),
  ],
};
