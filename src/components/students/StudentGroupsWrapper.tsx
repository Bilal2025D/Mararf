
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useStudentGroups } from "@/context/StudentGroupsContext";
import StudentTable from "./StudentTable";

interface StudentGroupsWrapperProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const StudentGroupsWrapper: React.FC<StudentGroupsWrapperProps> = ({ activeTab, setActiveTab }) => {
  const { groupOneData, groupTwoData } = useStudentGroups();

  return (
    <Tabs 
      defaultValue="group1" 
      className="w-full" 
      value={activeTab}
      onValueChange={setActiveTab}
    >
      <TabsList className="grid w-full grid-cols-2 mb-6">
        <TabsTrigger 
          value="group1" 
          className="data-[state=active]:bg-emerald-700 data-[state=active]:text-white text-base md:text-lg arabic py-3"
        >
          الفوج 1
        </TabsTrigger>
        <TabsTrigger 
          value="group2" 
          className="data-[state=active]:bg-emerald-700 data-[state=active]:text-white text-base md:text-lg arabic py-3"
        >
          الفوج 2
        </TabsTrigger>
      </TabsList>

      <TabsContent value="group1" className="animate-fade-in">
        <StudentTable 
          groupName="group1" 
          groupTitle="قائمة الفوج 1" 
          groupData={groupOneData}
        />
      </TabsContent>

      <TabsContent value="group2" className="animate-fade-in">
        <StudentTable 
          groupName="group2" 
          groupTitle="قائمة الفوج 2" 
          groupData={groupTwoData}
        />
      </TabsContent>
    </Tabs>
  );
};

export default StudentGroupsWrapper;
