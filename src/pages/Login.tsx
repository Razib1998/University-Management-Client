import { Button } from "antd";
import { FieldValues, useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      id: "A-0002",
      password: "razib123",
    },
  });

  const dispatch = useAppDispatch();

  const [login] = useLoginMutation();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Logged in");
    try {
      const userInfo = {
        id: data.id,
        password: data.password,
      };
      const res = await login(userInfo).unwrap();
      const token = res.data.tokenWithBearer.split(" ")[1];
      const user = verifyToken(token) as TUser;
      dispatch(setUser({ user: user, token: token }));
      toast.success("User logged in", { id: toastId, duration: 2000 });
      navigate(`/${user.role}/dashboard`);
    } catch {
      toast.error("Something Went wrong", { id: toastId, duration: 2000 });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="id">ID:</label>
        <input type="text" id="id" {...register("id")} />
      </div>
      <div>
        <label htmlFor="id">password:</label>
        <input type="text" id="password" {...register("password")} />
      </div>

      <Button htmlType="submit">Login</Button>
    </form>
  );
};

export default Login;
