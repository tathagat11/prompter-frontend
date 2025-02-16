import ReactMarkdown from "react-markdown";

interface FinalResponseProps {
  response: string;
}

export default function FinalResponse({ response }: FinalResponseProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Final Response:</h2>
      <hr className="border-t border-gray-300 opacity-50" />
      <div className="prose prose-lg max-w-none">
        <ReactMarkdown>{response}</ReactMarkdown>
      </div>
    </div>
  );
}
