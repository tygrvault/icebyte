"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { DialogProps } from "@radix-ui/react-alert-dialog"
import { Laptop, Moon, SunMedium, Search as SearchIcon, File } from "lucide-react"
import { useTheme } from "next-themes"
import { allDocuments } from "contentlayer/generated"

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

export function Search({ ...props }: DialogProps) {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const { setTheme } = useTheme()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false)
    command()
  }, [])

  return (
    <>
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
          <SearchIcon className="mr-2 h-4 w-4 shrink-0" />
          <span>Search...</span>
        </div>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Articles">
            {allDocuments
              .map((doc) => (
                <CommandItem
                  key={doc._id}
                  onSelect={() => {
                    runCommand(() => router.push(doc.slug))
                  }}
                >
                  <div className="mr-2 flex items-center justify-center">
                    <File className="h-3 w-3" />
                  </div>
                  {doc.title}
                </CommandItem>
              ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Theme" >
            <CommandItem onSelect={() => runCommand(() => setTheme("light"))}>
              <SunMedium className="mr-2 h-4 w-4" />
              Light
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme("dark"))}>
              <Moon className="mr-2 h-4 w-4" />
              Dark
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme("system"))}>
              <Laptop className="mr-2 h-4 w-4" />
              System
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
