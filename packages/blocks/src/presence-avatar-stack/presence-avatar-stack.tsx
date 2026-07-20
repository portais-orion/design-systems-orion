"use client";

import {
	Avatar,
	AvatarFallback,
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
	cn,
} from "@portais-orion/ui";

/*
 * Extraído de components/presence/presence-avatars: pilha de avatares
 * sobrepostos com indicador "online" e tooltip. Generalizado sem
 * conhecimento de sockets/presença real-time — recebe a lista pronta.
 */
export type PresenceUser = {
	id: string;
	label: string;
	sublabel?: string;
	isSelf?: boolean;
};

export type PresenceAvatarStackProps = {
	users: PresenceUser[];
	countSuffix?: string;
	className?: string;
};

function initialsFor(label: string): string {
	return label
		.split(" ")
		.map((word) => word[0])
		.slice(0, 2)
		.join("")
		.toUpperCase();
}

/**
 * Pilha de avatares sobrepostos com indicador "online" e tooltip (nome +
 * sublabel, ex.: página atual). Não conhece sockets/presença real-time — só
 * renderiza a lista recebida via props.
 */
export function PresenceAvatarStack({
	users,
	countSuffix = "online",
	className,
}: PresenceAvatarStackProps) {
	if (users.length === 0) return null;

	return (
		<TooltipProvider>
			<div className={cn("flex items-center -space-x-2", className)}>
				{users.map((user) => (
					<Tooltip key={user.id}>
						<TooltipTrigger render={<span className="relative inline-block" />}>
							<Avatar
								className={cn(
									"size-8 border-2 border-background ring-2",
									user.isSelf ? "ring-primary/30" : "ring-transparent",
								)}
							>
								<AvatarFallback
									className={cn(
										"text-[10px] font-bold",
										user.isSelf
											? "bg-primary text-primary-foreground"
											: "bg-secondary text-secondary-foreground",
									)}
								>
									{initialsFor(user.label)}
								</AvatarFallback>
							</Avatar>
							<span className="absolute right-0 bottom-0 block size-2 rounded-full bg-emerald-500 ring-2 ring-background" />
						</TooltipTrigger>
						<TooltipContent side="bottom" className="text-xs">
							<p className="font-semibold">
								{user.label} {user.isSelf && "(Você)"}
							</p>
							{user.sublabel && <p className="text-[10px] opacity-70">{user.sublabel}</p>}
						</TooltipContent>
					</Tooltip>
				))}
				<span className="pl-4 text-[10px] font-medium text-muted-foreground">
					{users.length} {countSuffix}
				</span>
			</div>
		</TooltipProvider>
	);
}
