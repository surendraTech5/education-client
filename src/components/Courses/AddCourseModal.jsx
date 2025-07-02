import React, { useEffect, useState } from "react";
import { Modal } from "../ui/modal";
import { addNewCourses, getAllSubjects } from "../../config/liveApi";
import { toast } from "react-toastify";
import {
  MEDIUM_OPTIONS,
  BOARD_OPTIONS,
  CLASS_OPTIONS,
} from "../../constants/courseConstants";
const AddCourseModal = ({ isOpen, closeModal, refreshCourses }) => {
  const [courseName, setCourseName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [duration, setDuration] = useState("");
  const [medium, setMedium] = useState("");
  const [board, setBoard] = useState("");
  const [classes, setClasses] = useState("");
  const [activeDiscount, setActiveDiscount] = useState(false);
  const [free, setFree] = useState(false);
  const [paid, setPaid] = useState(false);
  const [subject, setSubject] = useState("");
  const [subjectsList, setSubjectsList] = useState([]);
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

  const handleSubmit = async () => {
    const payload = {
      courseName,
      description,
      price: Number(price),
      discount: Number(discount),
      isActiveDiscount: activeDiscount,
      isFree: free,
      isPaid: paid,
      duration,
      medium,
      board,
      classes,
      subjects: [subject],
    };

    try {
      await addNewCourses(token, payload);
      toast.success("Course Created Successfully!");
      setCourseName("");
      setDescription("");
      setPrice("");
      setDiscount("");
      setDuration("");
      setMedium("");
      setBoard("");
      setClasses("");
      setActiveDiscount(false);
      setFree(false);
      setPaid(false);
      setSubject("");
      closeModal();
      refreshCourses();
    } catch (err) {
      toast.error("Failed to add course");
    }
  };

  const handleFreeChange = (value) => {
    setFree(value);
    if (value) setPaid(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[600px] m-4">
      <div className="no-scrollbar relative w-full max-w-[600px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            Add New Course
          </h4>
        </div>
        <form className="flex flex-col">
          <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
            <div className="mt-8">
              <div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400 p-1">
                    Course Name <span className="text-red-500">*</span>
                  </label>
                  <input
                  required
                    id="Course-name"
                    type="text"
                    value={courseName}
                    onChange={(e) => setCourseName(e.target.value)}
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
              <div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400 p-1">
                    Price (₹) <span className="text-red-500">*</span>
                  </label>
                  <input
                  required
                    id="price"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                  />
                </div>
              </div>
              <div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400 p-1">
                    Discount (%)
                  </label>
                  <input
                    id="discount"
                    type="number"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                    className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                  />
                </div>
              </div>

              <div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400 p-1">
                    Duration (month) <span className="text-red-500">*</span>
                  </label>
                  <input
                  required
                    id="duration"
                    type="text"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block mb-4 text-sm font-medium text-gray-700 dark:text-gray-400">
                  Select Medium <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-wrap items-center gap-4 sm:gap-5">
                  {MEDIUM_OPTIONS.map((key) => (
                    <div key={key} className="n-chk">
                      <div
                        className={`form-check form-check-${key} form-check-inline`}
                      >
                        <label
                          className="flex items-center text-sm text-gray-700 form-check-label dark:text-gray-400"
                          htmlFor={`medium${key}`}
                        >
                          <span className="relative">
                            <input
                            required
                              className="sr-only form-check-input"
                              type="radio"
                              name="medium"
                              value={key}
                              id={`medium${key}`}
                              checked={medium === key}
                              onChange={() => setMedium(key)}
                            />
                            <span className="flex items-center justify-center w-5 h-5 mr-2 border border-gray-300 rounded-full box dark:border-gray-700">
                              <span
                                className={`h-2 w-2 rounded-full bg-white ${
                                  medium === key ? "block" : "hidden"
                                }`}
                              ></span>
                            </span>
                          </span>
                          {key}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <label className="block mb-4 text-sm font-medium text-gray-700 dark:text-gray-400">
                  Select Board <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-wrap items-center gap-4 sm:gap-5">
                  {BOARD_OPTIONS.map((key) => (
                    <div key={key} className="n-chk">
                      <div
                        className={`form-check form-check-${key} form-check-inline`}
                      >
                        <label
                          className="flex items-center text-sm text-gray-700 form-check-label dark:text-gray-400"
                          htmlFor={`board${key}`}
                        >
                          <span className="relative">
                            <input
                            required
                              className="sr-only form-check-input"
                              type="radio"
                              name="board"
                              value={key}
                              id={`board${key}`}
                              checked={board === key}
                              onChange={() => setBoard(key)}
                            />
                            <span className="flex items-center justify-center w-5 h-5 mr-2 border border-gray-300 rounded-full box dark:border-gray-700">
                              <span
                                className={`h-2 w-2 rounded-full bg-white ${
                                  board === key ? "block" : "hidden"
                                }`}
                              ></span>
                            </span>
                          </span>
                          {key}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400  pt-5">
                  Select Subject <span className="text-red-500">*</span>
                </label>
                <select
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
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

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400 pt-5">
                  Select Class <span className="text-red-500">*</span>
                </label>
                <select
                  id="classes"
                  value={classes}
                  onChange={(e) => setClasses(e.target.value)}
                  className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                >
                  <option value="">Select</option>
                  {Object.entries(CLASS_OPTIONS).map(([label, value]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-6">
                <label className="block mb-4 text-sm font-medium text-gray-700 dark:text-gray-400">
                  Active Discount
                </label>
                <div className="flex flex-wrap items-center gap-4 sm:gap-5">
                  {[
                    { label: "Yes", value: true },
                    { label: "No", value: false },
                  ].map(({ label, value }) => (
                    <div key={label} className="n-chk">
                      <div
                        className={`form-check form-check-${label.toLowerCase()} form-check-inline`}
                      >
                        <label
                          className="flex items-center text-sm text-gray-700 form-check-label dark:text-gray-400"
                          htmlFor={`activeDiscount${label}`}
                        >
                          <span className="relative">
                            <input
                              className="sr-only form-check-input"
                              type="radio"
                              name="active-discount"
                              value={value}
                              id={`activeDiscount${label}`}
                              checked={activeDiscount === value}
                              onChange={() => setActiveDiscount(value)}
                            />
                            <span className="flex items-center justify-center w-5 h-5 mr-2 border border-gray-300 rounded-full box dark:border-gray-700">
                              <span
                                className={`h-2 w-2 rounded-full bg-white ${
                                  activeDiscount === value ? "block" : "hidden"
                                }`}
                              ></span>
                            </span>
                          </span>
                          {label}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <label className="block mb-4 text-sm font-medium text-gray-700 dark:text-gray-400">
                  Free Course
                </label>
                <div className="flex flex-wrap items-center gap-4 sm:gap-5">
                  {[
                    { label: "Yes", value: true },
                    { label: "No", value: false },
                  ].map(({ label, value }) => (
                    <div key={label} className="n-chk">
                      <div
                        className={`form-check form-check-${label.toLowerCase()} form-check-inline`}
                      >
                        <label
                          className="flex items-center text-sm text-gray-700 form-check-label dark:text-gray-400"
                          htmlFor={`free${label}`}
                        >
                          <span className="relative">
                            <input
                              className="sr-only form-check-input"
                              type="radio"
                              name="free"
                              value={value}
                              id={`free${label}`}
                              checked={free === value}
                              onChange={() => handleFreeChange(value)}
                            />
                            <span className="flex items-center justify-center w-5 h-5 mr-2 border border-gray-300 rounded-full box dark:border-gray-700">
                              <span
                                className={`h-2 w-2 rounded-full bg-white ${
                                  free === value ? "block" : "hidden"
                                }`}
                              ></span>
                            </span>
                          </span>
                          {label}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <label className="block mb-4 text-sm font-medium text-gray-700 dark:text-gray-400">
                  Paid Course
                </label>
                <div className="flex flex-wrap items-center gap-4 sm:gap-5">
                  {[
                    { label: "Yes", value: true },
                    { label: "No", value: false },
                  ].map(({ label, value }) => (
                    <div key={label} className="n-chk">
                      <div
                        className={`form-check form-check-${label.toLowerCase()} form-check-inline`}
                      >
                        <label
                          className="flex items-center text-sm text-gray-700 form-check-label dark:text-gray-400"
                          htmlFor={`paid${label}`}
                        >
                          <span className="relative">
                            <input
                              className="sr-only form-check-input"
                              type="radio"
                              name="paid"
                              value={value}
                              id={`paid${label}`}
                              checked={paid === value}
                              onChange={() => setPaid(value)}
                            />
                            <span className="flex items-center justify-center w-5 h-5 mr-2 border border-gray-300 rounded-full box dark:border-gray-700">
                              <span
                                className={`h-2 w-2 rounded-full bg-white ${
                                  paid === value ? "block" : "hidden"
                                }`}
                              ></span>
                            </span>
                          </span>
                          {label}
                        </label>
                      </div>
                    </div>
                  ))}
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
export default AddCourseModal;
