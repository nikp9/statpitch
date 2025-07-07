"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Target, Zap, Trophy, Users } from "lucide-react"

// Mock data based on your API structure
const mockPlayerData = {
  "player_info": [
    {
      "player_id": "be150fc8",
      "cricinfo_id": "275487",
      "cricinfo_name": "Ellyse Perry",
      "player_name": "EA Perry",
      "full_name": "Ellyse Alexandra Perry",
      "role": "Allrounder",
      "gender": "female",
      "country": "Australia",
      "img_url": "https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/320100/320130.1.png"
    }
  ],
  "batting": [
    {
      "player_id": "be150fc8",
      "player_name": "EA Perry",
      "gender": "female",
      "powerplay_balls": "983",
      "powerplay_runs": "1090",
      "powerplay_strike_rate": "110.89",
      "dot_ball_avoidance_pct": "63.9631043256997455",
      "innings_considered": "10",
      "innings_25_plus": "8",
      "consistency_25_plus_pct": "80.00",
      "fours": "465",
      "sixes": "86",
      "total_batting_runs": "3984",
      "boundary_runs": "2376",
      "boundary_dependency_pct": "59.64",
      "total_matches_played": "129"
    },
    {
      "player_id": "be150fc8",
      "player_name": "EA Perry",
      "gender": "female",
      "powerplay_balls": "124",
      "powerplay_runs": "140",
      "powerplay_strike_rate": "112.90",
      "dot_ball_avoidance_pct": "69.6453900709219858",
      "innings_considered": "10",
      "innings_25_plus": "5",
      "consistency_25_plus_pct": "50.00",
      "fours": "97",
      "sixes": "24",
      "total_batting_runs": "955",
      "boundary_runs": "532",
      "boundary_dependency_pct": "55.71",
      "total_matches_played": "39"
    },
    {
      "player_id": "be150fc8",
      "player_name": "EA Perry",
      "gender": "female",
      "powerplay_balls": "834",
      "powerplay_runs": "928",
      "powerplay_strike_rate": "111.27",
      "dot_ball_avoidance_pct": "62.5517812758906379",
      "innings_considered": "10",
      "innings_25_plus": "8",
      "consistency_25_plus_pct": "80.00",
      "fours": "364",
      "sixes": "62",
      "total_batting_runs": "3007",
      "boundary_runs": "1828",
      "boundary_dependency_pct": "60.79",
      "total_matches_played": "88"
    }
  ],
  "bowling": [
    {
      "player_id": "be150fc8",
      "player_name": "EA Perry",
      "gender": "female",
      "balls_bowled": "1267",
      "fours_conceded": "199",
      "sixes_conceded": "30",
      "boundary_concession_rate": "18.0741910023677979",
      "dot_ball_percentage": "44.36",
      "total_balls": "1267",
      "pp_balls": "553",
      "pp_pct": "43.65",
      "pp_econ": "6.69",
      "pp_wkts": "27",
      "mid_balls": "560",
      "mid_pct": "44.20",
      "mid_econ": "7.11",
      "mid_wkts": "28",
      "death_balls": "146",
      "death_pct": "11.52",
      "death_econ": "10.03",
      "death_wkts": "14",
      "matches_bowled": "93",
      "total_wickets": "66"
    },
    {
      "player_id": "be150fc8",
      "player_name": "EA Perry",
      "gender": "female",
      "balls_bowled": null,
      "fours_conceded": null,
      "sixes_conceded": null,
      "boundary_concession_rate": null,
      "dot_ball_percentage": null,
      "total_balls": "188",
      "pp_balls": "110",
      "pp_pct": "58.51",
      "pp_econ": "4.75",
      "pp_wkts": "7",
      "mid_balls": "72",
      "mid_pct": "38.30",
      "mid_econ": "6.00",
      "mid_wkts": "4",
      "death_balls": "6",
      "death_pct": "3.19",
      "death_econ": "6.00",
      "death_wkts": "1",
      "matches_bowled": "21",
      "total_wickets": "12"
    },
    {
      "player_id": "be150fc8",
      "player_name": "EA Perry",
      "gender": "female",
      "balls_bowled": "1031",
      "fours_conceded": "170",
      "sixes_conceded": "26",
      "boundary_concession_rate": "19.0106692531522793",
      "dot_ball_percentage": "42.29",
      "total_balls": "1031",
      "pp_balls": "419",
      "pp_pct": "40.64",
      "pp_econ": "7.17",
      "pp_wkts": "20",
      "mid_balls": "470",
      "mid_pct": "45.59",
      "mid_econ": "7.34",
      "mid_wkts": "22",
      "death_balls": "134",
      "death_pct": "13.00",
      "death_econ": "10.12",
      "death_wkts": "13",
      "matches_bowled": "70",
      "total_wickets": "52"
    }
  ],
  "team_stat": [
    {
      "searched_team": "India",
      "opponent": "South Africa",
      "gender": "male",
      "matches_played": "15",
      "wins": "9",
      "win_percentage": "60.00"
    },
    {
      "searched_team": "India",
      "opponent": "England",
      "gender": "male",
      "matches_played": "15",
      "wins": "10",
      "win_percentage": "66.67"
    },
    {
      "searched_team": "India",
      "opponent": "Sri Lanka",
      "gender": "male",
      "matches_played": "13",
      "wins": "9",
      "win_percentage": "69.23"
    },
    {
      "searched_team": "India",
      "opponent": "West Indies",
      "gender": "male",
      "matches_played": "13",
      "wins": "9",
      "win_percentage": "69.23"
    },
    {
      "searched_team": "India",
      "opponent": "Australia",
      "gender": "male",
      "matches_played": "9",
      "wins": "7",
      "win_percentage": "77.78"
    }
  ]
}

interface PlayerDashboardProps {
  playerData?: typeof mockPlayerData
}

export default function PlayerDashboard({ playerData = mockPlayerData }: PlayerDashboardProps) {
  const player = playerData.player_info[0]
  const [selectedBattingCategory, setSelectedBattingCategory] = useState("Overall")
  const [selectedBowlingCategory, setSelectedBowlingCategory] = useState("Overall")

  // Assign category names manually based on index, fallback-safe
  const battingCategories = playerData.batting.map((_, i) => {
    if (playerData.batting.length === 1) return "Overall"
    if (i === 0) return "Overall"
    if (i === 1) return "International"
    if (i === 2) return "League"
    return `Other ${i - 2}`
  })

  const battingStats = playerData.batting.map((entry, i) => ({
    ...entry,
    category: battingCategories[i],
  }))

  const bowlingCategories = playerData.bowling.map((_, i) => {
    if (playerData.bowling.length === 1) return "Overall"
    if (i === 0) return "Overall"
    if (i === 1) return "International"
    if (i === 2) return "League"
    return `Other ${i - 2}`
  })

  const bowlingStats = playerData.bowling.map((entry, i) => ({
    ...entry,
    category: bowlingCategories[i],
  }))

  // Selected entries
  const selectedBattingStats = battingStats.find((b) => b.category === selectedBattingCategory)
  const selectedBowlingStats = bowlingStats.find((b) => b.category === selectedBowlingCategory)


  const getRoleColor = (role: string) => {
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

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Player Header */}
      <Card className="w-full">
        <CardHeader className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <Avatar className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto sm:mx-0">
              <AvatarImage src={player.img_url || "/placeholder.svg"} alt={player.full_name} />
              <AvatarFallback className="text-lg sm:text-xl lg:text-2xl">
                {player.full_name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">{player.full_name}</h1>
                <Badge className={getRoleColor(player.role)}>{player.role}</Badge>
              </div>
              <p className="text-base sm:text-lg text-muted-foreground">{player.player_name}</p>
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {player.country}
                </span>
                <span>ID: {player.cricinfo_id}</span>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Statistics Tabs */}
      <Tabs defaultValue="batting" className="w-full">
        <TabsList className="grid w-full grid-cols-3 h-auto">
          <TabsTrigger value="batting" className="flex items-center hover:cursor-pointer gap-1 sm:gap-2 text-xs sm:text-sm p-2 sm:p-3">
            <Target className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden xs:inline">Batting</span>
            <span className="xs:hidden">Bat</span>
          </TabsTrigger>
          <TabsTrigger value="bowling" className="flex items-center hover:cursor-pointer gap-1 sm:gap-2 text-xs sm:text-sm p-2 sm:p-3">
            <Zap className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden xs:inline">Bowling</span>
            <span className="xs:hidden">Bowl</span>
          </TabsTrigger>
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

          {selectedBattingStats && (
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
                      Avg:{" "}
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
              <Card className="h-full">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Strike Rate</CardTitle>
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
              <Card className="h-full">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Consistency</CardTitle>
                    <Badge
                      variant={
                        Number.parseFloat(selectedBattingStats.consistency_25_plus_pct) > 70 ? "default" : "secondary"
                      }
                      className="text-xs"
                    >
                      {Number.parseFloat(selectedBattingStats.consistency_25_plus_pct) > 70 ? "High" : "Moderate"}
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
                      variant={Number.parseFloat(selectedBowlingStats.pp_econ) < 7 ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {Number.parseFloat(selectedBowlingStats.pp_econ) < 7 ? "Excellent" : "Good"}
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
                    <Badge variant="outline" className="text-xs">
                      {selectedBowlingStats.mid_pct}% balls
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-1">
                    <p className="text-3xl font-bold">{selectedBowlingStats.mid_econ}</p>
                    <p className="text-sm text-muted-foreground">{selectedBowlingStats.mid_wkts} wickets</p>
                  </div>
                </CardContent>
              </Card>

              {/* Death Economy Card */}
              <Card className="h-full">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Death Economy</CardTitle>
                    <Badge
                      variant={Number.parseFloat(selectedBowlingStats.death_econ) < 10 ? "default" : "destructive"}
                      className="text-xs"
                    >
                      {Number.parseFloat(selectedBowlingStats.death_econ) < 10 ? "Good" : "Needs Work"}
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
                    <CardTitle className="text-sm font-medium text-muted-foreground">Boundary Concession</CardTitle>
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
                    {playerData.team_stat.map((stat, index) => (
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
