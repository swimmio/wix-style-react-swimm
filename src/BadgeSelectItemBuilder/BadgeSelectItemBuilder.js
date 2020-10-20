import React from 'react';
import { st, classes } from './BadgeSelectItem.st.css';
import PropTypes from 'prop-types';
import Text from '../Text/Text';

const BadgeOption = props => {
  const { skin, text, subtitle, selected, ellipsis } = props;
  return (
    <div className={st(classes.root, { skin, subtitle: !!subtitle })}>
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

BadgeOption.propTypes = {
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
}) => ({
  overrideStyle: true,
  id,
  value: ({ selected }) => (
    <BadgeOption
      skin={skin}
      text={text}
      subtitle={subtitle}
      selected={selected}
      ellipsis={ellipsis}
    />
  ),
});
