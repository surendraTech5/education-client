import { Modal } from "../ui/modal";
import { updateSubjectDetails } from "../../config/liveApi";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Spinner from "../common/Spinner";
import { useNavigate } from "react-router";

const UpdatedModal = ({
  isOpen,
  closeModal,
  selectedSubject,
  refreshSubject,
}) => {
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();

  const [subjectName, setSubjectName] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (selectedSubject) {
      setSubjectName(selectedSubject.subjectName || "");
      setDescription(selectedSubject.description || "");
      setIsActive(selectedSubject.isActive || false);
    }
  }, [selectedSubject]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await updateSubjectDetails(
        selectedSubject._id,
        { subjectName, description, isActive },
        token
      );
      console.log("Update Response:", res);
      if (!res.status) {
        throw new Error(res.message || "Update failed");
      }
      toast.success("Subject updated successfully");
      closeModal();
      refreshSubject();
      navigate("/subject");
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("Failed to update subject");
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
          Update Subject
        </h4>

        <div className="space-y-4 max-h-[300px] overflow-y-auto px-1 custom-scrollbar">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1.5">
              Subject Name
            </label>
            <input
              readOnly
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
              type="text"
              required
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
              required
              className="w-full h-11 px-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent dark:bg-dark-900 text-sm text-gray-800 dark:text-white/90 placeholder:text-gray-400 dark:placeholder:text-white/30 focus:ring-3 focus:ring-brand-500/10 focus:border-brand-300 dark:focus:border-brand-800"
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
            {isSubmitting ? (
              <>
                {/* <Spinner size="sm" /> */}
                Updating...
              </>
            ) : (
              "Update"
            )}
          </button>
        </div>
      </form>
      {isSubmitting ? (
        <>
          <Spinner size="sm" />
        </>
      ) : (
        ""
      )}
    </Modal>
  );
};

export default UpdatedModal;
