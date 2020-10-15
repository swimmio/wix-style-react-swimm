import React from 'react';
import { classes } from './Content.st.css';
import { dataHooks } from '../SelectorList.helpers';
import Selector from '../../Selector';
import Loader from '../../Loader';
import InfiniteScroll from '../../utils/InfiniteScroll';
import Text from '../../Text';

const DEFAULT_EMPTY = (
  <div className={classes.defaultEmptyStateWrapper}>
    <Text>{"You don't have any items"}</Text>
  </div>
);

const ListItems = ({
  items,
  isSelected,
  onToggle,
  imageSize,
  imageShape,
  multiple,
}) => {
  if (!items.length) {
    return null;
  }

  return (
    <ul data-hook={dataHooks.list} className={classes.list}>
      {items.map(item => (
        <Selector
          id={item.id}
          key={item.id}
          dataHook={dataHooks.selector}
          imageSize={imageSize}
          imageShape={imageShape}
          toggleType={multiple ? 'checkbox' : 'radio'}
          image={item.image}
          title={item.title}
          subtitle={item.subtitle}
          extraNode={
            item.extraNode
              ? item.extraNode
              : item.extraText && <Text secondary>{item.extraText}</Text>
          }
          subtitleNode={item.subtitleNode}
          belowNode={item.belowNode}
          showBelowNodeOnSelect={item.showBelowNodeOnSelect}
          isSelected={isSelected(item)}
          isDisabled={item.disabled}
          onToggle={() => {
            !item.disabled && onToggle(item);
          }}
        />
      ))}
    </ul>
  );
};

const SelectorListContent = ({
  dataHook,
  items,
  onToggle,
  emptyState,
  renderNoResults,
  isLoaded,
  isSelected,
  isEmpty,
  isSearching,
  noResultsFound,
  imageSize,
  imageShape,
  multiple,
  searchValue,
  loadMore,
  hasMore,
}) => {
  return (
    <div className={classes.content} data-hook={dataHook}>
      {((items.length === 0 && !isLoaded) || isSearching) && (
        <div className={classes.mainLoaderWrapper}>
          <Loader size="medium" dataHook={dataHooks.mainLoader} />
        </div>
      )}

      {isEmpty && (
        <div
          data-hook={dataHooks.emptyState}
          className={classes.emptyStateWrapper}
          children={emptyState}
        />
      )}

      {(!isLoaded || items.length > 0 || isSearching) && (
        <InfiniteScroll
          key={searchValue}
          loadMore={loadMore}
          hasMore={hasMore}
          useWindow={false}
          loader={
            items.length > 0 && (
              <div className={classes.nextPageLoaderWrapper}>
                <Loader size="small" dataHook={dataHooks.nextPageLoader} />
              </div>
            )
          }
        >
          <ListItems
            {...{
              items,
              isSelected,
              onToggle,
              imageSize,
              imageShape,
              multiple,
            }}
          />
        </InfiniteScroll>
      )}

      {noResultsFound && (
        <div
          data-hook={dataHooks.noResultsFoundState}
          className={classes.noResultsFoundStateWrapper}
          children={renderNoResults(searchValue)}
        />
      )}
    </div>
  );
};

SelectorListContent.defaultProps = {
  dataHook: dataHooks.content,
  emptyState: DEFAULT_EMPTY,
  renderNoResults: searchValue => (
    <div className={classes.defaultNoResultsFoundStateWrapper}>
      <Text>No items matched your search {`"${searchValue}"`}</Text>
    </div>
  ),
};

export default SelectorListContent;
