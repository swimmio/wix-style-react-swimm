import { baseUniDriverFactory } from 'wix-ui-test-utils/base-driver';
import { dataHooks } from './constants';
import { textUniDriverFactory } from '../Text/Text.uni.driver';
import { findBaseByHook } from '../../test/utils';

export const testimonialListDriverFactory = (base, body) => {
  const getTestimonials = () =>
    base.$$(`[data-hook="${dataHooks.testimonial}"]`);

  return {
    ...baseUniDriverFactory(base, body),

    /** Returns the number of the testimonials that exist in the footer */
    getNumberOfTestimonials: async () => await getTestimonials().count(),

    /** Returns true if the testimonial has an avatar.
     * testimonialIndex - represents the index of the testimonial in the testimonials array (starts from 0). */
    hasTestimonialAvatar: async testimonialIndex =>
      await findBaseByHook(
        base,
        `${dataHooks.testimonialAvatar}${testimonialIndex}`,
      ).exists(),

    /** Returns true if the testimonial has a text.
     * testimonialIndex - represents the index of the testimonial in the testimonials array (starts from 0). */
    hasTestimonialText: async testimonialIndex =>
      await findBaseByHook(
        base,
        `${dataHooks.testimonialText}${testimonialIndex}`,
      ).exists(),

    /** Return the testimonial's text.
     * testimonialIndex - represents the index of the feature in the features array (starts from 0).*/
    getTestimonialText: async testimonialIndex =>
      (
        await textUniDriverFactory(
          await findBaseByHook(
            base,
            `${dataHooks.testimonialText}${testimonialIndex}`,
          ),
        )
      ).getText(),

    /** Returns true if the testimonial has an author name.
     * testimonialIndex - represents the index of the testimonial in the testimonials array (starts from 0). */
    hasTestimonialAuthorName: async testimonialIndex =>
      await findBaseByHook(
        base,
        `${dataHooks.testimonialAuthorName}${testimonialIndex}`,
      ).exists(),

    /** Return the testimonial's author name.
     * testimonialIndex - represents the index of the feature in the features array (starts from 0).*/
    getTestimonialAuthorName: async testimonialIndex =>
      (
        await textUniDriverFactory(
          await findBaseByHook(
            base,
            `${dataHooks.testimonialAuthorName}${testimonialIndex}`,
          ),
        )
      ).getText(),
  };
};
