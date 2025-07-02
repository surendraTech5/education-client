import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import { useEffect, useState } from "react";
import { useModal } from "../../hooks/useModal";
import { getAllLectureForTable } from "../../config/liveApi";
import  Pagination from "../common/Pagination"
import Spinner from "../common/Spinner";

export default function ListofTable() {
  const [lecture, setLecture] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("authToken");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);


  const { isOpen, openModal, closeModal } = useModal();
  useEffect(() => {
    async function fetchGetAllLecture(page) {
      setLoading(true);
      try {
        const response = await getAllLectureForTable(token,page);
        if (response.status) {
          setLecture(response.lectures);
          setTotalPages(response.totalPages || 1);
        }
      } catch (err) {
        console.error("Failed to fetch Subject", err);
      } finally {
        setLoading(false);
      }
    }
    fetchGetAllLecture(currentPage);
  }, [token,currentPage]);

  const hableEditSubject = (lecture) => {
    openModal();
  };
  const handleVideoClick = (videoUrl) => {
    setSelectedVideo(videoUrl);
    setVideoModalOpen(true);
  };


if (loading) return <Spinner />;
  console.log("Lectures", lecture);
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 font-bold text-black-600 text-start text-theme-xs dark:text-gray-400"
              >
                Lecture Name
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-bold text-black-600 text-start text-theme-xs dark:text-gray-400"
              >
                Description
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-bold text-black-600 text-start text-theme-xs dark:text-gray-400"
              >
                Course
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-bold text-black-600 text-start text-theme-xs dark:text-gray-400"
              >
                Subject
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-bold text-black-600 text-start text-theme-xs dark:text-gray-400"
              >
                Videos
              </TableCell>

              <TableCell
                isHeader
                className="px-5 py-3 font-bold text-black-600 text-start text-theme-xs dark:text-gray-400"
              >
                Created By
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-bold text-black-600 text-start text-theme-xs dark:text-gray-400"
              >
                Active
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-bold text-black-600 text-start text-theme-xs dark:text-gray-400"
              >
                Update
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {lecture.map((lec) => (
              <TableRow key={lec._id}>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {lec.lectureName || "N/A"}
                </TableCell>

                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {lec.description || "N/A"}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {lec.courseId?.courseName || "N/A"}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {lec.subjectId?.subjectName || "N/A"}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {/* {lec?.videoUrl || "N/A"} */}
                  <div className="flex -space-x-2">
                    {lec.videoUrl ? (
                      <div
                        className="w-8 h-6 overflow-hidden border-2 border-white rounded-full dark:border-gray-900"
                        onClick={() => handleVideoClick(lec.videoUrl)}
                        title="Click to preview"
                      >
                        {/* <video
                      src={lec.videoUrl}
                    width={24}
                    height={24}
                      controls
                      className="w-full size-6"
                    /> */}
                        <span className="text-xl cursor-pointer">🎬</span>
                      </div>
                    ) : (
                      "N/A"
                    )}
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {lec.createdBy.firstName || "N/A"}{" "}
                  {lec.createdBy.lastName || "N/A"}
                </TableCell>

                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <Badge size="sm" color={lec.isActive ? "success" : "error"}>
                    {lec.isActive ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell className="px-4 py-3 text-start">
                  <button
                    className="text-sm text-brand-500 hover:underline"
                    onClick={() => hableEditSubject(lec)}
                  >
                    Edit
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination currentPage={currentPage}
  setCurrentPage={setCurrentPage}
  totalPages={totalPages} />
      </div>
      {/* <EditModal
  isOpen={isOpen}
  closeModal={closeModal}
/> */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white dark:bg-gray-900 rounded-lg p-4 max-w-lg w-full relative">
            <button
              className="absolute top-2 right-3 w-7 h-7 flex items-center justify-center rounded-full bg-gray-200 hover:bg-red-500 hover:text-white text-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-red-600 transition"
              onClick={() => setVideoModalOpen(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <video
              src={selectedVideo}
              controls
              autoPlay
              className="w-full h-80 rounded p-5"
            />
          </div>
        </div>
      )}
    </div>
  );
}
