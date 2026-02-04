import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function AboutDialog() {
  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button variant="ghost" size="icon-sm" aria-label="About">
            <Info className="size-4" />
          </Button>
        }
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Frosted Glass Generator</DialogTitle>
          <DialogDescription>
            A tool for generating CSS glassmorphism effects using SVG
            feTurbulence noise. Create beautiful frosted glass UI elements with
            customizable blur, noise, and transparency settings.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3">
          <div className="text-sm text-muted-foreground">
            Created by{" "}
            <span className="font-medium text-foreground">@ephemeralMocha</span>
          </div>

          <div className="flex gap-2">
            <Button
              variant="link"
              size="sm"
              nativeButton={false}
              render={
                <a
                  href="https://x.com/ephemeralMocha"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @ephemeralMocha
                </a>
              }
            ></Button>

            <Button
              variant="link"
              size="sm"
              nativeButton={false}
              render={
                <a
                  href="https://github.com/sunya9/frosted-glass-generator"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Repository
                </a>
              }
            ></Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
