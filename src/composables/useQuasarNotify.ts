import { useQuasar } from 'quasar';

/**
 * Notify user using Quasar's Notify plugin
 * @param type - type of notification: positive, negative, warning, info
 * @param message - message of notification
 */
export default () => {
  const $q = useQuasar();

  return (type: string, message: string) => {
    $q.notify({
      type,
      color: type,
      timeout: 2000,
      message,
    });
  };
};
