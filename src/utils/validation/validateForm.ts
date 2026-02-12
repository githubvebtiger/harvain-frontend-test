import * as Yup from 'yup';

export async function validateForm(
  schema: Yup.ObjectSchema<any>,
  data: { [key: string]: any },
  setErrorHandlers: { [key: string]: (error: string | null) => void }
): Promise<boolean> {
  try {
    Object.values(setErrorHandlers).forEach(setError => setError(null));

    await schema.validate(data, {abortEarly: false});

    return true;
  } catch (validationErrors) {

    if (validationErrors instanceof Yup.ValidationError) {
      validationErrors.inner.forEach((err) => {
        const setError = setErrorHandlers[err.path as string];
        if (setError) setError(err.message);
      });
    }

    return false;
  }
}
