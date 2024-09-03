import {useEffect} from 'react';

export const useAsyncEffect = (
  effect: CallBack<Promise<any>> | React.EffectCallback,
  deps?: React.DependencyList | undefined,
) => {
  useEffect(() => {
    const cleanupPromise = effect();

    return () => {
      if (cleanupPromise instanceof Promise) {
        cleanupPromise.then(cleanup => cleanup && cleanup());
      }
    };
  }, deps);
};
