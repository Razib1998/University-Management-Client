/* eslint-disable @typescript-eslint/no-unused-vars */
import { FieldValues } from "react-hook-form";
import FormWrapper from "../../../components/form/FormWrapper";
import { Button, Col, Flex } from "antd";
import FormSelect from "../../../components/form/FormSelect";
import { toast } from "sonner";
import { TResponse } from "../../../Types/global";

import FormInput from "../../../components/form/FormInput";
import {
  useAddCourseMutation,
  useGetAllCoursesQuery,
} from "../../../redux/features/Admin/courseManagementApi";
import { TCourse, TCourseItem } from "../../../Types/courseManagementType";

const CreateCourse = () => {
  const [addCourse] = useAddCourseMutation(undefined);

  const { data: courses } = useGetAllCoursesQuery(undefined);

  const preRequisiteCoursesOptions = courses?.data?.map((item) => ({
    value: item._id,
    label: item.title,
  }));

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Course creating....");

    const courseData = {
      ...data,
      code: Number(data?.code),
      credits: Number(data?.credits),
      isDeleted: false,
      preRequisiteCourses: data?.preRequisiteCourses
        ? data?.preRequisiteCourses?.map((item: TCourseItem) => ({
            course: item,
            isDeleted: false,
          }))
        : [],
    };

    try {
      const res = (await addCourse(courseData)) as TResponse<any>;
      console.log(res);
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Course Added Successfully", { id: toastId });
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
            <FormInput type="text" name="title" label="Course Title" />
            <FormInput type="text" name="prefix" label="Course Prefix" />
            <FormInput type="text" name="code" label="Code" />
            <FormInput type="text" name="credits" label="Course Credits" />
            <FormSelect
              name="preRequisiteCourses"
              label="Pre RequisiteCourses"
              options={preRequisiteCoursesOptions}
              mode="multiple"
            />
            <Button htmlType="submit">Add Course</Button>
          </FormWrapper>
        </Col>
      </Flex>
    </>
  );
};

export default CreateCourse;
