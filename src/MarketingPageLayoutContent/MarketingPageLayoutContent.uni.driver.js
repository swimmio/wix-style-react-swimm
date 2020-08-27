import { baseUniDriverFactory } from 'wix-ui-test-utils/base-driver';
import { dataHooks } from './constants';
import { textUniDriverFactory } from '../Text/Text.uni.driver';
import { headingUniDriverFactory } from '../Heading/Heading.uni.driver';

import { findBaseByExactHook } from '../../test/utils';

export const marketingPageLayoutContentDriverFactory = (base, body) => {
  return {
    ...baseUniDriverFactory(base, body),

    /** Returns true if an outline is exist. */
    hasOverline: async () =>
      await findBaseByExactHook(base, dataHooks.overlineContainer).exists(),

    /** Returns the overline text. */
    getOverlineText: async () =>
      (
        await textUniDriverFactory(
          await findBaseByExactHook(base, dataHooks.overline),
        )
      ).getText(),

    /** Returns true if an outline is exist. */
    hasTitle: async () =>
      await findBaseByExactHook(base, dataHooks.titleContainer).exists(),

    /** Returns the title text. */
    getTitleText: async () =>
      (
        await headingUniDriverFactory(
          await findBaseByExactHook(base, dataHooks.title),
        )
      ).getText(),

    /** Returns true if a subtitle is exist. */
    hasSubtitle: async () =>
      await findBaseByExactHook(base, dataHooks.subtitleContainer).exists(),

    /** Returns the subtitle text. */
    getSubtitleText: async () =>
      (
        await headingUniDriverFactory(
          await findBaseByExactHook(base, dataHooks.subtitle),
        )
      ).getText(),

    /** Returns true if a content is exist. */
    hasContent: async () =>
      await findBaseByExactHook(base, dataHooks.contentContainer).exists(),

    /** Returns the content text. */
    getContentText: async () =>
      (
        await textUniDriverFactory(
          await findBaseByExactHook(base, dataHooks.content),
        )
      ).getText(),

    /** Returns true if an actions is exist. */
    hasActions: async () =>
      await findBaseByExactHook(base, dataHooks.actions).exists(),

    /** Checks that a node with the provided predicate exists */
    childExists: async predicate => base.$(predicate).exists(),
  };
};
