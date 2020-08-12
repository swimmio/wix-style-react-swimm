import * as React from 'react';
import Ellipsis from '..';

function EllipsisWithMandatoryProps() {
  return <Ellipsis render={() => <div />} />;
}

function EllipsisWithAllProps() {
  return (
    <Ellipsis
      ellipsis
      showTooltip
      wrapperClassName="test"
      fixed // A TooltipCommon prop
      render={({ ref, ellipsisClasses }) => (
        <div ref={ref} className={ellipsisClasses('another-class')}>
          hi
        </div>
      )}
    />
  );
}
