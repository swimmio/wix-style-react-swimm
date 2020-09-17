import React from 'react';
import PropTypes from 'prop-types';
import Loader from '../Loader/Loader';
import HeaderLayout from '../MessageBox/FunctionalLayout/HeaderLayout';
import FooterLayout from '../MessageBox/FunctionalLayout/FooterLayout';
import Selector from '../Selector/Selector';
import Search from '../Search/Search';
import InfiniteScroll from '../utils/InfiniteScroll';
import Text from '../Text';
import { dataHooks } from './ModalSelectorLayout.helpers';
import Checkbox from '../Checkbox';

import css from './ModalSelectorLayout.scss';

const DEFAULT_EMPTY = (
  <div className={css.defaultEmptyStateWrapper}>
    <Text>{"You don't have any items"}</Text>
  </div>
);

/**
 * Use this component when needed to select one / multiple items having complex descriptions.
 * E.g.: choosing products to promote via ShoutOuts
 */
export default class ModalSelectorLayout extends React.PureComponent {
  static displayName = 'ModalSelectorLayout';

  static propTypes = {
    /** applied as data-hook HTML attribute that can be used to create driver in testing */
    dataHook: PropTypes.string,

    /** Title of the modal */
    title: PropTypes.node,

    /** Fixed text displayed above the list */
    subtitle: PropTypes.node,

    /** OK button callback, called with the currently selected item  */
    onOk: PropTypes.func,

    /** X button callback */
    onClose: PropTypes.func,

    /** Cancel button callback */
    onCancel: PropTypes.func,

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

    /** Cancel button's text */
    cancelButtonText: PropTypes.string,

    /** OK button's text */
    okButtonText: PropTypes.string,

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
    noResultsFoundStateFactory: PropTypes.func,

    /** Number of items loaded each time the user scrolls down */
    itemsPerPage: PropTypes.number,

    /** Whether to display the search input or not */
    withSearch: PropTypes.bool,

    /** Search debounce in milliseconds */
    searchDebounceMs: PropTypes.number,

    /** Height CSS property, sets the height of the modal */
    height: PropTypes.string,

    /** Max-height CSS property, sets the maximum height of the modal. */
    maxHeight: PropTypes.string,

    /** display checkbox and allow multi selection */
    multiple: PropTypes.bool,

    /** string to be displayed in footer when `multiple` prop is used and no items are selected  */
    selectAllText: PropTypes.string,

    /** string to be displayed in footer when `multiple` prop is used and some or all items ar selected */
    deselectAllText: PropTypes.string,

    /** to disable confirm button */
    disableConfirmation: PropTypes.bool,

    /** callback that triggers on select and return selected item object*/
    onSelect: PropTypes.func,

    /** Used to display some side component in the footer.
     * Will override element select all in the footer when multiple=true */
    sideActions: PropTypes.node,
  };

  static defaultProps = {
    title: 'Choose Your Items',
    okButtonText: 'Select',
    cancelButtonText: 'Cancel',
    searchPlaceholder: 'Search...',
    imageSize: 'large',
    imageShape: 'rectangular',
    itemsPerPage: 50,
    withSearch: true,
    height: '100%',
    maxHeight: '100%',
    emptyState: DEFAULT_EMPTY,
    noResultsFoundStateFactory: searchValue => (
      <div className={css.defaultNoResultsFoundStateWrapper}>
        <Text>No items matched your search {`"${searchValue}"`}</Text>
      </div>
    ),
    selectAllText: 'Select All',
    deselectAllText: 'Deselect All',
    disableConfirmation: false,
  };

  state = {
    isLoaded: false,
    isSearching: false,
    items: [],
    searchValue: '',
    selectedItems: [],
    shouldShowNoResultsFoundState: false,
    isEmpty: false,
  };

  render() {
    const {
      dataHook,
      title,
      subtitle,
      onClose,
      searchPlaceholder,
      emptyState,
      noResultsFoundStateFactory,
      withSearch,
      height,
      maxHeight,
      searchDebounceMs,
    } = this.props;

    const {
      items,
      isLoaded,
      isEmpty,
      isSearching,
      searchValue,
      shouldShowNoResultsFoundState,
    } = this.state;

    return (
      <div
        data-hook={dataHook}
        className={css.modalContent}
        style={{ height, maxHeight }}
      >
        <HeaderLayout title={title} onCancel={onClose} />

        {isLoaded && !isEmpty && (
          <div className={css.subheaderWrapper}>
            {subtitle && (
              <div className={css.subtitleWrapper}>
                <Text dataHook={dataHooks.subtitle}>{subtitle}</Text>
              </div>
            )}

            {withSearch && (
              <div className={css.searchWrapper}>
                <Search
                  dataHook={dataHooks.search}
                  placeholder={searchPlaceholder}
                  onChange={this._onSearchChange}
                  onClear={this._onClear}
                  debounceMs={searchDebounceMs}
                  value={searchValue}
                />
              </div>
            )}
          </div>
        )}

        <div className={css.modalBody} data-hook={dataHooks.modalBody}>
          {((items.length === 0 && !isLoaded) || isSearching) && (
            <div className={css.mainLoaderWrapper}>
              <Loader size="medium" dataHook={dataHooks.mainLoader} />
            </div>
          )}

          {isEmpty && (
            <div
              data-hook={dataHooks.emptyState}
              className={css.emptyStateWrapper}
              children={emptyState}
            />
          )}

          {(!isLoaded || items.length > 0 || isSearching) && (
            <InfiniteScroll
              key={searchValue}
              loadMore={() => this._loadMore()}
              hasMore={this._hasMore()}
              useWindow={false}
              children={this._renderItems()}
              loader={
                items.length > 0 && (
                  <div className={css.nextPageLoaderWrapper}>
                    <Loader size="small" dataHook={dataHooks.nextPageLoader} />
                  </div>
                )
              }
            />
          )}

          {shouldShowNoResultsFoundState && (
            <div
              data-hook={dataHooks.noResultsFoundState}
              className={css.noResultsFoundStateWrapper}
              children={noResultsFoundStateFactory(searchValue)}
            />
          )}
        </div>

        {this._renderFooter()}
      </div>
    );
  }

  _renderItems() {
    const { items, selectedItems } = this.state;
    const { imageSize, imageShape, multiple, onSelect } = this.props;

    const isSelected = item => !!selectedItems.find(({ id }) => item.id === id);

    const onToggle = item => {
      this.setState({
        selectedItems: multiple
          ? isSelected(item)
            ? selectedItems.filter(({ id }) => item.id !== id)
            : selectedItems.concat(item)
          : [item],
      });

      if (onSelect) {
        onSelect(item);
      }
    };

    if (items.length > 0) {
      return (
        <ul data-hook={dataHooks.list} className={css.list}>
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
    }
  }

  _updateSearchValue = searchValue =>
    this.setState({
      searchValue,
      isSearching: true,
      items: [],
    });

  _onSearchChange = e => this._updateSearchValue(e.target.value);

  _onClear = () => this._updateSearchValue('');

  _loadMore() {
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
          const shouldShowNoResultsFoundState =
            newItems.length === 0 && searchValue;
          const isEmpty = newItems.length === 0 && !searchValue;

          this.setState({
            items: newItems,
            selectedItems,
            isLoaded: true,
            isEmpty,
            isSearching: false,
            totalCount,
            shouldShowNoResultsFoundState,
          });
        }
      },
    );
  }

  _hasMore() {
    const { items, isLoaded, totalCount, isSearching } = this.state;
    return (
      (items.length === 0 && !isLoaded) ||
      items.length < totalCount ||
      isSearching
    );
  }

  _getEnabledItems = items => items.filter(({ disabled }) => !disabled);

  _renderFooter = () => {
    const { selectedItems } = this.state;

    const {
      onCancel,
      onOk,
      cancelButtonText,
      okButtonText,
      multiple,
      disableConfirmation,
      sideActions,
    } = this.props;

    const enabledItems = this._getEnabledItems(selectedItems);

    return (
      <FooterLayout
        onCancel={onCancel}
        onOk={() => onOk(multiple ? enabledItems : enabledItems[0])}
        cancelText={cancelButtonText}
        confirmText={okButtonText}
        enableOk={!disableConfirmation && !!selectedItems.length}
        children={!sideActions && multiple && this._renderFooterSelector()}
        sideActions={sideActions}
      />
    );
  };

  _renderFooterSelector = () => {
    const { selectAllText, deselectAllText } = this.props;
    const { selectedItems, items } = this.state;

    const enabledItems = this._getEnabledItems(items);
    const selectedEnabled = selectedItems.filter(({ disabled }) => !disabled);

    const cases = {
      select: {
        text: selectAllText,
        number: enabledItems.length,
        onChange: () =>
          this.setState({ selectedItems: selectedItems.concat(enabledItems) }),
        indeterminate: false,
        checked: false,
      },

      deselect: {
        text: deselectAllText,
        number: selectedEnabled.length,
        onChange: () =>
          this.setState({
            selectedItems: selectedItems.filter(({ disabled }) => disabled),
          }),
        indeterminate: selectedEnabled.length < enabledItems.length,
        checked: true,
      },
    };

    const {
      text,
      number: num,
      onChange,
      checked,
      indeterminate,
    } = selectedEnabled.length ? cases.deselect : cases.select;

    return (
      <Checkbox
        dataHook="footer-selector"
        checked={checked}
        onChange={onChange}
        indeterminate={indeterminate}
      >
        <Text weight="normal">{` ${text} (${num})`}</Text>
      </Checkbox>
    );
  };
}
