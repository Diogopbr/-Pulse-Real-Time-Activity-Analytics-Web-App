# Pulse - Real-Time Activity & Analytics Web App

<div align="center">
  
  ![Pulse Logo](https://img.shields.io/badge/Pulse-Real--Time%20Monitoring-38bdf8?style=for-the-badge)
  
  Uma aplicação web moderna focada em monitoramento em tempo real, eventos, status e timelines.
  
  **Status Page + Activity Feed + Observability UI**

  [Demo](#) • [Começar](#-instalação) • [Recursos](#-recursos) • [Tecnologias](#-tecnologias)

</div>

---

## 🎯 Sobre o Projeto

**Pulse** é uma plataforma de monitoramento em tempo real que demonstra habilidades avançadas em:

✔ Organização de informação complexa  
✔ Gerenciamento de estado, tempo e atualização  
✔ UX além de formulários tradicionais  
✔ Arquitetura moderna com Next.js  

Este projeto se destaca de CRUDs padrão ao focar em **dados vivos**, **sistemas distribuídos** e **microinterações** sofisticadas.

## ✨ Recursos

### 🚀 Principais Funcionalidades

- **🔴 Live Feed** - Timeline de eventos em tempo real com WebSocket simulado
- **📊 System Monitor** - Cards de serviços com health status, uptime e latência
- **🔔 Incident Management** - Visualização de incidentes com logs ao vivo
- **⚡ Real-Time Updates** - Atualizações automáticas sem reload
- **🎨 UI Avançada** - Auto-scroll inteligente, pause feed, highlights

### 🎭 Experiência do Usuário

- Auto-scroll inteligente (desativa quando usuário rola manualmente)
- Pausar/retomar feed de eventos
- Highlight de novos eventos
- Skeleton states e empty states
- Agrupamento de eventos por tempo
- Animações funcionais (não decorativas)

## 🛠️ Tecnologias

### Core Stack

- **[Next.js 14](https://nextjs.org/)** - App Router, Server Components
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[TailwindCSS](https://tailwindcss.com/)** - Styling personalizado
- **[Framer Motion](https://www.framer.com/motion/)** - Animações performáticas

### Estado e Dados

- **[Zustand](https://zustand-demo.pmnd.rs/)** - Estado global minimalista
- **WebSocket Simulator** - Mock de tempo real
- **Date-fns** - Manipulação de datas

### UI e Ícones

- **[Lucide React](https://lucide.dev/)** - Ícones modernos
- **[Inter Font](https://fonts.google.com/specimen/Inter)** - Tipografia

## 📁 Estrutura do Projeto

```
pulse/
├── app/
│   ├── page.tsx              # Landing page
│   ├── monitor/
│   │   └── page.tsx          # Monitor principal
│   ├── incidents/
│   │   └── page.tsx          # Detalhes de incidentes
│   ├── layout.tsx            # Layout raiz
│   └── globals.css           # Estilos globais
│
├── components/
│   ├── feed/
│   │   ├── EventFeed.tsx     # Feed de eventos
│   │   └── EventItem.tsx     # Item individual
│   ├── status/
│   │   ├── ServicesGrid.tsx  # Grid de serviços
│   │   └── ServiceCard.tsx   # Card de serviço
│   ├── charts/
│   │   └── StatCard.tsx      # Card de estatística
│   └── motion/
│       └── Animations.tsx    # Componentes animados
│
├── store/
│   └── useEventsStore.ts     # Zustand store
│
├── lib/
│   ├── events.ts             # Geração de eventos
│   ├── websocket.ts          # WebSocket simulado
│   └── time.ts               # Utilitários de tempo
│
└── types/
    └── index.ts              # TypeScript types
```

## 🚀 Instalação

### Pré-requisitos

- Node.js 18+ 
- npm ou yarn

### Começar

1. **Clone o repositório**
   ```bash
   git clone https://github.com/seu-usuario/pulse.git
   cd pulse
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```

4. **Abra no navegador**
   ```
   http://localhost:3000
   ```

## 🎨 Paleta de Cores

```css
Background:  #0A0F1F
Surface:     #11162A
Success:     #22C55E
Warning:     #FACC15
Error:       #EF4444
Info:        #38BDF8
```

## 🧪 Simulação de Tempo Real

O projeto utiliza um **WebSocket Simulator** que:

- Gera eventos a cada 3 segundos
- Simula diferentes tipos de eventos (deployment, incident, metric, alert, system, api_call)
- Atualiza status de serviços periodicamente
- Mantém histórico de até 100 eventos

### Tipos de Eventos

- **Deployment** - Builds, deploys, rollouts
- **Incident** - Erros, timeouts, degradações
- **Metric** - CPU, memória, requests
- **Alert** - Certificados, backups, rate limits
- **System** - Auto-scaling, cache, configs
- **API Call** - Pagamentos, auth, webhooks

## 📊 Componentes Principais

### EventFeed

Feed de eventos em tempo real com:
- Auto-scroll inteligente
- Pause/resume
- Agrupamento temporal
- Highlight de novos eventos

### ServicesGrid

Grid de serviços mostrando:
- Status (online, degraded, offline)
- Uptime percentage
- Latência em ms
- Eventos recentes

### IncidentView

Visualização de incidentes com:
- Timeline de updates
- Status tracking
- Serviços afetados
- Logs em tempo real

## 🎯 Casos de Uso

Este projeto é ideal para:

- **Portfólio** - Demonstra habilidades avançadas
- **Aprendizado** - Estudo de sistemas real-time
- **Base** - Starter para dashboards de monitoramento
- **Inspiração** - Referência de UI/UX moderna

## 📝 Scripts Disponíveis

```bash
npm run dev      # Desenvolvimento
npm run build    # Build de produção
npm run start    # Start em produção
npm run lint     # ESLint
```

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se livre para:

1. Fork o projeto
2. Criar uma branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abrir um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💻 Autor

Desenvolvido como projeto de portfólio para demonstrar habilidades em:
- Sistemas de tempo real
- UI/UX avançada
- Arquitetura moderna
- TypeScript e Next.js

---

<div align="center">
  
  **Pulse** - Real-Time Monitoring Reimaginado
  
  ⭐ Star este projeto se ele foi útil!

</div>
