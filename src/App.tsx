
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";

// استخدام التحميل البطيء للصفحات لتحسين أداء التطبيق
const Index = lazy(() => import("./pages/Index"));
const Members = lazy(() => import("./pages/Members"));
const Attendance = lazy(() => import("./pages/Attendance"));
const Activities = lazy(() => import("./pages/Activities"));
const Messages = lazy(() => import("./pages/Messages"));
const Reports = lazy(() => import("./pages/Reports"));
const Logo = lazy(() => import("./pages/Logo"));
const Settings = lazy(() => import("./pages/Settings"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AuthPage = lazy(() => import("./pages/Auth"));
const Students = lazy(() => import("./pages/Students"));
const Social = lazy(() => import("./pages/Social"));
const StudentGroups = lazy(() => import("./pages/StudentGroups"));

// تحميل الصفحات الجديدة
const StudentEvaluation = lazy(() => import("./pages/StudentEvaluation"));
const Announcements = lazy(() => import("./pages/Announcements"));
const Sms = lazy(() => import("./pages/Sms"));
const Classes = lazy(() => import("./pages/Classes"));
const ExamsReports = lazy(() => import("./pages/ExamsReports"));
const ParentChat = lazy(() => import("./pages/ParentChat"));
const About = lazy(() => import("./pages/About"));

// إعداد عميل الاستعلام بخيارات محسنة للأداء
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 دقائق
    },
  },
});

// مكون تحميل مؤقت
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-emerald-500"></div>
  </div>
);

const App = () => {
  // تهيئة التطبيق ليناسب شاشات الأجهزة المحمولة
  useEffect(() => {
    // ضبط العرض المرئي للموبايل (viewport) بشكل صحيح
    const viewport = document.querySelector("meta[name=viewport]");
    if (viewport) {
      viewport.setAttribute("content", "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover");
    } else {
      const meta = document.createElement("meta");
      meta.name = "viewport";
      meta.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover";
      document.head.appendChild(meta);
    }
    
    // تمكين التمرير الناعم
    document.documentElement.style.scrollBehavior = "smooth";
    
    // منع السحب للتحديث على iOS
    document.body.style.overscrollBehavior = "none";
    
    // إزالة تأخير اللمس على الأجهزة المحمولة
    document.documentElement.style.touchAction = "manipulation";
    
    // تحسين الأداء على الأجهزة المحمولة
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(() => {
          // صامت في حالة الفشل
        });
      });
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/members" element={<Members />} />
              <Route path="/attendance" element={<Attendance />} />
              <Route path="/activities" element={<Activities />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/logo" element={<Logo />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/students" element={<Students />} />
              <Route path="/social" element={<Social />} />
              <Route path="/student-groups" element={<StudentGroups />} />
              
              {/* الصفحات الجديدة */}
              <Route path="/student-evaluation" element={<StudentEvaluation />} />
              <Route path="/announcements" element={<Announcements />} />
              <Route path="/sms" element={<Sms />} />
              <Route path="/classes" element={<Classes />} />
              <Route path="/exams-reports" element={<ExamsReports />} />
              <Route path="/parent-chat" element={<ParentChat />} />
              <Route path="/about" element={<About />} />
              
              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
