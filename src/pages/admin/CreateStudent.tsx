/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, FieldValues } from "react-hook-form";
import FormInput from "../../components/form/FormInput";
import FormWrapper from "../../components/form/FormWrapper";
import { Button, Col, Divider, Form, Input, Row } from "antd";
import FormSelect from "../../components/form/FormSelect";
import { bloodGroupOptions, genderOptions } from "../../config/constant/global";
import FormDatePicker from "../../components/form/FormDatePicker";
import { useAddStudentMutation } from "../../redux/features/Admin/userManagement.api";
import { useGetAllAcademicDepartmentQuery } from "../../redux/features/Admin/AcademicManagement/academicFacultyApi";
import { useGetAllAcademicSemesterQuery } from "../../redux/features/Admin/AcademicManagement/academicManagementApi";
import { toast } from "sonner";
import { TCreateStudent } from "../../Types/academicManagementType";
import { TResponse } from "../../Types/global";

const studentDummyData = {
  name: {
    firstName: "I am ",
    middleName: "Student",
    lastName: "Number 1",
  },
  gender: "male",
  bloogGroup: "A+",

  contactNo: "1235678",
  emergencyContactNo: "987-654-3210",
  presentAddress: "123 Main St, Cityville",
  permanentAddress: "456 Oak St, Townsville",

  guardian: {
    fatherName: "James Doe",
    fatherOccupation: "Engineer",
    fatherContactNo: "111-222-3333",
    motherName: "Mary Doe",
    motherOccupation: "Teacher",
    motherContactNo: "444-555-6666",
  },

  localGuardian: {
    name: "Alice Johnson",
    occupation: "Doctor",
    contactNo: "777-888-9999",
    address: "789 Pine St, Villageton",
  },

  // admissionSemester: "65bb60ebf71fdd1add63b1c0",
  // academicDepartment: "65b4acae3dc8d4f3ad83e416",
};

const CreateStudent = () => {
  const [addStudent, { data, error }] = useAddStudentMutation(undefined);
  console.log({ data, error });
  const { data: sData } = useGetAllAcademicSemesterQuery(undefined);
  const { data: dData } = useGetAllAcademicDepartmentQuery(undefined);

  const semesterOptions = sData?.data?.map((item) => ({
    value: item._id,
    label: `${item?.name}${item?.year}`,
  }));
  const departmentOptions = dData?.data?.map((item) => ({
    value: item._id,
    label: item?.name,
  }));
  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Loading....");
    const studentData = {
      password: "student123",
      student: data,
    };
    const formData = new FormData();
    formData.append("data", JSON.stringify(studentData));
    formData.append("file", data?.image);
    try {
      const res = (await addStudent(formData)) as TResponse<TCreateStudent>;
      if (res.error) {
        toast.error(res.error.data?.message, { id: toastId });
      } else {
        toast.success("Student Created Successfully", { id: toastId });
      }
    } catch (error) {
      toast.error("Failed To Create Student", { id: toastId });
    }
  };
  return (
    <Row justify={"center"}>
      <Col span={24}>
        <FormWrapper defaultValues={studentDummyData} onSubmit={onSubmit}>
          <Divider>Personal Info.</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FormInput type="text" name="name.firstName" label="First Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FormInput
                type="text"
                name="name.middleName"
                label="Middle Name"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FormInput type="text" name="name.lastName" label="First Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FormDatePicker name="dateOfBirth" label="Date Of Birth" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FormSelect
                options={genderOptions}
                name="gender"
                label="Gender"
              />
            </Col>

            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FormSelect
                options={bloodGroupOptions}
                name="bloodGroup"
                label="Blood Group"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <Controller
                name="image"
                render={({ field: { onChange, value, ...field } }) => (
                  <Form.Item label="Picture">
                    <Input
                      type="file"
                      value={value?.fileName}
                      {...field}
                      onChange={(e) => onChange(e.target.files?.[0])}
                    />
                  </Form.Item>
                )}
              />
            </Col>
          </Row>
          <Divider>Contact Info.</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FormInput type="text" name="email" label="Email" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FormInput type="text" name="contactNo" label="Contact Number" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FormInput
                type="text"
                name="emergencyContact"
                label="Emergency Contact"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FormInput
                type="text"
                name="presentAddress"
                label="Present Address"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FormInput
                type="text"
                name="permanentAddress"
                label="Permanent Address"
              />
            </Col>
          </Row>
          <Divider>Guardian Info.</Divider>

          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FormInput
                type="text"
                name="guardian.fatherName"
                label="Father Name"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FormInput
                type="text"
                name="guardian.fatherOccupation"
                label="Father Occupation"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FormInput
                type="text"
                name="guardian.fatherContactNo"
                label="Father Contact Number"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FormInput
                type="text"
                name="guardian.motherName"
                label="Mother Name"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FormInput
                type="text"
                name="guardian.motherOccupation"
                label="Mother Occupation"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FormInput
                type="text"
                name="guardian.motherContactNo"
                label="Mother Contact Number"
              />
            </Col>
          </Row>

          <Divider>Local Guardian.</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FormInput type="text" name="localGuardian.name" label="Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FormInput
                type="text"
                name="localGuardian.occupation"
                label="Occupation"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FormInput
                type="text"
                name="localGuardian.ContactNo"
                label="Contact Number"
              />
            </Col>
          </Row>
          <Divider>Academic Info</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FormSelect
                options={departmentOptions}
                name="academicDepartment"
                label="Academic Department"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FormSelect
                options={semesterOptions}
                name="admissionSemester"
                label="Admission Semester"
              />
            </Col>
          </Row>
          <Row />
          <Button htmlType="submit">AddStudent</Button>
        </FormWrapper>
      </Col>
    </Row>
  );
};

export default CreateStudent;
