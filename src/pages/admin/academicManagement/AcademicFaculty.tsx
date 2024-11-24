import { Card, Col, Row } from "antd";
import { useGetAllAcademicFacultyQuery } from "../../../redux/features/Admin/AcademicManagement/academicFacultyApi";

const AcademicFaculty = () => {
  const { data: academicFacultyData } =
    useGetAllAcademicFacultyQuery(undefined);

  console.log(academicFacultyData?.data);
  return (
    <div>
      {academicFacultyData?.data?.map((item) => (
        <Card title="Academic Faculty Name">
          <h2>{item.name}</h2>
        </Card>
      ))}
    </div>
  );
};

export default AcademicFaculty;
