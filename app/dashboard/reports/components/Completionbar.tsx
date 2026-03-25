import { getCompletionColor } from "../utils";

type Props = { completion: number };

export function CompletionBar({ completion }: Props) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-2 w-full max-w-30 overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-out ${getCompletionColor(completion)}`}
          style={{ width: `${completion}%` }}
        />
      </div>
      <span className="w-9 text-[13px] font-bold text-slate-700">{completion}%</span>
    </div>
  );
}   