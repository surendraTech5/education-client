import { useEffect, useState } from "react";
import PageBreadcrumb from "../common/PageBreadCrumb";
import ComponentCard from "../common/ComponentCard";
import PageMeta from "../common/PageMeta";
import Button from "../ui/button/Button";
import SubjectTable from "../Subjects/SubjectTable";
import AddSubjectModal from "./AddSubject";
import { FaClipboardCheck } from "react-icons/fa";

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearchInput, setDebouncedSearchInput] = useState("");

  const refreshSubject = () => setRefreshFlag(!refreshFlag);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchInput(searchInput);
    }, 3000); 

    return () => clearTimeout(handler);
  }, [searchInput]);

  return (
    <>
      <PageMeta
        title="List Of Subjects"
        description="Manage your Subject list."
      />
      <PageBreadcrumb pageTitle="List Of Subjects" />
      <div className="space-y-6">
        <div className="flex justify-between">
          <div>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="relative">
                <span className="absolute -translate-y-1/2 pointer-events-none left-4 top-1/2">
                  <svg
                    className="fill-gray-500 dark:fill-gray-400"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M3.04175 9.37363C3.04175 5.87693 5.87711 3.04199 9.37508 3.04199C12.8731 3.04199 15.7084 5.87693 15.7084 9.37363C15.7084 12.8703 12.8731 15.7053 9.37508 15.7053C5.87711 15.7053 3.04175 12.8703 3.04175 9.37363ZM9.37508 1.54199C5.04902 1.54199 1.54175 5.04817 1.54175 9.37363C1.54175 13.6991 5.04902 17.2053 9.37508 17.2053C11.2674 17.2053 13.003 16.5344 14.357 15.4176L17.177 18.238C17.4699 18.5309 17.9448 18.5309 18.2377 18.238C18.5306 17.9451 18.5306 17.4703 18.2377 17.1774L15.418 14.3573C16.5365 13.0033 17.2084 11.2669 17.2084 9.37363C17.2084 5.04817 13.7011 1.54199 9.37508 1.54199Z"
                      fill=""
                    />
                  </svg>
                </span>
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Enter Subject Name!"
                  className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-12 pr-14 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800  dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 xl:w-[430px]"
                />
              </div>
            </form>
          </div>
          <div>
            <Button
              size="sm"
              variant="primary"
              startIcon={" +"}
              onClick={() => setIsModalOpen(true)}
            >
              Add Subject
            </Button>
          </div>
        </div>
        <ComponentCard title="Subjects">
          <SubjectTable key={refreshFlag} searchInput={debouncedSearchInput}/>
        </ComponentCard>
      </div>

      <AddSubjectModal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        refreshSubject={refreshSubject}
      />
    </>
  );
};

export default Index;
