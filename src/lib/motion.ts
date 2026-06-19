export const easeOutExpo = [0.16, 1, 0.3, 1] as const;

export const durations = {
  hover: 0.18,
  dropdown: 0.24,
  overlay: 0.2,
  drawer: 0.28,
};

export const dropdownVariants = {
  closed: { opacity: 0, y: -12 },
  open: { opacity: 1, y: 0 },
};

export const overlayVariants = {
  closed: { opacity: 0 },
  open: { opacity: 1 },
};
