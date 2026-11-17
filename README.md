# disperfil

Um site de uma página onde você cola um ID do Discord e recebe um card com a
foto, o banner, o nome, as insígnias reais e a data de criação da conta — mais a
música que você escolher tocando na própria barra do card e as suas redes.

Tudo roda no navegador. Sem login, sem token, sem backend.

## Como abrir

A forma mais simples é usar o servidor local incluído (ou o Live Server do VS
Code). Abrir o arquivo direto pode bloquear a busca de música, as sugestões de
localização e o clipboard por causa das regras de CORS:

```bash
python serve.py --port 4173
# depois abra http://127.0.0.1:4173
```

O `serve.py` também entende links por caminho, como
`http://127.0.0.1:4173/belly`, para testar o formato publicado. O Live Server
continua funcionando com links `#k=...`. `python -m http.server` e
`npx serve .` servem o editor, mas não fazem o fallback de `/nome`.

## O que dá pra fazer

- Colar um ID do Discord e montar o card na hora.
- Ver as insígnias reais do perfil (HypeSquad, Nitro, Early Supporter, Bug
  Hunter, Staff, Partner, Active Developer e outras) como ícones, no lugar de
  pílulas de texto.
- Adicionar um recado curto (até 60 caracteres).
- Adicionar suas redes (Instagram, TikTok, X, YouTube, Twitch, GitHub, Spotify
  ou um site) e mostrá-las no card, com o ícone e o @ certos. No card e no link
  compartilhado elas viram botões com uma setinha, deixando claro que abrem o
  link.
- Escolher um fundo animado para a página — Papel, Aurora, Ondas, Bolhas,
  Batida, Estrelas, Grade, Névoa, Chuva, Vórtice, Confete, Buraco negro, **Riso,
  Mármore, Vitral** ou **Blueprint**. Todos ficam em movimento; as Estrelas
  piscam, têm estrelas cadentes e constelações, a Névoa muda de forma e de cor, a
  Chuva cai, o Vórtice gira, o Confete cai girando, o Buraco negro gira com disco
  de poeira, o Riso imprime meio-tons, o Mármore mistura tinta, o Vitral acende
  uma rosácea e o Blueprint desenha uma prancha técnica. O fundo segue o mouse.
- Marcar **“Reagir à música”** (ligado por padrão) para o fundo, o halo do card,
  o equalizador e a barra pulsarem junto com a posição da música. O pulso usa a
  posição real do player e o BPM quando o SoundCloud informa; não é um
  analisador de áudio porque o áudio fica em outro domínio. A Batida ganhou um
  equalizador circular e todos os fundos recebem anéis de pulso durante o play.
- Usar uma **imagem sua como fundo da página** (JPG, PNG, WebP ou AVIF). A
  imagem é comprimida no navegador e entra no link compartilhado.
- Adicionar até **5 fotos flutuantes**: cada uma é um polaroide com fita
  adesiva que aparece ao redor do card e fica balançando. Todas ficam **atrás do
  card por padrão**; a opção “Na frente do card” de cada foto traz para a
  frente. Dá para **arrastar** cada foto para qualquer lugar (com inércia: ela
  continua e quica nas bordas), colocar uma **legenda própria**, marcar **“Foto
  inteira”** para ver a imagem toda sem cortar e **clicar para ampliar** num
  lightbox. Não substituem o banner do Discord.
- Escolher o tema da página: claro, escuro, uma cor personalizada ou um
  **gradiente** (Pôr do sol, Oceano, Neon, Menta) e também um **gradiente
  personalizado** com duas cores e ângulo. O texto claro/escuro é calculado
  pela cor média.
- Adicionar **pronomes, localização e uma bio** no card, além do recado. A
  localização tem sugestões de cidades enquanto você digita.
- Definir em que minuto a música começa quando alguém der play (ex.: `1:47`), ou
  usar o momento atual do player.
- Escolher se o card **começa tocando automaticamente** ou só depois de um
  clique. O navegador pode bloquear o autoplay até a pessoa interagir com a
  página.
- **Música:**
  - buscar pelo nome → resultados do SoundCloud com a faixa completa, com
    play/pause, barra de progresso e tempos. O site tenta versões alternativas
    automaticamente quando a primeira é curta ou não abre;
  - link de faixa ou episódio do Spotify → toca na barra do card, com
    play/pause e progresso ao vivo. O player oficial fica escondido; não entra
    nenhum card extra;
  - link de álbum ou playlist do Spotify → abre o player compacto do Spotify no
    card;
  - link de faixa do SoundCloud → toca a faixa completa na barra;
  - se o SoundCloud não responde ou não tem uma versão completa, a busca cai
    para prévias de 30 segundos do iTunes.
- Baixar o card em PNG (desenhado em canvas, 2x, sem dependências).
- Avançar a música: clique ou arraste na barra de progresso. As setas do
  teclado também funcionam quando a barra está focada.
- Copiar um link que abre **só o card** para quem receber, em tela cheia, sem
  o formulário. O botão **Copiar link** gera um **link curto** e o copia. No site
  publicado, ele fica no formato `https://disbio.io/belly`; no Live Server local,
  `http://127.0.0.1:5500/#k=...`. Ao abrir, o link continua curto na barra de
  endereço e mostra só o card. Se o serviço de link curto falhar, ele copia o
  link completo como reserva.
- Escolher um **nome para o link** no campo “Link personalizado”. Sem nome, o
  link usa um código curto aleatório; com nome, vira
  `https://disbio.io/seu-nome`. O site consulta o nome antes de criar: se já
  existir, avisa e não gera um link conflitante. Os nomes ficam no namespace
  `disbio-` do Rentry, então `belly` pode ser seu mesmo que `rentry.co/belly` já
  exista.
- ID, música, recado, redes, pronomes, local, bio, imagem de fundo, fotos,
  legendas, posições, tema e começo da música ficam no hash
  (`#u=...&m=sp:...|sc:...|it:...&mt=...&ma=...&mc=...&md=...&s=...&l=...&pr=...&loc=...&bio=...&st=...&ap=1&bg=...&bgm=1&th=gradient&tg=custom&gs=...&ge=...&ga=...&bgi=...&ph=[...]&v=card`).
  O `ph` guarda até 5 fotos em JSON (`s` é a prévia, `h` a versão HD usada no
  link curto, `c` a legenda, `x`/`y` a posição, `r` a rotação, `f=1` quando fica
  na frente e `t=1` quando mostra a foto inteira, sem cortar). Use `bgm=0` para
  desligar a reação à música.

## De onde vêm os dados

| O quê | Fonte |
| --- | --- |
| Perfil (foto, banner, nome, badges, criação, presença) | [JAPI](https://japi.rest), API pública que espelha a API do Discord |
| Busca de música | Página pública de faixas do SoundCloud lida pelo [Jina Reader](https://r.jina.ai) |
| Player da busca | [SoundCloud Widget API](https://developers.soundcloud.com/docs/api/html5-widget), em um iframe de 1px |
| Fallback de busca e prévia de 30s | iTunes Search API (sem chave) |
| Metadados de links do Spotify | Spotify oEmbed |
| Player de faixa e episódio do Spotify | [iFrame API](https://developer.spotify.com/documentation/embeds/guides/using-the-iframe-api) oficial do Spotify, escondido atrás da barra |
| Player de álbum e playlist do Spotify | iframe compacto do Spotify |
| Metadados da busca do SoundCloud | SoundCloud oEmbed |
| Link curto | [mclo.gs](https://mclo.gs) (principal) e [Rentry](https://rentry.co) (reserva), ambos públicos |
| Sugestões de localização | [Photon](https://photon.komoot.io) (OpenStreetMap) |
| Ícones das redes | [Simple Icons](https://simpleicons.org) (CC0) |

Nenhuma credencial é usada. A JAPI é um serviço de terceiros: se ela sair do ar,
o site não consegue buscar perfis novos (os já carregados ficam em cache de
memória por 5 minutos).

## Publicar em disbio.io

O site já entende links por caminho (`https://disbio.io/belly`) sem `#k=`:

- **Netlify:** publique a pasta; o `netlify.toml` reescreve qualquer caminho para
  `index.html`. Adicione `disbio.io` em Domain settings.
- **Vercel:** importe o projeto; o `vercel.json` faz o rewrite. Adicione o
  domínio no painel.
- **GitHub Pages:** suba o repositório e ative o Pages em **main / root**.
  O site fica em `https://<usuario>.github.io/<repositorio>/`; o `404.html` faz
  os links por caminho funcionarem. Para usar `disbio.io`, renomeie
  `CNAME.disbio-example` para `CNAME` e configure o DNS; sem isso, não use
  `CNAME` no repositório, senão o github.io não responde.
- **Local:** `python serve.py --port 4173` e abra
  `http://127.0.0.1:4173/belly`.

Como o nome é reservado:

- Antes de criar, o app consulta `rentry.co/disbio-<nome>`. Se já existe, mostra
  “já está em uso” e não gera um link conflitante.
- O código de edição do Rentry fica no `localStorage`. No mesmo navegador, copiar
  de novo com o mesmo nome **atualiza o link existente** em vez de criar outro.
  Em outro navegador, o nome aparece como ocupado.
- O namespace `disbio-` isola o site de páginas soltas do Rentry:
  `rentry.co/belly` pode existir sem impedir `disbio.io/belly`.
- O conteúdo fica no mclo.gs (fotos HD incluídas) e a página do Rentry guarda só
  o ponteiro. Os dois são públicos; não use para dados secretos.

O `404.html` é uma cópia do `index.html`. Depois de editar o index, rode
`python build_404.py` para atualizar a cópia. O preview dos links (título e
descrição) é fixo porque o site é estático; para um preview diferente por perfil
seria preciso uma função de servidor/SSR.

## Limites (importante)

- A música toca **no card**, não na sua presença real do Discord. O Discord não
  permite alterar a presença de uma conta por fora; quem mostra o Spotify é o
  app do Spotify conectado.
- Faixas do Spotify tocam a prévia de 30 segundos quando você não está logado
  no Spotify. Se estiver logado, o player libera a faixa completa. Em ambos os
  casos, o áudio roda no player oficial oculto e os controles ficam na barra.
- Álbuns e playlists continuam usando o player compacto do Spotify, porque não
  têm uma faixa única para mostrar na barra.
- Só dados públicos. O site não pede login, não acessa DMs e não altera nada na
  sua conta.
- **Busca x link:** a busca por nome usa faixas públicas do SoundCloud e tenta
  versões alternativas automaticamente quando a primeira é curta ou não abre.
  Isso costuma tocar a música inteira sem login. Se o SoundCloud não tiver uma
  versão completa, a busca cai para o iTunes e toca 30s. Nada é baixado nem
  convertido.
- O PNG não inclui o player; inclui a barra, a capa, o progresso, a bio, o local,
  os pronomes e as redes.
- O fundo animado é uma camada visual (canvas) atrás da página e fica em
  movimento o tempo todo. A reação à música é um pulso calculado com a posição
  real do player (e o BPM quando disponível), não um analisador de áudio: o
  áudio do SoundCloud/Spotify fica em outro domínio e não é acessível para FFT.
  O fundo também reage ao mouse. O PNG exporta só o card, sem o fundo animado,
  a imagem de fundo, a foto flutuante ou o tema da página.
- A imagem de fundo é comprimida para WebP/JPEG (até 1500 px) e vai no hash
  `bgi`. As fotos flutuantes são comprimidas em duas versões: uma **prévia** de
  até 480 px (~35 KB) que fica no hash normal (`ph`, campo `s`), e uma versão
  **HD** de até 1800 px (~300 KB) usada no link curto (campo `h`) e no lightbox.
  O editor também guarda a HD no `localStorage` para ela sobreviver a um reload.
  Cada foto leva legenda, posição, rotação, o “na frente” e o “foto inteira”.
  Links com imagens ficam longos; se o navegador recusar o tamanho, o resto do
  card continua salvo.
- O lightbox abre maior (até 1100 px de largura e 82% da altura da tela) e usa a
  versão HD da foto.
- As fotos ficam atrás do card por padrão. Ao arrastar, a foto vem para a frente
  temporariamente para você ver onde está soltando; ao soltar, ela continua com
  inércia e quica nas bordas. A posição é salva em porcentagem, então se adapta a
  telas diferentes. Se ficar muito atrás do card, ela sai um pouco para
  continuar aparecendo.
- O link curto é criado na hora de copiar: o hash vira base64 e é salvo em um
  serviço público de texto (mclo.gs; o Rentry fica como reserva). O link
  compartilhado é `https://disbio.io/nome` no site publicado ou
  `endereço/#k=código` no local, sem as imagens gigantes. Com um nome
  personalizado, o app consulta `rentry.co/disbio-<nome>` antes: se estiver
  livre, cria uma página pequena que aponta para o conteúdo no mclo.gs; se for
  seu (o código de edição fica no `localStorage`), atualiza o mesmo link; se for
  de outra pessoa, avisa e não gera conflito. Ao abrir, o app lê o conteúdo
  salvo, mostra o card e **mantém o caminho na barra de endereço**. Como o texto
  fica em um serviço público, não coloque nada secreto nas fotos ou na bio. O
  endereço é o mesmo onde o site está aberto — no Live Server,
  `http://127.0.0.1:5500/`; para outra pessoa abrir, o site precisa estar
  hospedado ou na mesma máquina/rede.
- O autoplay é uma tentativa: o navegador pode exigir um clique antes de liberar
  som, principalmente no link compartilhado. A opção fica salva em `ap=1`.
- As sugestões de localização vêm do Photon; o texto digitado é enviado a esse
  serviço. Se ele falhar, aparecem cidades pré-carregadas.
- A busca de música envia o termo digitado ao Jina Reader, que lê a página
  pública do SoundCloud. Nenhum dado do perfil é enviado.
- O “Começa em” funciona dentro da duração real (faixa completa). Se o ponto
  passar do fim da prévia de 30s, aparece um aviso e o player para no fim.
- O tema personalizado calcula texto claro/escuro pela luminância da cor (ou da
  cor média do gradiente); gradientes com cores muito claras e muito escuras ao
  mesmo tempo podem reduzir o contraste em uma das pontas.
- O “Começa em” vale para o primeiro play; depois pausa/retomada seguem normais.
  Se a pessoa arrastar a barra, o ponto escolhido por ela manda.
- As redes são autodeclaradas: o site só exibe e abre os links que você colar.
  No card e no link compartilhado eles são clicáveis; no PNG aparecem como
  ícone + @, sem link.
- Não afiliado ao Discord, Spotify, SoundCloud ou Apple.
- Os ícones de badge vêm do projeto
  [mezotv/discord-badges](https://github.com/mezotv/discord-badges), sob licença
  MIT. Discord e as marcas pertencem à Discord Inc.
- Os ícones de redes vêm do [Simple Icons](https://simpleicons.org) (CC0). As
  marcas pertencem aos respectivos donos.

## Estrutura

```
index.html        marcação e textos
styles.css        todo o visual
app.js            perfil, música, hash, download
favicon.svg
assets/badges/    ícones das insígnias (SVG) + licença
assets/social/    ícones das redes (SVG)
serve.py          servidor local com fallback para links /nome
build_404.py      gera 404.html a partir do index
404.html          fallback de caminhos no GitHub Pages
CNAME.disbio-example  modelo de domínio para o GitHub Pages
netlify.toml      rewrite para index.html
vercel.json       rewrite para index.html
_redirects        rewrite (Netlify)
docs/             design curto do projeto
```

Para mudar a cara do site, as cores e fontes ficam em `:root` no começo de
`styles.css`. Os textos de interface ficam em `index.html`.

## Ideias de próximos passos

- Detecção de batida real no áudio do SoundCloud/Spotify (hoje o pulso usa a
  posição e o BPM quando disponível).
- Cache persistente e um fallback de perfil via Lanyard.
- Temas de card (claro, escuro, cor de destaque).
- Página de "galeria" com os cards salvos.
