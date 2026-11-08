**Agenda de Contatos**

Aplicação web moderna para gerenciamento de contatos pessoais e profissionais, desenvolvida inteiramente sem frameworks (Vanilla JS), utilizando apenas HTML5, CSS3 e JavaScript (ES6+).

Este projeto faz parte do meu portfólio de estudos em Front-End, focado em consolidar conceitos fundamentais de desenvolvimento web, manipulação do DOM e persistência de dados no navegador.

---

**Funcionalidades (CRUD)**

- Create (Criar): Formulário interativo para cadastro de novos contatos com validação de campos obrigatórios e máscara automática para o telefone (xx) xxxxx-xxxx.
- Read (Ler): Listagem dinâmica em cards modernos e barra de busca em tempo real por nome ou telefone.
- Update (Atualizar): Edição de contatos existentes preenchendo automaticamente o formulário com os dados salvos.
- Delete (Excluir): Remoção de itens da lista com caixa de confirmação.
- Persistência de Dados: Os dados são salvos no localStorage do navegador, garantindo que suas informações não se percam ao atualizar a página.
- Feedback Visual: Sistema de notificações flutuantes (*Toast*) após cada ação realizada (salvar, atualizar ou excluir).
- Segurança Básica: Prevenção contra injeção de HTML malicioso (XSS) através do uso seguro de textContent.

---

**Tecnologias Utilizadas**

- HTML5: Estrutura semântica da aplicação.
- CSS3: Estilização moderna utilizando Variáveis CSS (`:root`), Flexbox, Grid Layout e Design Responsivo para dispositivos móveis.
- JavaScript : Lógica da aplicação, manipulação de eventos, arrow functions e integração com a API localStorage.
- FontAwesome: Ícones leves e intuitivos.
- Google Fonts (Inter): Tipografia limpa e profissional.

