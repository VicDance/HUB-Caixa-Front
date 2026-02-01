import { useNearScreen } from '@/hooks/useNearScreen';
import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('useNearScreen', () => {
  let observeCallback: IntersectionObserverCallback;

  beforeEach(() => {
    vi.clearAllMocks();

    global.IntersectionObserver = vi.fn().mockImplementation(function (
      this: IntersectionObserver,
      callback: IntersectionObserverCallback,
    ) {
      observeCallback = callback;
      this.observe = vi.fn();
      this.disconnect = vi.fn();
      this.unobserve = vi.fn();
      return this;
    }) as unknown as typeof IntersectionObserver;
  });

  it('should initialize with isNear equals false', () => {
    const { result } = renderHook(() => useNearScreen());
    expect(result.current.isNear).toBe(false);
  });

  it('should set isNear to true when instersects element', () => {
    const { result, rerender } = renderHook(
      ({ offset }) => useNearScreen(offset),
      { initialProps: { offset: '200px' } },
    );

    Object.defineProperty(result.current.elementRef, 'current', {
      value: document.createElement('div'),
      configurable: true,
    });

    rerender({'offset': '205px'});

    act(() => {
      observeCallback(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      );
    });

    expect(result.current.isNear).toBe(true);
  });

  it('should disconnect observer when element is visible', () => {
    const disconnectSpy = vi.fn();

    global.IntersectionObserver = vi.fn().mockImplementation(function (
      this: IntersectionObserver,
      callback: IntersectionObserverCallback,
    ) {
      observeCallback = callback;
      this.observe = vi.fn();
      this.disconnect = disconnectSpy;
      return this;
    }) as unknown as typeof IntersectionObserver;

    const { result, rerender } = renderHook(
      ({ offset }) => useNearScreen(offset),
      { initialProps: { offset: '200px' } },
    );

    Object.defineProperty(result.current.elementRef, 'current', {
      value: document.createElement('div'),
      configurable: true,
    });

    rerender({ offset: '205px' });

    act(() => {
      observeCallback(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      );
    });

    expect(disconnectSpy).toHaveBeenCalled();
  });
});
