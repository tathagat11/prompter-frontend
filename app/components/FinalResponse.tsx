interface FinalResponseProps {
  response: string
}

export default function FinalResponse({ response }: FinalResponseProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Final Response:</h2>
      <p className="whitespace-pre-wrap">{response}</p>
    </div>
  )
}

