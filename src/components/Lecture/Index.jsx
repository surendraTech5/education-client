import { useState } from "react";
import PageBreadcrumb from "../common/PageBreadCrumb";
import ComponentCard from "../common/ComponentCard";
import PageMeta from "../common/PageMeta";
import Button from "../ui/button/Button";
import LectureTable from "./LectureTable";
import AddLectureModal from "./AddLectureModal";

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshFlag, setRefreshFlag] = useState(false);

  const refreshLecture = () => setRefreshFlag(!refreshFlag);

  return (
    <>
      <PageMeta
        title="List Of Lecture"
        description="Manage your lecture list."
      />
      <PageBreadcrumb pageTitle="List Of Lecture" />
      <div className="space-y-6">
        <div className="flex justify-end">
          <Button
            size="sm"
            variant="primary"
            startIcon={" +"}
            onClick={() => setIsModalOpen(true)}
          >
            Add Lecture
          </Button>
        </div>
        <ComponentCard title="Lecture">
          <LectureTable key={refreshFlag} />
        </ComponentCard>
      </div>

      <AddLectureModal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        refreshLecture={refreshLecture}
      />
    </>
  );
};

export default Index;
