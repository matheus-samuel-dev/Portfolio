const STORAGE_KEYS = {
    language: "portfolio-language",
    theme: "theme"
};

const DEFAULT_LANGUAGE = "pt";
let currentLanguage = DEFAULT_LANGUAGE;
let languageFadeTimeout = null;
let lastFocusedBeforeModal = null;

const cvFiles = {
    pt: {
        path: "assets/cv/curriculo-matheus-samuel.pdf",
        available: true
    },
    en: {
        // Add assets/cv/resume-matheus-samuel.pdf and set available to true when the English resume is ready.
        path: "assets/cv/resume-matheus-samuel.pdf",
        fallbackPath: "assets/cv/curriculo-matheus-samuel.pdf",
        available: false
    }
};

const translations = {
    pt: {
        language: {
            name: "Português",
            flag: "🇧🇷"
        },
        seo: {
            lang: "pt-BR",
            title: "Matheus Samuel | Desenvolvedor Java Full Stack",
            description: "Portfólio de Matheus Samuel, Desenvolvedor Java Full Stack com projetos em Java, Spring Boot, React, PostgreSQL, Docker e deploy em produção."
        },
        header: {
            role: "Java Full Stack"
        },
        nav: {
            home: "Início",
            about: "Sobre",
            technologies: "Tecnologias",
            experience: "Experiência",
            projects: "Projetos",
            certificates: "Certificações",
            contact: "Contato"
        },
        hero: {
            eyebrow: "Portfólio profissional",
            title: "Matheus Samuel",
            subtitle: "Desenvolvedor Java Full Stack",
            description: "Desenvolvo aplicações web completas com Java, Spring Boot, React e PostgreSQL, criando APIs seguras, interfaces responsivas e sistemas com autenticação, dashboards, relatórios, Docker e deploy em produção.",
            ctaProjects: "Ver Projetos",
            ctaGithub: "GitHub",
            ctaLinkedin: "LinkedIn",
            previewResume: "Visualizar currículo em PDF",
            availability: "Aberto a oportunidades",
            profileFocus: "Back-end Java / Full Stack Júnior",
            architectureTitle: "Arquitetura aplicada",
            architectureApi: "API REST segura",
            architectureAuth: "JWT e permissões",
            architectureData: "PostgreSQL em produção"
        },
        buttons: {
            downloadCv: "Baixar Currículo",
            github: "GitHub",
            demo: "Demonstração"
        },
        badges: {
            featured: "Destaque",
            next: "Em finalização"
        },
        metrics: {
            projectsValue: "6+",
            projectsLabel: "Projetos desenvolvidos",
            fullstackValue: "3+",
            fullstackLabel: "Sistemas full stack",
            techValue: "10+",
            techLabel: "Tecnologias utilizadas",
            practiceValue: "Deploy",
            practiceLabel: "Projetos publicados em produção"
        },
        about: {
            eyebrow: "Sobre mim",
            title: "Desenvolvedor em formação com foco em produto real",
            paragraph1: "Sou Desenvolvedor Java Full Stack em formação, com foco na construção de aplicações web completas utilizando Java, Spring Boot, React e PostgreSQL.",
            paragraph2: "Tenho experiência prática com APIs REST, autenticação JWT, dashboards, relatórios, Docker, deploy em produção e integração front-end/back-end.",
            paragraph3: "Meu objetivo é atuar como Desenvolvedor Back-end Java ou Full Stack Júnior, contribuindo em times que valorizam código organizado, aprendizado contínuo e soluções com impacto real."
        },
        workStyle: {
            eyebrow: "Minha forma de trabalhar",
            title: "Construindo software com clareza, evolução e contexto",
            organized: {
                title: "Código organizado",
                text: "Priorizo estrutura clara, separação de responsabilidades e padrões que facilitam manutenção."
            },
            learning: {
                title: "Aprendizado contínuo",
                text: "Evoluo com estudo consistente, prática em projetos completos e abertura para feedback."
            },
            product: {
                title: "Foco em produto real",
                text: "Penso em usabilidade, segurança, dados e deploy para criar soluções que funcionam fora do ambiente acadêmico."
            }
        },
        technologies: {
            eyebrow: "Stack técnica",
            title: "Tecnologias organizadas por contexto de uso",
            backend: "Back-end",
            frontend: "Front-end",
            database: "Banco de Dados",
            tools: "Ferramentas"
        },
        experience: {
            eyebrow: "Experiência",
            title: "Vivência prática com dados, sistemas e melhoria de processos",
            role: "Estagiário de TI",
            company: "Celesc - Companhia de Energia do Estado de Santa Catarina",
            period: "Set/2025 - Fev/2026",
            description: "Atuação na área de Tecnologia da Informação com suporte funcional, análise e organização de dados, dashboards e acompanhamento de sistema corporativo interno.",
            items: {
                dashboards: "Desenvolvimento e manutenção de dashboards em Power BI",
                data: "Análise, organização e validação de dados com Excel",
                bugs: "Testes, identificação e reporte de bugs",
                system: "Acompanhamento de sistema corporativo interno",
                process: "Sugestões de melhoria para processos e fluxos operacionais"
            },
            tags: {
                dataAnalysis: "Análise de Dados",
                functionalSupport: "Suporte Funcional"
            }
        },
        projects: {
            eyebrow: "Projetos",
            title: "Cases que demonstram construção de sistemas reais",
            labels: {
                problem: "Problema resolvido",
                features: "Funcionalidades principais",
                challenge: "Aprendizados e desafios"
            },
            stock: {
                title: "Sistema de Gestão de Estoque",
                description: "Sistema full stack para controle de produtos, categorias e movimentações de estoque, com autenticação JWT, dashboard operacional, relatórios PDF/Excel, Docker e deploy em produção com Railway e Vercel.",
                deploy: "Deploy em produção com Railway e Vercel",
                problem: "Centraliza o controle de estoque e reduz perda de visibilidade sobre entradas, saídas e produtos críticos.",
                features: {
                    auth: "Autenticação JWT e permissões",
                    dashboard: "Dashboard com indicadores",
                    reports: "Relatórios em PDF e Excel"
                },
                challenge: "Integração front-end/back-end, segurança, regras de movimentação e deploy full stack."
            },
            bank: {
                title: "Sistema Bancário Web",
                description: "Aplicação web que simula uma experiência de internet banking, com operações de conta, transferências, extrato, painel administrativo, exportação em PDF e ambiente containerizado com Docker.",
                deploy: "Deploy em produção na Vercel",
                problem: "Simula fluxos financeiros com experiência próxima de um internet banking real.",
                features: {
                    transactions: "Depósitos, saques e transferências",
                    admin: "Painel administrativo",
                    pdf: "Extrato e exportação em PDF"
                },
                challenge: "Modelagem de fluxos de estado, validações de operações e organização da interface."
            },
            rsvp: {
                title: "Convite RSVP",
                description: "Aplicação responsiva para confirmação de presença, controle de convidados e administração de eventos, com dados em nuvem via Firebase.",
                problem: "Substitui confirmações manuais por um fluxo digital simples para convidados e organizadores.",
                features: {
                    form: "Formulário RSVP",
                    admin: "Painel de confirmações",
                    cloud: "Dados em nuvem com Firebase"
                },
                challenge: "Responsividade, integração com Firebase e experiência simples para diferentes usuários."
            },
            nextTitle: "Projetos em finalização para novos estudos de caso",
            helpdesk: {
                title: "Sistema HelpDesk",
                text: "Sistema para abertura, acompanhamento e gestão de chamados, com autenticação, dashboard, SLA e fluxo operacional."
            },
            auditor: {
                title: "AI Web Auditor",
                text: "Ferramenta para auditoria de páginas web com análise técnica, relatórios e apoio de IA generativa."
            },
            pool: {
                title: "Sistema de Bolão da Copa",
                text: "Aplicação para rankings, palpites, autenticação e gestão de participantes."
            },
            finance: {
                title: "Sistema de Gestão Financeira",
                text: "Sistema para controle de receitas, despesas, categorias, metas, transações recorrentes, dashboards financeiros e relatórios."
            }
        },
        certificates: {
            eyebrow: "Certificações",
            title: "Formações que sustentam minha evolução técnica",
            java: {
                category: "Back-end",
                focus: "Foco: APIs, back-end e fundamentos Java"
            },
            fullstack: {
                category: "Full Stack",
                focus: "Foco: desenvolvimento full stack e aplicações web"
            },
            excel: {
                category: "Dados",
                title: "Excel Básico",
                focus: "Foco: dados, planilhas e organização de informações"
            }
        },
        contact: {
            eyebrow: "Contato",
            title: "Vamos construir algo juntos?",
            description: "Estou aberto a oportunidades como Desenvolvedor Java Back-end, Full Stack Júnior, estágio em tecnologia e projetos freelancer.",
            email: "Enviar e-mail",
            linkedin: "LinkedIn",
            github: "GitHub",
            formSubject: "Nova mensagem do Portfolio",
            formNameLabel: "Nome",
            formNamePlaceholder: "Seu nome",
            formEmailLabel: "E-mail",
            formEmailPlaceholder: "Seu e-mail",
            formMessageLabel: "Mensagem",
            formMessagePlaceholder: "Sua mensagem",
            formSubmit: "Enviar mensagem",
            note: "Formulário conectado para contato direto. Se preferir, use o botão de e-mail.",
            formTitle: "Envie uma mensagem",
            formSubtitle: "Retorno o contato assim que possível."
        },
        resume: {
            eyebrow: "Currículo",
            title: "Visualização do Currículo",
            hint: "Role para navegar entre as páginas do PDF."
        },
        footer: {
            copyright: "© 2026 - Matheus Samuel. Todos os direitos reservados."
        },
        alts: {
            profilePhoto: "Foto profissional de Matheus Samuel",
            stock: {
                initial: "Sistema de Gestão de Estoque - tela inicial",
                dashboard: "Sistema de Gestão de Estoque - dashboard",
                categories: "Sistema de Gestão de Estoque - categorias",
                settings: "Sistema de Gestão de Estoque - configurações",
                movements: "Sistema de Gestão de Estoque - movimentações"
            },
            bank: {
                initial: "Sistema Bancário Web - tela inicial",
                dashboard: "Sistema Bancário Web - dashboard",
                account: "Sistema Bancário Web - minha conta",
                transfer: "Sistema Bancário Web - transferência",
                statement: "Sistema Bancário Web - extrato completo",
                admin: "Sistema Bancário Web - painel administrativo"
            },
            rsvp: {
                initial: "Convite RSVP - tela inicial",
                countdown: "Convite RSVP - contagem regressiva",
                confirmation: "Convite RSVP - confirmação RSVP"
            }
        },
        a11y: {
            homeLink: "Voltar para o início do portfólio",
            primaryNavigation: "Navegação principal",
            languageButton: "Selecionar idioma",
            themeToggleDark: "Ativar tema claro",
            themeToggleLight: "Ativar tema escuro",
            openMenu: "Abrir menu de navegação",
            closeMenu: "Fechar menu de navegação",
            heroActions: "Ações principais",
            githubProfile: "Abrir GitHub de Matheus Samuel em nova aba",
            linkedinProfile: "Abrir LinkedIn de Matheus Samuel em nova aba",
            downloadCv: "Baixar currículo de Matheus Samuel em PDF",
            previewCv: "Visualizar currículo de Matheus Samuel em PDF",
            mainStack: "Tecnologias principais",
            heroVisual: "Resumo visual do perfil profissional",
            metricsSection: "Métricas profissionais",
            aboutHighlights: "Principais competências",
            stockGallery: "Galeria do projeto Sistema de Gestão de Estoque",
            stockPrev: "Ver imagem anterior do projeto Sistema de Gestão de Estoque",
            stockNext: "Ver próxima imagem do projeto Sistema de Gestão de Estoque",
            stockDots: "Navegação do carrossel do Sistema de Gestão de Estoque",
            stockDot1: "Exibir tela inicial do Sistema de Gestão de Estoque",
            stockDot2: "Exibir dashboard do Sistema de Gestão de Estoque",
            stockDot3: "Exibir categorias do Sistema de Gestão de Estoque",
            stockDot4: "Exibir configurações do Sistema de Gestão de Estoque",
            stockDot5: "Exibir movimentações do Sistema de Gestão de Estoque",
            stockGithub: "Abrir GitHub do projeto Sistema de Gestão de Estoque em nova aba",
            stockDemo: "Abrir demonstração do projeto Sistema de Gestão de Estoque em nova aba",
            bankGallery: "Galeria do projeto Sistema Bancário Web",
            bankPrev: "Ver imagem anterior do projeto Sistema Bancário Web",
            bankNext: "Ver próxima imagem do projeto Sistema Bancário Web",
            bankDots: "Navegação do carrossel do Sistema Bancário Web",
            bankDot1: "Exibir tela inicial do Sistema Bancário Web",
            bankDot2: "Exibir dashboard do Sistema Bancário Web",
            bankDot3: "Exibir tela minha conta do Sistema Bancário Web",
            bankDot4: "Exibir tela de transferência do Sistema Bancário Web",
            bankDot5: "Exibir tela de extrato do Sistema Bancário Web",
            bankDot6: "Exibir painel administrativo do Sistema Bancário Web",
            bankGithub: "Abrir GitHub do projeto Sistema Bancário Web em nova aba",
            bankDemo: "Abrir demonstração do projeto Sistema Bancário Web em nova aba",
            rsvpGallery: "Galeria do projeto Convite RSVP",
            rsvpPrev: "Ver imagem anterior do projeto Convite RSVP",
            rsvpNext: "Ver próxima imagem do projeto Convite RSVP",
            rsvpDots: "Navegação do carrossel do Convite RSVP",
            rsvpDot1: "Exibir tela inicial do Convite RSVP",
            rsvpDot2: "Exibir tela de contagem regressiva do Convite RSVP",
            rsvpDot3: "Exibir tela de confirmação do Convite RSVP",
            rsvpGithub: "Abrir GitHub do projeto Convite RSVP em nova aba",
            rsvpDemo: "Abrir demonstração do projeto Convite RSVP em nova aba",
            projectRoadmap: "Projetos em finalização para novos estudos de caso",
            emailAction: "Enviar e-mail para Matheus Samuel",
            contactForm: "Formulário de contato",
            closeResumeModal: "Fechar visualização do currículo",
            resumeFrame: "Currículo de Matheus Samuel em PDF",
            footerLinks: "Links sociais",
            backToTop: "Voltar ao topo"
        }
    },
    en: {
        language: {
            name: "English",
            flag: "🇺🇸"
        },
        seo: {
            lang: "en",
            title: "Matheus Samuel | Java Full Stack Developer",
            description: "Portfolio of Matheus Samuel, Java Full Stack Developer building projects with Java, Spring Boot, React, PostgreSQL, Docker, and production deployment."
        },
        header: {
            role: "Java Full Stack"
        },
        nav: {
            home: "Home",
            about: "About",
            technologies: "Tech Stack",
            experience: "Experience",
            projects: "Projects",
            certificates: "Certificates",
            contact: "Contact"
        },
        hero: {
            eyebrow: "Professional portfolio",
            title: "Matheus Samuel",
            subtitle: "Java Full Stack Developer",
            description: "I build complete web applications with Java, Spring Boot, React, and PostgreSQL, creating secure APIs, responsive interfaces, and systems with authentication, dashboards, reports, Docker, and production deployment.",
            ctaProjects: "View Projects",
            ctaGithub: "GitHub",
            ctaLinkedin: "LinkedIn",
            previewResume: "Preview resume PDF",
            availability: "Open to opportunities",
            profileFocus: "Java Back-end / Junior Full Stack",
            architectureTitle: "Applied architecture",
            architectureApi: "Secure REST API",
            architectureAuth: "JWT and permissions",
            architectureData: "PostgreSQL in production"
        },
        buttons: {
            downloadCv: "Download Resume",
            github: "GitHub",
            demo: "Live Demo"
        },
        badges: {
            featured: "Featured",
            next: "In final development"
        },
        metrics: {
            projectsValue: "6+",
            projectsLabel: "Projects built",
            fullstackValue: "3+",
            fullstackLabel: "Full stack systems",
            techValue: "10+",
            techLabel: "Technologies used",
            practiceValue: "Deploy",
            practiceLabel: "Projects published in production"
        },
        about: {
            eyebrow: "About me",
            title: "Developer in training focused on real product delivery",
            paragraph1: "I am a Java Full Stack Developer in training, focused on building complete web applications with Java, Spring Boot, React, and PostgreSQL.",
            paragraph2: "I have hands-on experience with REST APIs, JWT authentication, dashboards, reports, Docker, production deployment, and front-end/back-end integration.",
            paragraph3: "My goal is to work as a Java Back-end Developer or Junior Full Stack Developer, contributing to teams that value organized code, continuous learning, and solutions with real impact."
        },
        workStyle: {
            eyebrow: "How I work",
            title: "Building software with clarity, growth, and product context",
            organized: {
                title: "Organized code",
                text: "I prioritize clear structure, separation of responsibilities, and patterns that make maintenance easier."
            },
            learning: {
                title: "Continuous learning",
                text: "I grow through consistent study, complete project practice, and openness to feedback."
            },
            product: {
                title: "Real product focus",
                text: "I think about usability, security, data, and deployment to create solutions that work beyond academic exercises."
            }
        },
        technologies: {
            eyebrow: "Technical stack",
            title: "Technologies organized by how I use them",
            backend: "Back-end",
            frontend: "Front-end",
            database: "Databases",
            tools: "Tools"
        },
        experience: {
            eyebrow: "Experience",
            title: "Hands-on experience with data, systems, and process improvement",
            role: "IT Intern",
            company: "Celesc - Santa Catarina State Energy Company",
            period: "Sep/2025 - Feb/2026",
            description: "Worked in Information Technology with functional support, data analysis and organization, dashboards, and monitoring of an internal corporate system.",
            items: {
                dashboards: "Development and maintenance of Power BI dashboards",
                data: "Data analysis, organization, and validation with Excel",
                bugs: "Testing, bug identification, and bug reporting",
                system: "Monitoring of an internal corporate system",
                process: "Process and workflow improvement suggestions"
            },
            tags: {
                dataAnalysis: "Data Analysis",
                functionalSupport: "Functional Support"
            }
        },
        projects: {
            eyebrow: "Projects",
            title: "Case studies that show real system development",
            labels: {
                problem: "Problem solved",
                features: "Key features",
                challenge: "Learnings and technical challenges"
            },
            stock: {
                title: "Inventory Management System",
                description: "Full stack system for managing products, categories, and inventory movements, with JWT authentication, operational dashboard, PDF/Excel reports, Docker, and production deployment with Railway and Vercel.",
                deploy: "Production deployment with Railway and Vercel",
                problem: "Centralizes inventory control and improves visibility over stock entries, exits, and critical products.",
                features: {
                    auth: "JWT authentication and permissions",
                    dashboard: "Dashboard with indicators",
                    reports: "PDF and Excel reports"
                },
                challenge: "Front-end/back-end integration, security, inventory movement rules, and full stack deployment."
            },
            bank: {
                title: "Web Banking System",
                description: "Web application that simulates an internet banking experience, with account operations, transfers, statements, admin panel, PDF export, and a Docker-based environment.",
                deploy: "Production deployment on Vercel",
                problem: "Simulates financial flows with an experience close to a real internet banking product.",
                features: {
                    transactions: "Deposits, withdrawals, and transfers",
                    admin: "Admin panel",
                    pdf: "Statements and PDF export"
                },
                challenge: "State flow modeling, operation validation, and interface organization."
            },
            rsvp: {
                title: "RSVP Invitation",
                description: "Responsive application for attendance confirmation, guest management, and event administration, with cloud data through Firebase.",
                problem: "Replaces manual confirmations with a simple digital flow for guests and organizers.",
                features: {
                    form: "RSVP form",
                    admin: "Confirmation dashboard",
                    cloud: "Cloud data with Firebase"
                },
                challenge: "Responsiveness, Firebase integration, and a simple experience for different users."
            },
            nextTitle: "Projects in final development for new case studies",
            helpdesk: {
                title: "HelpDesk System",
                text: "System for opening, tracking, and managing support tickets, with authentication, dashboard, SLA, and operational workflow."
            },
            auditor: {
                title: "AI Web Auditor",
                text: "Tool for auditing web pages with technical analysis, reports, and generative AI support."
            },
            pool: {
                title: "World Cup Pool System",
                text: "Application for rankings, predictions, authentication, and participant management."
            },
            finance: {
                title: "Financial Management System",
                text: "System for managing income, expenses, categories, goals, recurring transactions, financial dashboards, and reports."
            }
        },
        certificates: {
            eyebrow: "Certificates",
            title: "Training that supports my technical growth",
            java: {
                category: "Back-end",
                focus: "Focus: APIs, back-end, and Java fundamentals"
            },
            fullstack: {
                category: "Full Stack",
                focus: "Focus: full stack development and web applications"
            },
            excel: {
                category: "Data",
                title: "Basic Excel",
                focus: "Focus: data, spreadsheets, and information organization"
            }
        },
        contact: {
            eyebrow: "Contact",
            title: "Let’s build something together?",
            description: "I am open to opportunities as a Java Back-end Developer, Junior Full Stack Developer, technology intern, and freelance project contributor.",
            email: "Send e-mail",
            linkedin: "LinkedIn",
            github: "GitHub",
            formSubject: "New message from Portfolio",
            formNameLabel: "Name",
            formNamePlaceholder: "Your name",
            formEmailLabel: "E-mail",
            formEmailPlaceholder: "Your e-mail",
            formMessageLabel: "Message",
            formMessagePlaceholder: "Your message",
            formSubmit: "Send message",
            note: "The form is connected for direct contact. You can also use the e-mail button.",
            formTitle: "Send a message",
            formSubtitle: "I will get back to you as soon as possible."
        },
        resume: {
            eyebrow: "Resume",
            title: "Resume Preview",
            hint: "Scroll to navigate through the PDF pages."
        },
        footer: {
            copyright: "© 2026 - Matheus Samuel. All rights reserved."
        },
        alts: {
            profilePhoto: "Professional photo of Matheus Samuel",
            stock: {
                initial: "Inventory Management System - initial screen",
                dashboard: "Inventory Management System - dashboard",
                categories: "Inventory Management System - categories",
                settings: "Inventory Management System - settings",
                movements: "Inventory Management System - stock movements"
            },
            bank: {
                initial: "Web Banking System - initial screen",
                dashboard: "Web Banking System - dashboard",
                account: "Web Banking System - account page",
                transfer: "Web Banking System - transfer page",
                statement: "Web Banking System - full statement",
                admin: "Web Banking System - admin panel"
            },
            rsvp: {
                initial: "RSVP Invitation - initial screen",
                countdown: "RSVP Invitation - countdown",
                confirmation: "RSVP Invitation - RSVP confirmation"
            }
        },
        a11y: {
            homeLink: "Go back to the portfolio home",
            primaryNavigation: "Primary navigation",
            languageButton: "Select language",
            themeToggleDark: "Switch to light theme",
            themeToggleLight: "Switch to dark theme",
            openMenu: "Open navigation menu",
            closeMenu: "Close navigation menu",
            heroActions: "Primary actions",
            githubProfile: "Open Matheus Samuel's GitHub in a new tab",
            linkedinProfile: "Open Matheus Samuel's LinkedIn in a new tab",
            downloadCv: "Download Matheus Samuel's resume as PDF",
            previewCv: "Preview Matheus Samuel's resume as PDF",
            mainStack: "Main technologies",
            heroVisual: "Visual summary of professional profile",
            metricsSection: "Professional metrics",
            aboutHighlights: "Main skills",
            stockGallery: "Inventory Management System project gallery",
            stockPrev: "View previous Inventory Management System project image",
            stockNext: "View next Inventory Management System project image",
            stockDots: "Inventory Management System carousel navigation",
            stockDot1: "Show Inventory Management System initial screen",
            stockDot2: "Show Inventory Management System dashboard",
            stockDot3: "Show Inventory Management System categories",
            stockDot4: "Show Inventory Management System settings",
            stockDot5: "Show Inventory Management System stock movements",
            stockGithub: "Open Inventory Management System GitHub in a new tab",
            stockDemo: "Open Inventory Management System live demo in a new tab",
            bankGallery: "Web Banking System project gallery",
            bankPrev: "View previous Web Banking System project image",
            bankNext: "View next Web Banking System project image",
            bankDots: "Web Banking System carousel navigation",
            bankDot1: "Show Web Banking System initial screen",
            bankDot2: "Show Web Banking System dashboard",
            bankDot3: "Show Web Banking System account screen",
            bankDot4: "Show Web Banking System transfer screen",
            bankDot5: "Show Web Banking System statement screen",
            bankDot6: "Show Web Banking System admin panel",
            bankGithub: "Open Web Banking System GitHub in a new tab",
            bankDemo: "Open Web Banking System live demo in a new tab",
            rsvpGallery: "RSVP Invitation project gallery",
            rsvpPrev: "View previous RSVP Invitation project image",
            rsvpNext: "View next RSVP Invitation project image",
            rsvpDots: "RSVP Invitation carousel navigation",
            rsvpDot1: "Show RSVP Invitation initial screen",
            rsvpDot2: "Show RSVP Invitation countdown screen",
            rsvpDot3: "Show RSVP Invitation confirmation screen",
            rsvpGithub: "Open RSVP Invitation GitHub in a new tab",
            rsvpDemo: "Open RSVP Invitation live demo in a new tab",
            projectRoadmap: "Projects in final development for new case studies",
            emailAction: "Send an e-mail to Matheus Samuel",
            contactForm: "Contact form",
            closeResumeModal: "Close resume preview",
            resumeFrame: "Matheus Samuel resume PDF",
            footerLinks: "Social links",
            backToTop: "Back to top"
        }
    }
};

function getSavedPreferences() {
    const savedLanguage = localStorage.getItem(STORAGE_KEYS.language);
    const savedTheme = localStorage.getItem(STORAGE_KEYS.theme);

    return {
        language: translations[savedLanguage] ? savedLanguage : DEFAULT_LANGUAGE,
        theme: savedTheme === "light" ? "light" : "dark"
    };
}

function getTranslationValue(language, key) {
    return key.split(".").reduce((value, segment) => {
        if (value && Object.prototype.hasOwnProperty.call(value, segment)) {
            return value[segment];
        }

        return undefined;
    }, translations[language]);
}

function translate(key, language = currentLanguage) {
    const translated = getTranslationValue(language, key);

    if (typeof translated === "string") {
        return translated;
    }

    const fallback = getTranslationValue(DEFAULT_LANGUAGE, key);

    return typeof fallback === "string" ? fallback : key;
}

function updateSEO(language) {
    const seo = translations[language].seo;
    const descriptionMeta = document.querySelector('meta[name="description"]');
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');

    document.documentElement.lang = seo.lang;
    document.title = seo.title;

    if (descriptionMeta) {
        descriptionMeta.setAttribute("content", seo.description);
    }

    if (ogTitle) {
        ogTitle.setAttribute("content", seo.title);
    }

    if (ogDescription) {
        ogDescription.setAttribute("content", seo.description);
    }
}

function updateLanguageButton(language) {
    const languageButton = document.getElementById("languageButton");
    const languageButtonFlag = document.getElementById("languageButtonFlag");
    const languageButtonLabel = document.getElementById("languageButtonLabel");

    if (!languageButton || !languageButtonFlag || !languageButtonLabel) {
        return;
    }

    const languageData = translations[language].language;

    languageButtonFlag.textContent = languageData.flag;
    languageButtonLabel.textContent = languageData.name;
    languageButton.setAttribute("aria-label", translate("a11y.languageButton", language));
}

function updateLanguageOptionStates() {
    document.querySelectorAll(".language-option").forEach((option) => {
        const isCurrent = option.dataset.language === currentLanguage;

        option.setAttribute("aria-current", isCurrent ? "true" : "false");
    });
}

function updateTranslatableText(language) {
    document.querySelectorAll("[data-i18n]").forEach((element) => {
        element.textContent = translate(element.dataset.i18n, language);
    });
}

function updateTranslatableAttributes(language) {
    document.querySelectorAll("[data-i18n-attr][data-i18n-key]").forEach((element) => {
        const value = translate(element.dataset.i18nKey, language);
        const attributes = element.dataset.i18nAttr
            .split(",")
            .map((attribute) => attribute.trim())
            .filter(Boolean);

        attributes.forEach((attribute) => {
            element.setAttribute(attribute, value);
        });
    });
}

function updateCvLinks(language) {
    const cvConfig = cvFiles[language] || cvFiles[DEFAULT_LANGUAGE];
    const cvPath = cvConfig.available === false
        ? cvConfig.fallbackPath || cvFiles[DEFAULT_LANGUAGE].path
        : cvConfig.path;

    document.querySelectorAll("[data-cv-link]").forEach((link) => {
        link.setAttribute("href", cvPath);
    });

    document.querySelectorAll("[data-cv-frame]").forEach((frame) => {
        frame.setAttribute("src", `${cvPath}#view=FitH`);
    });
}

function applyLanguage(language) {
    if (!translations[language]) {
        return;
    }

    currentLanguage = language;
    document.body.classList.add("is-translating");
    window.clearTimeout(languageFadeTimeout);

    updateTranslatableText(language);
    updateTranslatableAttributes(language);
    updateLanguageButton(language);
    updateLanguageOptionStates();
    updateSEO(language);
    updateCvLinks(language);
    updateThemeButton(document.body.classList.contains("light-mode"));
    updateMobileMenuButton();

    languageFadeTimeout = window.setTimeout(() => {
        document.body.classList.remove("is-translating");
    }, 180);
}

function setLanguage(language) {
    if (!translations[language]) {
        return;
    }

    localStorage.setItem(STORAGE_KEYS.language, language);
    applyLanguage(language);
    closeLanguageDropdown();
}

function renderLanguageOptions() {
    const languageMenu = document.getElementById("languageMenu");

    if (!languageMenu) {
        return;
    }

    languageMenu.innerHTML = "";

    Object.keys(translations).forEach((language) => {
        const option = document.createElement("button");
        const flag = document.createElement("span");
        const label = document.createElement("span");

        option.type = "button";
        option.className = "language-option";
        option.setAttribute("role", "menuitem");
        option.dataset.language = language;

        flag.className = "language-menu__flag";
        flag.setAttribute("aria-hidden", "true");
        flag.textContent = translations[language].language.flag;

        label.textContent = translations[language].language.name;

        option.append(flag, label);
        languageMenu.appendChild(option);
    });

    updateLanguageOptionStates();
}

function openLanguageDropdown({ focusCurrent = false } = {}) {
    const languageButton = document.getElementById("languageButton");
    const languageMenu = document.getElementById("languageMenu");

    if (!languageButton || !languageMenu) {
        return;
    }

    languageMenu.hidden = false;
    languageButton.setAttribute("aria-expanded", "true");
    updateLanguageOptionStates();

    if (focusCurrent) {
        const currentOption = languageMenu.querySelector(`[data-language="${currentLanguage}"]`);

        if (currentOption) {
            currentOption.focus();
        }
    }
}

function closeLanguageDropdown({ restoreFocus = false } = {}) {
    const languageButton = document.getElementById("languageButton");
    const languageMenu = document.getElementById("languageMenu");

    if (!languageButton || !languageMenu) {
        return;
    }

    languageMenu.hidden = true;
    languageButton.setAttribute("aria-expanded", "false");

    if (restoreFocus) {
        languageButton.focus();
    }
}

function toggleLanguageDropdown() {
    const languageMenu = document.getElementById("languageMenu");

    if (!languageMenu) {
        return;
    }

    if (languageMenu.hidden) {
        openLanguageDropdown();
    } else {
        closeLanguageDropdown();
    }
}

function focusLanguageOption(direction) {
    const languageMenu = document.getElementById("languageMenu");

    if (!languageMenu || languageMenu.hidden) {
        return;
    }

    const options = Array.from(languageMenu.querySelectorAll(".language-option"));
    const currentIndex = options.indexOf(document.activeElement);
    const nextIndex = (currentIndex + direction + options.length) % options.length;

    if (options[nextIndex]) {
        options[nextIndex].focus();
    }
}

function setupLanguageDropdown() {
    const languageButton = document.getElementById("languageButton");
    const languageMenu = document.getElementById("languageMenu");

    if (!languageButton || !languageMenu) {
        return;
    }

    renderLanguageOptions();

    languageButton.addEventListener("click", toggleLanguageDropdown);
    languageButton.addEventListener("keydown", (event) => {
        if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openLanguageDropdown({ focusCurrent: true });
        }

        if (event.key === "Escape") {
            closeLanguageDropdown();
        }
    });

    languageMenu.addEventListener("click", (event) => {
        const option = event.target.closest(".language-option");

        if (option && option.dataset.language) {
            setLanguage(option.dataset.language);
        }
    });

    languageMenu.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            event.preventDefault();
            closeLanguageDropdown({ restoreFocus: true });
        }

        if (event.key === "ArrowDown") {
            event.preventDefault();
            focusLanguageOption(1);
        }

        if (event.key === "ArrowUp") {
            event.preventDefault();
            focusLanguageOption(-1);
        }

        if (event.key === "Home") {
            event.preventDefault();
            const firstOption = languageMenu.querySelector(".language-option");

            if (firstOption) {
                firstOption.focus();
            }
        }

        if (event.key === "End") {
            event.preventDefault();
            const options = languageMenu.querySelectorAll(".language-option");
            const lastOption = options[options.length - 1];

            if (lastOption) {
                lastOption.focus();
            }
        }
    });

    document.addEventListener("click", (event) => {
        const languageSwitcher = document.getElementById("languageSwitcher");

        if (languageSwitcher && !languageSwitcher.contains(event.target)) {
            closeLanguageDropdown();
        }
    });
}

function updateThemeButton(isLight) {
    const themeToggle = document.getElementById("themeToggle");
    const themeIcon = themeToggle ? themeToggle.querySelector("i") : null;

    if (!themeToggle || !themeIcon) {
        return;
    }

    themeIcon.className = isLight ? "fa-solid fa-sun" : "fa-solid fa-moon";
    themeToggle.setAttribute(
        "aria-label",
        translate(isLight ? "a11y.themeToggleLight" : "a11y.themeToggleDark")
    );
}

function applyTheme(theme) {
    const isLight = theme === "light";

    document.body.classList.toggle("light-mode", isLight);
    updateThemeButton(isLight);
}

function setTheme(theme) {
    localStorage.setItem(STORAGE_KEYS.theme, theme);
    applyTheme(theme);
}

function setupThemeToggle() {
    const themeToggle = document.getElementById("themeToggle");

    if (!themeToggle) {
        return;
    }

    themeToggle.addEventListener("click", () => {
        const nextTheme = document.body.classList.contains("light-mode") ? "dark" : "light";
        setTheme(nextTheme);
    });
}

function updateMobileMenuButton() {
    const menuButton = document.getElementById("menuButton");
    const navbar = document.getElementById("primaryNavigation");
    const icon = menuButton ? menuButton.querySelector("i") : null;
    const isOpen = Boolean(navbar && navbar.classList.contains("active"));

    if (!menuButton || !icon) {
        return;
    }

    menuButton.setAttribute("aria-expanded", isOpen ? "true" : "false");
    menuButton.setAttribute("aria-label", translate(isOpen ? "a11y.closeMenu" : "a11y.openMenu"));
    icon.className = isOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars";
}

function closeMobileMenu() {
    const navbar = document.getElementById("primaryNavigation");

    if (navbar) {
        navbar.classList.remove("active");
    }

    document.body.classList.remove("mobile-menu-open");
    updateMobileMenuButton();
}

function setupMobileMenu() {
    const menuButton = document.getElementById("menuButton");
    const navbar = document.getElementById("primaryNavigation");

    if (!menuButton || !navbar) {
        return;
    }

    menuButton.addEventListener("click", () => {
        const isOpen = navbar.classList.toggle("active");

        document.body.classList.toggle("mobile-menu-open", isOpen);
        updateMobileMenuButton();
    });

    navbar.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", closeMobileMenu);
    });

    document.addEventListener("click", (event) => {
        const header = document.getElementById("header");

        if (header && !header.contains(event.target)) {
            closeMobileMenu();
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 1080) {
            closeMobileMenu();
        }
    });
}

function setupHeaderScroll() {
    const header = document.getElementById("header");
    const backToTop = document.getElementById("backToTop");
    const navLinks = Array.from(document.querySelectorAll(".navbar a[href^='#']"));
    const sections = navLinks
        .map((link) => document.querySelector(link.getAttribute("href")))
        .filter(Boolean);

    const handleScroll = () => {
        if (header) {
            header.classList.toggle("scrolled", window.scrollY > 40);
        }

        if (backToTop) {
            backToTop.style.display = window.scrollY > 340 ? "inline-flex" : "none";
        }

        const activeSection = sections
            .slice()
            .reverse()
            .find((section) => window.scrollY + 140 >= section.offsetTop);

        navLinks.forEach((link) => {
            link.classList.toggle("active-link", activeSection && link.getAttribute("href") === `#${activeSection.id}`);
        });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    if (backToTop) {
        backToTop.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }
}

function setupScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        ".metric-card, .about-card, .about-highlights, .work-card, .tech-category, .experience-card, .project-card, .roadmap-card, .cert-card, .contact-copy, .contact-form"
    );

    if (!("IntersectionObserver" in window)) {
        animatedElements.forEach((element) => element.classList.add("show"));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12
    });

    animatedElements.forEach((element) => {
        element.classList.add("hidden");
        observer.observe(element);
    });
}

function closeResumeModal() {
    const resumeModal = document.getElementById("resumeModal");
    const openResumeModalButton = document.getElementById("openResumeModal");

    if (!resumeModal) {
        return;
    }

    resumeModal.hidden = true;
    resumeModal.removeEventListener("keydown", trapResumeModalFocus);
    document.body.classList.remove("modal-open");

    const focusTarget = lastFocusedBeforeModal || openResumeModalButton;

    if (focusTarget && typeof focusTarget.focus === "function") {
        focusTarget.focus();
    }

    lastFocusedBeforeModal = null;
}

function trapResumeModalFocus(event) {
    if (event.key !== "Tab") {
        return;
    }

    const resumeModal = document.getElementById("resumeModal");

    if (!resumeModal || resumeModal.hidden) {
        return;
    }

    const focusableElements = Array.from(resumeModal.querySelectorAll(
        "a[href], button:not([disabled]), iframe, [tabindex]:not([tabindex='-1'])"
    )).filter((element) => element.offsetParent !== null);

    if (!focusableElements.length) {
        return;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
    }

    if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
    }
}

function setupResumeModal() {
    const resumeModal = document.getElementById("resumeModal");
    const openResumeModalButton = document.getElementById("openResumeModal");
    const closeResumeModalButton = document.getElementById("closeResumeModal");

    if (resumeModal && openResumeModalButton) {
        openResumeModalButton.addEventListener("click", () => {
            lastFocusedBeforeModal = document.activeElement;
            resumeModal.hidden = false;
            resumeModal.addEventListener("keydown", trapResumeModalFocus);
            document.body.classList.add("modal-open");

            if (closeResumeModalButton) {
                closeResumeModalButton.focus();
            }
        });

        resumeModal.addEventListener("click", (event) => {
            if (event.target instanceof HTMLElement && event.target.hasAttribute("data-close-resume-modal")) {
                closeResumeModal();
            }
        });
    }

    if (closeResumeModalButton) {
        closeResumeModalButton.addEventListener("click", closeResumeModal);
    }
}

function initializeProjectCarousel(carousel) {
    const slides = Array.from(carousel.querySelectorAll(".carousel-slide"));
    const dots = Array.from(carousel.querySelectorAll(".carousel-dot"));
    const previousButton = carousel.querySelector(".carousel-arrow--prev");
    const nextButton = carousel.querySelector(".carousel-arrow--next");

    if (!slides.length) {
        return;
    }

    let currentIndex = slides.findIndex((slide) => slide.classList.contains("is-active"));

    if (currentIndex < 0) {
        currentIndex = 0;
    }

    const loadSlideImage = (index) => {
        const slide = slides[index];

        if (!slide) {
            return;
        }

        const image = slide.querySelector("img[data-src]");

        if (image) {
            image.src = image.dataset.src;
            image.removeAttribute("data-src");
        }
    };

    const updateCarousel = (nextIndex) => {
        currentIndex = (nextIndex + slides.length) % slides.length;

        slides.forEach((slide, index) => {
            slide.classList.toggle("is-active", index === currentIndex);
        });

        dots.forEach((dot, index) => {
            const isActive = index === currentIndex;

            dot.classList.toggle("is-active", isActive);
            dot.setAttribute("aria-current", isActive ? "true" : "false");
        });

        loadSlideImage(currentIndex);
        loadSlideImage((currentIndex + 1) % slides.length);
    };

    loadSlideImage(currentIndex);
    loadSlideImage((currentIndex + 1) % slides.length);

    if (previousButton) {
        previousButton.addEventListener("click", () => {
            updateCarousel(currentIndex - 1);
        });
    }

    if (nextButton) {
        nextButton.addEventListener("click", () => {
            updateCarousel(currentIndex + 1);
        });
    }

    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            updateCarousel(index);
        });
    });

    carousel.addEventListener("keydown", (event) => {
        if (event.key === "ArrowLeft") {
            event.preventDefault();
            updateCarousel(currentIndex - 1);
        }

        if (event.key === "ArrowRight") {
            event.preventDefault();
            updateCarousel(currentIndex + 1);
        }
    });

    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener("touchstart", (event) => {
        touchStartX = event.changedTouches[0].clientX;
    }, { passive: true });

    carousel.addEventListener("touchend", (event) => {
        touchEndX = event.changedTouches[0].clientX;

        const swipeDistance = touchEndX - touchStartX;

        if (Math.abs(swipeDistance) < 45) {
            return;
        }

        updateCarousel(swipeDistance > 0 ? currentIndex - 1 : currentIndex + 1);
    }, { passive: true });
}

function setupCarousels() {
    document.querySelectorAll("[data-carousel]").forEach((carousel) => {
        initializeProjectCarousel(carousel);
    });
}

function setupGlobalKeyboardShortcuts() {
    window.addEventListener("keydown", (event) => {
        if (event.key !== "Escape") {
            return;
        }

        const languageMenu = document.getElementById("languageMenu");
        const resumeModal = document.getElementById("resumeModal");
        const navbar = document.getElementById("primaryNavigation");

        if (languageMenu && !languageMenu.hidden) {
            closeLanguageDropdown({ restoreFocus: true });
        }

        if (resumeModal && !resumeModal.hidden) {
            closeResumeModal();
        }

        if (navbar && navbar.classList.contains("active")) {
            closeMobileMenu();
        }
    });
}

function initializePortfolio() {
    const preferences = getSavedPreferences();

    setupLanguageDropdown();
    setupThemeToggle();
    setupMobileMenu();
    setupHeaderScroll();
    setupScrollAnimations();
    setupResumeModal();
    setupCarousels();
    setupGlobalKeyboardShortcuts();

    applyTheme(preferences.theme);
    applyLanguage(preferences.language);
}

document.addEventListener("DOMContentLoaded", initializePortfolio);
