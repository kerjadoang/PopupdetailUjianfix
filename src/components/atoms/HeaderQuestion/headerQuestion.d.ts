type IValidateTime = {
  validate: boolean;
  url?: string;
  interval?: number;
};

type IResValidateTime = {
  end_time?: string;
  remaining_time?: number;
  isTimeout?: boolean;
};
