import * as React from 'react';

export interface TestimonialListProps {
  dataHook?: string;
  className?: string;
  testimonials?: TestimonialType[];
}

export default class TestimonialList extends React.PureComponent<TestimonialListProps>{}

export type TestimonialType = {
  avatar: React.ReactNode;
  text: string;
  authorName: string;
};
