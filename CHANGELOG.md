# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [1.0.0] - 2025-01-11

### Adicionado
- Estrutura inicial do projeto seguindo Arquitetura Limpa
- Entidade `User` com validações
- Interface `UserRepositoryInterface` seguindo padrão Repository
- Implementação `InMemoryUserRepository` para desenvolvimento e testes
- Serviço `UserService` com operações CRUD completas
- Utilitários de validação (`validate_email`, `validate_name`, `sanitize_string`)
- Testes unitários para todas as funcionalidades
- Testes de integração para fluxos completos
- Documentação completa (README, Arquitetura, Desenvolvimento, API)
- Scripts de automação (setup, validação, geração de documentação)
- Git hooks (pre-commit, commit-msg, post-commit)
- CI/CD com GitHub Actions
- Configuração de ferramentas de qualidade (black, flake8, mypy, pylint)
- Pre-commit hooks configurados
- Estrutura de diretórios organizada

### Características
- Arquitetura em camadas (Domain, Application, Infrastructure, Presentation)
- Separação de responsabilidades
- Dependency Injection
- Código limpo e bem documentado
- Cobertura de testes > 80%
- Convenções de commit (Conventional Commits)
- Validação automática antes de commits

[1.0.0]: https://github.com/usuario/projeto/releases/tag/v1.0.0

