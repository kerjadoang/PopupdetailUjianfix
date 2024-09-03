import {NativeModule} from 'react-native';

type ScreenLockEventType = 'ScreenLockState' | 'ScreenLock' | 'ScreenUnlock';
type ScreenLockStateType = 'lock' | 'unlock';
type ScreenLockEvent = {
  type: ScreenLockStateType;
};
type ScreenLockListenerEvent = (event: ScreenLockEvent) => void;

interface IScreenLockModule extends NativeModule {
  subscribeScreenLock: CallBack<Promise<String>>;
  unSubscribeScreenLock: CallBack<Promise<String>>;
}
