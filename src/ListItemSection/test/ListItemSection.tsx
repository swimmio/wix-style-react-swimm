import * as React from 'react';
import { mount } from 'enzyme';
import ListItemSection, { listItemSectionBuilder } from '..';
import { listItemSectionTestkitFactory } from '../../../testkit';
import { listItemSectionTestkitFactory as listItemSectionEnzymeTestkitFactory } from '../../../testkit/enzyme';

async function testkits() {
  const vanilla = listItemSectionTestkitFactory({
    dataHook: 'hi',
    wrapper: document.createElement('div'),
  });

  await vanilla.exists();

  const enzyme = listItemSectionEnzymeTestkitFactory({
    dataHook: 'hi',
    wrapper: mount(<div />),
  });
}

function listItemSectionBuilderWithMandatoryProps() {
  listItemSectionBuilder({
    id: '1',
  });
}

function listItemSectionBuilderWithAllProps() {
  const { id, overrideStyle, value } = listItemSectionBuilder({
    id: '1',
    className: 'cls',
    ellipsis: true,
    suffix: <span />,
    customSuffix: <span />,
    title: 'title',
    type: 'divider',
  });
}

function ListItemSectionWithMandatoryProps() {
  return <ListItemSection />;
}

function ListItemSectionWithAllProps() {
  return (
    <ListItemSection
      className="some-class"
      dataHook="hi"
      ellipsis
      suffix=""
      title=""
      type="title"
      onClick={_ev => {}}
    />
  );
}
