import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { RadioIcon } from "lucide-react";

interface LiveBadgeProps {
	className?: string;
	label?: string;
}

export function LiveBadge({ className, label = "Live" }: LiveBadgeProps) {
	return (
		<Badge
			variant="destructive"
			className={cn(
				"bg-destructive h-6 gap-1.5 border-black/10 px-2.5 font-semibold text-white uppercase shadow-sm dark:border-white/15",
				className,
			)}>
			<RadioIcon data-icon="inline-start" className="motion-safe:animate-pulse motion-reduce:animate-none" />
			<span>{label}</span>
		</Badge>
	);
}
