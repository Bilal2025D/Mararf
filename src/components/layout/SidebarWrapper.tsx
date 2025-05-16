
import Sidebar from './Sidebar';

interface SidebarWrapperProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const SidebarWrapper = ({ isOpen, toggleSidebar }: SidebarWrapperProps) => (
  <div 
    className={`fixed inset-y-0 left-0 z-30 transition-all duration-300 ease-in-out ${
      isOpen ? 'w-56 md:w-64' : 'w-16'
    }`}
  >
    <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
  </div>
);

export default SidebarWrapper;
