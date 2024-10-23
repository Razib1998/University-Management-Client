import { Button, Pagination, Space, Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";

import { useState } from "react";

import { useGetAllStudentsQuery } from "../../../redux/features/Admin/userManagement.api";
import { TStudent } from "../../../Types/academicManagementType";
import { TQueryParam } from "../../../Types/global";
import { Link } from "react-router-dom";

export type TTableData = Pick<TStudent, "fullName">;
const StudentData = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState(1);
  const {
    data: studentData,
    isLoading,
    isFetching,
  } = useGetAllStudentsQuery([
    { name: "page", value: page },
    { name: "sort", value: "id" },
    ...params,
  ]);

  const meteData = studentData?.meta;
  const tableData = studentData?.data?.map(
    ({ _id, id, fullName, email, contactNo }) => ({
      key: _id,
      fullName,
      id,
      email,
      contactNo,
    })
  );

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Full Name",
      key: "fullName",
      dataIndex: "fullName",
    },

    {
      title: "Roll No.",
      key: "id",
      dataIndex: "id",
    },
    {
      title: "Email.",
      key: "email",
      dataIndex: "email",
    },
    {
      title: "Contact No.",
      key: "contactNo",
      dataIndex: "contactNo",
    },
    {
      title: "Action",
      key: "X",
      render: (item) => {
        console.log(item);
        return (
          <Space>
            <Link to={`/admin/students/${item?.key}`}>
              <Button>Details</Button>
            </Link>
            <Link to={`/admin/student/${item?.key}`}>
              <Button>Update</Button>
            </Link>
            <Button>Block student</Button>
          </Space>
        );
      },
      width: "1%",
    },
  ];

  const onChange: TableProps<TTableData>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const queryParams: TQueryParam[] = [];
      filters.name?.forEach((item) =>
        queryParams.push({ name: "name", value: item })
      );
      filters.year?.forEach((item) =>
        queryParams.push({ name: "year", value: item })
      );
      setParams(queryParams);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        pagination={false}
      />
      <Pagination
        style={{ justifyContent: "center", marginTop: "20px" }}
        current={page}
        onChange={(value) => setPage(value)}
        pageSize={meteData?.limit}
        total={meteData?.total}
      />
    </>
  );
};

export default StudentData;
