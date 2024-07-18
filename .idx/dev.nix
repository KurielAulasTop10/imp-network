{ pkgs, ... }: {

  idx.previews = {
    enable = true;
    previews = {
      # The following object sets web previews
      web = {
        command = [
          "npm"
          "run"
          "dev"
          "--"
          "--port"
          "$PORT"
        ];
        manager = "web";
      };
    };
  };
}