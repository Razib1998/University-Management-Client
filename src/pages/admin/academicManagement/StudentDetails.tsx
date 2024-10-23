import { useParams } from "react-router-dom";
import { useGetSingleStudentQuery } from "../../../redux/features/Admin/userManagement.api";
import { Descriptions, Image, Row, Spin } from "antd";

import type { DescriptionsProps } from "antd";

const StudentDetails = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetSingleStudentQuery(id);

  if (isLoading)
    return (
      <div>
        <Spin />
      </div>
    );

  const items: DescriptionsProps["items"] = [
    {
      label: "Name",
      children: `${data?.data?.fullName}`,
    },
    {
      label: "Present Address",
      children: `${data?.data?.presentAddress}`,
    },
    {
      label: "Permanent Address",
      children: `${data?.data?.permanentAddress}`,
    },
    {
      label: "Blood Group",
      children: `${data?.data?.bloodGroup}`,
    },

    {
      label: "Guardian Information.",
      span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 2, xxl: 2 },
      children: (
        <>
          <p>Father Name: {data?.data?.guardian?.fatherName}</p>
          <p>Father Contact No: {data?.data?.guardian?.fatherContactNo}</p>
          <p>Mother Name: {data?.data?.guardian?.motherName}</p>
          <p>Mother Contact No: {data?.data?.guardian?.motherContactNo}</p>
        </>
      ),
    },
    {
      label: "Academic Information",
      span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 2, xxl: 2 },
      children: (
        <>
          <p>
            Admission Semester : {data?.data?.admissionSemester.name}-
            {data?.data?.admissionSemester.year}
          </p>
          <p>
            Academic Faculty :{" "}
            {data?.data?.academicDepartment?.academicFaculty?.name}
          </p>
          <p>Academic Department : {data?.data?.academicDepartment?.name}</p>
        </>
      ),
    },
  ];

  return (
    <div>
      <Row justify={"center"}>
        <Image width={300} src={data?.data?.profileImg} />
      </Row>
      <Descriptions
        title="Student Information"
        bordered
        // column={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }}
        column={1}
        items={items}
      />
    </div>
  );
};

export default StudentDetails;
