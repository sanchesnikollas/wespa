// ============================================
// WESPA Website - Hooks Export
// ============================================

export {
  useIntersectionObserver,
  useScrollSpy,
} from './useIntersectionObserver'
export type {
  UseIntersectionObserverOptions,
  UseIntersectionObserverReturn,
} from './useIntersectionObserver'

export {
  useMediaQuery,
  useBreakpoint,
  useBreakpointDown,
  useCurrentBreakpoint,
  useIsMobile,
  useIsDesktop,
  usePrefersReducedMotion,
  usePrefersDarkMode,
  breakpoints,
} from './useMediaQuery'
export type { Breakpoint } from './useMediaQuery'

export {
  useScroll,
  useScrollDepth,
  useScrollLock,
  useScrollTo,
  useScrolledPast,
} from './useScrollTracking'
export type { ScrollState } from './useScrollTracking'
