import { useGetAllSemestersQuery } from "../../../redux/fetaures/academiSemester/academiSemesterApi";

const AcademicSemester = () => {
  const { data } = useGetAllSemestersQuery(undefined);
  console.log(data);

  return <div>AcademicSemester</div>;
};

export default AcademicSemester;
