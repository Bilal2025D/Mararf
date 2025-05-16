
import { useState, useEffect } from "react";
import { Wifi, WifiOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const OnlineStatusIndicator = () => {
  const { toast } = useToast();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  
  // Monitor online status - improved detection
  useEffect(() => {
    // Initial check
    setIsOnline(navigator.onLine);
    
    const checkConnection = async () => {
      try {
        // Try to fetch a small resource to confirm actual connectivity
        const response = await fetch('https://www.google.com/favicon.ico', { 
          mode: 'no-cors',
          cache: 'no-store',
          method: 'HEAD'
        });
        const online = true; // If we reach here without error, we're online
        
        if (online !== isOnline) {
          setIsOnline(online);
          if (online) {
            const hasPendingSync = localStorage.getItem('pendingSync') === 'true';
            toast({
              title: "تم استعادة الاتصال",
              description: hasPendingSync 
                ? "يوجد بيانات محلية بحاجة للمزامنة" 
                : "تم استعادة الاتصال بنجاح",
              variant: "default",
            });
          }
        }
      } catch (error) {
        if (isOnline) {
          setIsOnline(false);
          toast({
            title: "انقطع الاتصال",
            description: "سيتم حفظ البيانات محليًا حتى استعادة الاتصال",
            variant: "destructive",
          });
        }
      }
    };

    // Standard browser events
    const handleOnline = () => {
      checkConnection();
    };

    const handleOffline = () => {
      setIsOnline(false);
      toast({
        title: "انقطع الاتصال",
        description: "سيتم حفظ البيانات محليًا حتى استعادة الاتصال",
        variant: "destructive",
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // Initial check and periodic checks
    checkConnection();
    const intervalId = setInterval(checkConnection, 30000); // Check every 30 seconds

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(intervalId);
    };
  }, [toast, isOnline]);

  return (
    <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
      isOnline ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
    }`}>
      {isOnline ? (
        <>
          <Wifi className="h-3 w-3" />
          <span>متصل بالانترنت</span>
        </>
      ) : (
        <>
          <WifiOff className="h-3 w-3" />
          <span>غير متصل بالانترنت</span>
        </>
      )}
    </span>
  );
};
