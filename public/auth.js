/**
 * Portal Académico IPT — Módulo de Autenticação e Navegação Global
 * Instituto Politécnico de Tomar
 */

(function () {
  'use strict';

  // Aluno padrão para demonstração
  const DEFAULT_USER = {
    id: "24891",
    name: "Michelle Matias",
    email: "michellermatias@ipt.pt",
    role: "Estudante",
    course: "Licenciatura em Engenharia Informática",
    school: "ESTT • Escola Superior de Tecnologia de Tomar",
    year: "2º Ano • 2025/2026",
    status: "Matrícula Regular Ativa",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    balance: "24.50 €",
    unreadNotifications: 3
  };

  const STORAGE_KEY = "ipt_portal_user";

  const IPTAuth = {
    getUser: function () {
      try {
        const stored = localStorage.getItem(STORAGE_KEY) || sessionStorage.getItem(STORAGE_KEY);
        if (stored) {
          return JSON.parse(stored);
        }
      } catch (e) {
        console.error("Erro ao ler sessão IPT:", e);
      }
      return null;
    },

    isAuthenticated: function () {
      return this.getUser() !== null;
    },

    login: function (username, password, remember = true) {
      const user = {
        ...DEFAULT_USER,
        name: username && username.includes("@") ? username.split("@")[0].replace(".", " ") : (username || DEFAULT_USER.name),
        email: username && username.includes("@") ? username : `${(username || 'aluno').toLowerCase().replace(/\s+/g, '')}@ipt.pt`
      };

      // Formatar nome capitalizado se gerado
      if (user.name) {
        user.name = user.name.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
      }

      if (remember) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      } else {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      }

      return user;
    },

    demoLogin: function () {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_USER));
      return DEFAULT_USER;
    },

    logout: function () {
      localStorage.removeItem(STORAGE_KEY);
      sessionStorage.removeItem(STORAGE_KEY);
      window.location.href = "/index.html?logged_out=1";
    },

    checkProtection: function () {
      const isIndex = window.location.pathname.endsWith("/index.html") || 
                      window.location.pathname === "/" || 
                      window.location.pathname.endsWith("/");

      if (!isIndex && !this.isAuthenticated()) {
        const currentPath = window.location.pathname;
        window.location.href = `/index.html?redirect=${encodeURIComponent(currentPath)}&auth_required=1`;
        return false;
      }
      return true;
    },

    initPageHeader: function (activePage) {
      const user = this.getUser();
      if (!user) return;

      // Atualizar nomes e avatares nos elementos da página
      document.querySelectorAll(".ipt-user-name").forEach(el => {
        el.textContent = user.name;
      });

      document.querySelectorAll(".ipt-user-course").forEach(el => {
        el.textContent = `${user.course} (Nº ${user.id})`;
      });

      document.querySelectorAll(".ipt-user-avatar").forEach(el => {
        if (el.tagName === "IMG") {
          el.src = user.avatar;
          el.alt = user.name;
        }
      });

      document.querySelectorAll(".ipt-user-balance").forEach(el => {
        el.textContent = user.balance;
      });

      // Configurar botões de logout
      document.querySelectorAll(".ipt-logout-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          if (confirm("Tem a certeza que deseja terminar a sessão no Portal Académico IPT?")) {
            IPTAuth.logout();
          }
        });
      });
    }
  };

  // Expor globalmente
  window.IPTAuth = IPTAuth;

  // Executar proteção logo ao carregar
  document.addEventListener("DOMContentLoaded", function () {
    IPTAuth.checkProtection();
  });
})();
