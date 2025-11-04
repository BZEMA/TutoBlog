import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppearance } from "@/hooks/use-appearance";
import { Monitor, Moon, Sun } from "lucide-react";

export default function AppearanceToggleDropdown() {
  const { appearance, setAppearance } = useAppearance(); // <- vérifie le vrai nom dans ton hook

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          {appearance === "dark" ? (
            <Moon className="h-5 w-5" />
          ) : appearance === "light" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Monitor className="h-5 w-5" />
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setAppearance("light")}>
          <Sun className="h-5 w-5" /> Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setAppearance("dark")}>
          <Moon className="h-5 w-5" /> Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setAppearance("system")}>
          <Monitor className="h-5 w-5" /> System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
