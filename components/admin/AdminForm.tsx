'use client';

import { useState, useMemo, useEffect } from "react";
import { Loader2, Save, X, Smile, Calendar, Upload, Image as ImageIcon, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import 'react-quill-new/dist/quill.snow.css';
import { toast } from "react-hot-toast";

// Dynamically import heavy editors/pickers for better performance and SSR safety
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
const EmojiPicker = dynamic(() => import("emoji-picker-react"), { ssr: false });

interface Field {
  name: string;
  label: string;
  type: "text" | "textarea" | "richtext" | "select" | "boolean" | "url" | "image" | "datetime" | "emoji";
  placeholder?: string;
  options?: { label: string; value: string }[];
  required?: boolean;
  readOnly?: boolean;

}

interface AdminFormProps {
  fields: Field[];
  initialData?: any;
  onSubmit: (data: any) => Promise<{ success?: boolean; error?: string } | void>;
  cancelHref: string;
  title: string;
}

export function AdminForm({ fields, initialData, onSubmit, cancelHref, title }: AdminFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState(initialData || {});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeEmojiPicker, setActiveEmojiPicker] = useState<string | null>(null);
  const [isSlugTouched, setIsSlugTouched] = useState(!!initialData?.slug);

  // Helper to slugify text
  const slugify = (text: string) => {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')     // Replace spaces with -
      .replace(/[^\w-]+/g, '')  // Remove all non-word chars
      .replace(/--+/g, '-');    // Replace multiple - with single -
  };

  // Auto-generate slug when title changes
  useEffect(() => {
    if (!isSlugTouched && formData.title) {
      setFormData((prev: any) => ({ ...prev, slug: slugify(formData.title) }));
    }
  }, [formData.title, isSlugTouched]);

  const handleChange = (name: string, value: any) => {
    if (name === 'slug') setIsSlugTouched(true);
    
    // For file inputs, we don't want to just pass the event, we want the file
    if (value instanceof FileList) {
      setFormData((prev: any) => ({ ...prev, [name]: value[0] }));
      return;
    }
    
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const t = toast.loading("Saving changes...");

    try {
      const submissionData = new FormData();
      // Define internal fields to exclude from submission
      const internalFields = ['createdAt', 'updatedAt', 'uniqueId', 'isSlugTouched'];

      Object.keys(formData).forEach(key => {
        if (internalFields.includes(key)) return;

        const value = formData[key];
        if (value !== null && value !== undefined && value !== "") {
          submissionData.append(key, value);
        }
      });

      // Ensure ID is sent as a string if it exists in initialData/formData
      if (formData.id) {
        submissionData.set('id', formData.id.toString());
      }

      const result: any = await onSubmit(submissionData);

      if (result && result.error) {
        setError(result.error);
        toast.error(result.error, { id: t });
        setLoading(false);
        return;
      }

      toast.success("Record saved successfully!", { id: t });
      
      // Small timeout to allow the toast to be seen and for server actions (revalidatePath) to settle
      setTimeout(() => {
        router.push(cancelHref);
        router.refresh(); // Refresh the target page to show new data
      }, 500);
      
    } catch (err: any) {
      console.error("Form submission error:", err);
      const msg = err.message || "An error occurred while saving.";
      setError(msg);
      toast.error(msg, { id: t });
      setLoading(false);
    }
  };

  const quillModules = useMemo(() => ({
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link', 'clean']
    ],
  }), []);

  // Safe date formatter to prevent component crash
  const formatDateTimeLocal = (dateInput: any) => {
    if (!dateInput) return "";
    try {
      const date = new Date(dateInput);
      if (isNaN(date.getTime())) return "";
      return date.toISOString().slice(0, 16);
    } catch (e) {
      return "";
    }
  };

  // Conditional field visibility logic
  const isFieldVisible = (field: Field) => {
    const category = formData.category;

    // Always visible fields
    if (['title', 'slug', 'category', 'published', 'content', 'excerpt', 'image'].includes(field.name)) return true;

    // Category specific fields
    if (category === 'event') {
      return ['eventDate', 'location'].includes(field.name);
    }
    if (category === 'career') {
      return ['jobType', 'location'].includes(field.name);
    }
    if (category === 'award') {
      return ['authorName'].includes(field.name);
    }
    if (category === 'research') {
      return ['authorName', 'readingTime'].includes(field.name);
    }
    if (category === 'article') {
      return ['authorName', 'readingTime', 'keyTakeaways'].includes(field.name);
    }

    return true; // Default to visible if not specifically handled
  };

  // Category specific labels
  const getFieldLabel = (field: Field) => {
    if (field.name === 'authorName') {
      if (formData.category === 'award') return "Recipient Name";
      if (formData.category === 'research') return "Principal Researcher";
    }
    return field.label;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-[32px] border border-gray-200 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] overflow-hidden">
        <div className="p-10 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-serif font-bold text-gray-900 tracking-tight">{title}</h2>
            <p className="text-gray-400 text-xs mt-1">Fields marked with * are required.</p>
          </div>
          <div className="inline-flex px-4 py-1.5 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase bg-gold/10 text-gold border border-gold/10">
            System Editor
          </div>
        </div>

        <form onSubmit={handleFormSubmit} className="p-10 space-y-8">
          {error && (
            <div className="p-5 bg-red-50 border border-red-100 text-red-600 text-sm rounded-2xl animate-shake">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
            {fields.filter(isFieldVisible).map((field) => (
              <div key={field.name} className={(field.type === "textarea" || field.type === "richtext") ? "md:col-span-2" : ""}>
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-3 ml-1">
                  {getFieldLabel(field)} {field.required && <span className="text-red-500">*</span>}
                </label>
                {field.type === "textarea" ? (
                  <textarea
                    value={formData[field.name] || ""}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    placeholder={field.placeholder}
                    className="w-full bg-gray-50/50 border border-gray-200 rounded-2xl py-4 px-5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gold focus:ring-4 focus:ring-gold/5 focus:bg-white transition-all h-32 disabled:opacity-70 disabled:cursor-not-allowed"
                    required={field.required}
                    readOnly={field.readOnly}
                  />
                ) : field.type === "richtext" ? (
                  <div className="bg-gray-50/50 border border-gray-200 rounded-2xl overflow-hidden focus-within:border-gold focus-within:ring-4 focus-within:ring-gold/5 transition-all">
                    <ReactQuill
                      theme="snow"
                      value={formData[field.name] || ""}
                      onChange={(value) => handleChange(field.name, value)}
                      modules={quillModules}
                      className="bg-transparent"
                      readOnly={field.readOnly}
                    />
                  </div>
                ) : field.type === "select" ? (
                  <select
                    value={formData[field.name] || ""}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    className="w-full bg-gray-50/50 border border-gray-200 rounded-2xl py-4 px-5 text-gray-900 focus:outline-none focus:border-gold focus:ring-4 focus:ring-gold/5 focus:bg-white transition-all appearance-none disabled:opacity-70 disabled:cursor-not-allowed"
                    required={field.required}
                    disabled={field.readOnly}
                  >
                    <option value="" disabled>Select an option</option>
                    {field.options?.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                ) : field.type === "boolean" ? (
                  <div className="flex items-center gap-4 py-2 px-1">
                    <button
                      type="button"
                      disabled={field.readOnly}
                      onClick={() => handleChange(field.name, !formData[field.name])}
                      className={`relative w-12 h-7 rounded-full transition-colors duration-300 ${formData[field.name] ? 'bg-gold' : 'bg-gray-300'} ${field.readOnly ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      <div className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform duration-300 ${formData[field.name] ? 'translate-x-5' : 'translate-x-0'} shadow-md`} />
                    </button>
                    <span className="text-[12px] font-bold text-gray-600 uppercase tracking-tighter">{formData[field.name] ? 'Active' : 'Inactive'}</span>
                  </div>
                                ) : field.type === "datetime" ? (
                  <input
                    type="datetime-local"
                    value={formatDateTimeLocal(formData[field.name])}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    className="w-full bg-gray-50/50 border border-gray-200 rounded-2xl py-4 px-5 text-gray-900 focus:outline-none focus:border-gold focus:ring-4 focus:ring-gold/5 focus:bg-white transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                    required={field.required}
                    readOnly={field.readOnly}
                  />
                ) : field.type === "image" ? (
                  <div className="space-y-4">
                    <div className="relative group aspect-video bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl overflow-hidden hover:border-gold/50 transition-colors flex flex-col items-center justify-center">
                      {formData[field.name] ? (
                        <>
                          <img 
                            src={typeof formData[field.name] === 'string' ? formData[field.name] : URL.createObjectURL(formData[field.name])} 
                            alt="Preview" 
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                            <button
                              type="button"
                              onClick={() => {
                                const input = document.getElementById(`file-${field.name}`);
                                input?.click();
                              }}
                              className="p-3 bg-white rounded-full text-gray-900 hover:bg-gold transition-colors shadow-xl"
                            >
                              <Upload size={20} />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleChange(field.name, null)}
                              className="p-3 bg-white rounded-full text-red-500 hover:bg-red-50 transition-colors shadow-xl"
                            >
                              <Trash2 size={20} />
                            </button>
                          </div>
                        </>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            const input = document.getElementById(`file-${field.name}`);
                            input?.click();
                          }}
                          className="flex flex-col items-center gap-3 text-gray-400 hover:text-gold transition-colors"
                        >
                          <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center group-hover:bg-gold/10 transition-colors">
                            <ImageIcon size={32} />
                          </div>
                          <span className="text-xs font-bold uppercase tracking-widest">Select Image</span>
                        </button>
                      )}
                      <input 
                        id={`file-${field.name}`}
                        type="file" 
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files) handleChange(field.name, e.target.files);
                        }}
                      />
                    </div>
                    <p className="text-[10px] text-gray-400 text-center font-medium italic">Supports JPG, PNG, WEBP (Max 5MB)</p>
                  </div>
                ) : field.type === "emoji" ? (
                   <div className="relative">
                     <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={() => setActiveEmojiPicker(activeEmojiPicker === field.name ? null : field.name)}
                          className="w-16 h-16 rounded-2xl border border-gray-200 bg-gray-50 flex items-center justify-center text-3xl hover:border-gold hover:bg-white transition-all shadow-sm"
                        >
                          {formData[field.name] || '✨'}
                        </button>
                        <input
                          type="text"
                          value={formData[field.name] || ""}
                          onChange={(e) => handleChange(field.name, e.target.value)}
                          placeholder="Select or type emoji"
                          className="flex-1 bg-gray-50/50 border border-gray-200 rounded-2xl py-4 px-5 text-gray-900 focus:outline-none focus:border-gold transition-all"
                        />
                     </div>
                     {activeEmojiPicker === field.name && (
                       <div className="absolute z-[100] top-full mt-4 left-0 shadow-2xl rounded-2xl overflow-hidden border border-gray-100 animate-in fade-in slide-in-from-top-2">
                         <EmojiPicker 
                           onEmojiClick={(emojiData) => {
                             handleChange(field.name, emojiData.emoji);
                             setActiveEmojiPicker(null);
                           }}
                         />
                       </div>
                     )}
                   </div>
                ) : (
                  <input
                    type={field.type === "url" ? "url" : "text"}
                    value={formData[field.name] || ""}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    placeholder={field.placeholder}
                    className="w-full bg-gray-50/50 border border-gray-200 rounded-2xl py-4 px-5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gold focus:ring-4 focus:ring-gold/5 focus:bg-white transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                    required={field.required}
                    readOnly={field.readOnly}
                    disabled={field.readOnly && field.name === 'category'} // Only disable if it's the category to prevent selection, but keep value
                  />
                )}
              </div>
            ))}
          </div>

          <div className="pt-8 flex items-center justify-end gap-6 border-t border-gray-100">
            <Link
              href={cancelHref}
              className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-red-500 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="bg-[#0A0A0A] text-white font-bold tracking-[0.2em] uppercase text-[10px] py-4 px-10 rounded-xl inline-flex items-center gap-3 transition-all duration-300 hover:bg-gold hover:text-black hover:-translate-y-1 shadow-xl disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Save className="h-4 w-4" /> Save Record
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      <style jsx global>{`
        .ql-container.ql-snow {
          border: none !important;
          font-family: inherit;
        }
        .ql-toolbar.ql-snow {
          border: none !important;
          border-bottom: 1px solid #f3f4f6 !important;
          padding: 8px 12px !important;
        }
        .ql-editor {
          min-height: 250px;
          font-size: 15px;
          line-height: 1.6;
        }
        .ql-editor.ql-blank::before {
          color: #9ca3af;
          font-style: normal;
        }
      `}</style>
    </div>
  );
}
