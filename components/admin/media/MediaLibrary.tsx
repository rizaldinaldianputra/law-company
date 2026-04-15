'use client';

import React, { useState } from 'react';
import { Image as ImageIcon, FileText, Trash2, Copy, Check, ExternalLink, Calendar, HardDrive, Loader2 } from 'lucide-react';
import { deleteMediaObject } from '@/app/admin/actions';
import { toast } from 'react-hot-toast';

interface MediaObject {
  name: string;
  size: number;
  lastModified: Date;
  url: string;
}

interface MediaLibraryProps {
  initialObjects: MediaObject[];
}

export function MediaLibrary({ initialObjects }: MediaLibraryProps) {
  const [objects, setObjects] = useState<MediaObject[]>(initialObjects);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const handleDelete = async (fileName: string) => {
    if (!confirm('Are you sure you want to permanently delete this file? This cannot be undone.')) return;
    
    setDeleting(fileName);
    const t = toast.loading('Deleting file...');
    
    try {
      const result = await deleteMediaObject(fileName);
      if (result.success) {
        setObjects(prev => prev.filter(obj => obj.name !== fileName));
        toast.success('File deleted successfully', { id: t });
      } else {
        toast.error(result.error || 'Failed to delete file', { id: t });
      }
    } catch (error) {
      toast.error('An error occurred while deleting', { id: t });
    } finally {
      setDeleting(null);
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-serif font-bold text-gray-900">Media Library</h2>
          <p className="text-gray-500 text-sm mt-1">Manage and access all uploaded files in your S3 storage</p>
        </div>
        <div className="flex items-center gap-4 bg-gray-100 px-4 py-2 rounded-lg border border-gray-200">
           <HardDrive className="w-4 h-4 text-gray-400" />
           <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">{objects.length} Files Stored</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {objects.map((obj) => {
          const isImage = /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(obj.name);
          
          return (
            <div 
              key={obj.name}
              className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-maroon/20 transition-all duration-300 overflow-hidden"
            >
              {/* Preview Area */}
              <div className="aspect-video bg-gray-50 relative overflow-hidden group-hover:bg-gray-100 transition-colors">
                {isImage ? (
                  <img 
                    src={obj.url} 
                    alt={obj.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://placehold.co/400x300?text=Error+Loading+Image";
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                    <FileText size={48} />
                  </div>
                )}
                
                {/* Overlay Actions */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button
                    onClick={() => copyToClipboard(obj.url)}
                    className="p-3 bg-white rounded-full text-maroon hover:bg-maroon hover:text-white transition-all transform hover:scale-110"
                    title="Copy Image URL"
                  >
                    {copiedUrl === obj.url ? <Check size={18} /> : <Copy size={18} />}
                  </button>
                  <a
                    href={obj.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white rounded-full text-gray-600 hover:bg-gray-800 hover:text-white transition-all transform hover:scale-110"
                    title="View Full Size"
                  >
                    <ExternalLink size={18} />
                  </a>
                  <button
                    onClick={() => handleDelete(obj.name)}
                    disabled={deleting === obj.name}
                    className="p-3 bg-white rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-all transform hover:scale-110 disabled:opacity-50"
                    title="Delete File"
                  >
                    {deleting === obj.name ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
                  </button>
                </div>
              </div>

              {/* Info Area */}
              <div className="p-4">
                <h3 className="font-medium text-gray-900 truncate text-sm mb-1" title={obj.name}>
                  {obj.name}
                </h3>
                <div className="flex items-center justify-between text-[11px] text-gray-400 font-medium">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    {new Date(obj.lastModified).toLocaleDateString()}
                  </span>
                  <span>{formatSize(obj.size)}</span>
                </div>
              </div>
            </div>
          );
        })}

        {objects.length === 0 && (
          <div className="col-span-full py-20 text-center bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <ImageIcon className="mx-auto h-12 w-12 text-gray-300 mb-4" />
            <p className="text-gray-500">No media files found in the storage bucket.</p>
          </div>
        )}
      </div>

      {/* Copy Notification Toast */}
      {copiedUrl && (
        <div className="fixed bottom-8 right-8 bg-black text-white px-6 py-3 rounded-xl shadow-2xl animate-in fade-in slide-in-from-bottom-4 transition-all z-[200] flex items-center gap-3">
          <Check className="text-green-400 w-5 h-5" />
          <span className="text-sm font-medium">Link copied to clipboard!</span>
        </div>
      )}
    </div>
  );
}
