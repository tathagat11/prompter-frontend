"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ObjectiveFormProps {
  onSubmit: (objective: string) => void
}

export default function ObjectiveForm({ onSubmit }: ObjectiveFormProps) {
  const [objective, setObjective] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(objective)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="objective">Enter your objective:</Label>
        <Input
          id="objective"
          value={objective}
          onChange={(e) => setObjective(e.target.value)}
          placeholder="e.g., Generate a marketing plan for a new product"
          required
        />
      </div>
      <Button type="submit">Generate Prompt</Button>
    </form>
  )
}

