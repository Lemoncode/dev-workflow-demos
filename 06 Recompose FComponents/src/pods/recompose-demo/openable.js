import {withStateHandlers} from "recompose";

export const openable = withStateHandlers(
  // state
  {
    isOpen: false,
  }, {
    // Handler creator -> {...props, ...state}
    toggleOpen: ({isOpen, ...restProps}) =>
      //handler - it's result will call setState of newly created hoc.
      () => ({
        isOpen: !isOpen
      }),
    // optional
    open: () => ({isOpen: true}),
    close: () => ({isOpen: false}),
  }
);