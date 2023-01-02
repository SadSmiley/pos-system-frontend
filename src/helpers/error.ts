import { Notify } from 'quasar';
import { AxiosError } from 'axios';

export default class ErrorHandler {
  static handle(error: Error) {
    try {
      const err = error as AxiosError;
      if (err) {
        const messages = JSON.parse(err?.response?.data?.message);
        messages.forEach((message: string) => {
          Notify.create({
            message,
            color: 'negative',
          });
        });
      }
    } catch (parseError) {
      Notify.create({
        message: error.response.data.message,
        color: 'negative',
      });
    }
  }
}
