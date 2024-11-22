import { Button, Row } from "antd";
import FormWrapper from "../../components/form/FormWrapper";
import FormInput from "../../components/form/FormInput";
import { FieldValues } from "react-hook-form";
import { useChangePasswordMutation } from "../../redux/features/Admin/userManagement.api";
import { TResponse } from "../../Types/global";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { logout } from "../../redux/features/auth/authSlice";

const NeedsPasswordChange = () => {
  const [changePassword] = useChangePasswordMutation();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const onSubmit = async (data: FieldValues) => {
    const res = (await changePassword(data)) as TResponse<any>;
    if (res?.data?.success) {
      dispatch(logout());
      navigate("/login");
    }
  };
  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <FormWrapper onSubmit={onSubmit}>
        <FormInput type="text" name="oldPassword" label="Old Password" />
        <FormInput type="text" name="newPassword" label="New Password" />
        <Button htmlType="submit">Change Password</Button>
      </FormWrapper>
    </Row>
  );
};

export default NeedsPasswordChange;
