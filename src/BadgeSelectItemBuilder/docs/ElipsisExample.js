import React from 'react';
import {
  badgeSelectItemBuilder,
  DropdownBase,
  TextButton,
} from 'wix-style-react';
import ChevronDownSmall from 'wix-ui-icons-common/ChevronDownSmall';

const style = {
  display: 'inline-block',
  padding: '0 35px',
  width: '240px',
  lineHeight: '22px',
};

export default () => {
  const [selectedId, setSelectedId] = React.useState(1);
  const getOptions = () => [
    badgeSelectItemBuilder({
      id: 1,
      text: 'This is short',
      subtitle: 'This is a short subtitle',
      skin: 'general',
      ellipsis: true,
    }),
    badgeSelectItemBuilder({
      id: 2,
      text: 'This is a very long text',
      subtitle: 'This is a very long subtitle',
      skin: 'general',
      ellipsis: true,
    }),
  ];

  return (
    <div style={style}>
      <DropdownBase fixed selectedId={selectedId} options={getOptions()}>
        {({ toggle, selectedOption = {} }) => {
          setSelectedId(selectedOption.id);
          return (
            <TextButton
              skin="dark"
              suffixIcon={<ChevronDownSmall />}
              onClick={toggle}
              dataHook="drop-down-opener"
            >
              {'Please choose'}
            </TextButton>
          );
        }}
      </DropdownBase>
    </div>
  );
};
