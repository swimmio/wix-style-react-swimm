import React from 'react';
import { st, classes } from './BadgeSelectItem.st.css';
import PropTypes from 'prop-types';
import Text from '../Text';

const BadgeSelectItem = props => {
  const { dataHook, skin, text, subtitle, selected, ellipsis } = props;

  return (
    <div
      data-hook={dataHook}
      data-skin={skin}
      className={st(classes.root, { skin })}
    >
      <div className={classes.marker} />
      <div className={classes.textWrapper}>
        <Text
          size="small"
          skin="standard"
          tagName="span"
          weight="normal"
          light={selected}
          ellipsis={ellipsis}
        >
          {text}
        </Text>
        {subtitle && (
          <Text size="tiny" secondary={!selected} ellipsis={ellipsis} light>
            {subtitle}
          </Text>
        )}
      </div>
    </div>
  );
};

BadgeSelectItem.propTypes = {
  text: PropTypes.node.isRequired,
  subtitle: PropTypes.string,
  skin: PropTypes.string.isRequired,
  ellipsis: PropTypes.bool,
  selected: PropTypes.bool,
};

export const badgeSelectItemBuilder = ({
  id,
  text,
  skin,
  subtitle,
  ellipsis,
  dataHook,
}) => ({
  overrideStyle: true,
  id,
  value: ({ selected }) => (
    <BadgeSelectItem
      dataHook={dataHook}
      skin={skin}
      text={text}
      subtitle={subtitle}
      selected={selected}
      ellipsis={ellipsis}
    />
  ),
});
