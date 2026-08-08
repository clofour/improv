import Image from "next/image";
import Panel from "@/components/panel";
import { Button } from "@/components/ui/button";
import { ProjectData } from "../data";

export default function Proj({
	id,
	name,
	description,
	image,
	url,
	demo,
	logs,
}: ProjectData) {
	return <p>Proj</p>;
}
