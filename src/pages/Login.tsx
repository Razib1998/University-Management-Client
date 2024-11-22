import { Button, Row } from "antd";
import { FieldValues } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import FormWrapper from "../components/form/FormWrapper";
import FormInput from "../components/form/FormInput";

const Login = () => {
  const navigate = useNavigate();
  // const { register, handleSubmit, data } = useForm({
  //   defaultValues: {
  //     id: "A-0002",
  //     password: "razib123",
  //   },
  // });

  const defaultValues = {
    userId: "2025010003",
    password: "yeasin123",
  };

  const dispatch = useAppDispatch();

  const [login] = useLoginMutation();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Logged in");
    try {
      const userInfo = {
        id: data.userId,
        password: data.password,
      };
      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;
      dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast.success("User logged in", { id: toastId, duration: 2000 });
      navigate(`/${user.role}/dashboard`);
    } catch {
      toast.error("Something Went wrong", { id: toastId, duration: 2000 });
    }
  };

  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <FormWrapper onSubmit={onSubmit} defaultValues={defaultValues}>
        <FormInput type="text" name="userId" label="ID:" />
        <FormInput type="text" name="password" label="Password" />
        <Button htmlType="submit">Login</Button>
      </FormWrapper>
    </Row>
  );
};

export default Login;
