/* eslint-disable @typescript-eslint/no-unused-vars */
import { FieldValues } from "react-hook-form";
import FormWrapper from "../../../components/form/FormWrapper";
import { Button, Col, Flex } from "antd";
import FormSelect from "../../../components/form/FormSelect";
import { statusOptions } from "../../../config/constant/global";
import { useGetAllAcademicSemesterQuery } from "../../../redux/features/Admin/AcademicManagement/academicManagementApi";
import { toast } from "sonner";
import { TResponse } from "../../../Types/global";
import FormDatePicker from "../../../components/form/FormDatePicker";
import FormInput from "../../../components/form/FormInput";
import { useAddRegisteredSemesterMutation } from "../../../redux/features/Admin/courseManagementApi";

const CreateSemesterRegistration = () => {
  const [registeredSemester] = useAddRegisteredSemesterMutation();

  const { data: SemesterData } = useGetAllAcademicSemesterQuery([
    { name: "sort", value: "year" },
  ]);

  const semesterOptions = SemesterData?.data?.map((item) => ({
    value: item._id,
    label: `${item?.name} ${item?.year}`,
  }));

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Semester creating....");

    const semesterData = {
      ...data,
      minCredit: Number(data?.minCredit),
      maxCredit: Number(data?.maxCredit),
    };

    try {
      const res = (await registeredSemester(semesterData)) as TResponse<any>;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Semester Registered Successfully", { id: toastId });
      }
    } catch (err) {
      toast.error("Something Went wrong..!", { id: toastId });
    }
  };

  return (
    <>
      <Flex justify="center" align="center">
        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
          <FormWrapper onSubmit={onSubmit}>
            <FormSelect
              label="Semester Name"
              name="academicSemester"
              options={semesterOptions}
            />
            <FormSelect label="Status" name="status" options={statusOptions} />
            <FormDatePicker name="startDate" label="Start Date" />
            <FormDatePicker name="endDate" label="End Date" />
            <FormInput type="text" name="minCredit" label="Min Credit" />
            <FormInput type="text" name="maxCredit" label="Max Credit" />
            <Button htmlType="submit">Registered Semester</Button>
          </FormWrapper>
        </Col>
      </Flex>
    </>
  );
};

export default CreateSemesterRegistration;
