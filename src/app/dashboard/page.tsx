"use client";

import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_CUSTOMERS_QUERY } from "./queries";
import { CREATE_CUSTOMER_MUTATION, UPDATE_CUSTOMER_MUTATION, DELETE_CUSTOMER_MUTATION} from "./mutations";
import { Customer } from "./types";
import { CustomerTable } from "./CustomersTable";
import { client } from "@/lib/graphql/client";

export default function DashboardPage() {
  const { data, loading, error, refetch } = useQuery<{ customers: Customer[] }>(GET_CUSTOMERS_QUERY, {
    client,
    fetchPolicy: "no-cache",
  });

  const [createCustomer] = useMutation(CREATE_CUSTOMER_MUTATION, { client }) as ReturnType<typeof useMutation<any, { input: Partial<Customer> }>>;
  const [updateCustomer] = useMutation(UPDATE_CUSTOMER_MUTATION, { client }) as ReturnType<typeof useMutation<any, { id: string; input: Customer }>>;
  const [deleteCustomer] = useMutation(DELETE_CUSTOMER_MUTATION, { client }) as ReturnType<typeof useMutation<any, { id: string }>>;

  const [editingId, setEditingId] = useState<string | null>(null);
  const [newCustomer, setNewCustomer] = useState<Partial<Customer>>({ status: true });

  if (loading) return <p>Carregando clientes...</p>;
  if (error) return <p>Erro ao carregar clientes: {error.message}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Clientes cadastrados</h1>
      <CustomerTable
        customers={data?.customers || []}
        editingId={editingId}
        setEditingId={setEditingId}
        newCustomer={newCustomer}
        setNewCustomer={setNewCustomer}
        createCustomer={createCustomer}
        updateCustomer={updateCustomer}
        deleteCustomer={deleteCustomer}
        refetch={refetch}
      />
    </div>
  );
}