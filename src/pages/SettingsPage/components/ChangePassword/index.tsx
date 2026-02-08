import React, { useState } from 'react';
import './styles.scss';
import PasswordInput from '../../../../components/UI/PasswordInput';
import Button from '../../../../components/UI/Button';
import { updateSatellitePasswordById } from '../../../../api/satellites';
import * as Yup from 'yup';
import { validateForm } from '../../../../utils/validation/validateForm';

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatNewPassword, setRepeatNewPassword] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});

  const passwordValidation = Yup.string()
    .min(8, 'Password must be between 8 and 30 characters')
    .max(30, 'Password must be between 8 and 30 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Password must contain at least one digit')
    .matches(/^[A-Za-z0-9]+$/, 'Password must only contain Latin characters')
    .required('New password is required');

  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string().required('Old password is required'),
    newPassword: passwordValidation,
    repeatNewPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), undefined], 'Passwords must match')
      .required('Repeat new password is required'),
  });

  const onHandleChangePassword = async () => {
    const isValid = await validateForm(
      validationSchema,
      {
        oldPassword,
        newPassword,
        repeatNewPassword,
      },
      {
        oldPassword: (error) => setErrors((prev) => ({ ...prev, oldPassword: error })),
        newPassword: (error) => setErrors((prev) => ({ ...prev, newPassword: error })),
        repeatNewPassword: (error) => setErrors((prev) => ({ ...prev, repeatNewPassword: error })),
      }
    );

    if (!isValid) return;

    const satelliteId = localStorage.getItem('loginId');
    if (satelliteId) {
      updateSatellitePasswordById(+satelliteId, {
        old_password: oldPassword,
        new_password: newPassword,
        new_password2: repeatNewPassword,
      }).then(() => {
        setOldPassword('');
        setNewPassword('');
        setRepeatNewPassword('');
        setErrors({});
      });
    }
  };

  return (
    <div className="change-password">
      <PasswordInput
        label="Current Password"
        placeholder="Enter your password"
        value={oldPassword}
        onChange={(e) => {
          setOldPassword(e.target.value);
          setErrors((prev) => ({ ...prev, oldPassword: null }));
        }}
        errorMessage={errors.oldPassword}
      />
      <PasswordInput
        label="New Password"
        placeholder="Enter your new password"
        value={newPassword}
        onChange={(e) => {
          setNewPassword(e.target.value);
          setErrors((prev) => ({ ...prev, newPassword: null }));
        }}
        errorMessage={errors.newPassword}
      />
      <PasswordInput
        label="Confirm New Password"
        placeholder="Repeat new password"
        value={repeatNewPassword}
        onChange={(e) => {
          setRepeatNewPassword(e.target.value);
          setErrors((prev) => ({ ...prev, repeatNewPassword: null }));
        }}
        errorMessage={errors.repeatNewPassword}
      />
      <Button label="Change Password" onClick={onHandleChangePassword} fullWidth />
    </div>
  );
}
