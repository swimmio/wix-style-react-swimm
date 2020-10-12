import * as React from 'react';

export type SelectorListSingleProps = {
  multiple?: false;
};

export type SelectorListMultipleProps = {
  multiple: true;
};

export type SelectorListProps = SelectorListCommonProps &
  (SelectorListSingleProps | SelectorListMultipleProps);

export type SelectorListCommonProps = {
  dataHook?: string;
  dataSource: SelectorListDatasourceFn;
  imageSize?: SelectorListImageSize;
  imageShape?: SelectorListImageShape;
  searchPlaceholder?: string;
  emptyState?: React.ReactNode;
  noResultsFoundStateFactory?: (searchValue: string) => React.ReactNode;
  itemsPerPage?: number;
  withSearch?: boolean;
  searchDebounceMs?: number;
  height?: string;
  maxHeight?: string;
  onSelect?: (item: SelectorListItem) => void;
};

export default class SelectorList extends React.PureComponent<
  SelectorListProps
> {}

export type SelectorListDatasourceFn = (
  searchQuery: string,
  offset: number,
  limit: number,
) => Promise<{ items: SelectorListItem[]; totalCount: number }>;

export interface SelectorListItem {
  id: number | string;
  title: React.ReactNode;
  subtitle?: string;
  extraText?: string;
  extraNode?: React.ReactNode;
  disabled?: boolean;
  selected?: boolean;
  image?: React.ReactNode;
  subtitleNode?: React.ReactNode;
  belowNode?: React.ReactNode;
  showBelowNodeOnSelect?: boolean;
}

export type SelectorListImageSize =
  | 'tiny'
  | 'small'
  | 'portrait'
  | 'large'
  | 'cinema';

export type SelectorListImageShape = 'rectangular' | 'circle';
