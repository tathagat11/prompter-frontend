"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import ObjectiveForm from "./components/ObjectiveForm"
import InputVariables from "./components/InputVariables"
import FinalResponse from "./components/FinalResponse"
import { ThemeToggle } from "./components/ThemeToggle"

const URL = process.env.NEXT_PUBLIC_BACKEND_URL
console.log(URL)

export default function Home() {
  const [step, setStep] = useState(1)
  const [objective, setObjective] = useState("")
  const [promptTemplate, setPromptTemplate] = useState("")
  const [inputVariables, setInputVariables] = useState<string[]>([])
  const [finalResponse, setFinalResponse] = useState("")

  const handleObjectiveSubmit = async (objective: string) => {
    setObjective(objective)
    const response = await fetch(URL + "/prompt-creator/invoke", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        "input": {
          "objective": objective
        }
      }),
    })
    const data = await response.json()
    console.log(data)
    setPromptTemplate(data.promptTemplate)
    setInputVariables(data.inputVariables)
    setStep(2)
  }

  const handleInputVariablesSubmit = async (variables: Record<string, string>) => {
    const response = await fetch(URL + "/generate-response/invoke", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ "input": { "promptTemplate": promptTemplate, "variables": variables } }),
    })
    const data = await response.json()
    console.log(data.llm_response)
    setFinalResponse(data.llm_response)
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
          <CardDescription>{objective}</CardDescription>
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