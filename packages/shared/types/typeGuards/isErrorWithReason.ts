type TErrorWithReason = {
  data: {
    reason: string;
  };
};

export const isErrorWithReason = (err: unknown): err is TErrorWithReason =>
  !!err &&
  typeof err === 'object' &&
  'data' in err &&
  !!err.data &&
  typeof err.data === 'object' &&
  'reason' in err.data;
