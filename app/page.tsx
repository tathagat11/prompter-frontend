"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import ObjectiveForm from "./components/ObjectiveForm"
import InputVariables from "./components/InputVariables"
import FinalResponse from "./components/FinalResponse"
import { ThemeToggle } from "./components/ThemeToggle"

export default function Home() {
  const [step, setStep] = useState(1)
  const [objective, setObjective] = useState("")
  const [promptTemplate, setPromptTemplate] = useState("")
  const [inputVariables, setInputVariables] = useState<string[]>([])
  const [finalResponse, setFinalResponse] = useState("")

  const handleObjectiveSubmit = async (objective: string) => {
    setObjective(objective)
    // Call API to generate prompt template
    const response = await fetch("/api/generate-prompt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ objective }),
    })
    const data = await response.json()
    setPromptTemplate(data.promptTemplate)
    setInputVariables(data.inputVariables)
    setStep(2)
  }

  const handleInputVariablesSubmit = async (variables: Record<string, string>) => {
    // Call API to generate final response
    const response = await fetch("/api/generate-response", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ promptTemplate, variables }),
    })
    const data = await response.json()
    setFinalResponse(data.response)
    setStep(3)
  }

  const handleReset = () => {
    setStep(1)
    setObjective("")
    setPromptTemplate("")
    setInputVariables([])
    setFinalResponse("")
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-end mb-4">
        <ThemeToggle />
      </div>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Objective</CardTitle>
          <CardDescription>Provide the objective you want to generate a response for</CardDescription>
        </CardHeader>
        <CardContent>
          {step === 1 && <ObjectiveForm onSubmit={handleObjectiveSubmit} />}
          {step === 2 && <InputVariables variables={inputVariables} onSubmit={handleInputVariablesSubmit} />}
          {step === 3 && <FinalResponse response={finalResponse} />}
          {step === 3 && (
            <Button onClick={handleReset} className="mt-4">
              Start Over
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

