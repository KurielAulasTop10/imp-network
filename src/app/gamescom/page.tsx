import { SchedulerProvider } from "@/providers/schedular-provider";
import { cdn } from "@/utils/cdn";
import type { Metadata } from "next";
import Link from "next/link";
import SchedulerWrapper from "./_components/wrapper/schedular-wrapper";
import { Scheduler } from "@bitnoi.se/react-scheduler";

export const metadata: Metadata = {
    title: "Evento Gamescom 2025",
    description:
        "Página dedicada ao evento da Gamescom possuindo informações como parceiros, datas e todos os eventos, como também pequenos resumos do que se trata.",
    twitter: {
        title: "Evento Gamescom 2025",
        description:
            "Página dedicada ao evento da Gamescom possuindo informações como parceiros, datas e todos os eventos, como também pequenos resumos do que se trata.",
    },
};

export default async function GamescomPage() {
    return (
        <div className="min-h-screen bg-linear-to-b text-white">
            <div className="mx-auto px-2 py-16">
                <div className="flex flex-col items-center justify-center md:flex-row gap-12">
                    <div className="relative w-full max-w-sm">
                        <img
                            src={cdn("https://i.ibb.co/BHmqTsZY/x-gamescom-2022-logo-negativ.png", 0, 250)}
                            alt="Gamescom Logo"
                            className="w-xs md:w-full md:h-auto h-3xs transform hover:scale-105 mx-auto transition-transform duration-300"
                        />
                    </div>

                    <div className="flex-col hover:scale-105 transform transition-transform duration-300">
                        <div className="text-center mb-12">
                            <h1 className="text-6xl font-extrabold mb-4 tracking-wide text-white">
                                Gamescom 2025
                            </h1>
                            <p className="text-2xl font-light text-gray-200 max-w-3xl mx-auto">
                                A Gamescom é uma das maiores feiras de jogos. Esta terá lugar em Cologne e tem diversas áreas, parceiros e jogos novos a apresentar. Não esquecendo ainda das variadas conferências que serão possíveis ver. Com a Opening Night Live começando em 19 de Agosto.
                            </p>
                            <Link
                                href="https://www.gamescom.global/en"
                                target="_blank"
                                className="bg-red-600 hover:bg-red-800 p-3 rounded-xl text-xl font-bold text-center text-white block mt-5"
                            >
                                Mais informações
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col mx-auto mt-5 md:mt-20 gap-8">
                    <h2 className="text-4xl font-semibold text-center tracking-wide text-white">
                        Prepare-se entre 18 a 24 de Agosto.
                    </h2>
                    <iframe
                        src="https://www.youtube.com/embed/SKHL2qbqkSA?si=kVxz6wUQprzdM0vx"
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        className="mx-auto rounded-md w-full md:w-2/4 aspect-video"
                        allowFullScreen
                    />
                    <h2 className="text-4xl font-semibold text-center tracking-wide text-white">
                        Parceiros
                    </h2>
                    <h2 className="text-4xl font-semibold text-center tracking-wide text-white">
                        Calendário de eventos
                    </h2>
                    <iframe src="https://calendar.google.com/calendar/embed?wkst=2&ctz=America%2FSao_Paulo&showPrint=0&mode=WEEK&showTabs=0&showNav=0&hl=pt_BR&showCalendars=0&showDate=0&showTitle=0&src=ZW4uY2hyaXN0aWFuI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%23a79b8e" className="border-0 w-full md:w-2/4 mx-auto h-[500px] md:h-[800px] rounded-md"></iframe>
                </div>
            </div>
        </div>
    );
}
