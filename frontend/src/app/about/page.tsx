"use client"

import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Database,
  BarChart3,
  Target,
  Zap,
  Trophy,
  Code,
  Globe,
  Heart,
  ExternalLink,
  TrendingUp,
  Smartphone,
} from "lucide-react"

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Project Overview */}
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          About
        </h1>
        <p className="text-muted-foreground text-xl leading-relaxed">
            StatPitch is a modern cricket analytics platform built for enthusiasts, analysts, and fans who want more than surface-level numbers. 
            Unlike traditional scorecards, it dives deep into the game with insightful, context-rich statistics that highlight a player’s true impact. 
            From boundary concession rates and consistency filters to matchup-specific data across T20 formats, 
            StatPitch focuses on metrics often overlooked by conventional tools. Whether you're scouting talent, analyzing trends, 
            or simply exploring the game from a new angle, StatPitch delivers a fresh analytical perspective — without the clutter of complex visualizations.
        </p>
      </div>

      {/* Data Source */}
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold flex items-center gap-2">
          <Database className="w-5 h-5" />
          Data Source
        </h1>
        <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-start gap-3">
            <Globe className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="space-y-2">
              <h2 className="font-medium text-blue-900 dark:text-blue-100">Cricsheet</h2>
              <p className="text-sm text-blue-800 dark:text-blue-200">
                All match data sourced from <strong>Cricsheet</strong> - a comprehensive repository of cricket match
                data providing detailed ball-by-ball information for international and domestic cricket.
              </p>
              <a
                href="https://cricsheet.org"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                Visit Cricsheet.org <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
