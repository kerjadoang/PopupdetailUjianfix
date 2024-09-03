import {NativeEventEmitter, NativeModules} from 'react-native';
import {
  ScreenLockEventType,
  ScreenLockListenerEvent,
  IScreenLockModule,
} from './screenlockType';
import {EmitterSubscription} from 'react-native';

const useScreenLock = () => {
  const ScreenLockModule: IScreenLockModule = NativeModules.ScreenLockModule;

  const screenLockModuleEmitter = new NativeEventEmitter(ScreenLockModule);

  const addListener = (
    eventType: ScreenLockEventType,
    listener: ScreenLockListenerEvent,
  ) => {
    return screenLockModuleEmitter.addListener(eventType, listener);
  };

  const subscribeScreenLock = async () => {
    try {
      await ScreenLockModule.subscribeScreenLock();
    } catch (error) {}
  };

  const unSubscribeScreenLock = async () => {
    try {
      await ScreenLockModule.unSubscribeScreenLock?.();
    } catch (error) {}
  };

  const removeAll = async (...subscriptions: EmitterSubscription[]) => {
    await unSubscribeScreenLock();
    if (!subscriptions) {
      return;
    }

    for (const subs of subscriptions) {
      subs?.remove?.();
    }
  };

  return {
    addListener,
    subscribeScreenLock,
    unSubscribeScreenLock,
    removeAll,
  };
};

export {useScreenLock};
