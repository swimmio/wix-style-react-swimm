import React from 'react';
import PropTypes from 'prop-types';
import SelectorListContent from './Content';
import SelectorListSearch from './Search';

import Box from '../Box';

/**
 * Use this component when needed to select one / multiple items having complex descriptions.
 * E.g.: choosing products to promote via ShoutOuts
 */
export default class SelectorList extends React.PureComponent {
  static displayName = 'SelectorList';

  static propTypes = {
    /** applied as data-hook HTML attribute that can be used to create driver in testing */
    dataHook: PropTypes.string,

    /**
     * paging function that should have a signature of
     * ```typescript
     * (searchQuery: string, offset: number, limit: number) =>
     * Promise<{
     *  items: Array<{
     *    id: number | string,
     *    title: node,
     *    subtitle?: string,
     *    extraText?: string,
     *    extraNode?: node,
     *    disabled?: boolean // show item as disabled, dont count it in "select all", exclude from `onOk`
     *    selected?: boolean // force item as selected
     *    image?: node
     *    subtitleNode?: node,
     *    belowNode?: node,
     *    showBelowNodeOnSelect?: boolean,
     *  }>,
     *  totalCount: number
     * }>
     * ```
     * `offset` - next requested item's index<br>
     * `limit` - number of items requested<br>
     * `totalCount` - total number of items that suffice the current search query
     * */
    dataSource: PropTypes.func.isRequired,

    /** Image icon size */
    imageSize: PropTypes.oneOf([
      'tiny',
      'small',
      'portrait',
      'large',
      'cinema',
    ]),

    /**
     * Image icon shape, `rectangular` or `circle`.<br>
     * NOTE: `circle` is not compatible with `imageSize` of `portrait` or `cinema`
     * */
    imageShape: (props, propName, componentName) => {
      if (
        ['portrait', 'cinema'].includes(props.imageSize) &&
        props[propName] === 'circle'
      ) {
        return new Error(
          `${componentName}: prop "imageSize" with value of "${props.imageSize}" is incompatible with prop imageShape with value of "circle" — use "rectangular" instead.`,
        );
      }
    },

    /** Placeholder text of the search input */
    searchPlaceholder: PropTypes.string,

    /**
     * Component/element that will be rendered when there is nothing to display,
     * i.e. empty `{items:[], totalCount: 0}` was returned on the first call to `dataSource`
     * */
    emptyState: PropTypes.node.isRequired,

    /**
     * Function that will get the current `searchQuery` and should return the component/element
     * that will be rendered when there are no items that suffice the entered search query
     *  */
    renderNoResults: PropTypes.func,

    /** Number of items loaded each time the user scrolls down */
    itemsPerPage: PropTypes.number,

    /** Whether to display the search input or not */
    withSearch: PropTypes.bool,

    /** Search debounce in milliseconds */
    searchDebounceMs: PropTypes.number,

    /** Height classes property, sets the height of the list container */
    height: PropTypes.string,

    /** Max-height classes property, sets the maximum height of the list container. */
    maxHeight: PropTypes.string,

    /** display checkbox and allow multi selection */
    multiple: PropTypes.bool,

    /** callback that triggers on select and return selected item object*/
    onSelect: PropTypes.func,
  };

  static defaultProps = {
    searchPlaceholder: 'Search...',
    imageSize: 'large',
    imageShape: 'rectangular',
    itemsPerPage: 50,
    withSearch: true,
    height: '100%',
    maxHeight: '100%',
  };

  state = {
    isLoaded: false,
    isSearching: false,
    items: [],
    searchValue: '',
    selectedItems: [],
    noResultsFound: false,
    isEmpty: false,
  };

  render() {
    const {
      dataHook,
      searchPlaceholder,
      emptyState,
      renderNoResults,
      withSearch,
      height,
      maxHeight,
      searchDebounceMs,
      imageSize,
      imageShape,
      multiple,
      children,
    } = this.props;

    const {
      items,
      isLoaded,
      isEmpty,
      isSearching,
      searchValue,
      noResultsFound,
      selectedItems,
    } = this.state;

    const hasMore = this._hasMore();

    const searchProps = {
      shouldRenderSearch: isLoaded && !isEmpty && withSearch,
      placeholder: searchPlaceholder,
      onChange: this._onSearchChange,
      onClear: this._onClear,
      debounceMs: searchDebounceMs,
      value: searchValue,
    };

    const contentProps = {
      dataHook,
      items,
      selectedItems,
      onToggle: this._onToggle,
      emptyState,
      renderNoResults,
      isLoaded,
      isEmpty,
      isSearching,
      noResultsFound,
      imageSize,
      imageShape,
      multiple,
      loadMore: this._loadMore,
      hasMore,
      isSelected: this._isSelected,
    };

    if (typeof children === 'function') {
      return children({
        searchProps,
        contentProps,
        selectAll: this._selectAll,
        deselectAll: this._deselectAll,
        toggleItem: this._toggleItem,
      });
    }

    return (
      <Box
        direction="vertical"
        {...{
          dataHook,
          height,
          maxHeight,
        }}
      >
        <SelectorListSearch {...searchProps} />
        <SelectorListContent {...contentProps} />
      </Box>
    );
  }

  _updateSearchValue = searchValue =>
    this.setState({
      searchValue,
      isSearching: true,
      items: [],
    });

  _onSearchChange = e => this._updateSearchValue(e.target.value);

  _onClear = () => this._updateSearchValue('');

  _isSelected = item => {
    const { selectedItems } = this.state;
    return !!selectedItems.find(({ id }) => item.id === id);
  };

  _toggleItem = item => {
    const { multiple } = this.props;
    this.setState(({ selectedItems }) => ({
      selectedItems: multiple
        ? this._isSelected(item)
          ? selectedItems.filter(({ id }) => item.id !== id)
          : selectedItems.concat(item)
        : [item],
    }));
  };

  _onToggle = item => {
    const { onSelect } = this.props;
    this._toggleItem(item);

    if (onSelect) {
      onSelect(item);
    }
  };

  _selectAll = () => {
    const { selectedItems, items } = this.state;
    const enabledItems = this._getEnabledItems(items);

    this.setState({ selectedItems: selectedItems.concat(enabledItems) });
  };

  _deselectAll = () =>
    this.setState(({ selectedItems }) => ({
      selectedItems: selectedItems.filter(({ disabled }) => disabled),
    }));

  _loadMore = () => {
    const { dataSource, itemsPerPage } = this.props;
    const { items, searchValue } = this.state;

    dataSource(searchValue, items.length, itemsPerPage).then(
      ({ items: itemsFromNextPage, totalCount }) => {
        if (this.state.searchValue === searchValue) {
          // react only to the resolve of the relevant search
          const newItems = [...items, ...itemsFromNextPage];
          const selectedItems = this.state.selectedItems.concat(
            itemsFromNextPage.filter(({ selected }) => selected),
          );
          const noResultsFound = newItems.length === 0 && searchValue;
          const isEmpty = newItems.length === 0 && !searchValue;

          this.setState({
            items: newItems,
            selectedItems,
            isLoaded: true,
            isEmpty,
            isSearching: false,
            totalCount,
            noResultsFound,
          });
        }
      },
    );
  };

  _hasMore() {
    const { items, isLoaded, totalCount, isSearching } = this.state;
    return (
      (items.length === 0 && !isLoaded) ||
      items.length < totalCount ||
      isSearching
    );
  }

  _getEnabledItems = items => items.filter(({ disabled }) => !disabled);
}
