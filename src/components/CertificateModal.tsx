import { X } from "lucide-react";

interface Props {
  file: string;
  onClose: () => void;
}

export default function CertificateModal({ file, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="relative bg-black p-4 rounded-lg w-[90%] h-[90%]">

        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white hover:text-primary transition"
        >
          <X />
        </button>

        <iframe
          src={file}
          className="w-full h-full rounded-lg"
        ></iframe>

      </div>
    </div>
  );
}
