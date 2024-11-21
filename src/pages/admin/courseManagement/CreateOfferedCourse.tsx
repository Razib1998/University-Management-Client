/* eslint-disable @typescript-eslint/no-unused-vars */
import { FieldValues } from "react-hook-form";
import FormWrapper from "../../../components/form/FormWrapper";
import { Button, Col, Divider, Row } from "antd";
import FormSelect from "../../../components/form/FormSelect";

import { toast } from "sonner";

import FormInput from "../../../components/form/FormInput";
import {
  useAddOfferedCourseMutation,
  useGetAllCoursesQuery,
  useGetAllRegisteredSemesterQuery,
  useGetFacultiesWithCourseQuery,
} from "../../../redux/features/Admin/courseManagementApi";
import {
  useGetAllAcademicDepartmentQuery,
  useGetAllAcademicFacultyQuery,
} from "../../../redux/features/Admin/AcademicManagement/academicFacultyApi";
import { useState } from "react";
import TimePicker from "../../../components/form/TimePicker";
import SelectWithWatch from "../../../components/form/SelectWithWatch";
import moment from "moment";
import { TResponse } from "../../../Types/global";
import { weekDaysOptions } from "../../../config/constant/global";

const CreateOfferedCourse = () => {
  const [courseId, setCourseId] = useState("");

  const [addOfferedCourse] = useAddOfferedCourseMutation();

  const { data: academicFacultyData } =
    useGetAllAcademicFacultyQuery(undefined);

  const { data: academicDepartmentData } =
    useGetAllAcademicDepartmentQuery(undefined);

  const { data: CourseData } = useGetAllCoursesQuery(undefined);
  const id = CourseData?.data?.map((item) => ({
    courseId: item._id,
  }));

  const { data: semesterRegistrationData } = useGetAllRegisteredSemesterQuery([
    { name: "sort", value: "year" },
  ]);

  const semesterRegistrationOptions = semesterRegistrationData?.data?.map(
    (item) => ({
      value: item._id,
      label: `${item.academicSemester.name} ${item.academicSemester.year}`,
    })
  );

  const { data: facultiesData, isFetching: fetchingFaculties } =
    useGetFacultiesWithCourseQuery(courseId, { skip: !courseId });

  const facultiesOptions = facultiesData?.data?.faculties?.map((item) => ({
    value: item._id,
    label: item.fullName,
  }));

  const academicFacultyOptions = academicFacultyData?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));
  const departmentOptions = academicDepartmentData?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));
  const courseOptions = CourseData?.data?.map((item) => ({
    value: item._id,
    label: item.title,
  }));

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Semester creating....");

    const offeredCourseData = {
      ...data,
      maxCapacity: Number(data.maxCapacity),
      section: Number(data?.section),
      startTime: moment(new Date(data.startTime)).format("HH:mm"),
      endTime: moment(new Date(data.endTime)).format("HH:mm"),
    };

    try {
      const res = (await addOfferedCourse(offeredCourseData)) as TResponse<any>;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Offered Course added Successfully", { id: toastId });
      }
    } catch (err) {
      toast.error("Something Went wrong..!", { id: toastId });
    }
  };

  return (
    <>
      <Row justify={"center"}>
        <Col span={24}>
          <FormWrapper onSubmit={onSubmit}>
            <Divider>Academic Information.</Divider>
            <Row gutter={8}>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <FormSelect
                  label="Semester Registration"
                  name="semesterRegistration"
                  options={semesterRegistrationOptions}
                />
              </Col>

              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <FormSelect
                  label="Academic Faculty"
                  name="academicFaculty"
                  options={academicFacultyOptions}
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <FormSelect
                  label="Academic Department"
                  name="academicDepartment"
                  options={departmentOptions}
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <SelectWithWatch
                  label="Courses"
                  name="course"
                  onValueChange={setCourseId}
                  options={courseOptions}
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <FormSelect
                  label="Faculty"
                  disabled={!courseId || fetchingFaculties}
                  name="faculty"
                  options={facultiesOptions}
                />
              </Col>
            </Row>
            <Divider>Extra Information</Divider>
            <Row gutter={8}>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <FormInput
                  type="text"
                  name="maxCapacity"
                  label="Max Capacity"
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <FormSelect
                  mode="multiple"
                  options={weekDaysOptions}
                  name="days"
                  label="Days"
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <FormInput type="text" name="section" label="Section" />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <TimePicker name="startTime" label="Start Time" />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <TimePicker name="endTime" label="End Time" />
              </Col>
            </Row>
            <Row style={{ marginTop: "10px" }} justify={"center"}>
              <Button
                style={{ width: "20%" }}
                color="default"
                variant="solid"
                htmlType="submit"
              >
                Create Offered Course
              </Button>
            </Row>
          </FormWrapper>
        </Col>
      </Row>
    </>
  );
};

export default CreateOfferedCourse;
