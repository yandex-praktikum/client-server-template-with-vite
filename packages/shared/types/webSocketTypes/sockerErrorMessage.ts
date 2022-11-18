import type { SOCKET_ERRORS } from '../../consts';

type TSocketErrorKey = keyof typeof SOCKET_ERRORS;
export type TSocketErrorMessage = typeof SOCKET_ERRORS[TSocketErrorKey];
