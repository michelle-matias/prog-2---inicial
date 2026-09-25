/**
 * Portal Académico IPT — Componente de Navegação Global Unificada
 * Garante uma navegação intuitiva, moderna e consistente entre todos os módulos.
 */

(function () {
  'use strict';

  const NAV_ITEMS = [
    { id: 'hub', label: 'Hub Geral', href: '/hub.html', icon: 'hub', desc: 'Painel central integrado' },
    { id: 'dashboard', label: 'NETPA', href: '/dashboard.html', icon: 'dashboard', desc: 'Gestão académica e pautas' },
    { id: 'balcao-unico', label: 'Balcão Único', href: '/balcao-unico.html', icon: 'support_agent', desc: 'Atendimento e requerimentos' },
    { id: 'refeitorio', label: 'Refeitório', href: '/refeitorio.html', icon: 'restaurant', desc: 'Ementas e saldo Unicard' },
    { id: 'prova-vida', label: 'Prova de Vida', href: '/prova-vida.html', icon: 'fact_check', desc: 'Ação Social e Estatutos' },
    { id: 'diretorio', label: 'Diretório', href: '/diretorio.html', icon: 'contacts', desc: 'Contactos e docentes' }
  ];

  function detectCurrentPage() {
    const path = window.location.pathname.toLowerCase();
    if (path.includes('dashboard')) return 'dashboard';
    if (path.includes('balcao')) return 'balcao-unico';
    if (path.includes('refeitorio')) return 'refeitorio';
    if (path.includes('prova-vida')) return 'prova-vida';
    if (path.includes('diretorio')) return 'diretorio';
    if (path.includes('hub')) return 'hub';
    return '';
  }

  function renderGlobalNavbar() {
    const activePage = detectCurrentPage();
    const user = window.IPTAuth ? window.IPTAuth.getUser() : null;
    
    // Se for a página de login / index, a página inicial tem o seu próprio layout de autenticação
    const isIndex = window.location.pathname.endsWith("/index.html") || 
                    window.location.pathname === "/" || 
                    window.location.pathname.endsWith("/");
    if (isIndex) return;

    // Criar container se não existir
    let navContainer = document.getElementById('ipt-global-nav-container');
    if (!navContainer) {
      navContainer = document.createElement('div');
      navContainer.id = 'ipt-global-nav-container';
      navContainer.className = 'sticky top-0 z-50 w-full shadow-sm bg-white font-sans';
      document.body.prepend(navContainer);
    }

    const userName = user ? user.name : "Estudante";
    const userEmail = user ? user.email : "estudante@ipt.pt";
    const userCourse = user ? user.course : "Engenharia Informática";
    const userId = user ? user.id : "24891";
    const userAvatar = user ? user.avatar : "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80";

    navContainer.innerHTML = `
      <!-- IPT Ribbon Multicolor Strip -->
      <div class="h-1.5 w-full flex overflow-hidden">
        <div class="flex-1 bg-[#d81b60]"></div>
        <div class="flex-1 bg-[#74b816]"></div>
        <div class="flex-1 bg-[#00897b]"></div>
        <div class="flex-1 bg-[#0288d1]"></div>
        <div class="flex-1 bg-[#1e88e5]"></div>
        <div class="flex-1 bg-[#3949ab]"></div>
        <div class="flex-1 bg-[#8e24aa]"></div>
        <div class="flex-1 bg-[#fb8c00]"></div>
        <div class="flex-1 bg-[#74b816]"></div>
      </div>

      <!-- Main Navbar -->
      <nav class="bg-white border-b border-slate-200">
        <div class="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-16 gap-4">
            
            <!-- Brand / Logo -->
            <div class="flex items-center gap-3 shrink-0">
              <button id="ipt-mobile-menu-btn" class="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors" aria-label="Abrir menu">
                <span class="material-symbols-outlined text-[24px]">menu</span>
              </button>

              <a href="/hub.html" class="flex items-center gap-2.5 group">
                <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-[#74b816] to-[#3f6900] flex items-center justify-center text-white shadow-md shadow-[#74b816]/25 group-hover:scale-105 transition-transform">
                  <span class="material-symbols-outlined text-[22px]">school</span>
                </div>
                <div class="flex flex-col">
                  <div class="flex items-center gap-1.5">
                    <span class="font-bold text-slate-900 text-lg leading-tight tracking-tight group-hover:text-[#3f6900] transition-colors">IPT</span>
                    <span class="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 bg-[#f0f9e8] text-[#3f6900] border border-[#74b816]/30 rounded">Portal</span>
                  </div>
                  <span class="text-[11px] text-slate-500 font-medium hidden sm:inline leading-none">Politécnico de Tomar</span>
                </div>
              </a>
            </div>

            <!-- Central Desktop Navigation Links -->
            <div class="hidden lg:flex items-center space-x-1 flex-1 justify-center max-w-3xl">
              ${NAV_ITEMS.map(item => {
                const isActive = activePage === item.id;
                return `
                  <a href="${item.href}" 
                     class="flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                       isActive
                         ? 'bg-[#f0f9e8] text-[#3f6900] shadow-xs border border-[#74b816]/20'
                         : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                     }">
                    <span class="material-symbols-outlined text-[19px] ${isActive ? 'text-[#74b816]' : 'text-slate-400'}">${item.icon}</span>
                    <span>${item.label}</span>
                    ${isActive ? '<span class="w-1.5 h-1.5 rounded-full bg-[#74b816]"></span>' : ''}
                  </a>
                `;
              }).join('')}
            </div>

            <!-- Trailing Controls: Waffle, Notifications, User Profile -->
            <div class="flex items-center gap-2 shrink-0">
              
              <!-- Waffle Apps Switcher -->
              <div class="relative">
                <button id="ipt-waffle-btn" class="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors" title="Módulos do Portal">
                  <span class="material-symbols-outlined text-[22px]">apps</span>
                </button>

                <!-- Waffle Dropdown -->
                <div id="ipt-waffle-menu" class="hidden absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div class="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1 mb-2">Serviços Académicos</div>
                  <div class="grid grid-cols-2 gap-1.5">
                    ${NAV_ITEMS.map(item => `
                      <a href="${item.href}" class="flex flex-col items-center justify-center p-2.5 rounded-xl hover:bg-[#f0f9e8] group transition-colors text-center">
                        <span class="material-symbols-outlined text-[24px] text-[#74b816] group-hover:scale-110 transition-transform mb-1">${item.icon}</span>
                        <span class="text-xs font-semibold text-slate-700 group-hover:text-[#3f6900]">${item.label}</span>
                      </a>
                    `).join('')}
                  </div>
                </div>
              </div>

              <!-- Notifications Dropdown -->
              <div class="relative">
                <button id="ipt-notif-btn" class="relative p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors" title="Notificações">
                  <span class="material-symbols-outlined text-[22px]">notifications</span>
                  <span class="absolute top-1.5 right-1.5 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">3</span>
                </button>

                <!-- Notifications Menu -->
                <div id="ipt-notif-menu" class="hidden absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 z-50 animate-in fade-in duration-150">
                  <div class="flex items-center justify-between pb-3 border-b border-slate-100 mb-2">
                    <span class="font-bold text-slate-800 text-sm">Notificações Académicas</span>
                    <span class="text-[11px] font-bold bg-[#f0f9e8] text-[#3f6900] px-2 py-0.5 rounded-full">3 Novas</span>
                  </div>
                  <div class="space-y-2 text-xs">
                    <div class="p-2.5 rounded-xl bg-blue-50/60 border border-blue-100 flex gap-3">
                      <span class="material-symbols-outlined text-blue-600 text-lg shrink-0 mt-0.5">assignment_turned_in</span>
                      <div>
                        <p class="font-semibold text-slate-800">Pauta Publicada • NETPA</p>
                        <p class="text-slate-600 mt-0.5">A pauta de Programação II (Frequência) foi disponibilizada no NETPA.</p>
                        <span class="text-[10px] text-slate-400 mt-1 block">Hoje, 11:30</span>
                      </div>
                    </div>
                    <div class="p-2.5 rounded-xl bg-amber-50/60 border border-amber-100 flex gap-3">
                      <span class="material-symbols-outlined text-amber-600 text-lg shrink-0 mt-0.5">restaurant</span>
                      <div>
                        <p class="font-semibold text-slate-800">Refeitório Central SAS</p>
                        <p class="text-slate-600 mt-0.5">Reserva da refeição para almoço confirmada. Saldo restante: 24,50 €.</p>
                        <span class="text-[10px] text-slate-400 mt-1 block">Hoje, 09:15</span>
                      </div>
                    </div>
                    <div class="p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-100 flex gap-3">
                      <span class="material-symbols-outlined text-emerald-600 text-lg shrink-0 mt-0.5">fact_check</span>
                      <div>
                        <p class="font-semibold text-slate-800">Prova de Vida SAS Aprovada</p>
                        <p class="text-slate-600 mt-0.5">O processo de validação de estatuto social para o ano 2025/2026 foi concluído com sucesso.</p>
                        <span class="text-[10px] text-slate-400 mt-1 block">Ontem</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- User Profile Menu -->
              <div class="relative">
                <button id="ipt-user-menu-btn" class="flex items-center gap-2 p-1.5 rounded-xl border border-slate-200 hover:border-[#74b816]/50 hover:bg-[#f0f9e8]/50 transition-all text-left">
                  <img src="${userAvatar}" alt="${userName}" class="w-8 h-8 rounded-lg object-cover border border-slate-200" />
                  <div class="hidden md:flex flex-col text-left leading-tight pr-1">
                    <span class="text-xs font-bold text-slate-800 truncate max-w-[120px]">${userName}</span>
                    <span class="text-[10px] text-slate-500 font-mono">Nº ${userId}</span>
                  </div>
                  <span class="material-symbols-outlined text-slate-400 text-sm hidden md:inline">expand_more</span>
                </button>

                <!-- User Dropdown Menu -->
                <div id="ipt-user-menu" class="hidden absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 p-3 z-50 animate-in fade-in duration-150">
                  <div class="flex items-center gap-3 p-2 bg-slate-50 rounded-xl mb-2">
                    <img src="${userAvatar}" alt="${userName}" class="w-10 h-10 rounded-xl object-cover border border-slate-200" />
                    <div class="min-w-0">
                      <p class="font-bold text-slate-900 text-xs truncate">${userName}</p>
                      <p class="text-[11px] text-slate-500 truncate">${userEmail}</p>
                      <span class="inline-block mt-0.5 text-[10px] font-bold text-[#3f6900] bg-[#f0f9e8] px-1.5 py-0.2 rounded">IPT ID Ativo</span>
                    </div>
                  </div>

                  <div class="text-[11px] text-slate-500 px-2 py-1 font-medium space-y-1 mb-2 border-b border-slate-100 pb-2">
                    <div class="flex justify-between"><span>Curso:</span> <span class="font-semibold text-slate-700">Eng. Informática</span></div>
                    <div class="flex justify-between"><span>Nº Aluno:</span> <span class="font-semibold font-mono text-slate-700">${userId}</span></div>
                    <div class="flex justify-between"><span>Saldo SAS:</span> <span class="font-bold text-[#3f6900]">24,50 €</span></div>
                  </div>

                  <div class="space-y-1 text-xs">
                    <a href="/hub.html" class="flex items-center gap-2 px-2.5 py-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors font-medium">
                      <span class="material-symbols-outlined text-base text-slate-500">dashboard</span>
                      <span>O Meu Hub</span>
                    </a>
                    <a href="/balcao-unico.html" class="flex items-center gap-2 px-2.5 py-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors font-medium">
                      <span class="material-symbols-outlined text-base text-slate-500">contact_support</span>
                      <span>Suporte & Requerimentos</span>
                    </a>
                    <button id="ipt-logout-action" class="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors font-semibold text-left mt-1 border-t border-slate-100 pt-2">
                      <span class="material-symbols-outlined text-base">logout</span>
                      <span>Terminar Sessão</span>
                    </button>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>

        <!-- Mobile Drawer Menu -->
        <div id="ipt-mobile-menu" class="hidden lg:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 space-y-2">
          <div class="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 pt-1">Navegação do Ecossistema</div>
          <div class="grid grid-cols-1 gap-1">
            ${NAV_ITEMS.map(item => {
              const isActive = activePage === item.id;
              return `
                <a href="${item.href}" class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-[#f0f9e8] text-[#3f6900]'
                    : 'text-slate-700 hover:bg-slate-50'
                }">
                  <span class="material-symbols-outlined text-lg ${isActive ? 'text-[#74b816]' : 'text-slate-400'}">${item.icon}</span>
                  <div>
                    <div class="leading-tight">${item.label}</div>
                    <div class="text-[11px] text-slate-400 font-normal">${item.desc}</div>
                  </div>
                </a>
              `;
            }).join('')}
          </div>
          <div class="pt-3 border-t border-slate-100 mt-2">
            <button id="ipt-mobile-logout-btn" class="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 font-semibold text-sm transition-colors">
              <span class="material-symbols-outlined text-lg">logout</span>
              <span>Terminar Sessão</span>
            </button>
          </div>
        </div>
      </nav>
    `;

    // Configurar interações dos dropdowns
    setupNavInteractions();
  }

  function setupNavInteractions() {
    const waffleBtn = document.getElementById('ipt-waffle-btn');
    const waffleMenu = document.getElementById('ipt-waffle-menu');
    const notifBtn = document.getElementById('ipt-notif-btn');
    const notifMenu = document.getElementById('ipt-notif-menu');
    const userBtn = document.getElementById('ipt-user-menu-btn');
    const userMenu = document.getElementById('ipt-user-menu');
    const mobileBtn = document.getElementById('ipt-mobile-menu-btn');
    const mobileMenu = document.getElementById('ipt-mobile-menu');

    function closeAllDropdowns() {
      if (waffleMenu) waffleMenu.classList.add('hidden');
      if (notifMenu) notifMenu.classList.add('hidden');
      if (userMenu) userMenu.classList.add('hidden');
    }

    if (waffleBtn && waffleMenu) {
      waffleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = !waffleMenu.classList.contains('hidden');
        closeAllDropdowns();
        if (!isOpen) waffleMenu.classList.remove('hidden');
      });
    }

    if (notifBtn && notifMenu) {
      notifBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = !notifMenu.classList.contains('hidden');
        closeAllDropdowns();
        if (!isOpen) notifMenu.classList.remove('hidden');
      });
    }

    if (userBtn && userMenu) {
      userBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = !userMenu.classList.contains('hidden');
        closeAllDropdowns();
        if (!isOpen) userMenu.classList.remove('hidden');
      });
    }

    if (mobileBtn && mobileMenu) {
      mobileBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        mobileMenu.classList.toggle('hidden');
      });
    }

    document.addEventListener('click', () => {
      closeAllDropdowns();
    });

    // Interceptar clique nos menus para não fechar acidentalmente
    [waffleMenu, notifMenu, userMenu].forEach(menu => {
      if (menu) {
        menu.addEventListener('click', (e) => e.stopPropagation());
      }
    });

    // Ações de logout
    const logoutAction = document.getElementById('ipt-logout-action');
    if (logoutAction) {
      logoutAction.addEventListener('click', (e) => {
        e.preventDefault();
        if (confirm('Tem a certeza de que deseja terminar a sessão no Portal Académico?')) {
          if (window.IPTAuth) {
            window.IPTAuth.logout();
          } else {
            window.location.href = '/index.html?logged_out=1';
          }
        }
      });
    }

    const mobileLogoutBtn = document.getElementById('ipt-mobile-logout-btn');
    if (mobileLogoutBtn) {
      mobileLogoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (confirm('Tem a certeza de que deseja terminar a sessão no Portal Académico?')) {
          if (window.IPTAuth) {
            window.IPTAuth.logout();
          } else {
            window.location.href = '/index.html?logged_out=1';
          }
        }
      });
    }
  }

  // Executar renderização ao carregar a página
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderGlobalNavbar);
  } else {
    renderGlobalNavbar();
  }

  window.IPTNav = {
    render: renderGlobalNavbar
  };
})();
