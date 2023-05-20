import { ResetPasswordPayload, SendFormData } from '@interfaces/authentication.interface';

export const transformToChangePassword = (
  event: SendFormData,
  mailingUserToken: string,
  userId: string
): ResetPasswordPayload => ({
  userid: userId,
  password: event.data.password as string,
  passwordconfirmation: event.data.repeatPassword as string,
  MailingUserToken: mailingUserToken,
});


export const buildNewAccount = (event: SendFormData): FormData => {
  const formData = new FormData();
  let newDate: Date | null = null;
  if (event.data.year?.value) {
    newDate = new Date(
      event.data.year.value as number,
      event.data.month.value as number,
      event.data.day.value as number
     );
  }
  const payloadJson = {
    email: event.data.email,
    password: event.data.password,
    passwordConfirmation: event.data.repeatPassword,
    userName: event.data.userName,
    gender: event.data.gender?.value,
    birthdayDate: newDate ?? '',
    country: event.data.country?.value,
  }
  formData.append('payloadJson', JSON.stringify(payloadJson));
  formData.append('useravatar', event.data.imageAvatar as Blob);
  return formData;
}
