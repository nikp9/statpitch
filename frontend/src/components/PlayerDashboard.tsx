"use client"
/* eslint-disable @next/next/no-img-element */
import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Target, Zap, Trophy, Users, Info } from "lucide-react"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  player: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  batting: any[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  bowling: any[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  teamStat: any[]
}

export default function PlayerDashboard({ player, batting, bowling, teamStat }: Props) {
  
  const [selectedBattingCategory, setSelectedBattingCategory] = useState("Overall")
  const [selectedBowlingCategory, setSelectedBowlingCategory] = useState("Overall")

  const battingStats = batting.map((entry) => ({
    ...entry,
    category: entry.source,
  }))

  const bowlingStats = bowling.map((entry) => ({
    ...entry,
    category: entry.source,
  }))

  // Selected entries
  const selectedBattingStats = battingStats.find((b) => b.category === selectedBattingCategory)
  const selectedBowlingStats = bowlingStats.find((b) => b.category === selectedBowlingCategory)

  const bestBowlingPhase = useMemo(() => {
    if (!selectedBowlingStats) return "None";

    const phases = [
      {
        name: "Powerplay",
        pct: parseFloat(selectedBowlingStats.pp_pct),
        econ: parseFloat(selectedBowlingStats.pp_econ),
      },
      {
        name: "Middle",
        pct: parseFloat(selectedBowlingStats.mid_pct),
        econ: parseFloat(selectedBowlingStats.mid_econ),
      },
      {
        name: "Death",
        pct: parseFloat(selectedBowlingStats.death_pct),
        econ: parseFloat(selectedBowlingStats.death_econ),
      },
    ];

    const validPhases = phases.filter(p => !isNaN(p.pct) && !isNaN(p.econ));

    if (validPhases.length === 0) return "None";

    const mostBowledPhase = validPhases.reduce((max, curr) =>
      curr.pct > max.pct ? curr : max
    );

    return mostBowledPhase.econ <= 8 ? mostBowledPhase.name : "None";
  }, [selectedBowlingStats]);

  const getRoleColor = (role: string) => {
    if (role){
      switch (role.toLowerCase()) {
        case "batsman":
        case "batter":
          return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
        case "bowler":
          return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
        case "allrounder":
          return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
        case "wicket-keeper":
          return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
        default:
          return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
      }
    }
  }

  const battingConsistencyPCT = selectedBattingStats ? Number.parseFloat(selectedBattingStats.consistency_25_plus_pct) : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded-md mb-6">
        ⚠️ The backend server is currently offline.  
        The data you&apos;re seeing is <strong>stale</strong> and shown <strong>only for reference</strong>.
      </div>
      {/* Player Header */}
      <Card className="w-full">
        <CardHeader className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-start items-center justify-center gap-4 sm:gap-6 w-full text-center sm:text-left">
            <Avatar className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24">
              <AvatarImage src={player.img_url || "/placeholder.svg"} alt={player.full_name} />
              <AvatarFallback className="text-lg sm:text-xl lg:text-2xl">
                {player.full_name 
                  ? player.full_name.split(" ").map((n: string) => n[0]).join("")
                  : "P"}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center items-center justify-left gap-2">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">
                  {player.cricinfo_name ? player.cricinfo_name : player.player_name}
                </h1>
                {player.role !== 'NA' && (
                  <Badge className={getRoleColor(player.role)}>{player.role}</Badge>
                )}
              </div>
              <p className="text-base sm:text-lg text-muted-foreground">{player.full_name}</p>
              <div className="flex flex-row sm:flex-row items-center justify-center sm:justify-start gap-3 sm:gap-5 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {player.country}
                </span>
                <Select>
                  <SelectTrigger className="w-auto font-bold">
                    <SelectValue placeholder="T20" defaultValue={"T20"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="T20">T20</SelectItem>
                    <SelectItem disabled value="ODI">ODI</SelectItem>
                    <SelectItem disabled value="TEST">TEST (Coming Soon)</SelectItem>
                  </SelectContent>
              </Select>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Statistics Tabs */}
      <Tabs defaultValue={(!player.role || player.role == 'Allrounder' || player.role == 'NA') ? (batting.length > 0 && Number.parseInt(selectedBattingStats.total_batting_runs) >= 100 ? "batting" : "bowling") : player.role.includes("Bowl") ? "bowling" : "batting"} className="w-full">
        <TabsList className="grid w-full grid-cols-3 h-auto">
          {(batting.length > 0 && Number.parseInt(selectedBattingStats.total_batting_runs) >= 100) ?
          <TabsTrigger value="batting" className="flex items-center hover:cursor-pointer gap-1 sm:gap-2 text-xs sm:text-sm p-2 sm:p-3">
            <Target className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden xs:inline">Batting</span>
            <span className="xs:hidden">Bat</span>
          </TabsTrigger>
          : <></>
          }
          {bowling.length > 0 ?
          <TabsTrigger value="bowling" className="flex items-center hover:cursor-pointer gap-1 sm:gap-2 text-xs sm:text-sm p-2 sm:p-3">
            <Zap className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden xs:inline">Bowling</span>
            <span className="xs:hidden">Bowl</span>
          </TabsTrigger>
          : <></>
          }
          <TabsTrigger value="team" className="flex items-center hover:cursor-pointer gap-1 sm:gap-2 text-xs sm:text-sm p-2 sm:p-3">
            <Trophy className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden xs:inline">Team Stats</span>
            <span className="xs:hidden">Team</span>
          </TabsTrigger>
        </TabsList>

        {/* Batting Stats */}
        <TabsContent value="batting" className="space-y-3">
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
            {battingStats.map((b) => (
              <Badge
                key={b.category}
                variant={selectedBattingCategory === b.category ? "default" : "outline"}
                className="cursor-pointer text-xs sm:text-sm px-3 py-1"
                onClick={() => setSelectedBattingCategory(b.category)}
              >
                {b.category}
              </Badge>
            ))}
          </div>

          {selectedBattingStats && !isNaN(Number.parseInt(selectedBattingStats.total_batting_runs)) && (
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {/* Total Runs Card */}
              <Card className="h-full">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Total Runs</CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      {selectedBattingStats.total_matches_played} matches
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-1">
                    <p className="text-3xl font-bold">{selectedBattingStats.total_batting_runs}</p>
                    <p className="text-sm text-muted-foreground">
                      Avg Score:{" "}
                      {(
                        Number.parseInt(selectedBattingStats.total_batting_runs) /
                        Number.parseInt(selectedBattingStats.total_matches_played)
                      ).toFixed(1)}{" "}
                      per match
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Strike Rate Card */}
              {selectedBattingStats.powerplay_strike_rate && (
              <Card className="h-full">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Powerplay Strike Rate</CardTitle>
                    <Badge
                      variant={
                        Number.parseFloat(selectedBattingStats.powerplay_strike_rate) > 120 ? "default" : "secondary"
                      }
                      className="text-xs"
                    >
                      {Number.parseFloat(selectedBattingStats.powerplay_strike_rate) > 120 ? "Excellent" : "Good"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-1">
                    <p className="text-3xl font-bold">{selectedBattingStats.powerplay_strike_rate}</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedBattingStats.powerplay_runs} runs, {selectedBattingStats.powerplay_balls} balls
                    </p>
                  </div>
                </CardContent>
              </Card>
              )}

              {/* Boundaries Card */}
              <Card className="h-full">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Boundaries</CardTitle>
                    <Badge variant="outline" className="text-xs">
                      {selectedBattingStats.boundary_dependency_pct}%
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-1">
                    <p className="text-3xl font-bold">
                      {Number.parseInt(selectedBattingStats.fours) + Number.parseInt(selectedBattingStats.sixes)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {selectedBattingStats.fours} fours • {selectedBattingStats.sixes} sixes
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Consistency Card */}
              {!isNaN(battingConsistencyPCT) && (
                <Card className="h-full">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                        Consistency
                        <HoverCard>
                          <HoverCardTrigger asChild>
                            
                            <button
                              className="p-1 rounded-full hover:bg-muted transition-colors"
                              aria-label="Info"
                            >
                              <Info className="h-3 w-3 text-muted-foreground" />
                            </button>
                          </HoverCardTrigger>
                          <HoverCardContent>{`Includes only recent innings with 10+ balls faced. Short not-out innings are excluded.`}</HoverCardContent>
                        </HoverCard>
                      </CardTitle>
                      <Badge
                        variant={
                          battingConsistencyPCT >= 70 ? "outline" : battingConsistencyPCT >= 30 ? "secondary": "destructive"
                        }
                        className="text-xs"
                      >
                        {battingConsistencyPCT >= 80 ?
                        <img
                          src="/flame.gif"
                          alt="fire"
                          className="w-4 h-4 inline-block"
                        /> : <></>
                        }
                        {battingConsistencyPCT >= 70 ? "High" : battingConsistencyPCT >= 30 ? "Average": "Poor"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-1">
                      <p className="text-3xl font-bold">{selectedBattingStats.consistency_25_plus_pct}%</p>
                      <p className="text-sm text-muted-foreground">
                        {selectedBattingStats.innings_25_plus}/{selectedBattingStats.innings_considered} innings 25+
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Dot Ball Avoidance Card */}
              <Card className="h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Dot Ball Avoidance</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    <p className="text-3xl font-bold">{selectedBattingStats.dot_ball_avoidance_pct}%</p>
                    <Progress value={Number.parseFloat(selectedBattingStats.dot_ball_avoidance_pct)} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              {/* Boundary Dependency Card */}
              <Card className="h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Boundary Dependency</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    <p className="text-3xl font-bold">{selectedBattingStats.boundary_dependency_pct}%</p>
                    <Progress value={Number.parseFloat(selectedBattingStats.boundary_dependency_pct)} className="h-2" />
                    <p className="text-xs text-muted-foreground">{selectedBattingStats.boundary_runs} boundary runs</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        {/* Bowling Stats */}
        <TabsContent value="bowling" className="space-y-4">
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
            {bowlingStats.map((b) => (
              <Badge
                key={b.category}
                variant={selectedBowlingCategory === b.category ? "default" : "outline"}
                className="cursor-pointer text-xs sm:text-sm px-3 py-1"
                onClick={() => setSelectedBowlingCategory(b.category)}
              >
                {b.category}
              </Badge>
            ))}

          </div>

          {selectedBowlingStats && (
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {/* Total Wickets Card */}
              <Card className="h-full">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Total Wickets</CardTitle>
                    <Badge variant="default" className="text-xs">
                      {(
                        Number.parseInt(selectedBowlingStats.total_wickets) /
                        Number.parseInt(selectedBowlingStats.matches_bowled)
                      ).toFixed(1)}{" "}
                      per match
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-1">
                    <p className="text-3xl font-bold">{selectedBowlingStats.total_wickets}</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedBowlingStats.matches_bowled} matches bowled
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Powerplay Economy Card */}
              <Card className="h-full">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Powerplay Economy</CardTitle>
                    <Badge
                      variant={Number.parseFloat(selectedBowlingStats.pp_econ) <= 8 ? "outline" : Number.parseFloat(selectedBowlingStats.pp_econ) <= 10 ? "secondary": "destructive"}
                      className="text-xs"
                    >
                      {bestBowlingPhase == "Powerplay" ?
                        <img
                          src="/flame.gif"
                          alt="fire"
                          className="w-4 h-4 inline-block"
                        /> : <></>
                      }
                      {bestBowlingPhase == "Powerplay"? "Best" : Number.parseFloat(selectedBowlingStats.pp_econ) <= 8 ? "Good" : Number.parseFloat(selectedBowlingStats.pp_econ) <= 10 ? "Average": "Poor"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-1">
                    <p className="text-3xl font-bold">{selectedBowlingStats.pp_econ}</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedBowlingStats.pp_wkts} wickets • {selectedBowlingStats.pp_pct}% balls
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Middle Overs Economy Card */}
              <Card className="h-full">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Middle Economy</CardTitle>
                    <Badge
                      variant={Number.parseFloat(selectedBowlingStats.mid_econ) <= 8 ? "outline" : Number.parseFloat(selectedBowlingStats.mid_econ) <= 10 ? "secondary": "destructive"}
                      className="text-xs"
                    >
                      {bestBowlingPhase == "Middle" ?
                        <img
                          src="/flame.gif"
                          alt="fire"
                          className="w-4 h-4 inline-block"
                        /> : <></>
                      }
                      {bestBowlingPhase == "Middle"? "Best" : Number.parseFloat(selectedBowlingStats.mid_econ) <= 8 ? "Good" : Number.parseFloat(selectedBowlingStats.mid_econ) <= 10 ? "Average": "Poor"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-1">
                    <p className="text-3xl font-bold">{selectedBowlingStats.mid_econ}</p>
                    <p className="text-sm text-muted-foreground">{selectedBowlingStats.mid_wkts} wickets • {selectedBowlingStats.mid_pct}% balls</p>
                  </div>
                </CardContent>
              </Card>

              {/* Death Economy Card */}
              <Card className="h-full">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Death Economy</CardTitle>
                    <Badge
                      variant={Number.parseFloat(selectedBowlingStats.death_econ) <= 8 ? "outline" : Number.parseFloat(selectedBowlingStats.death_econ) <= 10 ? "secondary": "destructive"}
                      className="text-xs"
                    >
                      {bestBowlingPhase == "Death" ?
                        <img
                          src="/flame.gif"
                          alt="fire"
                          className="w-4 h-4 inline-block"
                        /> : <></>
                      }
                      {bestBowlingPhase == "Death"? "Best" : Number.parseFloat(selectedBowlingStats.death_econ) <= 8 ? "Good" : Number.parseFloat(selectedBowlingStats.death_econ) <= 10 ? "Average": "Poor"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-1">
                    <p className="text-3xl font-bold">{selectedBowlingStats.death_econ}</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedBowlingStats.death_wkts} wickets • {selectedBowlingStats.death_pct}% balls
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Dot Ball Percentage Card */}
              {selectedBowlingStats.dot_ball_percentage && (
                <Card className="h-full">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Dot Ball %</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2">
                      <p className="text-3xl font-bold">{selectedBowlingStats.dot_ball_percentage}%</p>
                      <Progress value={Number.parseFloat(selectedBowlingStats.dot_ball_percentage)} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Boundary Concession Card */}
              {selectedBowlingStats.boundary_concession_rate && (
                <Card className="h-full">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                        Boundary Concession
                        <HoverCard>
                          <HoverCardTrigger asChild>
                            
                            <button
                              className="p-1 rounded-full hover:bg-muted transition-colors"
                              aria-label="Info"
                            >
                              <Info className="h-3 w-3 text-muted-foreground" />
                            </button>
                          </HoverCardTrigger>
                          <HoverCardContent>{`Percentage of deliveries that went for boundaries (4s or 6s).`}</HoverCardContent>
                        </HoverCard>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2">
                      <p className="text-3xl font-bold">{selectedBowlingStats.boundary_concession_rate}%</p>
                      <Progress
                        value={Number.parseFloat(selectedBowlingStats.boundary_concession_rate)}
                        className="h-2"
                      />
                      <p className="text-xs text-muted-foreground">
                        {selectedBowlingStats.fours_conceded} fours • {selectedBowlingStats.sixes_conceded} sixes
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </TabsContent>

        {/* Team Stats */}
        <TabsContent value="team" className="space-y-6">
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <Trophy className="w-4 h-4 sm:w-5 sm:h-5" />
                International Team Performance
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Performance record against different opponents
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 sm:p-6">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs sm:text-sm">Opponent</TableHead>
                      <TableHead className="text-center text-xs sm:text-sm">Matches</TableHead>
                      <TableHead className="text-center text-xs sm:text-sm">Wins</TableHead>
                      <TableHead className="text-center text-xs sm:text-sm">Win %</TableHead>
                      <TableHead className="text-center text-xs sm:text-sm hidden sm:table-cell">Performance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {teamStat.map((stat, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium text-xs sm:text-sm">{stat.opponent}</TableCell>
                        <TableCell className="text-center text-xs sm:text-sm">{stat.matches_played}</TableCell>
                        <TableCell className="text-center text-xs sm:text-sm">{stat.wins}</TableCell>
                        <TableCell className="text-center text-xs sm:text-sm">{stat.win_percentage}%</TableCell>
                        <TableCell className="text-center hidden sm:table-cell">
                          <Progress
                            value={Number.parseFloat(stat.win_percentage)}
                            className="h-2 w-12 sm:w-16 mx-auto"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
