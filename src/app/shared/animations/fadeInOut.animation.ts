import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

export const FADE_IN_OUT = trigger('fadeInOut', [
  state(
    'void',
    style({
      opacity: 0,
    })
  ),
  transition('void <=> *', animate(200)),
]);
