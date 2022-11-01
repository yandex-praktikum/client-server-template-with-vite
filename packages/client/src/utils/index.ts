import { CUSTOM_EVENTS } from './enums';

export const dispatchCursorHoverEvent = () => {
  dispatchEvent(
    new CustomEvent(CUSTOM_EVENTS.CURSOR_HOVER, {
      bubbles: true,
    })
  );
};
