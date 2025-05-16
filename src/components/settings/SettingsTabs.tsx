
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GeneralSettingsCard from "@/components/settings/GeneralSettingsCard";
import NotificationSettingsCard from "@/components/settings/NotificationSettingsCard";
import AssociationSettings from "@/components/settings/AssociationSettings";
import SyncSettings from "@/components/settings/SyncSettings";

interface SettingsTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const SettingsTabs = ({ activeTab, setActiveTab }: SettingsTabsProps) => {
  return (
    <Tabs 
      value={activeTab} 
      onValueChange={setActiveTab} 
      className="space-y-6"
    >
      <TabsList className="mb-4 overflow-x-auto flex w-full bg-emerald-50 p-1 no-scrollbar">
        <TabsTrigger 
          value="general" 
          className="arabic text-emerald-700 flex-1 data-[state=active]:bg-emerald-600 data-[state=active]:text-white whitespace-nowrap"
        >
          عام
        </TabsTrigger>
        <TabsTrigger 
          value="association" 
          className="arabic text-emerald-700 flex-1 data-[state=active]:bg-emerald-600 data-[state=active]:text-white whitespace-nowrap"
        >
          الجمعية
        </TabsTrigger>
        <TabsTrigger 
          value="sync" 
          className="arabic text-emerald-700 flex-1 data-[state=active]:bg-emerald-600 data-[state=active]:text-white whitespace-nowrap"
        >
          المزامنة
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="general" className="animate-in fade-in-50 space-y-4 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GeneralSettingsCard />
          <NotificationSettingsCard />
        </div>
      </TabsContent>
      
      <TabsContent value="association" className="animate-in fade-in-50 px-4">
        <AssociationSettings />
      </TabsContent>
      
      <TabsContent value="sync" className="animate-in fade-in-50 px-4">
        <SyncSettings />
      </TabsContent>
    </Tabs>
  );
};

export default SettingsTabs;
