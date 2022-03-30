import { TFunction } from 'react-i18next';

export type BasePageProps = {
  t: TFunction;
  lang: string;
};

export interface RestResponse<T = any> {
  status: 'success' | 'fail';
  data?: T;
  message?: string;
}
