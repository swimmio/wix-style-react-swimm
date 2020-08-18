import React from 'react';
import {
  FamilyStructure,
  SingleComponentSideBySide,
} from '../sharedComponents';
import {
  internalComponentsSymbols,
  symbolsGroup,
} from '../../../symbolsComponentsMapping/symbols';
import { internalComponentsSymbolsToComponents } from '../../../symbolsComponentsMapping/families/internalComponentsFamily';
import { createLinkedComponentsNames } from '../sharedComponents/utils';
import { TagList, Layout, Box, Cell, Avatar } from 'wix-style-react';

const groupSymbol = symbolsGroup.internalComponents;

const TagListExample = () => {
  const thumbTags = [
    {
      id: '1',
      children: 'Green',
      thumb: <Box height="100%" backgroundColor="G10" />,
    },
    {
      id: '2',
      children: 'Red',
      thumb: <Box height="100%" backgroundColor="R10" />,
    },
    {
      id: '3',
      children: 'Yellow',
      thumb: <Box height="100%" backgroundColor="Y10" />,
    },
    {
      id: '4',
      children: 'Avatar',
      thumb: (
        <Avatar
          imgProps={{
            src: 'https://randomuser.me/api/portraits/women/39.jpg',
          }}
          size="size18"
        />
      ),
    },
  ];

  const themeTags = [
    { id: '1', children: 'Default' },
    { id: '2', children: 'Error', theme: 'error' },
    { id: '3', children: 'Warning', theme: 'warning' },
    { id: '4', children: 'Dark', theme: 'dark' },
  ];

  const renderTagsLayout = tagsArr => (
    <Cell>
      <TagList
        tags={tagsArr}
        maxVisibleTags={3}
        toggleMoreButton={(amountOfHiddenTags, isExpanded) => ({
          label: isExpanded ? 'Show Less' : `+${amountOfHiddenTags} More`,
          tooltipContent: !isExpanded && 'Show More',
        })}
      />
    </Cell>
  );

  const symbol = internalComponentsSymbols.tagList;
  const components = internalComponentsSymbolsToComponents[symbol];

  const singleComponentProps = {
    name: symbol,
    componentsNames: createLinkedComponentsNames(components),
  };

  return (
    <SingleComponentSideBySide {...singleComponentProps}>
      <Layout>
        {renderTagsLayout(thumbTags)}
        {renderTagsLayout(themeTags)}
      </Layout>
    </SingleComponentSideBySide>
  );
};

const InternalFamily = () => (
  <FamilyStructure title={groupSymbol} showPreview>
    <TagListExample />
  </FamilyStructure>
);

export default InternalFamily;
