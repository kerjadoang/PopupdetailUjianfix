interface ArrayReplaceOptions {
  pushWhenEmpty?: boolean;
}
interface ArrayPushOrRemoveOptions<T> {
  customCondition?: (data: T, index: number) => boolean;
  replaceWhenExist?: boolean;
}
