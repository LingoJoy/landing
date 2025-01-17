export interface IAxiosError {
  message?: string;
  status?: number;
}

export enum EDefaultAxiosError {
  NEED_SUBSCRIPTION = 'You need an active subscription to access this resource.',
  CODE_NOT_FOUND = 'code not found'
}
