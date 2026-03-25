import { getStatusLabel, getStatusStyle } from "../utils";

type Props = { completion: number };

export function StatusBadge({ completion }: Props) {
  const { badge, dot } = getStatusStyle(completion);

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold transition-colors ${badge}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {getStatusLabel(completion)}
    </span>
  );
}
