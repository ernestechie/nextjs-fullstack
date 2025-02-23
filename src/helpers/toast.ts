import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

type MyAxiosError = AxiosError & {
  response: { data: { message: string } };
};

export const throwAxiosError = (err: unknown) => {
  const errorMessage = err as MyAxiosError;

  toast.error(
    errorMessage?.response?.data?.message || 'Unexpected error occured'
  );
};
