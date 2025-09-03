"use client";

import { useState } from "react";
import { Customer } from "./types";
import { CreateCustomerModal } from "./CustomersModal";

interface CustomerTableProps {
  customers: Customer[];
  editingId: string | null;
  setEditingId: (id: string | null) => void;
  createCustomer: (options: { variables: { data: Partial<Customer> } }) => Promise<any>;
  updateCustomer: (options: { variables: { id: string; input: Customer } }) => Promise<any>;
  deleteCustomer: (options: { variables: { id: string } }) => Promise<any>;
  refetch: () => void;
}

export function CustomerTable({
  customers,
  editingId,
  setEditingId,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  refetch,
}: CustomerTableProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateCustomer = async (form: {
  name: string;
  last_name: string;
  cpf: string;
  email: string;
  contact: string;
  image_url: string;
}) => {
  try {
    await createCustomer({
      variables: {
        data: {
          name: form.name,
          last_name: form.last_name,
          cpf: form.cpf,
          email: form.email,
          contact: form.contact,
          image_url: form.image_url,
        },
      },
    });
    refetch();
  } catch (err) {
    console.error("Erro ao criar cliente:", err);
  }
};



  const handleUpdateCustomer = async (customer: Customer) => {
    if (!confirm("Deseja realmente atualizar este cliente?")) return;
    try {
      await updateCustomer({
        variables: {
          id: customer.public_id_customers,
          input: customer,
        },
      });
      refetch();
      setEditingId(null);
    } catch (err) {
      console.error("Erro ao atualizar cliente:", err);
    }
  };

  const handleDeleteCustomer = async (id: string) => {
    if (!confirm("Deseja realmente deletar este cliente?")) return;
    try {
      await deleteCustomer({ variables: { id } });
      refetch();
    } catch (err) {
      console.error("Erro ao deletar cliente:", err);
    }
  };

  const totalCustomers = customers.length;
  const totalActiveCustomers = customers.filter((c) => c.status).length;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      {/* Totais */}
      <div className="mb-6 flex gap-6">
        <div className="bg-blue-100 text-blue-800 p-3 rounded-lg shadow">
          Total de clientes: <strong>{totalCustomers}</strong>
        </div>
        <div className="bg-blue-200 text-blue-900 p-3 rounded-lg shadow">
          Total de clientes ativos: <strong>{totalActiveCustomers}</strong>
        </div>
      </div>

      {/* Botão de abrir modal */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="mb-6 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
      >
        Adicionar Cliente
      </button>

      {/* Modal de criação */}
      <CreateCustomerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateCustomer}
      />

      {/* Tabela */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg shadow-sm">
          <thead className="bg-blue-50">
            <tr>
              {[
                "Nome",
                "Sobrenome",
                "CPF",
                "Email",
                "Contato",
                "Status",
                "Criado em",
                "Criado por",
                "Imagem",
                "Ações",
              ].map((head) => (
                <th
                  key={head}
                  className="p-3 text-left text-sm font-medium text-black border-b border-gray-200"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c.public_id_customers} className="hover:bg-gray-50 transition">
                {/* Nome */}
                <td className="p-2 border-b border-gray-200">
                  <input
                    type="text"
                    value={c.name}
                    disabled={editingId !== c.public_id_customers}
                    onChange={(e) => (c.name = e.target.value)}
                    className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
                  />
                </td>
                {/* Sobrenome */}
                <td className="p-2 border-b border-gray-200">
                  <input
                    type="text"
                    value={c.last_name}
                    disabled={editingId !== c.public_id_customers}
                    onChange={(e) => (c.last_name = e.target.value)}
                    className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
                  />
                </td>
                {/* CPF */}
                <td className="p-2 border-b border-gray-200">
                  <input
                    type="text"
                    value={c.cpf}
                    disabled={editingId !== c.public_id_customers}
                    onChange={(e) => (c.cpf = e.target.value)}
                    className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
                  />
                </td>
                {/* Email */}
                <td className="p-2 border-b border-gray-200">
                  <input
                    type="email"
                    value={c.email}
                    disabled={editingId !== c.public_id_customers}
                    onChange={(e) => (c.email = e.target.value)}
                    className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
                  />
                </td>
                {/* Contato */}
                <td className="p-2 border-b border-gray-200">
                  <input
                    type="text"
                    value={c.contact}
                    disabled={editingId !== c.public_id_customers}
                    onChange={(e) => (c.contact = e.target.value)}
                    className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
                  />
                </td>
                {/* Status */}
                <td className="p-2 border-b border-gray-200">
                  <input
                    type="checkbox"
                    checked={c.status}
                    disabled={editingId !== c.public_id_customers}
                    onChange={(e) => (c.status = e.target.checked)}
                  />
                </td>
                {/* Criado em */}
                <td className="p-2 border-b border-gray-200 text-gray-900">
                  {new Date(c.created_at).toLocaleDateString()}
                </td>
                {/* Criado por */}
                <td className="p-2 border-b border-gray-200 text-gray-900">{c.created_by}</td>
                {/* Imagem */}
                <td className="p-2 border-b border-gray-200 text-gray-900">
                  {c.image_url || "-"}
                </td>
                {/* Ações */}
                <td className="p-2 border-b border-gray-200 flex gap-2">
                  {editingId === c.public_id_customers ? (
                    <button
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                      onClick={() => handleUpdateCustomer(c)}
                    >
                      Salvar
                    </button>
                  ) : (
                    <button
                      className="bg-gray-800 text-white px-3 py-1 rounded hover:bg-black transition"
                      onClick={() => setEditingId(c.public_id_customers)}
                    >
                      Editar
                    </button>
                  )}
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                    onClick={() => handleDeleteCustomer(c.public_id_customers)}
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}