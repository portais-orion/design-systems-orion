# Proibição de domínio nos packages compartilhados

Nos `packages/*` é PROIBIDO:
- entidades de negócio (Demanda, Carga, Fatura, DI, Container...);
- rotas/paths de portais; endpoints/URLs de API; fetch/axios/TanStack Query;
- chaves de permissão reais (`CRIAR_DEMANDA`...) e lógica de auth;
- textos de negócio de uma empresa; logos/assets de marca fora de tokens;
- imports de qualquer código dos repositórios dos portais.

Teste rápido: "este código faria sentido num terceiro portal de outra empresa criado amanhã?" Se não, é Camada 3 → fica no produto.

Integrações necessárias (link do Next, permissão, navegação) entram por props/slots/providers injetados pelo produto — nunca implementadas aqui.
