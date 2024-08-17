"use client";
import FullCalendar from "@fullcalendar/react";
import Link from "next/link";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { isMobile } from "react-device-detect";

export default function AboutPage() {
	return (
		<div className="flex flex-col gap-5 mt-5 px-3 font-light text-justify">
			<h1 className="text-4xl font-bold mb-2 flex gap-2 items-center justify-center text-red-600">
				GAMESCOM 2024
			</h1>
			<p className="text-2xl text-center">
				A Império Network não fornecerá a cobertura para este evento, porém
				auxiliará os jogadores a terem acesso ao evento de forma facilitada.
				Gamescom é o maior evento de games da Europa. Realizada em Colônia, na
				Alemanha, a feira de jogos mostra as novidades do gênero, sempre com um
				foco maior no público europeu.
			</p>
			<Link
				href="https://www.twitch.tv/gamescom"
				target="_blank"
				className="text-2xl text-center p-3 bg-red-600 text-white text-bold w-fit m-auto rounded-md"
			>
				Ver transmissões
			</Link>
			<p className="text-lg text-center -mt-3">De 20 a 25 de agosto.</p>
			<h2 className="text-2xl font-bold mb-2 flex gap-2 items-center justify-center text-red-600">
				CALENDÁRIO
			</h2>
			<p className="text-lg text-center -mt-4">
				Horários definidos de Brasília. O calendário não está completo, achamos
				melhor filtrar por apenas lives que seriam mostradas gameplays
				detalhadas, eSports e conferências com trailers mais relevantes.
			</p>
			<FullCalendar
				plugins={[dayGridPlugin, timeGridPlugin]}
				initialView={isMobile ? "timeGridDay" : "dayGridWeek"}
				weekends
				locale={"pt-br"}
				height={330}
				firstDay={1}
				eventTimeFormat={{
					hour: "2-digit",
					minute: "2-digit",
					meridiem: false,
				}}
				displayEventTime
				displayEventEnd
				initialDate={"2024-08-20"}
				validRange={{
					start: "2024-08-20",
					end: "2024-08-26",
				}}
				headerToolbar={{
					left: "",
					right: "",
					center: "",
				}}
				timeZone="America/Sao_Paulo"
				slotEventOverlap
				hiddenDays={[1]}
				events={[
					{
						title: "Abertura da Gamescom",
						start: "2024-08-20T15:00:00",
						end: "2024-08-20T17:00:00",
					},
					{
						title: "Dia 1 - Bethesda MainStream",
						start: "2024-08-21T09:00:00",
						end: "2024-08-21T13:00:00",
					},
					{
						title: "Ship Of Fools Live on Stage - Team17",
						start: "2024-08-21T09:00:00",
						end: "2024-08-21T10:10:00",
					},
					{
						title: "Xbox Broadcast Day 1",
						start: "2024-08-21T10:00:00",
						end: "2024-08-21T13:00:00",
					},
					{
						title: "Police Simulator: Patrol Officers Showcase",
						start: "2024-08-21T13:30:00",
						end: "2024-08-21T14:00:00",
					},
					{
						title: "Worms Showdown",
						start: "2024-08-22T07:00:00",
						end: "2024-08-22T07:30:00",
					},
					{
						title: "Bethesda MainStream Day 2",
						start: "2024-08-22T09:00:00",
						end: "2024-08-22T15:00:00",
					},
					{
						title: "Xbox Broadcast Day 2",
						start: "2024-08-22T10:00:00",
						end: "2024-08-22T13:00:00",
					},
					{
						title: "Amber Island Preview",
						start: "2024-08-22T12:00:00",
						end: "2024-08-22T13:00:00",
					},
					{
						title: "Warcana Showmatch",
						start: "2024-08-22T13:00:00",
						end: "2024-08-22T14:00:00",
					},
					{
						title: "Overcooked - Show",
						start: "2024-08-22T14:00:00",
						end: "2024-08-22T15:00:00",
					},
					{
						title: "Bisalina Speedruns",
						start: "2024-08-23T07:00:00",
						end: "2024-08-23T13:30:00",
					},
					{
						title: "Dredge: Iron Rig DLC Live",
						start: "2024-08-23T07:00:00",
						end: "2024-08-23T08:00:00",
					},
					{
						title: "Worms WMD Showmatch",
						start: "2024-08-23T08:00:00",
						end: "2024-08-23T09:00:00",
					},
					{
						title: "Bethesda MainStream Day 3",
						start: "2024-08-23T09:00:00",
						end: "2024-08-23T15:00:00",
					},
					{
						title: "Xbox Broadcast Day 3",
						start: "2024-08-23T10:00:00",
						end: "2024-08-23T12:00:00",
					},
					{
						title: "Railroads Online Showcase",
						start: "2024-08-23T10:15:00",
						end: "2024-08-23T10:45:00",
					},
					{
						title: "Construction Simulator Showcase",
						start: "2024-08-23T12:30:00",
						end: "2024-08-23T13:00:00",
					},
					{
						title: "Thalassa: Playthrough",
						start: "2024-08-23T14:00:00",
						end: "2024-08-23T15:00:00",
					},
					{
						title: "Ritual of Raven: Preview",
						start: "2024-08-24T07:00:00",
						end: "2024-08-24T08:00:00",
					},
					{
						title: "Bethesda MainStream Day 4",
						start: "2024-08-24T09:00:00",
						end: "2024-08-24T15:00:00",
					},
					{
						title: "Bethesda MainStream Day 5",
						start: "2024-08-25T09:00:00",
						end: "2024-08-25T15:00:00",
					},
					{
						title: "GametechUK Showcase",
						start: "2024-08-25T13:00:00",
						end: "2024-08-25T14:30:00",
					},
				]}
			/>
		</div>
	);
}
