#!/bin/sh
set -eu

RELEASES="https://github.com/bewayio/homebrew-bcode/releases/latest/download"
APP_NAME="Cortex.app"

info() { printf '%s\n' "$1"; }
err() { printf '%s\n' "$1" >&2; }
die() { err "$1"; exit 1; }

OS="$(uname -s)"
ARCH="$(uname -m)"
ASSET=""
PLATFORM=""

case "$OS" in
  Darwin)
    PLATFORM="macos"
    ;;
  Linux)
    case "$ARCH" in
      x86_64|amd64) PLATFORM="linux" ;;
      *) die "Cortex não oferece instalação automática para Linux/$ARCH." ;;
    esac
    ;;
  MINGW*|MSYS*|CYGWIN*)
    die "No PowerShell do Windows, execute: irm https://freeskills.github.io/cortex.ps1 | iex"
    ;;
  *) die "Sistema não suportado: $OS. Consulte os arquivos em $RELEASES." ;;
esac

command -v curl >/dev/null 2>&1 || die "Instale curl e tente novamente."
TMP_DIR="$(mktemp -d)" || die "Não foi possível criar uma pasta temporária."
cleanup() { rm -rf "$TMP_DIR"; }
trap cleanup EXIT HUP INT TERM

CHECKSUMS="$TMP_DIR/checksums.txt"
curl -fsSL "$RELEASES/checksums.txt" -o "$CHECKSUMS" \
  || die "Não foi possível obter a lista de checksums em $RELEASES."

case "$PLATFORM" in
  linux)
    ASSET="cortex-linux-x86_64.AppImage"
    ;;
  macos)
    ASSET="cortex-macos-universal.zip"
    ;;
esac

sha256_of() {
  if command -v sha256sum >/dev/null 2>&1; then
    sha256sum "$1" | awk '{print $1}'
  elif command -v shasum >/dev/null 2>&1; then
    shasum -a 256 "$1" | awk '{print $1}'
  else
    die "sha256sum ou shasum é necessário para validar o download."
  fi
}

checksum_matches() {
  # $1 = asset file name (as it appears in checksums.txt), $2 = downloaded
  # path. Non-fatal — returns failure instead of exiting, so callers that
  # treat a mismatch as optional (the icon download below) can fall back
  # instead of aborting the whole install.
  expected="$(awk -v name="$1" '$2 == name { print $1; exit }' "$CHECKSUMS")"
  [ -n "$expected" ] || return 1
  actual="$(sha256_of "$2")"
  [ "$actual" = "$expected" ]
}

verify_checksum() {
  # Fatal variant — used for the main asset, where a mismatch must abort.
  checksum_matches "$1" "$2" || die "Checksum inválido (ou ausente) para $1; instalação cancelada."
}

ASSET_PATH="$TMP_DIR/$ASSET"
info "Baixando $ASSET..."
curl -fsSL "$RELEASES/$ASSET" -o "$ASSET_PATH" \
  || die "Falha ao baixar $RELEASES/$ASSET."
verify_checksum "$ASSET" "$ASSET_PATH"

case "$PLATFORM" in
  linux)
    DEST_DIR="$HOME/.local/bin"
    mkdir -p "$DEST_DIR" || die "Não foi possível criar $DEST_DIR."
    chmod +x "$ASSET_PATH"
    mv -f "$ASSET_PATH" "$DEST_DIR/cortex" || die "Falha ao instalar Cortex em $DEST_DIR."
    info "Executável instalado em $DEST_DIR/cortex"

    case ":${PATH:-}:" in
      *":$DEST_DIR:"*) ;;
      *)
        PROFILE="$HOME/.profile"
        mkdir -p "$(dirname "$PROFILE")" 2>/dev/null || true
        touch "$PROFILE" 2>/dev/null || true
        if [ -w "$PROFILE" ] && ! grep -qF "$DEST_DIR" "$PROFILE"; then
          printf '\n# Added by the Cortex installer\nexport PATH="%s:$PATH"\n' "$DEST_DIR" >> "$PROFILE"
          info "PATH atualizado em $PROFILE; abra um novo terminal."
        else
          info "Adicione $DEST_DIR ao PATH para executar cortex no terminal."
        fi
        ;;
    esac

    # Baixa o ícone de verdade e instala no tema de ícones do usuário — sem
    # isso o .desktop caía num ícone genérico (parecia uma engrenagem),
    # já que "Icon=" por nome exige um arquivo com esse nome em algum tema
    # de ícones instalado, não resolve sozinho pra nada.
    ICON_NAME="cortex-icon.png"
    ICON_PATH="$TMP_DIR/$ICON_NAME"
    ICON_DIR="$HOME/.local/share/icons/hicolor/512x512/apps"
    if curl -fsSL "$RELEASES/$ICON_NAME" -o "$ICON_PATH" 2>/dev/null \
      && checksum_matches "$ICON_NAME" "$ICON_PATH" \
      && mkdir -p "$ICON_DIR" 2>/dev/null; then
      cp -f "$ICON_PATH" "$ICON_DIR/cortex.png"
      command -v gtk-update-icon-cache >/dev/null 2>&1 \
        && gtk-update-icon-cache -f -t "$HOME/.local/share/icons/hicolor" 2>/dev/null || true
      DESKTOP_ICON="cortex"
    else
      info "Não foi possível baixar o ícone; o launcher vai usar um ícone genérico."
      DESKTOP_ICON="application-x-executable"
    fi

    DESKTOP_DIR="$HOME/.local/share/applications"
    if mkdir -p "$DESKTOP_DIR" 2>/dev/null; then
      cat > "$DESKTOP_DIR/cortex.desktop" <<DESKTOP
[Desktop Entry]
Type=Application
Name=Cortex
Exec=$DEST_DIR/cortex
Icon=$DESKTOP_ICON
Categories=Development;
Terminal=false
# A janela do Cortex roda dentro do AppImage sob o processo de setup de
# ambiente do linuxdeploy-plugin-gtk, cujo nome fixo é o WM_CLASS real que o
# GNOME enxerga (Wails chama g_set_prgname() tarde demais pra sobrescrever
# isso) — sem isto, a barra de apps/alt-tab cai num ícone genérico mesmo com
# Icon= correto acima. Confirmado com xprop, 2026-10-18.
StartupWMClass=AppRun.wrapped
DESKTOP
      command -v update-desktop-database >/dev/null 2>&1 \
        && update-desktop-database "$DESKTOP_DIR" 2>/dev/null || true
    fi
    ;;
  macos)
    command -v unzip >/dev/null 2>&1 || die "Instale unzip e tente novamente."
    unzip -q "$ASSET_PATH" -d "$TMP_DIR" || die "Não foi possível extrair $ASSET."
    SOURCE_APP=""
    for app in "$TMP_DIR"/*.app; do
      if [ -d "$app" ]; then SOURCE_APP="$app"; break; fi
    done
    [ -n "$SOURCE_APP" ] || die "O pacote não contém um aplicativo .app."

    APPS_DIR="/Applications"
    if [ ! -w "$APPS_DIR" ]; then APPS_DIR="$HOME/Applications"; fi
    mkdir -p "$APPS_DIR" || die "Não foi possível criar $APPS_DIR."
    rm -rf "$APPS_DIR/$APP_NAME"
    mv "$SOURCE_APP" "$APPS_DIR/$APP_NAME" || die "Falha ao instalar Cortex em $APPS_DIR."
    xattr -rd com.apple.quarantine "$APPS_DIR/$APP_NAME" 2>/dev/null || true
    info "Aplicativo instalado em $APPS_DIR/$APP_NAME"
    ;;
esac

info "Instalação do Cortex concluída."