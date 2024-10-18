'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { songs, fallbackSong } from '@/lib/songs'
import { playlistAuthorMap } from '@/lib/playlistMap'
import { idAndPhrasesMap } from '@/lib/idAndPhrasesMap'
import { Calendar } from "@/components/ui/calendar"
import { format, differenceInCalendarDays } from "date-fns"
import { Card, CardContent } from "@/components/ui/card"

type Song = {
    id: number;
    date?: string;
    trackId: string;
    playlistAuthor: string;
    songName: string;
    artist: string;
}

function LoveCounter({ currentDate }: { currentDate: Date }) {
    const startDate = new Date(songs[0].date);
    const daysPassed = differenceInCalendarDays(currentDate, startDate) + 1;

    return (
        <Card className="bg-white bg-opacity-80 shadow-lg w-full">
            <CardContent className="p-4">
                <motion.div
                    initial={{opacity: 0, y: -20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.5}}
                >
                    <h2 className="text-2xl font-bold text-pink-600">
                        {daysPassed < 1 ? "The journey hasn't started yet" : `Day ${daysPassed}`}
                    </h2>
                    <p className="text-sm text-gray-600">
                        {daysPassed < 1 ? "Stay tuned for our musical journey" : "of our musical journey"}
                    </p>
                </motion.div>
            </CardContent>
        </Card>
    )
}

function getPastelColor(seed: number) {
    const hue = (seed * 137.508) % 360;
    return `hsl(${hue}, 100%, 85%)`;
}

function getColorsForDate(date: Date) {
    const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
    return [
        getPastelColor(dayOfYear),
        getPastelColor(dayOfYear + 1),
        getPastelColor(dayOfYear + 2)
    ];
}

export default function Pipa() {
    const [currentSong, setCurrentSong] = useState<Song | null>(null)
    const [date, setDate] = useState<Date | undefined>(new Date())

    const currentUTCDate = new Date(new Date().toISOString().split('T')[0]);

    const availableDates = songs
        .map(song => new Date(song.date))
        .filter(songDate => songDate <= currentUTCDate);

    useEffect(() => {
        const selectedDate = date ? format(date, 'yyyy-MM-dd') : new Date().toISOString().split('T')[0]
        const selectedSong = songs.find(song => song.date === selectedDate)
        setCurrentSong(selectedSong || fallbackSong)
    }, [date])

    const backgroundColors = useMemo(() => {
        return getColorsForDate(date || currentUTCDate);
    }, [date, currentUTCDate]);

    const getDisplayName = (author: string) => {
        return playlistAuthorMap[author] || author;
    };

    const getDisplayQuoteOfTheDay = (dayId: number) => {
        return idAndPhrasesMap[dayId] || "Enjoy Taylor Swift!";
    };

    return (
        <div
            className="min-h-screen flex flex-col items-center justify-start p-4 space-y-4 relative overflow-y-auto"
            style={{
                background: `linear-gradient(120deg, ${backgroundColors[0]} 25%, ${backgroundColors[1]} 50%, ${backgroundColors[2]} 75%)`,
                backgroundBlendMode: 'multiply',
            }}
        >
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-white via-transparent to-gray-100 opacity-70"/>
            <div
                className="absolute inset-0 z-0"
                style={{
                    background: `radial-gradient(circle at 30% 40%, ${backgroundColors[0]}, transparent 70%), 
                                radial-gradient(circle at 70% 60%, ${backgroundColors[1]}, transparent 70%),
                                radial-gradient(circle at 50% 80%, ${backgroundColors[2]}, transparent 70%)`,
                }}
            />
            <div className="w-full max-w-4xl flex flex-col items-center space-y-4 relative z-10">
                <LoveCounter currentDate={date || currentUTCDate}/>

                <Card
                    className="w-full bg-gradient-to-br from-gray-800 to-gray-900 shadow-lg rounded-lg overflow-hidden">
                    <CardContent className="p-0 flex flex-col">
                        {currentSong && (
                            <>
                                {/* Ensure responsiveness and spacing around the iframe */}
                                <div className="relative w-full pb-[56.25%] h-0 rounded-lg overflow-hidden">
                                    <iframe
                                        src={`https://open.spotify.com/embed/track/${currentSong.trackId}`}
                                        width="100%"
                                        height="100%"
                                        allow="encrypted-media"
                                        loading="lazy"
                                        title="Spotify Embed"
                                        className="absolute inset-0 w-full h-full rounded-lg"
                                        style={{border: "none"}}
                                    ></iframe>
                                </div>

                                {/* Add padding and refine text styles */}
                                <div className="bg-gray-900 text-white p-4">
                                    <h2 className="text-2xl font-extrabold tracking-wide">
                                        {getDisplayName(currentSong.playlistAuthor)}
                                    </h2>
                                    <p className="text-md text-gray-400 mt-2">
                                        {getDisplayQuoteOfTheDay(currentSong.id)}
                                    </p>
                                </div>
                            </>
                        )}
                    </CardContent>
                </Card>

                <Card className="w-full bg-white shadow-lg">
                    <CardContent className="p-4">
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            className="rounded-md border"
                            disabled={(date) => !availableDates.some(availableDate =>
                                availableDate.getFullYear() === date.getFullYear() &&
                                availableDate.getMonth() === date.getMonth() &&
                                availableDate.getDate() === date.getDate()
                            ) || date > currentUTCDate}
                        />
                    </CardContent>
                </Card>
            </div>

            <div
                className="absolute inset-0 opacity-50 z-0"
                style={{
                    background: `linear-gradient(to bottom, transparent, ${backgroundColors[2]}), 
                                 radial-gradient(circle at 60% 20%, ${backgroundColors[0]}, transparent 80%)`,
                }}
            />
        </div>
    )
}