## 💻 Projeto

Consulta graphql para 100 repositórios (com todos os dados/métricas necessários para responder as RQs) + requisição automática.


## 🚀 Como executar

- Clone o repositório
- Instale as dependências com `yarn`
- Inicie o servidor com `yarn test`
- Abra o aquivo data.csv da pasta csv

Lembre-se de criar o seu token no Github para obter as credencias de autenticação. Em seguida, defina no arquivo .env as configurações do seu App (remova o example do arquivo .env.example).
 ```cl
TOKEN=
```

## Metricas 📈:
**RQ 01.** Sistemas populares são maduros/antigos?

Métrica: idade do repositório (calculado a partir da data de sua criação)

**RQ 02.** Sistemas populares recebem muita contribuição externa?

Métrica: total de pull requests aceitas

**RQ 03.**. Sistemas populares lançam releases com frequência?

Métrica: total de releases

**RQ 04.** Sistemas populares são atualizados com frequência?

Métrica: tempo até a última atualização (calculado a partir da data de última atualização)

**RQ 05.** Sistemas populares são escritos nas linguagens mais populares (Links para um site externo.)?

Métrica: linguagem primária de cada um desses repositórios

**RQ 06.**. Sistemas populares possuem um alto percentual de issues fechadas?

Métrica: razão entre número de issues fechadas pelo total de issues
