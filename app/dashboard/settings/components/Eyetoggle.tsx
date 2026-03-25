import { Eye, EyeOff } from "lucide-react";

type Props = { visible: boolean; onToggle: () => void };

export function EyeToggle({ visible, onToggle }: Props) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="text-slate-400 transition-colors hover:text-slate-600"
    >
      {visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
    </button>
  );
}