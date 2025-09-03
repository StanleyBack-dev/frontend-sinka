import { useState } from "react";

interface CreateCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (form: {
    name: string;
    last_name: string;
    cpf: string;
    email: string;
    contact: string;
    image_url: string;
  }) => void;
}

export function CreateCustomerModal({ isOpen, onClose, onCreate }: CreateCustomerModalProps) {
  const [form, setForm] = useState({
    name: "",
    last_name: "",
    cpf: "",
    email: "",
    contact: "",
    image_url: "",
  });

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Criar Cliente</h2>

        <div className="space-y-3">
          {Object.keys(form).map((key) => (
            <input
              key={key}
              type="text"
              name={key}
              value={(form as any)[key]}
              onChange={handleChange}
              placeholder={key}
              className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
            />
          ))}
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              onCreate(form);
              onClose();
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Criar
          </button>
        </div>
      </div>
    </div>
  );
}
