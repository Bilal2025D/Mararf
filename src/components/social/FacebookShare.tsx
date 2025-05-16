
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Facebook } from 'lucide-react';

interface FacebookShareProps {
  defaultMessage?: string;
  defaultTitle?: string;
}

const FacebookShare = ({ defaultMessage = '', defaultTitle = 'منشور من جمعية مطالع العلوم والمعارف' }: FacebookShareProps) => {
  const [message, setMessage] = useState(defaultMessage);
  const [title, setTitle] = useState(defaultTitle);
  const [pageUrl, setPageUrl] = useState('https://www.facebook.com/share/1ARyPJriLa/');
  const [isSharing, setIsSharing] = useState(false);
  const { toast } = useToast();

  const handleShare = () => {
    if (!message) {
      toast({
        title: "خطأ",
        description: "الرجاء إدخال محتوى المنشور",
        variant: "destructive",
      });
      return;
    }

    setIsSharing(true);
    
    // Format the post with title and message
    const formattedPost = `${title}\n\n${message}`;
    
    try {
      // Use Facebook Share Dialog API
      const shareUrl = `https://www.facebook.com/dialog/share?app_id=1234567890&display=popup&href=${encodeURIComponent(pageUrl)}&quote=${encodeURIComponent(formattedPost)}`;
      
      // Open in a new window
      window.open(shareUrl, '_blank', 'width=600,height=400');
      
      toast({
        title: "تم",
        description: "تم فتح نافذة المشاركة على فيسبوك",
      });
    } catch (error) {
      console.error("Error sharing to Facebook:", error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء محاولة المشاركة على فيسبوك",
        variant: "destructive",
      });
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 rtl arabic">
          <Facebook className="h-5 w-5 text-blue-600" />
          المشاركة على فيسبوك
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1 rtl arabic">عنوان المنشور</label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="rtl arabic"
            placeholder="أدخل عنوان المنشور"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1 rtl arabic">محتوى المنشور</label>
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="rtl arabic min-h-[120px]"
            placeholder="أدخل محتوى المنشور الذي تريد مشاركته على فيسبوك"
          />
        </div>
        
        <Button
          onClick={handleShare}
          disabled={isSharing || !message.trim()}
          className="w-full rtl arabic bg-blue-600 hover:bg-blue-700"
        >
          <Facebook className="ml-2 h-4 w-4" />
          {isSharing ? "جاري المشاركة..." : "مشاركة على فيسبوك"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default FacebookShare;
