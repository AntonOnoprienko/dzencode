'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '@/constants/schemas/auth';
import { useAppDispatch } from '@/store/hooks';
import { setUser } from '@/store/slices/user-slice';

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface Props {
  onClose?: () => void;
}

export const RegisterForm: React.FC<Props> = ({ onClose }) => {
  const dispatch = useAppDispatch();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setServerError(null);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        setServerError(result.error || 'Ошибка регистрации');
        return;
      }

      localStorage.setItem('userName', result.user.name);
      dispatch(setUser(result.user.name));

      onClose?.();
    } catch (err) {
      console.error('Ошибка регистрации', err);
      setServerError('Не удалось связаться с сервером');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4">
      {serverError && <div className="alert alert-danger">{serverError}</div>}

      <div className="mb-3">
        <label className="form-label">Имя</label>
        <input
          type="text"
          className={`form-control ${errors.name ? 'is-invalid' : ''}`}
          {...register('name')}
        />
        {errors.name && (
          <div className="invalid-feedback">{errors.name.message}</div>
        )}
      </div>

      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          type="email"
          className={`form-control ${errors.email ? 'is-invalid' : ''}`}
          {...register('email')}
        />
        {errors.email && (
          <div className="invalid-feedback">{errors.email.message}</div>
        )}
      </div>

      <div className="mb-3">
        <label className="form-label">Пароль</label>
        <input
          type="password"
          className={`form-control ${errors.password ? 'is-invalid' : ''}`}
          {...register('password')}
        />
        {errors.password && (
          <div className="invalid-feedback">{errors.password.message}</div>
        )}
      </div>

      <div className="mb-3">
        <label className="form-label">Подтвердите пароль</label>
        <input
          type="password"
          className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
          {...register('confirmPassword')}
        />
        {errors.confirmPassword && (
          <div className="invalid-feedback">
            {errors.confirmPassword.message}
          </div>
        )}
      </div>

      <button
        type="submit"
        className="btn btn-primary w-100"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Загрузка...' : 'Зарегистрироваться'}
      </button>
    </form>
  );
};
