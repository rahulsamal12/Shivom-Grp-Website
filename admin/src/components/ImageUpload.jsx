import { ImagePlus, Loader2, X } from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import api from "../api/axiosInstance.js";

const ImageUpload = ({ label, value, onChange, multiple = false }) => {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef(null);
  const values = multiple ? value || [] : value ? [value] : [];

  const uploadFiles = async (event) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;

    const formData = new FormData();
    files.forEach((file) => formData.append(multiple ? "images" : "image", file));

    setUploading(true);
    try {
      const endpoint = multiple ? "/admin/upload/multiple" : "/admin/upload/single";
      const { data } = await api.post(endpoint, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      const urls = multiple ? data.data.map((file) => file.url) : data.data.url;
      onChange(multiple ? [...(value || []), ...urls] : urls);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Upload failed");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const remove = (url) => {
    if (multiple) onChange((value || []).filter((item) => item !== url));
    else onChange("");
  };

  return (
    <div>
      <span className="form-label">{label}</span>
      <div className="rounded-md border border-slate-200 bg-white p-3">
        <div className="flex flex-wrap gap-3">
          {values.map((url) => (
            <div key={url} className="relative h-20 w-28 overflow-hidden rounded-md border border-slate-200 bg-slate-100">
              <img src={url} alt="" className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => remove(url)}
                className="absolute right-1 top-1 rounded-md bg-white/90 p-1 text-slate-700 shadow"
                aria-label="Remove image"
              >
                <X size={13} />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="flex h-20 w-28 flex-col items-center justify-center gap-2 rounded-md border border-dashed border-slate-300 bg-slate-50 text-xs font-semibold text-slate-500 hover:bg-slate-100 disabled:opacity-60"
          >
            {uploading ? <Loader2 size={18} className="animate-spin" /> : <ImagePlus size={18} />}
            {uploading ? "Uploading" : "Upload"}
          </button>
        </div>
        <input ref={inputRef} type="file" accept="image/*" multiple={multiple} onChange={uploadFiles} className="hidden" />
      </div>
    </div>
  );
};

export default ImageUpload;
