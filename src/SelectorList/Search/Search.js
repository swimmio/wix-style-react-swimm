import React from 'react';
import PropTypes from 'prop-types';
import Search from '../../Search';
import { dataHooks } from '../SelectorList.helpers';
import { st, classes } from './Search.st.css';

const SelectorListSearch = ({
  shouldRenderSearch,
  dataHook,
  className,
  ...props
}) => {
  if (!shouldRenderSearch) {
    return null;
  }

  return (
    <Search
      dataHook={dataHook}
      className={st(classes.root, className)}
      {...props}
    />
  );
};

SelectorListSearch.propTypes = {
  ...Search.propTypes,
  shouldRenderSearch: PropTypes.bool,
};

SelectorListSearch.defaultProps = {
  dataHook: dataHooks.search,
};

export default SelectorListSearch;
