# Frontend

## Cortex

- A página pública fica em `cortex/` e mantém o seletor de idioma pt-BR / en-US do site.
- A prévia do ambiente de trabalho é uma ilustração HTML/CSS, identificada como ilustrativa; não representa uma captura real do aplicativo.
- A apresentação usa o sistema tipográfico existente (Bricolage Grotesque, Source Sans 3 e IBM Plex Mono), com verde floresta, lima e coral como acentos.
- Recursos ficam em uma grade editorial sem cartões aninhados. O hero e a prévia se empilham em telas menores.
- O instalador oferece Linux x86_64, macOS e Windows PowerShell; no Windows, mantém instalação, PATH e registro no escopo do usuário, sem exigir administrador.
- O seletor de instalação detecta a plataforma pelo User-Agent Client Hints ou pelas propriedades tradicionais do navegador; a seleção continua manualmente alternável.
- O botão flutuante de doação usa texto localizado e aciona diretamente o checkout/overlay oficial do SDK PayPal; o CTA permanece desabilitado até o SDK ficar pronto.