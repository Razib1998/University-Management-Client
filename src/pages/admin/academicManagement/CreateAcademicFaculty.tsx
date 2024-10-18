import { FieldValues } from "react-hook-form";
import FormWrapper from "../../../components/form/FormWrapper";
import { Button, Col, Flex } from "antd";
import FormSelect from "../../../components/form/FormSelect";
import { academicFacultyOptions } from "../../../config/constant/global";
import { useAddAcademicFacultyMutation } from "../../../redux/features/Admin/AcademicManagement/academicFacultyApi";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicFacultySchema } from "../../../schemas/AcademicManagementSchema";
const CreateAcademicFaculty = () => {
  const [addAcademicFaculty] = useAddAcademicFacultyMutation();
  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Loading....");
    try {
      const res = await addAcademicFaculty(data);
      console.log(res);
      if (res.error) {
        toast.error(res.error.data?.message, { id: toastId });
      } else {
        toast.success("Academic Faculty Successfully Created", { id: toastId });
      }
    } catch (err) {
      toast.error("Failed To Create Academic Faculty", { id: toastId });
    }
  };
  return (
    <div>
      <Flex justify="center" align="center">
        <Col span={6}>
          <FormWrapper
            resolver={zodResolver(academicFacultySchema)}
            onSubmit={onSubmit}
          >
            <FormSelect
              label="Academic Faculty"
              name="name"
              options={academicFacultyOptions}
            ></FormSelect>
            <Button htmlType="submit">Create Academic Faculty</Button>
          </FormWrapper>
        </Col>
      </Flex>
    </div>
  );
};

export default CreateAcademicFaculty;
