import * as React from 'react';
import BadgeSelectOption from '../BadgeSelect/index';


export type BadgeSelectItemBuilderFn = (data: {
  id: string | number;
  text: React.ReactNode;
  subtitle?: string;
  skin: BadgeSelectItemSkin;
  ellipsis?: boolean;
}) => {
  overrideStyle: true;
  id: string | number;
  value: (props?: Partial<BadgeSelectOption>) => React.ReactNode;
};

export type BadgeSelectItemSkin =
  | 'general'
  | 'secondaryText'
  | 'danger'
  | 'standard'
  | 'backgroundSecondary'
  | 'primaryLightText'
  | 'success'
  | 'warning'
  | 'urgent'
  | 'neutral'
  | 'neutralStandard'
  | 'mainMutedHover'
  | 'neutralSuccess'
  | 'successMutedHover'
  | 'neutralDanger'
  | 'dangerMutedHover'
  | 'neutralLight'
  | 'warningLight'
  | 'premium';

export const badgeSelectItemBuilder: BadgeSelectItemBuilderFn;
