import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface InputVariablesProps {
  variables: string[]
  onSubmit: (variables: Record<string, string>) => void
}

export default function InputVariables({ variables, onSubmit }: InputVariablesProps) {
  const [values, setValues] = useState<Record<string, string>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(values)
  }

  const handleInputChange = (variable: string, value: string) => {
    setValues((prev) => ({ ...prev, [variable]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {variables.map((variable) => (
        <div key={variable}>
          <Label htmlFor={variable}>{variable}:</Label>
          <Input
            id={variable}
            value={values[variable] || ""}
            onChange={(e) => handleInputChange(variable, e.target.value)}
            required
          />
        </div>
      ))}
      <Button type="submit">Generate Response</Button>
    </form>
  )
}

