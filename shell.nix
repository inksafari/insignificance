with import <nixpkgs-unstable> { };

let
  # define packages to install with special handling for macOS
  basePackages = [
    git
    nodejs-14_x
    nodePackages.pnpm
  ];

  inputs = basePackages
    ++ lib.optionals stdenv.isLinux inotify-tools
    ++ lib.optionals stdenv.isDarwin
    (with darwin.apple_sdk.frameworks; [ CoreFoundation CoreServices ]);

  # define shell startup command
  hooks = ''
    export PATH=${toString ./.}/node_modules/.bin:$PATH
  '';
in
mkShell {
  buildInputs = inputs;
  shellHook = hooks;
}
# https://github.com/happysalada/svelte.megzari.com/blob/master/shell.nix
# https://github.com/macalinao/ian.pw
# https://dev.to/__pandaman64__/nix-next-js-3171
# https://rgoswami.me/posts/nix-shell-node/