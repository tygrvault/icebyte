"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { DialogProps } from "@radix-ui/react-alert-dialog"
import { Laptop, Moon, SunMedium, Search as SearchIcon, File, Home, FileIcon, Users } from "lucide-react"
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { allArticles } from "contentlayer/generated"

interface SearchType extends DialogProps {
  hideButton?: boolean
}

export function Search({ hideButton, ...props }: SearchType) {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const { setTheme } = useTheme()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey) && hideButton) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [hideButton]);

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false)
    command()
  }, []);

  return (
    <>
    {!hideButton && (
      <Button
      theme="secondary"
      variant="shadow"
      className={cn(
        "relative h-9 w-full justify-start text-sm text-primary-500 sm:pr-12 max-w-xs md:max-w-60 lg:max-w-80"
      )}
      onClick={() => setOpen(true)}
      {...props}
    >
      <div className="flex flex-row items-center justify-start">
        <SearchIcon className="w-4 h-4 mr-2 shrink-0" />
        <span>Search...</span>
      </div>
    </Button>
    )}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Articles">
            {allArticles
              .map((article) => (
                <CommandItem
                  key={article._id}
                  onSelect={() => {
                    runCommand(() => router.push(article.slug))
                  }}
                >
                  <div className="flex items-center justify-center mr-2">
                    <File className="w-3 h-3" />
                  </div>
                  {article.title}
                </CommandItem>
              ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Pages" >
            <CommandItem onSelect={() => runCommand(() => router.push("/"))}>
              <Home className="w-4 h-4 mr-2" />
              Home
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/articles"))}>
              <FileIcon className="w-4 h-4 mr-2" />
              Articles
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/team"))}>
              <Users className="w-4 h-4 mr-2" />
              Team
            </CommandItem>

          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Theme" >
            <CommandItem onSelect={() => runCommand(() => setTheme("light"))}>
              <SunMedium className="w-4 h-4 mr-2" />
              Light
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme("dark"))}>
              <Moon className="w-4 h-4 mr-2" />
              Dark
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme("system"))}>
              <Laptop className="w-4 h-4 mr-2" />
              System
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
