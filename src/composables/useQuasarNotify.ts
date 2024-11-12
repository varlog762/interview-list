import { useQuasar } from 'quasar';

import { getErrorMessage } from 'src/utils';
import { ToastTypesEnum } from 'src/enums';

/**
 * Notify user using Quasar's Notify plugin
 * @param type - type of notification: positive, negative, warning, info
 * @param message - message of notification
 */
export default () => {
  const $q = useQuasar();

  return (message: Error | string, type: string = ToastTypesEnum.NEGATIVE) => {
    if (message instanceof Error) {
      message = getErrorMessage(message);
    }

    $q.notify({
      type,
      color: type,
      timeout: 2000,
      message,
    });
  };
};
