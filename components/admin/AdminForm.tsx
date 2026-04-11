import { useState } from "react";
import { Loader2, Save, X } from "lucide-react";
import Link from "next/link";

interface Field {
  name: string;
  label: string;
  type: "text" | "textarea" | "select" | "boolean" | "url" | "image";
  placeholder?: string;
  options?: { label: string; value: string }[];
  required?: boolean;
}

interface AdminFormProps {
  fields: Field[];
  initialData?: any;
  onSubmit: (data: any) => Promise<void>;
  cancelHref: string;
  title: string;
}

export function AdminForm({ fields, initialData, onSubmit, cancelHref, title }: AdminFormProps) {
  const [formData, setFormData] = useState(initialData || {});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      await onSubmit(submissionData);
    } catch (err: any) {
      setError(err.message || "An error occurred while saving.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-[40px] border border-gray-100 shadow-2xl shadow-black/5 overflow-hidden">
        <div className="p-12 border-b border-gray-50 flex justify-between items-center">
          <h2 className="text-3xl font-serif font-bold text-gray-900 tracking-tight">{title}</h2>
          <div className="inline-flex px-4 py-1.5 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase bg-gold/5 text-gold border border-gold/10">
            Form Editor
          </div>
        </div>

        <form onSubmit={handleFormSubmit} className="p-12 space-y-10">
          {error && (
            <div className="p-5 bg-red-50 border border-red-100 text-red-600 text-sm rounded-2xl animate-shake">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            {fields.map((field) => (
              <div key={field.name} className={field.type === "textarea" ? "md:col-span-2" : ""}>
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-[0.3em] mb-4 ml-1">
                  {field.label} {field.required && <span className="text-maroon">*</span>}
                </label>
                
                {field.type === "textarea" ? (
                  <textarea
                    value={formData[field.name] || ""}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    placeholder={field.placeholder}
                    className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl py-5 px-6 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gold/50 focus:bg-white transition-all min-h-[200px] leading-relaxed"
                    required={field.required}
                  />
                ) : field.type === "image" ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-6">
                      <div className="w-24 h-24 rounded-2xl bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden">
                        {formData[field.name] ? (
                          <img 
                            src={typeof formData[field.name] === 'string' ? formData[field.name] : URL.createObjectURL(formData[field.name])} 
                            alt="Preview" 
                            className="w-full h-full object-cover" 
                          />
                        ) : (
                          <div className="text-gray-300 text-[10px] font-bold uppercase">No Image</div>
                        )}
                      </div>
                      <div className="flex-1">
                        <label className="relative cursor-pointer bg-white border border-gray-200 px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest text-gray-600 hover:bg-gray-50 transition-colors shadow-sm inline-block">
                          Select Photo
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
                        <p className="text-[10px] text-gray-400 mt-2">Recommended: Square Aspect Ratio, Max 2MB</p>
                      </div>
                    </div>
                  </div>
                ) : field.type === "select" ? (
                  <select
                    value={formData[field.name] || ""}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl py-5 px-6 text-gray-900 focus:outline-none focus:border-gold/50 focus:bg-white transition-all appearance-none cursor-pointer"
                    required={field.required}
                  >
                    <option value="">Select an option</option>
                    {field.options?.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                ) : field.type === "boolean" ? (
                  <div className="flex items-center gap-4 py-2">
                    <button
                      type="button"
                      onClick={() => handleChange(field.name, !formData[field.name])}
                      className={`relative w-14 h-8 rounded-full transition-colors duration-300 ${formData[field.name] ? 'bg-emerald-500' : 'bg-gray-200'}`}
                    >
                      <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform duration-300 ${formData[field.name] ? 'translate-x-6' : 'translate-x-0'} shadow-sm`} />
                    </button>
                    <span className="text-sm font-medium text-gray-600">{formData[field.name] ? 'Enable/Yes' : 'Disable/No'}</span>
                  </div>
                ) : (
                  <input
                    type={field.type === "url" ? "url" : "text"}
                    value={formData[field.name] || ""}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    placeholder={field.placeholder}
                    className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl py-5 px-6 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gold/50 focus:bg-white transition-all"
                    required={field.required}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="pt-10 flex items-center justify-end gap-6 border-t border-gray-50">
            <Link 
              href={cancelHref}
              className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-maroon transition-colors"
            >
              Discard Changes
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="bg-maroon text-white font-bold tracking-[0.1em] uppercase text-[11px] py-5 px-12 rounded-sm inline-flex items-center gap-3 transition-all duration-300 hover:bg-maroon-dark hover:-translate-y-1 hover:shadow-2xl hover:shadow-maroon/20 shadow-lg disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Save className="h-4 w-4" /> Finalize & Save
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
