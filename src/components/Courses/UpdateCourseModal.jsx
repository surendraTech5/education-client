import { Modal } from "../ui/modal";
import { updateCourseDetails } from "../../config/liveApi";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Spinner from "../common/Spinner";
import { useNavigate } from "react-router";
import { BOARD_OPTIONS, MEDIUM_OPTIONS } from "../../constants/courseConstants";

const UpdateCourseModal = ({
  isOpen,
  closeModal,
  selectedCourses,
  refreshCourses,
}) => {
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();

  const [courseName, setCourseName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [duration, setDuration] = useState("");
  const [medium, setMedium] = useState("");
  const [board, setBoard] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (selectedCourses) {
      setCourseName(selectedCourses.courseName || "");
      setDescription(selectedCourses.description || "");
      setPrice(selectedCourses.price || "");
      setIsActive(selectedCourses.isActive || false);
      setDuration(selectedCourses.duration || "");
      setMedium(selectedCourses.medium || "");
      setBoard(selectedCourses.board || "");
    }
  }, [selectedCourses]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await updateCourseDetails(
        selectedCourses._id,
        { courseName, description, isActive },
        token
      );
      if (!res.status) {
        throw new Error(res.message || "Update failed");
      }
      toast.success("Course updated successfully");
      closeModal();
      refreshCourses();
      navigate("/course");
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("Failed to update course");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[600px] m-4">
      <form
        onSubmit={handleUpdate}
        className="bg-white dark:bg-gray-900 rounded-3xl p-6 lg:p-11"
      >
        <h4 className="text-2xl font-semibold text-gray-800 dark:text-white/90 mb-6">
          Update Course
        </h4>

        <div className="space-y-4 max-h-[300px] overflow-y-auto px-1 custom-scrollbar">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1.5">
              Course Name
            </label>
            <input
              readOnly
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              type="text"
              className="w-full h-11 px-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent dark:bg-dark-900 text-sm text-gray-800 dark:text-white/90 placeholder:text-gray-400 dark:placeholder:text-white/30 focus:ring-3 focus:ring-brand-500/10 focus:border-brand-300 dark:focus:border-brand-800"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1.5">
              Description
            </label>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              className="w-full h-11 px-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent dark:bg-dark-900 text-sm text-gray-800 dark:text-white/90 placeholder:text-gray-400 dark:placeholder:text-white/30 focus:ring-3 focus:ring-brand-500/10 focus:border-brand-300 dark:focus:border-brand-800"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1.5">
              Price
            </label>
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="number"
              className="w-full h-11 px-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent dark:bg-dark-900 text-sm text-gray-800 dark:text-white/90 placeholder:text-gray-400 dark:placeholder:text-white/30 focus:ring-3 focus:ring-brand-500/10 focus:border-brand-300 dark:focus:border-brand-800"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400 p-1">
              Discount (%)
            </label>
            <input
              type="number"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400 p-1">
              Duration (month)
            </label>
            <input
              type="duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1.5">
              Status
            </label>
            <div className="flex items-center gap-6">
              <label className="inline-flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                <input
                  type="radio"
                  name="status"
                  value="active"
                  checked={isActive === true}
                  onChange={() => setIsActive(true)}
                  className="form-radio h-4 w-4 text-brand-500"
                />
                <span className="ml-2">Active</span>
              </label>
              <label className="inline-flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                <input
                  type="radio"
                  name="status"
                  value="inactive"
                  checked={isActive === false}
                  onChange={() => setIsActive(false)}
                  className="form-radio h-4 w-4 text-red-500"
                />
                <span className="ml-2">Inactive</span>
              </label>
            </div>
          </div>

          <div className="mt-6">
            <label className="block mb-4 text-sm font-medium text-gray-700 dark:text-gray-400">
              Select Medium
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
              Select Board
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
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={closeModal}
            className="rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/[0.03]"
          >
            Close
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-lg bg-brand-500 hover:bg-brand-600 px-4 py-2.5 text-sm font-medium text-white disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[120px]"
          >
            {isSubmitting ? "Updating..." : "Update"}
          </button>
        </div>
      </form>

      {isSubmitting && <Spinner size="sm" />}
    </Modal>
  );
};

export default UpdateCourseModal;
