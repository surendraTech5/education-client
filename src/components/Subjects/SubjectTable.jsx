import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import { useEffect, useState } from "react";
import { getAllAdmin, getSubjectsFilter } from "../../config/liveApi";
import { useModal } from "../../hooks/useModal";
import Pagination from "../common/Pagination";
import Spinner from "../common/Spinner";
import { FaEdit, FaFilter } from "react-icons/fa";
import UpdatedModal from "./UpdateModal";

export default function ListofTable({ searchInput, refreshSubject }) {
  const [subject, setSubject] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("authToken");
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [createdBy, setCreatedBy] = useState([]);
  const [selectedCreatedBy, setSelectedCreatedBy] = useState("All");
  const [showFilter, setShowFilter] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);

  const { isOpen, openModal, closeModal } = useModal();
  // useEffect(() => {
  //   async function fetSubjects(page) {
  //     setLoading(true);
  //     try {
  //       const createdByFilter =
  //         selectedCreatedBy !== "All" ? selectedCreatedBy : "";
  //       const response = await getSubjectsFilter(
  //         token,
  //         page,
  //         searchInput,
  //         createdByFilter
  //       );
  //       if (response.success) {
  //         setSubject(response.subjects);
  //         setTotalPages(response.totalPages || 1);
  //       }
  //     } catch (err) {
  //       console.error("Failed to fetch Subject", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  //   fetSubjects(currentPage);
  // }, [token, currentPage, searchInput, selectedCreatedBy]);

  const fetchSubjects = async (page) => {
    setLoading(true);
    try {
      const createdByFilter =
        selectedCreatedBy !== "All" ? selectedCreatedBy : "";
      const response = await getSubjectsFilter(
        token,
        page,
        searchInput,
        createdByFilter
      );
      if (response.success) {
        setSubject(response.subjects);
        setTotalPages(response.totalPages || 1);
      }
    } catch (err) {
      console.error("Failed to fetch Subject", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchSubjects();
  }, [token, currentPage, searchInput, selectedCreatedBy]);

  const hableEditSubject = (subject) => {
    setSelectedSubject(subject);
    openModal();
  };

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
                Subject Name
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-bold text-black-600 text-start text-theme-xs dark:text-gray-400"
              >
                Description
              </TableCell>

              <TableCell
                isHeader
                className="px-5 py-3 font-bold text-black-600 text-start text-theme-xs dark:text-gray-400 relative"
              >
                <div className="flex items-center gap-2">
                  Created By
                  <FaFilter
                    className="text-black-900 cursor-pointer"
                    onClick={() => setShowFilter((prev) => !prev)}
                  />
                </div>
                {showFilter && (
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
                          setShowFilter(false);
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
                            setShowFilter(false);
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
            {subject.length > 0 ? (
              subject.map((sub) => (
                <TableRow key={sub._id}>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {sub.subjectName || "N/A"}
                  </TableCell>

                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {sub.description || "N/A"}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {sub.createdBy.firstName || "N/A"}{" "}
                    {sub.createdBy.lastName || "N/A"}
                  </TableCell>

                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <Badge size="sm" color={sub.isActive ? "success" : "error"}>
                      {sub.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-start">
                    <button
                      title="Edit Subject"
                      className="p-2 rounded-full bg-gray-100 hover:bg-brand-100 text-brand-600 transition-colors duration-200"
                      onClick={() => hableEditSubject(sub)}
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

      <UpdatedModal
        isOpen={isOpen}
        closeModal={closeModal}
        refreshSubject={fetchSubjects}
        selectedSubject={selectedSubject}
      />
    </div>
  );
}
