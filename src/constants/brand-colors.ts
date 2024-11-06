export const brandColors = {
  PRIMARY: getComputedStyle(document.documentElement)
    .getPropertyValue('--q-primary')
    .trim(),
  SECONDARY: getComputedStyle(document.documentElement)
    .getPropertyValue('--q-secondary')
    .trim(),
  ACCENT: getComputedStyle(document.documentElement)
    .getPropertyValue('--q-accent')
    .trim(),
  DARK: getComputedStyle(document.documentElement)
    .getPropertyValue('--q-dark')
    .trim(),
  DARK_PAGE: getComputedStyle(document.documentElement)
    .getPropertyValue('--q-dark-page')
    .trim(),
  LIGHT: getComputedStyle(document.documentElement)
    .getPropertyValue('--q-light')
    .trim(),
  POSITIVE: getComputedStyle(document.documentElement)
    .getPropertyValue('--q-positive')
    .trim(),
  NEGATIVE: getComputedStyle(document.documentElement)
    .getPropertyValue('--q-negative')
    .trim(),
  INFO: getComputedStyle(document.documentElement)
    .getPropertyValue('--q-info')
    .trim(),
  WARNING: getComputedStyle(document.documentElement)
    .getPropertyValue('--q-warning')
    .trim(),
};
