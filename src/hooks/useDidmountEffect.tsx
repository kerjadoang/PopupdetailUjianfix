/* eslint-disable react-hooks/exhaustive-deps */
import {DependencyList, EffectCallback, useEffect, useRef} from 'react';

const useDidMountEffect = (
  effect: EffectCallback,
  deps: DependencyList | undefined,
) => {
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      return effect();
    } else {
      isMounted.current = true;
    }
  }, deps);

  // reset on unmount; in React 18, components can mount again
  useEffect(
    () => () => {
      isMounted.current = false;
    },
    [],
  );
};

export default useDidMountEffect;
