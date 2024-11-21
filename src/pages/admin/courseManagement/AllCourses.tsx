import { Button, Modal, Table } from "antd";
import type { TableColumnsType } from "antd";
import {
  useAssignFacultiesMutation,
  useGetAllCoursesQuery,
} from "../../../redux/features/Admin/courseManagementApi";
import { TCourse } from "../../../Types/courseManagementType";
import { useState } from "react";
import FormSelect from "../../../components/form/FormSelect";
import FormWrapper from "../../../components/form/FormWrapper";
import { useGetAllFacultiesQuery } from "../../../redux/features/Admin/userManagement.api";
import { FieldValues } from "react-hook-form";

export type TTableData = Pick<TCourse, "title" | "code" | "credits">;

const AllCourses = () => {
  const {
    data: coursesData,
    isLoading,
    isFetching,
  } = useGetAllCoursesQuery(undefined);

  const tableData = coursesData?.data?.map(({ _id, title, code, credits }) => ({
    key: _id,
    title,
    code,
    credits,
  }));

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Course Name",
      key: "title",
      dataIndex: "title",
    },
    {
      title: "Course Code",
      key: "code",
      dataIndex: "code",
    },
    {
      title: "Credits",
      key: "credits",
      dataIndex: "credits",
    },

    {
      title: "Action",
      key: "X",
      render: (item) => {
        return <AddFacultyModal facultyInfo={item} />;
      },
    },
  ];

  // const onChange: TableProps<TTableData>["onChange"] = (
  //   pagination,
  //   filters,
  //   sorter,
  //   extra
  // ) => {
  //   if (extra.action === "filter") {
  //     const queryParams: TQueryParam[] = [];
  //     filters.name?.forEach((item) =>
  //       queryParams.push({ name: "name", value: item })
  //     );
  //     filters.year?.forEach((item) =>
  //       queryParams.push({ name: "year", value: item })
  //     );
  //     setParams(queryParams);
  //   }
  // };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        // onChange={onChange}
      />
    </div>
  );
};

const AddFacultyModal = ({ facultyInfo }: any) => {
  const { data: facultyData } = useGetAllFacultiesQuery(undefined);

  const [assignFaculties] = useAssignFacultiesMutation();

  const facultiesOptions = facultyData?.data?.map((item) => ({
    value: item._id,
    label: item.fullName,
  }));
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onSubmit = (data: FieldValues) => {
    const facultiesData = {
      courseId: facultyInfo.key,
      data,
    };

    setIsModalOpen(false);

    assignFaculties(facultiesData);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Button onClick={showModal}>Assign Faculties</Button>
      <Modal
        footer={null}
        title="Basic Modal"
        open={isModalOpen}
        onCancel={handleCancel}
      >
        <FormWrapper onSubmit={onSubmit}>
          <FormSelect
            options={facultiesOptions}
            name="faculties"
            label="Faculties"
            mode="multiple"
          />
          <Button type="primary" htmlType="submit">
            Assign Now
          </Button>
        </FormWrapper>
      </Modal>
    </>
  );
};

export default AllCourses;
