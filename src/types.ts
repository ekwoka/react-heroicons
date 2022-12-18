import { FunctionalComponent, JSX, Ref } from 'preact';
import { JSXInternal } from 'preact/src/jsx';

export type HeroIconAttrs = JSXInternal.SVGAttributes & JSXInternal.HTMLAttributes;

export type HeroIcon = FunctionalComponent<
  Omit<JSX.SVGAttributes<SVGElement> & JSX.HTMLAttributes<EventTarget>, 'ref'> & {
    ref?: Ref<SVGSVGElement>;
  }
>;
