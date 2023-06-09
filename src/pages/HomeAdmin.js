import React, { useEffect, useState } from "react";
import BarChart from "../components/BarChart";
import SummaryCard from "../components/SummaryCard";
import { useNavigate } from "react-router-dom";
import { faUserTie } from "@fortawesome/free-solid-svg-icons";
import { faUserGraduate } from "@fortawesome/free-solid-svg-icons";
import { faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { faChalkboardTeacher } from "@fortawesome/free-solid-svg-icons";
import useFetchClasses from "../hooks/useFetchClasses";
import useFetchTotalRecordOfUser from "../hooks/useFetchTotalRecordOfUser";
import { Helmet } from "react-helmet";

const HomeAdmin = () => {
  const navigate = useNavigate();
  const [totalClass, setTotalClass] = useState(null);
  const [totalStudent, setTotalStudent] = useState(null);
  const [totalLecturer, setTotalLecturer] = useState(null);
  const [totalAlumni, setTotalAlumni] = useState(null);

  // to get the total class
  const {
    data: classData,
    isLoading: isClassLoading,
    isError: isClassError,
    isSuccess: isClassSuccess,
  } = useFetchClasses({
    limit: 1,
    page: 1,
  });

  // to get the total student
  const {
    data: studentRecord,
    isLoading: isStudentRecordLoading,
    isError: isStudentRecordError,
    isSuccess: isStudentRecordSuccess,
  } = useFetchTotalRecordOfUser({ role: "mahasiswa" });

  // to get the total lecturer
  const {
    data: lecturerRecord,
    isLoading: isLecturerRecordLoading,
    isError: isLecturerRecordError,
    isSuccess: isLecturerRecordSuccess,
  } = useFetchTotalRecordOfUser({ role: "dosen" });

  // to get the total alumni
  const {
    data: alumniRecord,
    isLoading: isAlumniRecordLoading,
    isError: isAlumniRecordError,
    isSuccess: isAlumniRecordSuccess,
  } = useFetchTotalRecordOfUser({ role: "alumni" });

  // set the total record of each entity
  useEffect(() => {
    if (isStudentRecordSuccess) setTotalStudent(studentRecord.data);
    if (isStudentRecordError) setTotalStudent("Error");
    if (isStudentRecordLoading) setTotalStudent("...");
  }, [
    isStudentRecordSuccess,
    studentRecord,
    isStudentRecordError,
    isStudentRecordLoading,
  ]);
  useEffect(() => {
    if (isLecturerRecordSuccess) setTotalLecturer(lecturerRecord.data);
    if (isLecturerRecordError) setTotalLecturer("Error");
    if (isLecturerRecordLoading) setTotalLecturer("...");
  }, [
    isLecturerRecordSuccess,
    lecturerRecord,
    isLecturerRecordError,
    isLecturerRecordLoading,
  ]);
  useEffect(() => {
    if (isAlumniRecordSuccess) setTotalAlumni(alumniRecord.data);
    if (isAlumniRecordError) setTotalAlumni("Error");
    if (isAlumniRecordLoading) setTotalAlumni("...");
  }, [
    isAlumniRecordSuccess,
    alumniRecord,
    isAlumniRecordError,
    isAlumniRecordLoading,
  ]);
  useEffect(() => {
    if (isClassError) setTotalClass("Error");
    if (isClassLoading) setTotalClass("...");
    if (isClassSuccess) setTotalClass(classData.totalRecords);
  }, [isClassSuccess, classData, isClassLoading, isClassError]);

  return (
    <div>
      <Helmet>
        <title>Beranda | Web Survei Kepuasan</title>
      </Helmet>
      <div className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-2  gap-4 mb-4">
        <SummaryCard
          cardTitle="Mahasiswa"
          cardValue={totalStudent}
          route="/pengguna/mahasiswa"
          icon={faUserAlt}
        />
        <SummaryCard
          cardTitle="Dosen"
          cardValue={totalLecturer}
          route="/pengguna/dosen"
          icon={faUserTie}
        />
        <SummaryCard
          cardTitle="Alumni"
          cardValue={totalAlumni}
          route="/pengguna/alumni"
          icon={faUserGraduate}
        />
        <SummaryCard
          cardTitle="Kelas"
          cardValue={totalClass}
          route="/kelas"
          icon={faChalkboardTeacher}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
        <button
          title="Klik untuk melihat detail"
          onClick={() => navigate("/pengguna/mahasiswa")}
          className="h-60 bg-white items-center  p-2 rounded-md text-center flex flex-col justify-evenly shadow-md hover:scale-102 hover:shadow-lg transform transition duration-500 ease-in-out"
        >
          <h1 className="font-semibold text-primary-color">
            Mahasiswa / Angkatan
          </h1>
          <BarChart />
        </button>
        <button
          title="Klik untuk melihat detail"
          onClick={() => navigate("/pengguna/alumni")}
          className="h-60 bg-white items-center  p-2 rounded-md text-center flex flex-col justify-evenly shadow-md hover:scale-102 hover:shadow-lg transform transition duration-500 ease-in-out"
        >
          <h1 className="font-semibold text-primary-color">
            Alumni / Angkatan
          </h1>
          <BarChart />
        </button>
      </div>
    </div>
  );
};

export default HomeAdmin;
