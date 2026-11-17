# disperfil — design

## Intenção
Uma página onde qualquer pessoa cola um ID do Discord e recebe um card de perfil
com dados públicos reais (foto, banner, nome, badges, data de criação), uma
música escolhida tocando dentro do card e suas redes sociais. Serve para
brincar, compartilhar e baixar como imagem.

## Objetivos
- Um ID, um card: funcionar sem login, sem token e sem instalar nada.
- Parecer um perfil do Discord de verdade, não um formulário genérico.
- Música com reprodução real: a busca por nome usa faixas públicas do
  SoundCloud e tenta versões alternativas até achar uma completa. Se o SoundCloud
  falhar, usa o YouTube. Links do Spotify continuam usando o player oficial; se
  só houver prévia de 30s, o card troca para a versão completa no YouTube.
- Insígnias do Discord como ícones de verdade, não pílulas de texto.
- Redes sociais com ícone e @ no card, salvas no link compartilhado, como botões
  que deixam claro o redirecionamento.
- Fundo animado com presets que ficam em movimento o tempo todo, reação à música
  e ao mouse; tema claro/escuro/cor, gradientes e gradiente personalizado.
- Imagem de fundo própria, comprimida no navegador e salva no link.
- Foto flutuante em formato de polaroide, até 5, atrás do card por padrão,
  arrastáveis, cada uma com legenda e lightbox.
- Começo da música configurável e autoplay opcional, com aviso quando o ponto
  passa da prévia.
- Mais detalhes no perfil: pronomes, localização (com sugestões) e bio.
- Levar o resultado: PNG e um link curto por caminho
  (`https://disbio.io/seu-nome`), que abre só o card.

## Não-objetivos
- Alterar a presença ou a conta real no Discord (a API não permite).
- Login OAuth, banco de dados, backend, upload para servidor.
- Buscar perfis privados ou qualquer dado que não seja público.

## Restrições
- Sem credenciais: os dados vêm da JAPI (`japi.rest`), que espelha a API do
  Discord e libera CORS. Depende dela estar no ar.
- A busca do Spotify não tem endpoint público de API sem token. Por isso a busca
  por nome lê a página pública de faixas do SoundCloud via Jina Reader e usa o
  SoundCloud Widget API oficial (iframe oculto). Se a página/Jina falharem, cai
  para o iTunes (CORS aberto, prévia de 30s, capa, artista e duração).
- O SoundCloud não garante que toda faixa tenha upload completo; o cliente tenta
  as versões seguintes quando a duração é muito menor que a canônica ou o widget
  não toca.
- Tudo roda no navegador; um servidor local simples evita restrições de CORS e
  clipboard (a busca e as sugestões dependem de serviços externos).

## Abordagem escolhida
Site estático em HTML, CSS e JavaScript puro, sem build. Alternativas
descartadas: backend Node (atrito de instalação), OAuth (só veria a própria
conta) e download/conversão de áudio.

## Fonte de dados
- Perfil: `GET https://japi.rest/discord/v1/user/:id` → `data` (id, username,
  global_name, avatarURL, bannerURL, accent_color, public_flags_array,
  createdAt, avatar_decoration_data) + `presence.status`.
- Busca de música: `GET https://r.jina.ai/https://soundcloud.com/search/sounds?q=:termo`
  (página pública de faixas em markdown) + SoundCloud oEmbed para capa/artista,
  com fallback para `GET https://itunes.apple.com/search`.
- Link do Spotify: `GET https://open.spotify.com/oembed`.
- Player da busca: SoundCloud Widget API (`https://w.soundcloud.com/player/api.js`)
  em um iframe de 1px.
- Player de faixa do Spotify: iFrame API oficial
  (`https://open.spotify.com/embed/iframe-api/v1`) com o iframe oculto em um
  contêiner de 1px.
- Player de álbum/playlist: iframe `https://open.spotify.com/embed/:type/:id`.
- Localização: `GET https://photon.komoot.io/api/?q=:termo` com lista local de
  cidades como fallback.
- Insígnias: SVGs locais em `assets/badges/` (projeto mezotv/discord-badges, MIT).
- Redes: entrada do usuário; detecção pelo domínio; ícones locais do Simple
  Icons (CC0) em `assets/social/`.

## Direção visual
Papel claro de estúdio (`#e8e9e3`), tinta quase preta e um único acento
violeta. Tipografia: Clash Display nos títulos, Switzer na interface. O card
escuro flutua inclinado, com um halo de luz tirado do próprio banner. Nada de
grade de cards genéricos: o card é o único objeto, o formulário é uma linha
editorial. Verde do Spotify e laranja do SoundCloud só dentro do card, e uma
polaroid pode flutuar ao redor dele.

## Comportamento
- ID inválido ou inexistente → erro claro embaixo do campo.
- Busca com debounce, navegável por teclado, sem resultados → orientação.
- Modo SoundCloud: a própria barra é o player, com play/pause, progresso e seek
  vindos do Widget API; o iframe fica oculto. Versões curtas ou que não abrem
  são trocadas automaticamente.
- Modo Spotify: a própria barra é o player, com play/pause e progresso vindo da
  iFrame API; o iframe fica oculto. Álbuns e playlists usam o player compacto.
  Se o Spotify liberar só a prévia de 30s, o card troca para a versão completa no
  YouTube via Piped.
- Insígnias reais em SVG, com tooltip; o PNG desenha os mesmos ícones.
- Modo prévia: play/pause, barra de progresso e tempos reais.
- Barra de progresso clicável e arrastável (seek no SoundCloud, Spotify e na
  prévia), navegável pelas setas do teclado.
- Recado opcional, contador de 60 caracteres.
- Redes opcionais: o campo detecta Instagram, TikTok, X, YouTube, Twitch,
  GitHub, Spotify ou site; mostra chips no formulário e a linha de ícones + @
  no card.
- Hash da URL guarda `u` (ID), `m` (`sp:`, `sc:`, `yt:` ou `it:`), `mt`/`ma`/`mc`/`md`
  (título, artista, capa e duração), `s` (recado), `l` (links), `pr`
  (pronomes), `loc` (local), `bio`, `st` (começo em segundos), `ap=1` (autoplay),
  `bg` (fundo), `bgm=1`/`0` (reagir ou não à música), `th` (tema), `bgc` (cor
  personalizada), `tg`/`gs`/`ge`/`ga` (gradiente e cores/ângulo), `bgi` (imagem
  de fundo em data URL) e `ph` (JSON com até 5 fotos: `s` prévia, `h` versão HD
  usada no link curto, `c` legenda, `x`/`y` posição, `r` rotação, `f=1` na
  frente e `t=1` para ver a foto inteira sem cortar).
- Link curto: o botão “Copiar link” codifica um hash com a versão HD das fotos
  em base64 e salva em um serviço público de texto (mclo.gs, com Rentry de
  reserva). O link copiado é `origem/#k=código` no local e
  `https://disbio.io/código` no site publicado; ao abrir, o app busca o conteúdo,
  monta o card e mantém o caminho, sem reescrever para o hash gigante. Se o
  serviço falhar, copia o link completo.
- Nome do link: um campo opcional “Link personalizado” reserva
  `rentry.co/disbio-<nome>` e publica o caminho `disbio.io/<nome>`. Antes de
  criar, o app consulta a página; se já existir, avisa e não gera conflito. O
  namespace `disbio-` evita colisões com páginas soltas do Rentry. O código de
  edição fica no `localStorage`; no mesmo navegador, copiar de novo com o mesmo
  nome atualiza o link existente via `api/edit`.
- Publicação: `netlify.toml`, `vercel.json` e `_redirects` reescrevem qualquer
  caminho para `index.html`; `CNAME.disbio-example` é o modelo para `disbio.io`;
  `404.html` (cópia do index, gerada por `build_404.py`) cobre o GitHub Pages;
  `serve.py` faz o fallback no desenvolvimento. `<base href="./">` mantém os
  assets no diretório do site, então funciona tanto em
  `usuario.github.io/repositorio/` quanto no domínio raiz.
- Nome do link: um campo opcional “Link personalizado” permite salvar no Rentry
  com um nome (por exemplo, `#k=meu-card`). O Rentry guarda uma página pequena
  com o código do mclo.gs, então o nome funciona mesmo com fotos em alta
  resolução; se o nome estiver ocupado ou o serviço recusar, cai para um código
  curto.
- Fundo animado: canvas com Papel, Aurora, Ondas, Bolhas, Batida, Estrelas,
  Grade, Névoa, Chuva, Vórtice, Confete, Buraco negro, Riso, Mármore, Vitral e
  Blueprint. Todos têm movimento contínuo; Estrelas piscam, têm estrelas
  cadentes e constelações, a Névoa se deforma e troca de cor, a Chuva cai, o
  Vórtice gira, o Confete cai girando, o Buraco negro gira com disco de poeira,
  o Riso imprime meio-tons, o Mármore mistura tinta, o Vitral acende uma rosácea
  e o Blueprint desenha uma prancha técnica. O modo reagir usa a posição real do
  player (e o BPM quando o SoundCloud informa) para pulsar o fundo, o halo, o
  equalizador e a barra; a Batida tem um equalizador circular e todos os fundos
  recebem anéis de pulso. O desenho acompanha o mouse.
- Imagem de fundo: upload local, compressão para WebP/JPEG (até 1500 px) e
  camada fixa com véu para manter o texto legível.
- Fotos flutuantes: upload ou URL, até 5 por card, duas versões de compressão:
  prévia de até 480 px (~35 KB) no hash normal e HD de até 1800 px (~300 KB) no
  link curto. O editor guarda a HD no `localStorage` para sobreviver ao reload.
  Moldura de polaroide com fita, legenda individual, posição em slots ao redor
  do card (alguns abaixo), arrastáveis (posição em `x`/`y` do `ph`) e lightbox
  ao clicar (até 1100 px de largura e 82% da altura, usando a HD). Ficam atrás
  do card por padrão; a opção “na frente” de cada foto ativa `f=1`. A opção
  “Foto inteira” ativa `t=1`, mostra a imagem toda sem o recorte 4:5 e deixa o
  polaroide maior. Ao arrastar, sobem para a frente temporariamente e, ao soltar,
  ganham inércia com atrito e quique nas bordas. Ficam balançando com
  durações/fases diferentes. Não alteram o banner do Discord nem entram no PNG.
- Tema: claro, escuro, cor personalizada, gradientes Pôr do sol/Oceano/Neon/
  Menta e gradiente personalizado com duas cores e ângulo. O texto claro/escuro
  é calculado pela luminância da cor (ou da média do gradiente).
- Detalhes: pronomes no @, localização com pin e sugestões, e bio de até 160
  caracteres.
- Começo da música: campo `mm:ss`; aplicado no primeiro play (seek no SoundCloud,
  Spotify e YouTube, `currentTime` na prévia). O player tenta o seek depois que
  começa, com retry por alguns segundos. Se o ponto ficar a menos de 2s do fim,
  avisa e começa do início.
- Autoplay opcional: quando ligado, tenta tocar ao carregar a faixa (inclusive
  no link compartilhado). O navegador pode bloquear até um clique; nesse caso o
  card mostra “Toque para ouvir” e o primeiro toque na página libera o som.
- Redes no card: pílulas com ícone, @ e seta de link externo.
- Modo apresentação: o botão “Copiar link” gera um link curto `#k=...` com
  `v=card`; a página mostra só o card centralizado e uma CTA “Criar o seu”, sem
  formulário nem landing. O `#k=` permanece na barra de endereço. O campo “Link
  personalizado” permite escolher o nome depois de `#k=`.
- Download em PNG desenhado em canvas a 2x, sem dependências.

## Decisões que ficam com o builder
- O autoplay é opcional e best-effort: o navegador pode exigir um clique antes de
  liberar som, principalmente no link compartilhado.
- O card não inclui o player na imagem exportada, apenas a barra, a capa, o
  progresso e a linha de redes.
- As redes são autodeclaradas; não há verificação de posse do perfil.
- A reação do fundo é um pulso visual calculado com a posição do player e o BPM
  quando disponível, não um analisador de áudio real: o áudio do SoundCloud e do
  Spotify fica em iframe de outro domínio e não é acessível para FFT.
- A busca por nome usa faixas públicas do SoundCloud e tenta versões completas
  alternativas. Se o Jina Reader, o SoundCloud ou o widget falharem, tenta o
  YouTube via Piped; se nenhum tiver a música, o iTunes toca 30s. Links do
  Spotify continuam disponíveis; prévias de 30s são trocadas pela versão
  completa no YouTube.
- O tema personalizado escolhe texto claro/escuro pela luminância; gradientes
  com cores muito claras e muito escuras ao mesmo tempo podem reduzir contraste
  em uma das pontas.
- A foto flutuante fica atrás do card por padrão para não cobrir o perfil; a
  opção “na frente” e o arrasto ficam a critério da pessoa. Com 3 ou mais fotos,
  elas ficam um pouco menores para caber ao redor do card.
- O link curto depende de um serviço público de texto e do site estar acessível
  no mesmo endereço (no Live Server, `127.0.0.1:5500`). O conteúdo salvo é
  público; não use para dados secretos. Se o serviço falhar, o link completo
  continua funcionando.
- O PNG não inclui o fundo animado, a imagem de fundo, a foto flutuante nem o
  tema da página; inclui os detalhes.
- A JAPI pode limitar requisições; o cliente guarda cache em memória por 5 min.
