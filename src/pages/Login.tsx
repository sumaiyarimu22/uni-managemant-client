import React from "react";
import { Button } from "antd";
import { useForm, SubmitHandler } from "react-hook-form";
import { useLoginMutation } from "../redux/fetaures/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUsers } from "../redux/fetaures/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";

interface LoginFormInputs {
  id: string;
  password: string;
}

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (formData) => {
    const userInfo = {
      id: formData.id,
      password: formData.password,
    };
    try {
      const res = await login(userInfo).unwrap();

      const user = verifyToken(res.data.accessToken);

      dispatch(setUsers({ user, token: res.data.accessToken }));
    } catch (err) {
      console.error("Failed to login:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor='id'>Id</label>
        <input
          type='text'
          placeholder='Type your Id'
          id='id'
          {...register("id", { required: "Id is required" })}
        />
        {errors.id && <p>{errors.id.message}</p>}
      </div>
      <div>
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          placeholder='Type your Password'
          id='password'
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      <Button htmlType='submit' loading={isLoading}>
        Login
      </Button>
    </form>
  );
};

export default Login;
