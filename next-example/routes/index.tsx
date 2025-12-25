import { LucideIcon } from "lucide-react";
import { ReactElement } from "react";

interface IRoute {
	href?: string;
	title: string;
	description?: string;
	icon?: ReactElement | LucideIcon;
	children?: IRoute[];
}
