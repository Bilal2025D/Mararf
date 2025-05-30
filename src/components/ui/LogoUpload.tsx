
import React, { useState, useRef, DragEvent } from 'react';
import { Button } from './button';
import { Check, XCircle } from 'lucide-react';

const LogoUpload: React.FC = () => {
  const [logo, setLogo] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = e.target.files ? e.target.files[0] : null;
    
    if (!file) return;
    processFile(file);
  };

  const processFile = (file: File) => {
    if (!file.type.includes('image/')) {
      setError('الرجاء تحميل ملف صورة صالح');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('حجم الصورة كبير جدًا. الحد الأقصى هو 5 ميغابايت');
      return;
    }

    setUploading(true);

    const reader = new FileReader();
    reader.onloadend = () => {
      setLogo(reader.result as string);
      setUploading(false);
    };

    reader.onerror = () => {
      setError('حدث خطأ أثناء قراءة الملف');
      setUploading(false);
    };

    reader.readAsDataURL(file);
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleRemoveLogo = () => {
    setLogo(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      processFile(file);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
      />

      {logo ? (
        <div className="relative">
          <img
            src={logo}
            alt="شعار الجمعية"
            className="max-h-48 max-w-full rounded-md object-contain mb-4"
          />
          <button
            onClick={handleRemoveLogo}
            className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md"
          >
            <XCircle className="h-5 w-5 text-destructive" />
          </button>
        </div>
      ) : (
        <div
          className={`border-2 border-dashed ${dragOver ? 'border-emerald-500 bg-emerald-50' : 'border-gray-300'} rounded-md p-8 flex flex-col items-center justify-center mb-4 cursor-pointer w-full transition-colors`}
          onClick={handleButtonClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <p className="text-sm text-center text-muted-foreground rtl arabic">
            انقر لاختيار صورة الشعار، أو اسحب الملف وأفلته هنا
          </p>
          <p className="text-xs text-center text-muted-foreground mt-2 rtl arabic">
            PNG، JPG (الحد الأقصى: 5 ميغابايت)
          </p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 text-red-700 p-2 rounded-md mb-4 text-sm rtl arabic w-full">
          {error}
        </div>
      )}

      <Button
        onClick={handleButtonClick}
        className="khair-btn-primary"
        disabled={uploading}
      >
        {logo ? (
          <>
            <Check className="h-4 w-4 mr-2" />
            <span className="arabic">تغيير الشعار</span>
          </>
        ) : (
          <>
            <span className="arabic">تحميل الشعار</span>
          </>
        )}
      </Button>

      {logo && (
        <Button
          variant="outline"
          className="mt-2"
          onClick={() => alert('تم حفظ الشعار بنجاح!')}
        >
          حفظ الشعار
        </Button>
      )}
    </div>
  );
};

export default LogoUpload;
