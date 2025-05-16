
import { useToast } from "@/hooks/use-toast";
import Header from './Header';

interface HeaderWrapperProps {
  toggleSidebar: () => void;
}

const HeaderWrapper = ({ toggleSidebar }: HeaderWrapperProps) => {
  const { toast } = useToast();
  
  return (
    <div className="fixed top-0 right-0 left-0 z-20 bg-white shadow-sm">
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <img 
          src="/lovable-uploads/4e9f36e5-3571-4f0e-b407-6ae86c3de7e1.png"
          alt="شعار الجمعية"
          className="h-12 w-auto opacity-10"
        />
      </div>
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <span className="text-xs font-bold text-emerald-800/20 arabic">مطالع العلوم والمعارف</span>
      </div>
      <Header toggleSidebar={toggleSidebar} />
    </div>
  );
};

export default HeaderWrapper;
