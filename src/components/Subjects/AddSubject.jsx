import { useState } from "react";
import { Modal } from "../ui/modal";
import { createSubject } from "../../config/liveApi";
import { toast } from "react-toastify";


const AddSubjectModal = ({ isOpen, closeModal, refreshSubject }) => {
  const [subjectName, setSubjectName] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const token = localStorage.getItem("authToken");

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!subjectName.trim() || !description.trim()) {
      return toast.error("All fields are required");
    }
    const payload = {
      subjectName,
      description,
    };
    try {
      setIsSubmitting(true);
      const res=await createSubject(token, payload);
      console.log("res",res)
      toast.success("Subject Created Successfully!");
      setSubjectName("");
      setDescription("");
      closeModal();
      refreshSubject();
    } catch (err) {
    console.log("err",err)
      toast.error(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[600px] m-4">
      <div className="no-scrollbar relative w-full max-w-[600px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            Add New Subject
          </h4>
        </div>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="custom-scrollbar h-[250px] overflow-y-auto px-2 pb-3">
            <div className="mt-8">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400 p-1">
                  Subject Name <span className="text-red-500">*</span>
                </label>
                <input
                required
                  id="subject-name"
                  type="text"
                  value={subjectName}
                  onChange={(e) => setSubjectName(e.target.value)}
                  className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                />
              </div>
              <div className="mt-4">
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
          </div>
          <div className="flex items-center gap-3 mt-6 modal-footer sm:justify-end">
            <button
              type="button"
              onClick={closeModal}
              className="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto"
            >
              Close
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-success btn-update-event flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 disabled:opacity-60 disabled:cursor-not-allowed sm:w-auto"
            >
              {isSubmitting ? "Adding..." : "Add Subject"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddSubjectModal;
