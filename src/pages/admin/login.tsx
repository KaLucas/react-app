import { useAuthContext } from '@context/use-auth-context';
import { Box, Button, Stack, TextField } from '@mui/material';
import { useState, type ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import logo from '@assets/react-app.png';
import { LoginErrorAlert } from '@components/admin/alerts/alerts';

type FormData = {
  email: string;
  password: string;
};

const Login = (): ReactElement => {
  const navigate = useNavigate();
  const { login } = useAuthContext();
  const [error, setError] = useState(false);

  const { register, handleSubmit, formState } = useForm<FormData>();
  const { errors } = formState;

  function onSubmit(data: FormData) {
    const success = login(data.email, data.password);

    if (success) {
      navigate('/users-list');
    } else {
      setError(true);
    }
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2} width="300px">
          <img src={logo} alt="React App Logo" />
          <TextField
            label="E-mail"
            type="email"
            {...register('email', {
              required: 'E-mail é obrigatório',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'E-mail inválido',
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
            required
          />
          <TextField
            label="Senha"
            type="password"
            {...register('password', { required: 'Senha é obrigatório' })}
            required
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button type="submit" variant="contained">
            Login
          </Button>
        </Stack>
      </form>
      <LoginErrorAlert open={error} setOpen={setError} />
    </Box>
  );
};

export default Login;
