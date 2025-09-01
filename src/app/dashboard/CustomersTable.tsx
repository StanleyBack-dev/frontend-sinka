"use client";

import { Customer } from "./types";

interface CustomerTableProps {
  customers: Customer[];
  editingId: string | null;
  setEditingId: (id: string | null) => void;
  newCustomer: Partial<Customer>;
  setNewCustomer: (customer: Partial<Customer>) => void;
  createCustomer: (options: { variables: { input: Partial<Customer> } }) => Promise<any>;
  updateCustomer: (options: { variables: { id: string; input: Customer } }) => Promise<any>;
  deleteCustomer: (options: { variables: { id: string } }) => Promise<any>;
  refetch: () => void;
}

export function CustomerTable({
  customers,
  editingId,
  setEditingId,
  newCustomer,
  setNewCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  refetch,
}: CustomerTableProps) {
  const handleAddCustomer = async () => {
    if (!confirm("Deseja realmente adicionar este cliente?")) return;
    try {
      await createCustomer({ variables: { input: newCustomer } });
      refetch();
      setNewCustomer({ status: true });
    } catch (err) {
      console.error("Erro ao criar cliente:", err);
    }
  };

  const handleUpdateCustomer = async (customer: Customer) => {
    if (!confirm("Deseja realmente atualizar este cliente?")) return;
    try {
      await updateCustomer({ variables: { id: customer.public_id_customers, input: customer } });
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
  const totalActiveCustomers = customers.filter(c => c.status).length;

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

      {/* Botão de adicionar */}
      <button
        onClick={handleAddCustomer}
        className="mb-6 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
      >
        Adicionar Cliente
      </button>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg shadow-sm">
          <thead className="bg-blue-50">
            <tr>
              {["Nome", "Sobrenome", "CPF", "Email", "Contato", "Status", "Criado em", "Criado por", "Imagem", "Ações"].map((head) => (
                <th key={head} className="p-3 text-left text-sm font-medium text-black border-b border-gray-200">
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c.public_id_customers} className="hover:bg-gray-50 transition">
                <td className="p-2 border-b border-gray-200">
                  <input
                    type="text"
                    value={c.name}
                    disabled={editingId !== c.public_id_customers}
                    onChange={(e) => (c.name = e.target.value)}
                    className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-black placeholder-gray-700"
                  />
                </td>
                <td className="p-2 border-b border-gray-200">
                  <input
                    type="text"
                    value={c.last_name}
                    disabled={editingId !== c.public_id_customers}
                    onChange={(e) => (c.last_name = e.target.value)}
                    className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-black placeholder-gray-700"
                  />
                </td>
                <td className="p-2 border-b border-gray-200">
                  <input
                    type="text"
                    value={c.cpf}
                    disabled={editingId !== c.public_id_customers}
                    onChange={(e) => (c.cpf = e.target.value)}
                    className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-black placeholder-gray-700"
                  />
                </td>
                <td className="p-2 border-b border-gray-200">
                  <input
                    type="email"
                    value={c.email}
                    disabled={editingId !== c.public_id_customers}
                    onChange={(e) => (c.email = e.target.value)}
                    className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-black placeholder-gray-700"
                  />
                </td>
                <td className="p-2 border-b border-gray-200">
                  <input
                    type="text"
                    value={c.contact}
                    disabled={editingId !== c.public_id_customers}
                    onChange={(e) => (c.contact = e.target.value)}
                    className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-black placeholder-gray-700"
                  />
                </td>
                <td className="p-2 border-b border-gray-200">
                  <input
                    type="checkbox"
                    checked={c.status}
                    disabled={editingId !== c.public_id_customers}
                    onChange={(e) => (c.status = e.target.checked)}
                    className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-black placeholder-gray-700"
                  />
                </td>
                <td className="p-2 border-b border-gray-200 text-gray-900">{new Date(c.created_at).toLocaleDateString()}</td>
                <td className="p-2 border-b border-gray-200 text-gray-900">{c.created_by}</td>
                <td className="p-2 border-b border-gray-200 text-gray-900">{c.image_url || "-"}</td>
                <td className="p-2 border-b border-gray-200 flex gap-2 placeholder-gray-700">
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