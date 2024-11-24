'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface DiscoOverlayProps {
    isPlaying: boolean
}

export function DiscoOverlay({ isPlaying }: DiscoOverlayProps) {
    const [beats, setBeats] = useState<number[]>([])

    useEffect(() => {
        if (isPlaying) {
            const interval = setInterval(() => {
                setBeats(prev => [...prev, Math.random()])
                if (beats.length > 20) {
                    setBeats(prev => prev.slice(1))
                }
            }, 500)
            return () => clearInterval(interval)
        }
    }, [isPlaying, beats])

    return (
        <div className="fixed inset-0 pointer-events-none z-10">
            {beats.map((beat, index) => (
                <motion.div
                    key={index}
                    className="absolute rounded-full bg-white mix-blend-overlay"
                    style={{
                        left: `${beat * 100}%`,
                        top: `${Math.random() * 100}%`,
                    }}
                    initial={{ scale: 0, opacity: 0.7 }}
                    animate={{ scale: 20, opacity: 0 }}
                    transition={{ duration: 2 }}
                />
            ))}
            <motion.div
                className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 mix-blend-overlay"
                animate={{
                    opacity: isPlaying ? [0, 0.1, 0] : 0,
                }}
                transition={{
                    duration: 1,
                    repeat: Infinity,
                    repeatType: 'reverse',
                }}
            />
        </div>
    )
}

