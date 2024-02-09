import { useState } from "react";
import { Check, Copy } from "lucide-react";

const CopyButton = ({ downloadURL }: { downloadURL: string }) => {
  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    navigator.clipboard.writeText(downloadURL);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
      <div onClick={onCopy}>
      {copied ? <Check className="h-4 w-4 cursor-pointer text-green-500" /> : <Copy className="h-4 w-4 cursor-pointer" />}
      </div>
  );
};

export default CopyButton;
