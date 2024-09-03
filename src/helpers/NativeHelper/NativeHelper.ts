import {NativeHelperModule} from './utils';

class NativeHelper {
  private static _instance: NativeHelper;

  private constructor() {
    // Private constructor to prevent instantiation
  }

  public static get instance(): NativeHelper {
    if (!this._instance) {
      this._instance = new NativeHelper();
    }
    return this._instance;
  }

  static forceQuitApp() {
    NativeHelperModule.forceQuitApp();
  }
}

export {NativeHelper};
