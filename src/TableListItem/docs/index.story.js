import React from 'react';
import {
  header,
  tabs,
  tab,
  description,
  importExample,
  title,
  divider,
  example as baseExample,
  playground,
  api,
  testkit,
} from 'wix-storybook-utils/Sections';

import StructureExampleRaw from '!raw-loader!./examples/StructureExample';
import ColumnsExampleRaw from '!raw-loader!./examples/ColumnsExample';
import ColumnAlignmentExampleRaw from '!raw-loader!./examples/ColumnAlignmentExample';
import PaddingExampleRaw from '!raw-loader!./examples/PaddingExample';
import SelectionExampleRaw from '!raw-loader!./examples/SelectionExample';
import DraggableExampleRaw from '!raw-loader!./examples/DraggableExample';
import DividerExampleRaw from '!raw-loader!./examples/DividerExample';
import TableActionCellExampleRaw from '!raw-loader!./examples/TableActionCellExample';

import { storySettings } from '../test/storySettings';
import allComponents from '../../../stories/utils/allComponents';

import TableListItem from '..';

import { VERTICAL_PADDING } from '../TableListItem';
import Button from '../../Button';

const example = config => baseExample({ components: allComponents, ...config });

export default {
  category: storySettings.category,
  storyName: storySettings.storyName,

  component: TableListItem,
  componentPath: '..',

  componentProps: {
    options: [{ value: 'hello', width: 42 }],
    verticalPadding: VERTICAL_PADDING.small,
    checkbox: true,
  },

  exampleProps: {
    // Put here presets of props, for more info:
    // https://github.com/wix/wix-ui/blob/master/packages/wix-storybook-utils/docs/usage.md#using-list
  },

  sections: [
    header({
      sourceUrl: `https://github.com/wix/wix-style-react/tree/master/src/${TableListItem.displayName}/`,
      component: (
        <TableListItem
          options={[
            { value: 'TableListItem' },
            { value: <Button>Click me</Button>, width: '30%', align: 'right' },
          ]}
        />
      ),
    }),

    tabs([
      tab({
        title: 'Description',
        sections: [
          description({
            title: 'Description',
            text:
              'List item is a container used to organise and display data efficiently. It can contain any kind of content. It supports drag & drop functionality and nested layout when wrapped into Sortable List (can be parent or child item). Use it to replicate table layout in primary content, such as cards.',
          }),

          importExample(),

          divider(),

          title('Examples'),

          example({
            title: 'Structure',
            description:
              'Component consists of a drag grip, checkbox and content area.',
            source: StructureExampleRaw,
          }),

          example({
            title: 'Columns',
            description:
              'Component content allows to have any number of data columns, which width can be specified either in % or pixels.',
            source: ColumnsExampleRaw,
          }),

          example({
            title: 'Column Alignment',
            description:
              'Content within column can be aligned to the left, center or right',
            source: ColumnAlignmentExampleRaw,
          }),

          example({
            title: 'Padding',
            description:
              'There are two densities: small and medium. Default is medium.',
            source: PaddingExampleRaw,
          }),

          example({
            title: 'Selection',
            description: 'Selection checkbox can be enabled or hidden.',
            source: SelectionExampleRaw,
          }),

          example({
            title: 'Draggable',
            description: 'Drag grip can be enabled or restricted.',
            source: DraggableExampleRaw,
          }),

          example({
            title: 'Divider',
            description:
              'Item has a bottom divider. The last item in the list should hide it.',
            source: DividerExampleRaw,
          }),

          example({
            title: 'Using with TableActionCell',
            description:
              'Component allows to add TableActionCell to the last data column and make the whole item clickable.',
            source: TableActionCellExampleRaw,
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
