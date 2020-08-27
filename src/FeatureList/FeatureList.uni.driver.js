import { baseUniDriverFactory } from 'wix-ui-test-utils/base-driver';
import { dataHooks } from './constants';
import { textUniDriverFactory } from '../Text/Text.uni.driver';
import { findBaseByHook } from '../../test/utils';

export const featureListDriverFactory = (base, body) => {
  const getFeatures = () => base.$$(`[data-hook="${dataHooks.feature}"]`);

  return {
    ...baseUniDriverFactory(base, body),

    /** Returns the number of the features that exist in the footer */
    getNumberOfFeatures: async () => await getFeatures().count(),

    /** Returns true if the feature has a title.
     * featureIndex - represents the index of the feature in the features array (starts from 0). */
    hasFeatureTitle: async featureIndex =>
      await findBaseByHook(
        base,
        `${dataHooks.featureTitle}${featureIndex}`,
      ).exists(),

    /** Returns the feature's title.
     * featureIndex - represents the index of the feature in the features array (starts from 0).*/
    getFeatureTitle: async featureIndex =>
      (
        await textUniDriverFactory(
          await findBaseByHook(
            base,
            `${dataHooks.featureTitle}${featureIndex}`,
          ),
        )
      ).getText(),

    /** Returns true if the feature has a text.
     * featureIndex - represents the index of the feature in the features array (starts from 0). */
    hasFeatureText: async featureIndex =>
      await findBaseByHook(
        base,
        `${dataHooks.featureText}${featureIndex}`,
      ).exists(),

    /** Return the feature's text.
     * featureIndex - represents the index of the feature in the features array (starts from 0).*/
    getFeatureText: async featureIndex =>
      (
        await textUniDriverFactory(
          await findBaseByHook(base, `${dataHooks.featureText}${featureIndex}`),
        )
      ).getText(),

    /** Returns true if the feature has an image node with the given predicate.
     * featureIndex - represents the index of the feature in the features array (starts from 0).
     * predicate - a selector predicate for the image node
     * */
    hasFeatureImage: async (featureIndex, predicate) =>
      await findBaseByHook(base, `${dataHooks.featureImage}${featureIndex}`)
        .$(predicate)
        .exists(),
  };
};
