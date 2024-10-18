'use client'

import { useState, useEffect } from 'react'
import { songs, fallbackSong } from '@/lib/songs'
import { playlistAuthorMap } from '@/lib/playlistMap'
import { idAndPhrasesMap } from '@/lib/idAndPhrasesMap'
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

type Song = {
    id: number;
    date?: string;
    trackId: string;
    playlistAuthor: string;
    songName: string;
    artist: string;
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

export default function SongPlaylist() {
    const [currentDate, setCurrentDate] = useState<Date>(new Date())
    const [selectedAuthor, setSelectedAuthor] = useState<string>('')

    const backgroundColors = getColorsForDate(currentDate);

    const getDisplayName = (author: string) => {
        return playlistAuthorMap[author] || author;
    };

    const getDisplayQuoteOfTheDay = (dayId: number) => {
        return idAndPhrasesMap[dayId] || "Enjoy Taylor Swift!";
    };

    const playlistAuthors = Array.from(new Set(songs.map(song => song.playlistAuthor)));
    const defaultAuthor = playlistAuthors[0];

    useEffect(() => {
        setSelectedAuthor(defaultAuthor);
    }, [defaultAuthor]);

    const filteredSongs = songs.filter(song =>
        selectedAuthor ? song.playlistAuthor === selectedAuthor : true
    );

    return (
        <div
            className="h-full flex flex-col items-center justify-start p-4 relative overflow-hidden"
            style={{
                background: `linear-gradient(120deg, ${backgroundColors[0]} 25%, ${backgroundColors[1]} 50%, ${backgroundColors[2]} 75%)`,
                backgroundBlendMode: 'multiply',
            }}
        >
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-white via-transparent to-gray-100 opacity-70" />
            <div
                className="absolute inset-0 z-0"
                style={{
                    background: `radial-gradient(circle at 30% 40%, ${backgroundColors[0]}, transparent 70%), 
                                radial-gradient(circle at 70% 60%, ${backgroundColors[1]}, transparent 70%),
                                radial-gradient(circle at 50% 80%, ${backgroundColors[2]}, transparent 70%)`,
                }}
            />
            <div className="w-full max-w-6xl flex flex-col items-center space-y-8 relative z-10">
                <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4">
                    <Select
                        onValueChange={setSelectedAuthor}
                        defaultValue={playlistAuthors[0]}
                    >
                        <SelectTrigger
                            className="w-full md:w-[250px] p-4 border-2 border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                            style={{
                                fontSize: '1rem', // Adjust font size for mobile
                                backgroundColor: '#f0f8ff',
                            }}
                        >
                            <SelectValue placeholder="Select a playlist" />
                        </SelectTrigger>
                        <SelectContent>
                            {playlistAuthors.map(author => (
                                <SelectItem
                                    key={author}
                                    value={author}
                                    className="p-2 text-md hover:bg-blue-100"
                                >
                                    {getDisplayName(author)}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Responsive Table Wrapper */}
                <div className="w-full overflow-x-auto">
                    <Card className="w-full">
                        <CardContent className="p-4">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Playlist</TableHead>
                                        <TableHead>Song</TableHead>
                                        <TableHead>Artist</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredSongs.map(song => (
                                        <TableRow
                                            key={song.id}
                                            className="cursor-pointer"
                                            onClick={() => window.open(`https://open.spotify.com/track/${song.trackId}`, '_blank')}
                                        >
                                            <TableCell>{song.date}</TableCell>
                                            <TableCell>{getDisplayName(song.playlistAuthor)}</TableCell>
                                            <TableCell>{song.songName}</TableCell>
                                            <TableCell>{song.artist}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
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
