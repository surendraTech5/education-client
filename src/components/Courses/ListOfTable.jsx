import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import { useEffect, useState } from "react";
import {
  getAllAdmin,
  getAllSubjects,
  getCourseFilter,
} from "../../config/liveApi";
import { useModal } from "../../hooks/useModal";
import EditModal from "./AddCourseModal";
import Spinner from "../common/Spinner";
import Pagination from "../common/Pagination";
import { FaEdit, FaFilter } from "react-icons/fa";
import UpdatedCourseModal from "./UpdateCourseModal"

export default function ListofTable({ searchInput }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("authToken");
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [createdBy, setCreatedBy] = useState([]);
  const [selectedCreatedBy, setSelectedCreatedBy] = useState("All");
  const [showCreatedByFilter, setShowCreatedByFilter] = useState(false);
  const [showSubjectFilter, setShowSubjectFilter] = useState(false);
  const [subjectId, setSubjectId] = useState([]);
  const [selectedSubjectId, setSelectedSubjectId] = useState("All");
  const { isOpen, openModal, closeModal } = useModal();
  const [selectedCourses, setSelectedCourses] = useState(null);

  console.log(page, searchInput, selectedCreatedBy, selectedSubjectId);
  const fetchCourses = async (page) => {
    setLoading(true);
    try {
      const createdByFilter =
        selectedCreatedBy !== "All" ? selectedCreatedBy : "";
      const subjectFilter =
        selectedSubjectId !== "All" ? selectedSubjectId : "";
      const response = await getCourseFilter(
        token,
        page,
        searchInput,
        createdByFilter,
        subjectFilter
      );
      if (response.success) {
        setCourses(response.courses);
        setTotalPages(response.totalPages || 1);
      }
    } catch (err) {
      console.error("Failed to fetch Subject", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCourses();
  }, [token, currentPage, searchInput, selectedCreatedBy, selectedSubjectId]);

  const fetchCreateUser = async () => {
    try {
      const response = await getAllAdmin();
      const data = response?.users || [];
      setCreatedBy(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchCreateUser();
  }, []);

  const fetchSubjects = async () => {
    try {
      const response = await getAllSubjects(token);
      if (response.success) {
        setSubjectId(response.subjects);
      }
    } catch (err) {
      console.error("Failed to fetch Subject", err);
    }
  };
  useEffect(() => {
    fetchSubjects();
  }, [token]);

  const handleEditCourse = (course) => {
    setSelectedCourses(course);
    openModal();
  };

  if (loading) return <Spinner />;

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
                Course Name
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
                Price
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-bold text-black-600 text-start text-theme-xs dark:text-gray-400"
              >
                Discount
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-bold text-black-600 text-start text-theme-xs dark:text-gray-400"
              >
                Course Duration
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-bold text-black-600 text-start text-theme-xs dark:text-gray-400"
              >
                Medium
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-bold text-black-600 text-start text-theme-xs dark:text-gray-400"
              >
                Board
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-bold text-black-600 text-start text-theme-xs dark:text-gray-400"
              >
                Class
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-bold text-black-600 text-start text-theme-xs dark:text-gray-400 relative"
              >
                <div className="flex items-center gap-2">
                  Subjects
                  <FaFilter
                    className="text-black-900 cursor-pointer"
                    onClick={() => {
                      setShowSubjectFilter((prev) => !prev);
                      setShowCreatedByFilter(false);
                    }}
                  />
                </div>
                {showSubjectFilter && (
                  <div className="absolute top-10 left-0 z-30 w-48 mt-2 bg-white border border-gray-200 rounded-md shadow-lg">
                    <div className="border-b p-2 text-xs font-semibold text-gray-700">
                      Filter by Subject
                    </div>
                    <ul className="max-h-60 overflow-y-auto text-sm text-gray-700">
                      <li
                        className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                          selectedSubjectId === "All"
                            ? "bg-gray-100 font-medium"
                            : ""
                        }`}
                        onClick={() => {
                          setSelectedSubjectId("All");
                          setCurrentPage(1);
                          setShowSubjectFilter(false);
                        }}
                      >
                        All
                      </li>
                      {subjectId.map((subject) => (
                        <li
                          key={subject._id}
                          className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                            selectedSubjectId === subject._id
                              ? "bg-gray-100 font-medium"
                              : ""
                          }`}
                          onClick={() => {
                            setSelectedSubjectId(subject._id);
                            setCurrentPage(1);
                            setShowSubjectFilter(false);
                          }}
                        >
                          {subject.subjectName}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </TableCell>

              <TableCell
                isHeader
                className="px-5 py-3 font-bold text-black-600 text-start text-theme-xs dark:text-gray-400 relative"
              >
                <div className="flex items-center gap-2">
                  Created By
                  <FaFilter
                    className="text-black-900 cursor-pointer"
                    onClick={() => {
                      setShowCreatedByFilter((prev) => !prev);
                      setShowSubjectFilter(false);
                    }}
                  />
                </div>
                {showCreatedByFilter && (
                  <div className="absolute top-10 left-0 z-20 w-48 mt-2 bg-white border border-gray-200 rounded-md shadow-lg">
                    <ul className="max-h-60 overflow-y-auto text-sm text-gray-700">
                      <li
                        className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                          selectedCreatedBy === "All"
                            ? "bg-gray-100 font-medium"
                            : ""
                        }`}
                        onClick={() => {
                          setSelectedCreatedBy("All");
                          setCurrentPage(1);
                          setShowCreatedByFilter(false);
                        }}
                      >
                        All
                      </li>
                      {createdBy.map((user) => (
                        <li
                          key={user._id}
                          className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                            selectedCreatedBy === user._id
                              ? "bg-gray-100 font-medium"
                              : ""
                          }`}
                          onClick={() => {
                            setSelectedCreatedBy(user._id);
                            setCurrentPage(1);
                            setShowCreatedByFilter(false);
                          }}
                        >
                          {user.firstName} {user.lastName}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
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
            {courses.length > 0 ? (
              courses.map((course) => (
                <TableRow key={course._id}>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {course.courseName || "N/A"}
                  </TableCell>

                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {course.description || "N/A"}
                  </TableCell>

                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    ₹ {course.price || "N/A"}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {course.discount || "N/A"} %
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {course.duration || "N/A"}
                  </TableCell>

                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {course.medium || "N/A"}
                  </TableCell>

                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {course.board || "N/A"}
                  </TableCell>

                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {course.classes || "N/A"}
                  </TableCell>

                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {course.subjects[0]?.subjectName || "N/A"}
                  </TableCell>

                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {course.createdBy.firstName || "N/A"}{" "}
                    {course.createdBy.lastName || "N/A"}
                  </TableCell>

                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <Badge
                      size="sm"
                      color={course.isActive ? "success" : "error"}
                    >
                      {course.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-start">
                    <button
                      title="Edit Subject"
                      className="p-2 rounded-full bg-gray-100 hover:bg-brand-100 text-brand-600 transition-colors duration-200"
                      onClick={() => handleEditCourse(course)}
                    >
                      <FaEdit className="w-4 h-4" />
                    </button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <div className="mt-4 ml-3">
                <h3 className="text-lg font-semibold text-gray-700 dark:text-white">
                  No Data Found!..
                </h3>
              </div>
            )}
          </TableBody>
        </Table>
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </div>
      <EditModal isOpen={isOpen} closeModal={closeModal} />
       <UpdatedCourseModal
        isOpen={isOpen}
        closeModal={closeModal}
        refreshCourses={fetchCourses}
        selectedCourses={selectedCourses}
      />
    </div>
  );
}
