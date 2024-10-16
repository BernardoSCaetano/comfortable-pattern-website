'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function Home() {
    const [pattern, setPattern] = useState('')

    useEffect(() => {
        const patterns = [
            'radial-gradient(circle, hsl(var(--primary)) 10%, transparent 11%)',
            'linear-gradient(45deg, hsl(var(--primary)) 25%, transparent 25%, transparent 75%, hsl(var(--primary)) 75%, hsl(var(--primary)))',
            'linear-gradient(to right, hsl(var(--primary)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--primary)) 1px, transparent 1px)',
        ]
        setPattern(patterns[Math.floor(Math.random() * patterns.length)])
    }, [])

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-secondary">
            <Card className="w-72 h-72 rounded-full shadow-lg transition-all duration-1000 ease-in-out hover:scale-110 flex items-center justify-center">
                <div
                    className="w-64 h-64 rounded-full"
                    style={{
                        backgroundImage: pattern,
                        backgroundSize: '20px 20px',
                    }}
                />
            </Card>
            <h1 className="mt-8 text-4xl font-light text-primary">Comfortable Pattern</h1>
            <p className="mt-4 text-xl text-muted-foreground">A landing page to nowhere</p>
            <Button
                className="mt-8"
                variant="outline"
                onClick={() => setPattern(prev => {
                    const patterns = [
                        'radial-gradient(circle, hsl(var(--primary)) 10%, transparent 11%)',
                        'linear-gradient(45deg, hsl(var(--primary)) 25%, transparent 25%, transparent 75%, hsl(var(--primary)) 75%, hsl(var(--primary)))',
                        'linear-gradient(to right, hsl(var(--primary)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--primary)) 1px, transparent 1px)',
                    ]
                    let newPattern
                    do {
                        newPattern = patterns[Math.floor(Math.random() * patterns.length)]
                    } while (newPattern === prev)
                    return newPattern
                })}
            >
                Change Pattern
            </Button>
        </div>
    )
}