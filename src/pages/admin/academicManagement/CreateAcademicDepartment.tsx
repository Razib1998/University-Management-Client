/* eslint-disable @typescript-eslint/no-unused-vars */
import { FieldValues } from "react-hook-form";
import FormWrapper from "../../../components/form/FormWrapper";
import FormInput from "../../../components/form/FormInput";
import FormSelect from "../../../components/form/FormSelect";
import { Button, Col, Row } from "antd";
import {
  useAddAcademicDepartmentMutation,
  useGetAllAcademicFacultyQuery,
} from "../../../redux/features/Admin/AcademicManagement/academicFacultyApi";
import { toast } from "sonner";
import { TResponse } from "../../../Types/global";
import { TCreateAcademicDepartment } from "../../../Types/academicManagementType";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicDepartmentSchema } from "../../../schemas/AcademicManagementSchema";

const CreateAcademicDepartment = () => {
  const { data: academicFacultyData } =
    useGetAllAcademicFacultyQuery(undefined);
  const facultyOptions = academicFacultyData?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const [addAcademicDepartment, { data, error }] =
    useAddAcademicDepartmentMutation();
  console.log({ data, error });
  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Loading....");
    try {
      const res = (await addAcademicDepartment(
        data
      )) as TResponse<TCreateAcademicDepartment>;
      console.log(res);
      if (res.error) {
        toast.error(res.error.data?.message, { id: toastId });
      } else {
        toast.success("Academic Faculty Successfully Created", { id: toastId });
      }
    } catch (err) {
      toast.error("Failed To Create Academic Department", { id: toastId });
    }
  };
  return (
    <Row justify={"center"} style={{ marginTop: 32 }}>
      <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
        <FormWrapper
          resolver={zodResolver(academicDepartmentSchema)}
          onSubmit={onSubmit}
        >
          <FormInput
            type="text"
            name="name"
            label="Department Name"
          ></FormInput>
          <FormSelect
            options={facultyOptions}
            name="academicFaculty"
            label="Academic Faculty"
          ></FormSelect>
          <Button htmlType="submit">Create Department</Button>
        </FormWrapper>
      </Col>
    </Row>
  );
};

export default CreateAcademicDepartment;
