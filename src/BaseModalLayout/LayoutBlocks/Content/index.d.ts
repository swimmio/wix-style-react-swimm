import * as React from 'react';
import { ScrollableContainerCommonProps } from '../../../common';

export interface ContentProps {
  className?: string;
  dataHook?: string;
  content?: string | React.ReactNode;
  contentHideDividers?: boolean;
  scrollProps?: ScrollableContainerCommonProps;
  overflow?: React.CSSProperties['overflow'];
}

export const Content: React.FunctionComponent<ContentProps>;
