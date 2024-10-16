'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { songs, fallbackSong } from '@/lib/songs'
import { Calendar } from "@/components/ui/calendar"
import { format, differenceInCalendarDays } from "date-fns"
import { Card, CardContent } from "@/components/ui/card"

type Song = {
    id: number;
    trackId: string;
    name: string;
    phrase: string;
    date?: string;
}

function LoveCounter({ currentDate }: { currentDate: Date }) {
    const startDate = new Date(songs[0].date);
    const daysPassed = differenceInCalendarDays(currentDate, startDate) + 1;

    return (
        <Card className="bg-white bg-opacity-80 shadow-lg">
            <CardContent className="p-4">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-2xl font-bold text-pink-600">Day {daysPassed}</h2>
                    <p className="text-sm text-gray-600">of our musical journey</p>
                </motion.div>
                <motion.div
                    className="absolute -top-2 -right-2 w-6 h-6 bg-pink-400 rounded-full"
                    animate={{
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: "reverse"
                    }}
                />
            </CardContent>
        </Card>
    )
}

export default function Pipa() {
    const [currentSong, setCurrentSong] = useState<Song | null>(null)
    const [date, setDate] = useState<Date | undefined>(new Date())

    // Get the current UTC date
    const currentUTCDate = new Date(new Date().toISOString().split('T')[0]);

    // Filter available dates to only include dates before or equal to today (in UTC)
    const availableDates = songs
        .map(song => new Date(song.date))
        .filter(songDate => songDate <= currentUTCDate);

    useEffect(() => {
        const selectedDate = date ? format(date, 'yyyy-MM-dd') : new Date().toISOString().split('T')[0]
        const selectedSong = songs.find(song => song.date === selectedDate)
        setCurrentSong(selectedSong || fallbackSong)
    }, [date])

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-200 to-green-200 p-4">
            <div className="w-full max-w-4xl flex flex-col items-center space-y-4">
                <LoveCounter currentDate={date || currentUTCDate} />
                <div className="w-full flex flex-col md:flex-row items-center md:items-start justify-center space-y-4 md:space-y-0 md:space-x-8">
                    <Card className="w-full md:w-96 h-96 bg-gradient-to-br from-gray-800 to-gray-900 shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 duration-300">
                        <CardContent className="p-0 h-full flex flex-col">
                            {currentSong && (
                                <>
                                    <div className="flex-grow relative">
                                        {/* Add some padding around the iframe for breathing space */}
                                        <div className="w-full h-full p-2 bg-gray-900 rounded-lg">
                                            <iframe
                                                src={`https://open.spotify.com/embed/track/${currentSong.trackId}`}
                                                width="100%"
                                                height="100%"
                                                allow="encrypted-media"
                                                loading="lazy"
                                                className="rounded-lg"
                                            ></iframe>
                                        </div>
                                    </div>
                                    <div className="bg-gray-900 text-white p-4">
                                        <h2 className="text-2xl font-extrabold tracking-wide">
                                            {currentSong.name}
                                        </h2>
                                        <p className="text-md text-gray-400 mt-2">
                                            {currentSong.phrase}
                                        </p>
                                    </div>
                                </>
                            )}
                        </CardContent>
                    </Card>

                    <Card className="w-full md:w-auto bg-white shadow-lg">
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
                                ) || date > currentUTCDate} // Disable future dates
                            />
                        </CardContent>
                    </Card>
                </div>
            </div>
            <PastelEffects />
        </div>
    )
}

function PastelEffects() {
    return (
        <>
            <motion.div
                className="fixed top-10 left-10 w-32 h-32 rounded-full bg-pink-300 opacity-50"
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360],
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    repeatType: "reverse"
                }}
            />
            <motion.div
                className="fixed bottom-10 right-10 w-40 h-40 rounded-full bg-yellow-300 opacity-50"
                animate={{
                    scale: [1, 1.3, 1],
                    x: [0, 50, 0],
                }}
                transition={{
                    duration: 7,
                    repeat: Infinity,
                    repeatType: "reverse"
                }}
            />
            <motion.div
                className="fixed top-1/2 left-1/4 w-24 h-24 rounded-full bg-purple-300 opacity-50"
                animate={{
                    scale: [1, 1.1, 1],
                    y: [0, -30, 0],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse"
                }}
            />
        </>
    )
}