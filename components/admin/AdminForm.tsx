'use client';

import { useState, useMemo } from "react";
import { Loader2, Save, X, Smile, Calendar } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import 'react-quill-new/dist/quill.snow.css';

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

  const handleChange = (name: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const submissionData = new FormData();
      Object.keys(formData).forEach(key => {
        const value = formData[key];
        if (value !== null && value !== undefined && value !== "") {
          submissionData.append(key, value);
        }
      });
      
      const result: any = await onSubmit(submissionData);
      
      if (result && result.error) {
        setError(result.error);
        setLoading(false);
        return;
      }

      // Centralized success behavior
      router.push(cancelHref);
      router.refresh();
    } catch (err: any) {
      console.error("Form submission error:", err);
      setError(err.message || "An error occurred while saving.");
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
            {fields.map((field) => (
              <div key={field.name} className={(field.type === "textarea" || field.type === "richtext") ? "md:col-span-2" : ""}>
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-3 ml-1">
                  {field.label} {field.required && <span className="text-red-500">*</span>}
                </label>
                
                {field.type === "richtext" ? (
                  <div className="prose-editor min-h-[300px] border border-gray-200 rounded-2xl overflow-hidden bg-white">
                    <ReactQuill
                      theme="snow"
                      value={formData[field.name] || ""}
                      onChange={(val) => handleChange(field.name, val)}
                      modules={quillModules}
                      className="h-full"
                    />
                  </div>
                ) : field.type === "textarea" ? (
                  <textarea
                    value={formData[field.name] || ""}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    placeholder={field.placeholder}
                    className="w-full bg-gray-50/50 border border-gray-200 rounded-2xl py-4 px-5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gold focus:ring-4 focus:ring-gold/5 focus:bg-white transition-all min-h-[160px] leading-relaxed"
                    required={field.required}
                  />
                ) : field.type === "datetime" ? (
                  <div className="relative">
                    <input
                      type="datetime-local"
                      value={formData[field.name] ? new Date(formData[field.name]).toISOString().slice(0, 16) : ""}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      className="w-full bg-gray-50/50 border border-gray-200 rounded-2xl py-4 px-5 pr-12 text-gray-900 focus:outline-none focus:border-gold focus:ring-4 focus:ring-gold/5 focus:bg-white transition-all"
                      required={field.required}
                    />
                    <Calendar className="absolute right-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                  </div>
                ) : field.type === "emoji" ? (
                  <div className="relative">
                    <div className="flex gap-2">
                       <button
                        type="button"
                        onClick={() => setActiveEmojiPicker(activeEmojiPicker === field.name ? null : field.name)}
                        className="w-16 h-14 bg-gray-50 border border-gray-200 rounded-2xl flex items-center justify-center text-2xl hover:bg-gray-100 transition-colors"
                      >
                        {formData[field.name] || <Smile className="h-6 w-6 text-gray-400" />}
                      </button>
                      <input
                        type="text"
                        value={formData[field.name] || ""}
                        readOnly
                        placeholder="Pick an emoji..."
                        className="flex-1 bg-gray-50/50 border border-gray-200 rounded-2xl py-4 px-5 text-gray-900 focus:outline-none"
                      />
                    </div>
                    {activeEmojiPicker === field.name && (
                      <div className="absolute z-50 mt-2 left-0 shadow-2xl border border-gray-100 rounded-2xl">
                        <EmojiPicker 
                          onEmojiClick={(emojiData) => {
                            handleChange(field.name, emojiData.emoji);
                            setActiveEmojiPicker(null);
                          }}
                        />
                      </div>
                    )}
                  </div>
                ) : field.type === "image" ? (
                  <div className="bg-gray-50/50 border border-gray-200 rounded-2xl p-6">
                    <div className="flex items-center gap-6">
                      <div className="w-20 h-20 rounded-xl bg-white border border-gray-200 flex items-center justify-center overflow-hidden shadow-sm">
                        {formData[field.name] ? (
                          <img 
                            src={typeof formData[field.name] === 'string' ? formData[field.name] : URL.createObjectURL(formData[field.name])} 
                            alt="Preview" 
                            className="w-full h-full object-cover" 
                          />
                        ) : (
                          <div className="text-gray-300 text-[10px] font-bold uppercase">Logo</div>
                        )}
                      </div>
                      <div className="flex-1">
                        <label className="relative cursor-pointer bg-white border border-gray-200 px-5 py-2.5 rounded-lg text-[10px] font-bold uppercase tracking-widest text-gray-700 hover:bg-gray-50 transition-colors shadow-sm inline-block">
                          Upload File
                          <input 
                            type="file" 
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleChange(field.name, file);
                            }}
                          />
                        </label>
                        <p className="text-[10px] text-gray-400 mt-2 italic">Supports JPG, PNG, WEBP</p>
                      </div>
                    </div>
                  </div>
                ) : field.type === "boolean" ? (
                  <div className="flex items-center gap-4 py-2 px-1">
                    <button
                      type="button"
                      onClick={() => handleChange(field.name, !formData[field.name])}
                      className={`relative w-12 h-7 rounded-full transition-colors duration-300 ${formData[field.name] ? 'bg-gold' : 'bg-gray-300'}`}
                    >
                      <div className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform duration-300 ${formData[field.name] ? 'translate-x-5' : 'translate-x-0'} shadow-md`} />
                    </button>
                    <span className="text-[12px] font-bold text-gray-600 uppercase tracking-tighter">{formData[field.name] ? 'Active' : 'Inactive'}</span>
                  </div>
                ) : (
                  <input
                    type={field.type === "url" ? "url" : "text"}
                    value={formData[field.name] || ""}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    placeholder={field.placeholder}
                    className="w-full bg-gray-50/50 border border-gray-200 rounded-2xl py-4 px-5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gold focus:ring-4 focus:ring-gold/5 focus:bg-white transition-all"
                    required={field.required}
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

