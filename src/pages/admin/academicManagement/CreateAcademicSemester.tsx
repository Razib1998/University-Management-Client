import { FieldValues } from "react-hook-form";
import FormWrapper from "../../../components/form/FormWrapper";
import { Button, Col, Flex } from "antd";
import FormSelect from "../../../components/form/FormSelect";

const semesterOptions = [
  {
    value: "01",
    label: "Autumn",
  },
  {
    value: "02",
    label: "Summer",
  },
  {
    value: "03",
    label: "Fall",
  },
];

const currentYear = new Date().getFullYear();

const yearOptions = [0, 1, 2, 3, 4].map((number) => ({
  value: String(currentYear + number),
  label: String(currentYear + number),
}));

const CreateAcademicSemester = () => {
  const onSubmit = (data: FieldValues) => {
    console.log(data);
    const name = semesterOptions[data.name - 1]?.label;

    const semesterData = {
      name: name,
      code: data?.name,
      year: data?.year,
    };
    console.log(semesterData);
  };
  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <FormWrapper onSubmit={onSubmit}>
          <FormSelect
            label="Semester Name"
            name="name"
            options={semesterOptions}
          />
          <FormSelect label="Year" name="year" options={yearOptions} />
          <FormSelect label="Year" name="year" options={yearOptions} />
          <FormSelect label="Year" name="year" options={yearOptions} />
          <Button htmlType="submit">Create Semester</Button>
        </FormWrapper>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemester;
