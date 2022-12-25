import { Notify } from 'quasar';

export default class ErrorHandler {
  static handle(error: Error) {
    try {
      const messages = JSON.parse(error.response.data.message);
      console.log(messages);
    } catch (parseError) {
      Notify.create({
        message: error.response.data.message,
        color: 'negative',
      });
    }
  }
}
