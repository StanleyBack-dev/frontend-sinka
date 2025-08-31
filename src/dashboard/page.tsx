"use client";

import { useQuery } from "@apollo/client";
import { GET_CUSTOMERS } from "./query";
import { client } from "@/lib/graphql/client";

type Customer = {
  idtb_customers: string;
  name: string;
  last_name: string;
  email: string;
  contact: string;
  status: boolean;
  created_at: string;
};

export default function DashboardPage() {
  const { data, loading, error } = useQuery<{ customers: Customer[] }>(GET_CUSTOMERS, {
    client,
    fetchPolicy: "no-cache",
  });

  if (loading) return <p>Carregando clientes...</p>;
  if (error) return <p>Erro ao carregar clientes: {error.message}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Clientes cadastrados</h1>

      <table className="w-full border border-gray-300 rounded">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Nome</th>
            <th className="p-2 border">Sobrenome</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Contato</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Criado em</th>
          </tr>
        </thead>
        <tbody>
          {data?.customers.map((c) => (
            <tr key={c.idtb_customers}>
              <td className="p-2 border">{c.name}</td>
              <td className="p-2 border">{c.last_name}</td>
              <td className="p-2 border">{c.email}</td>
              <td className="p-2 border">{c.contact}</td>
              <td className="p-2 border">{c.status ? "Ativo" : "Inativo"}</td>
              <td className="p-2 border">{new Date(c.created_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}