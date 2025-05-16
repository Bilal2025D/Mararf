
import Sidebar from './Sidebar';
import { useIsMobile } from "@/hooks/use-mobile";

interface SidebarWrapperProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const SidebarWrapper = ({ isOpen, toggleSidebar }: SidebarWrapperProps) => {
  const isMobile = useIsMobile();
  
  return <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />;
};

export default SidebarWrapper;
