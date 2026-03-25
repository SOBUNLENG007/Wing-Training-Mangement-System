import { CheckCircle2, Clock, TrendingUp, BarChart3 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type Stats = {
  completed:      number;
  inProgress:     number;
  avgScore:       number;
  avgCompletion:  number;
};

type CardDef = {
  value: string;
  label: string;
  icon:  React.ElementType;
  bg:    string;
};

function buildCards(stats: Stats): CardDef[] {
  return [
    { value: String(stats.completed),          label: "Completed",       icon: CheckCircle2, bg: "bg-wtms-green"  },
    { value: String(stats.inProgress),         label: "In Progress",     icon: Clock,        bg: "bg-wtms-orange" },
    { value: `${Math.round(stats.avgScore)}%`, label: "Avg Score",       icon: TrendingUp,   bg: "bg-primary"     },
    { value: `${Math.round(stats.avgCompletion)}%`, label: "Avg Completion", icon: BarChart3, bg: "bg-wtms-teal"  },
  ];
}

type Props = { stats: Stats };

export function SummaryCards({ stats }: Props) {
  const cards = buildCards(stats);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map(({ value, label, icon: Icon, bg }) => (
        <Card key={label}>
          <CardContent className="flex items-center gap-4 p-5">
            <div className={`flex size-12 shrink-0 items-center justify-center rounded-xl ${bg}`}>
              <Icon className="size-6 text-card" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{value}</p>
              <p className="text-sm text-muted-foreground">{label}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}