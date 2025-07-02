import React, { useEffect, useState } from "react";
import { Modal } from "../ui/modal";
import {
  craeteLecture,
  getAllSubjects,
  getListOfCourses,
} from "../../config/liveApi";
import { toast } from "react-toastify";
const AddLectureModal = ({ isOpen, closeModal, refreshLecture }) => {
  const [lectureName, setLectureName] = useState("");
  const [videoUrl, setVideoUrl] = useState(null);
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState(null);
  const [test, setTest] = useState("");
  const [additionalDocuments, setAdditionalDocuments] = useState(null);
  const [subjectId, setSubjectId] = useState("");
  const [subjectsList, setSubjectsList] = useState([]);
  const [courseId, setCourseId] = useState("");
  const [courseList, setCourseList] = useState([]);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    if (isOpen) {
      getAllSubjects(token)
        .then((res) => {
          setSubjectsList(res.subjects || []);
        })
        .catch(() => setSubjectsList([]));
    }
  }, [isOpen, token]);

  useEffect(() => {
    if (isOpen) {
      getListOfCourses(token)
        .then((res) => {
          setCourseList(res.courses || []);
        })
        .catch(() => setCourseList([]));
    }
  }, [isOpen, token]);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("lectureName", lectureName);
    formData.append("description", description);
    formData.append("test", test);
    formData.append("courseId", courseId);
    formData.append("subjectId", subjectId);

    if (videoUrl) formData.append("videoUrl", videoUrl);
    if (additionalDocuments)
      formData.append("additionalDocuments", additionalDocuments);
    if (notes) formData.append("notes", notes);

    try {
      await craeteLecture(token, formData);
      toast.success("Lecture Added Successfully!");
      setLectureName("");
      setVideoUrl(null);
      setDescription("");
      setAdditionalDocuments(null);
      setNotes(null);
      setSubjectId("");
      setCourseId("");
      setTest("");
      closeModal();
      refreshLecture();
    } catch (err) {
      console.log("err", err);
      toast.error("Failed to add course");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[600px] m-4">
      <div className="no-scrollbar relative w-full max-w-[600px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            Add New Lecture
          </h4>
        </div>
        <form className="flex flex-col">
          <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
            <div className="mt-8">
              <div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400 p-1">
                    Lecture Name <span className="text-red-500">*</span>
                  </label>
                  <input
                   required
                    id="Course-name"
                    type="text"
                    value={lectureName}
                    onChange={(e) => setLectureName(e.target.value)}
                    className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                  />
                </div>
              </div>
              <div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400 p-1">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <input
                  required
                    id="description-name"
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                  />
                </div>
              </div>

              {/* video upload */}
              <div className="mt-4">
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400 p-1">
                  Upload Video <span className="text-red-500">*</span>
                </label>

                {videoUrl ? (
                  <div className="flex items-center gap-3 rounded-lg border p-3 w-full shadow-sm bg-white dark:bg-gray-800">
                    <div className="text-3xl">🎬</div>
                    <div className="flex flex-col w-full">
                      <div className="font-medium text-gray-700 dark:text-white truncate">
                        {videoUrl.name}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-300">
                        Video •{" "}
                        <span
                          className="underline cursor-pointer"
                          onClick={() => setVideoUrl(null)}
                        >
                          Remove
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div
                      onClick={() =>
                        document.getElementById("video-upload").click()
                      }
                      className="flex items-center justify-center rounded-lg border border-dashed p-6 w-full cursor-pointer text-gray-400 hover:text-indigo-500 hover:border-indigo-300 dark:border-gray-700 dark:hover:border-indigo-500"
                    >
                      + Upload a video file
                    </div>
                    <input
                    required
                      id="video-upload"
                      type="file"
                      accept="video/*"
                      className="hidden"
                      onChange={(e) => setVideoUrl(e.target.files[0])}
                    />
                  </>
                )}
              </div>
              {/* video upload end */}

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400  pt-5">
                  Select Course <span className="text-red-500">*</span>
                </label>
                <select
                required
                  id="courseId"
                  value={courseId}
                  onChange={(e) => setCourseId(e.target.value)}
                  className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                >
                  <option value="">Select</option>
                  {courseList.map((course) => (
                    <option key={course._id} value={course._id}>
                      {course.courseName}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400  pt-5">
                  Select Subject <span className="text-red-500">*</span>
                </label>
                <select
                required
                  id="subject"
                  value={subjectId}
                  onChange={(e) => setSubjectId(e.target.value)}
                  className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                >
                  <option value="">Select</option>
                  {subjectsList.map((subj) => (
                    <option key={subj._id} value={subj._id}>
                      {subj.subjectName}
                    </option>
                  ))}
                </select>
              </div>

              {/* upload notes */}
              <div className="mt-4">
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400 p-1">
                  Upload Notes
                </label>

                {notes ? (
                  <div className="flex items-center gap-3 rounded-lg border p-3 w-full shadow-sm bg-white dark:bg-gray-800">
                    <div className="text-3xl">
                      {notes.type.includes("pdf") ? "📄" : "🖼️"}
                    </div>
                    <div className="flex flex-col w-full">
                      <div className="font-medium text-gray-700 dark:text-white truncate">
                        {notes.name}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-300">
                        {notes.type.includes("pdf") ? "PDF" : "Image"} •{" "}
                        <span
                          className="underline cursor-pointer"
                          onClick={() => setNotes(null)}
                        >
                          Remove
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div
                      onClick={() =>
                        document.getElementById("notes-upload").click()
                      }
                      className="flex items-center justify-center rounded-lg border border-dashed p-6 w-full cursor-pointer text-gray-400 hover:text-indigo-500 hover:border-indigo-300 dark:border-gray-700 dark:hover:border-indigo-500"
                    >
                      + Upload Image or PDF file
                    </div>
                    <input
                      id="notes-upload"
                      type="file"
                      accept=".pdf,image/*"
                      className="hidden"
                      onChange={(e) => setNotes(e.target.files[0])}
                    />
                  </>
                )}
              </div>

              {/* upload documents */}
              <div className="mt-4">
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400 p-1">
                  Upload AdditionalbDocuments
                </label>

                {additionalDocuments ? (
                  <div className="flex items-center gap-3 rounded-lg border p-3 w-full shadow-sm bg-white dark:bg-gray-800">
                    <div className="text-3xl">
                      {additionalDocuments.type.includes("pdf") ? "📄" : "🖼️"}
                    </div>
                    <div className="flex flex-col w-full">
                      <div className="font-medium text-gray-700 dark:text-white truncate">
                        {additionalDocuments.name}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-300">
                        {additionalDocuments.type.includes("pdf")
                          ? "PDF"
                          : "Image"}{" "}
                        •{" "}
                        <span
                          className="underline cursor-pointer"
                          onClick={() => setAdditionalDocuments(null)}
                        >
                          Remove
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div
                      onClick={() =>
                        document.getElementById("documents-upload").click()
                      }
                      className="flex items-center justify-center rounded-lg border border-dashed p-6 w-full cursor-pointer text-gray-400 hover:text-indigo-500 hover:border-indigo-300 dark:border-gray-700 dark:hover:border-indigo-500"
                    >
                      + Upload Image or PDF file
                    </div>
                    <input
                      id="documents-upload"
                      type="file"
                      accept=".pdf,image/*"
                      className="hidden"
                      onChange={(e) =>
                        setAdditionalDocuments(e.target.files[0])
                      }
                    />
                  </>
                )}
              </div>
              {/* end docuent upload */}
              <div className="mt-5">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400 p-1">
                    Test
                  </label>
                  <input
                    id="tset-name"
                    type="text"
                    value={test}
                    onChange={(e) => setTest(e.target.value)}
                    className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-6 modal-footer sm:justify-end">
            <button
              onClick={closeModal}
              type="button"
              className="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto"
            >
              Close
            </button>
            <button
              onClick={handleSubmit}
              type="button"
              className="btn btn-success btn-update-event flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto"
            >
              Add Course
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
export default AddLectureModal;
