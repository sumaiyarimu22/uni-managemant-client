import React from "react";
import { Button, Row } from "antd";
import { SubmitHandler } from "react-hook-form";
import { useLoginMutation } from "../redux/fetaures/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUsers } from "../redux/fetaures/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { TUser } from "../types";
import UnForm from "../components/form/UnForm";
import UnInput from "../components/form/UnInput";

type loginFormInputs = {
  id: string;
  password: string;
};

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();

  const defaultValues = {
    id: "A-0001",
    password: "admin123",
  };

  const onSubmit: SubmitHandler<loginFormInputs> = async (formData) => {
    const toastId = toast.loading("loggin in....");
    const userInfo = {
      id: formData.id,
      password: formData.password,
    };
    console.log(userInfo);

    try {
      const res = await login(userInfo).unwrap();

      const user = verifyToken(res.data.accessToken) as TUser;

      dispatch(setUsers({ user, token: res.data.accessToken }));
      toast.success("Login successfull", { id: toastId, duration: 2000 });
      navigate(`/${user.role}/dashboard`);
    } catch (err) {
      console.error("Failed to login:", err);
      toast.error("Somthing went wrong", { id: toastId, duration: 2000 });
    }
  };

  return (
    <Row justify={"center"} align={"middle"} style={{ height: "100vh" }}>
      <UnForm submitHandler={onSubmit} defaultValues={defaultValues}>
        <UnInput type='text' name='id' label='Id' />

        <UnInput type='password' name='password' label='Password' />

        <Button htmlType='submit' loading={isLoading}>
          Login
        </Button>
      </UnForm>
    </Row>
  );
};

export default Login;
