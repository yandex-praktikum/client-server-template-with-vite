export type ResponseStatus = {
  ok: string;
};

export type APIError = {
  reason: string;
  status: string;
};

export type LoginRequestData = {
  login: string;
  password: string;
};

export type GetUserByLoginRequestData = {
  login: string;
};
