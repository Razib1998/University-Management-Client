import { FieldValues } from "react-hook-form";
import FormWrapper from "../../../components/form/FormWrapper";
import { Button, Col, Flex } from "antd";
import FormSelect from "../../../components/form/FormSelect";
import { semesterOptions } from "../../../config/constant/semester";
import { monthsOptions } from "../../../config/constant/global";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicSemesterSchema } from "../../../schemas/AcademicManagementSchema";
import { useAddAcademicSemesterMutation } from "../../../redux/features/Admin/AcademicManagement/academicManagementApi";
import { toast } from "sonner";

const currentYear = new Date().getFullYear();

const yearOptions = [0, 1, 2, 3, 4].map((number) => ({
  value: String(currentYear + number),
  label: String(currentYear + number),
}));

const CreateAcademicSemester = () => {
  const [addAcademicSemester] = useAddAcademicSemesterMutation();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Semester creating....");
    const name = semesterOptions[data.name - 1]?.label;
    const semesterData = {
      name: name,
      code: data?.name,
      year: data?.year,
      startMonth: data?.startMonth,
      endMonth: data?.endMonth,
    };

    try {
      const res = await addAcademicSemester(semesterData);
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Semester Created Successfully", { id: toastId });
      }
    } catch (err) {
      toast.error("Something Went wrong..!", { id: toastId });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <FormWrapper
          resolver={zodResolver(academicSemesterSchema)}
          onSubmit={onSubmit}
        >
          <FormSelect
            label="Semester Name"
            name="name"
            options={semesterOptions}
          />
          <FormSelect label="Year" name="year" options={yearOptions} />
          <FormSelect
            label="Start Month"
            name="startMonth"
            options={monthsOptions}
          />
          <FormSelect
            label="End Month"
            name="endMonth"
            options={monthsOptions}
          />
          <Button htmlType="submit">Create Semester</Button>
        </FormWrapper>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemester;
