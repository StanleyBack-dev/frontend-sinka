"use client";

import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { LOGIN_MUTATION } from "@/lib/graphql/mutation";
import { client } from "@/lib/graphql/client";
import styles from "./LoginPage.module.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

type LoginResponse = {
  login: {
    token: string;
    accessToken: string;
    user: {
      id: string;
      name: string;
      email: string;
    };
  };
};

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [login, { loading, error }] = useMutation<LoginResponse>(LOGIN_MUTATION, {
    client,
    onCompleted: (data) => {
      if (data.login.accessToken) {
        localStorage.setItem("token", data.login.accessToken);
        window.location.href = "/dashboard";
      }
    },
  });


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login({
      variables: {
        loginInput: {
          username: email,
          password: password,
        },
        deviceName: "Notebook Stanley",
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.card}>
      <div className={styles.company}>SINKA</div>
      <h1 className={styles.title}>Bem-vindo! Faça login</h1>

      <input
        type="email"
        placeholder="Email"
        className={styles.input}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <div className={styles.passwordWrapper}>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Senha"
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <span
          className={styles.eyeIcon}
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
        </span>
      </div>

      {error && <p className={styles.error}>Credenciais inválidas</p>}

      <button type="submit" className={styles.button} disabled={loading}>
        {loading ? "Entrando..." : "Entrar"}
      </button>

      <div className={styles.footer}>
        © 2025 SINKA. Todos os direitos reservados.
      </div>
    </form>
  );
}