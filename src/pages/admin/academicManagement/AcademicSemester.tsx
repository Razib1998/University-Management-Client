import { useGetAllAcademicSemesterQuery } from "../../../redux/features/Admin/AcademicManagement/academicManagementApi";
import { Button, Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { TAcademicSemester } from "../../../Types/academicManagementType";
import { useState } from "react";
import { TQueryParam } from "../../../Types/global";

export type TTableData = Pick<
  TAcademicSemester,
  "name" | "year" | "startMonth" | "endMonth"
>;
const AcademicSemester = () => {
  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
  const {
    data: semesterData,
    isLoading,
    isFetching,
  } = useGetAllAcademicSemesterQuery(params);
  const tableData = semesterData?.data?.map(
    ({ _id, name, startMonth, endMonth, year }) => ({
      key: _id,
      name,
      startMonth,
      endMonth,
      year,
    })
  );

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
      filters: [
        {
          text: "Autumn",
          value: "Autumn",
        },

        {
          text: "Fall",
          value: "Fall",
        },
        {
          text: "Summer",
          value: "Summer",
        },
      ],
    },
    {
      title: "Year",
      key: "year",
      dataIndex: "year",
      filters: [
        {
          text: "2024",
          value: "2024",
        },

        {
          text: "2025",
          value: "2025",
        },
        {
          text: "2030",
          value: "2030",
        },
      ],
    },
    {
      title: "Start Month",
      key: "Start Month",
      dataIndex: "startMonth",
    },
    {
      title: "End Month",
      key: "End MOnth",
      dataIndex: "endMonth",
    },
    {
      title: "Action",
      key: "X",
      render: () => {
        return (
          <div>
            <Button>Update</Button>
          </div>
        );
      },
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
    <div>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
      />
    </div>
  );
};

export default AcademicSemester;
