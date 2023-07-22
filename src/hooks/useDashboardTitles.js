import { useEffect, useState } from "react";

const useDashboardTitle = (locationPath, role, id, idSurvey, survey) => {
  const [dashboardtitle, setDashboardTitle] = useState(
    "Halaman Tidak Ditemukan"
  );

  useEffect(() => {
    const dasboardTitle = {
      "/beranda": "Beranda",
      [`/pengguna/${role}`]: `${role}`,
      [`/pengguna/tambah/${role}`]: `Tambah ${role}`,
      "/kelas": "Kelas",
      [`/kelas/${id}`]: "Detail Kelas",
      "/kelas/tambah": "Tambah Kelas",
      "/profil": "Profil Saya",
      "/survei-kepuasan/survei-saya": "Survei Saya",
      [`/survei-kepuasan/survei-saya/${idSurvey}`]: "Isi Survei",
      "/survei-kepuasan/riwayat-survei": "Riwayat Survei",
      [`/survei-kepuasan/riwayat-survei/hasil-survei/${idSurvey}`]:
        "Hasil Survei",
      "/survei-kepuasan/pertanyaan": "Pertanyaan Survei",
      "/survei-kepuasan/template-survei": "Template Survei",
      "/survei-kepuasan/template-survei/tambah": "Tambah Template Survei",
      "/survei-kepuasan/tambah-survei": "Tambah Survei",
      "/survei-kepuasan/laporan-survei": "Laporan Survei",
      [`/survei-kepuasan/laporan-survei/${role}/${idSurvey}`]: "Laporan Survei",
      [`/survei-kepuasan/laporan-survei/rekap-survei/${role}/${survey}`]:
        "Rekapitulasi Survei",
      "/atur-ulang-password-pengguna": "Atur Ulang Password Pengguna",
    };

    setDashboardTitle(dasboardTitle[locationPath] || "Halaman Tidak Ditemukan");
  }, [locationPath, role, id, idSurvey, survey]);

  return dashboardtitle;
};

export default useDashboardTitle;
