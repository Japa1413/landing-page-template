# Arquitetura do Projeto

Este documento descreve a arquitetura do projeto, decisões de design e padrões utilizados.

## 🏗️ Visão Geral

O projeto segue os princípios de **Arquitetura Limpa (Clean Architecture)**, separando o código em camadas bem definidas com responsabilidades claras.

## 📐 Estrutura de Camadas

```
┌─────────────────────────────────────────┐
│   Presentation Layer                    │
│   (main.py, controllers, views)        │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│   Application Layer                     │
│   (services/, use cases)                │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│   Domain Layer                          │
│   (entities/, repositories/)            │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│   Infrastructure Layer                  │
│   (repositories/, external services)     │
└─────────────────────────────────────────┘
```

### 1. Domain Layer (Camada de Domínio)

**Localização:** `src/domain/`

**Responsabilidades:**
- Entidades de negócio
- Interfaces de repositórios
- Lógica de negócio pura
- Regras de domínio

**Características:**
- ❌ **NÃO** depende de outras camadas
- ✅ Contém apenas lógica de negócio
- ✅ Independente de frameworks

**Exemplo:**
- `entities/user.py` - Entidade User
- `repositories/user_repository.py` - Interface do repositório

### 2. Application Layer (Camada de Aplicação)

**Localização:** `src/services/`

**Responsabilidades:**
- Casos de uso
- Orquestração de operações
- Validação de entrada
- Coordenação entre domínio e infraestrutura

**Características:**
- ✅ Depende apenas do Domain Layer
- ✅ Implementa casos de uso específicos
- ✅ Usa interfaces do Domain Layer

**Exemplo:**
- `user_service.py` - Serviço de gerenciamento de usuários

### 3. Infrastructure Layer (Camada de Infraestrutura)

**Localização:** `src/infrastructure/`

**Responsabilidades:**
- Implementações concretas de repositórios
- Integração com bancos de dados
- Integração com APIs externas
- Detalhes técnicos

**Características:**
- ✅ Implementa interfaces do Domain Layer
- ✅ Pode usar frameworks e bibliotecas
- ✅ Isolado do resto da aplicação

**Exemplo:**
- `repositories/in_memory_user_repository.py` - Implementação em memória

### 4. Presentation Layer (Camada de Apresentação)

**Localização:** `src/main.py`

**Responsabilidades:**
- Ponto de entrada da aplicação
- Interface com usuário
- Coordenação de fluxos

**Características:**
- ✅ Depende das camadas inferiores
- ✅ Orquestra a execução
- ✅ Pode ser CLI, API, Web, etc.

## 🔄 Fluxo de Dados

```
User Input
    ↓
Presentation Layer (main.py)
    ↓
Application Layer (UserService)
    ↓
Domain Layer (User Entity, Repository Interface)
    ↓
Infrastructure Layer (InMemoryUserRepository)
    ↓
Data Storage
```

## 🎯 Design Patterns Utilizados

### 1. Repository Pattern

**Objetivo:** Abstrair acesso a dados

**Implementação:**
- Interface: `UserRepositoryInterface` (Domain Layer)
- Implementação: `InMemoryUserRepository` (Infrastructure Layer)

**Benefícios:**
- Facilita testes (mock do repositório)
- Permite trocar implementação facilmente
- Isola lógica de persistência

### 2. Service Layer Pattern

**Objetivo:** Centralizar lógica de aplicação

**Implementação:**
- `UserService` contém todos os casos de uso relacionados a usuários

**Benefícios:**
- Organização clara de funcionalidades
- Reutilização de código
- Fácil manutenção

### 3. Dependency Injection

**Objetivo:** Reduzir acoplamento

**Implementação:**
- `UserService` recebe `UserRepositoryInterface` no construtor

**Benefícios:**
- Facilita testes
- Reduz acoplamento
- Permite diferentes implementações

## 📦 Princípios Aplicados

### SOLID

1. **Single Responsibility Principle (SRP)**
   - Cada classe tem uma única responsabilidade
   - `User` representa apenas um usuário
   - `UserService` apenas gerencia usuários

2. **Open/Closed Principle (OCP)**
   - Abstrações permitem extensão sem modificação
   - Novos repositórios podem ser criados sem alterar `UserService`

3. **Liskov Substitution Principle (LSP)**
   - Qualquer implementação de `UserRepositoryInterface` pode substituir outra

4. **Interface Segregation Principle (ISP)**
   - Interfaces específicas (`UserRepositoryInterface`) são preferidas a genéricas

5. **Dependency Inversion Principle (DIP)**
   - `UserService` depende de abstração (`UserRepositoryInterface`), não de implementação

### DRY (Don't Repeat Yourself)

- Validações centralizadas em `utils/validators.py`
- Lógica de negócio reutilizada através de serviços

### KISS (Keep It Simple, Stupid)

- Soluções simples e diretas
- Sem over-engineering
- Código legível e compreensível

## 🔐 Regras de Dependência

1. **Domain Layer** → Nenhuma dependência
2. **Application Layer** → Apenas Domain Layer
3. **Infrastructure Layer** → Domain Layer + frameworks
4. **Presentation Layer** → Todas as outras camadas

## 🧪 Testabilidade

A arquitetura facilita testes:

- **Testes Unitários:** Mock de dependências
- **Testes de Integração:** Implementações reais
- **Isolamento:** Cada camada pode ser testada independentemente

## 📈 Escalabilidade

A arquitetura permite:

- Adicionar novos repositórios (SQL, NoSQL, etc.)
- Adicionar novos serviços
- Adicionar novas entidades
- Trocar implementações sem afetar outras camadas

## 🔄 Evolução Futura

Possíveis melhorias:

1. **Adicionar camada de API REST**
   - Controllers para endpoints HTTP
   - Serialização/deserialização

2. **Adicionar repositório SQL**
   - Implementação com SQLAlchemy ou similar
   - Migrations de banco de dados

3. **Adicionar eventos de domínio**
   - Event-driven architecture
   - Pub/Sub para notificações

4. **Adicionar cache**
   - Redis ou similar
   - Camada de cache transparente

