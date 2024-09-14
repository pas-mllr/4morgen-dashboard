'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell } from 'recharts'
import { CalendarIcon, DownloadIcon, MoonIcon, SearchIcon, SunIcon, TrendingUpIcon, UsersIcon, BarChartIcon, AwardIcon, BriefcaseIcon, GlobeIcon, HeartHandshakeIcon, TrophyIcon, LightbulbIcon, Coffee, Mic2, Gavel, BookOpen, Landmark, Scale, FileText, EuroIcon, BuildingIcon, ShieldIcon, InfoIcon } from "lucide-react"
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

const accentColor = "#004028"

const MetricCard = ({ title, value, trend, icon: Icon, tooltip }: { title: string; value: string; trend: string; icon: React.ElementType; tooltip: string }) => (
  <Card className="bg-card text-card-foreground">
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <CardTitle className="text-sm font-medium flex items-center">
              {title}
              <InfoIcon className="h-4 w-4 ml-1 text-muted-foreground" />
            </CardTitle>
          </TooltipTrigger>
          <TooltipContent>
            <p>{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{trend}</p>
    </CardContent>
  </Card>
)

const ChartCard = ({ title, children, tooltip }: { title: string; children: React.ReactNode; tooltip: string }) => (
  <Card>
    <CardHeader>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <CardTitle className="flex items-center">
              {title}
              <InfoIcon className="h-4 w-4 ml-1 text-muted-foreground" />
            </CardTitle>
          </TooltipTrigger>
          <TooltipContent>
            <p>{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </CardHeader>
    <CardContent>
      {children}
    </CardContent>
  </Card>
)

export default function Component() {
  const [darkMode, setDarkMode] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTimeRange, setSelectedTimeRange] = useState('6M')

  const dashboardRef = useRef(null)

  // Mock data generator function
  const generateMockData = (months: number) => {
    const currentDate = new Date()
    const data = []
    for (let i = 0; i < months; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1)
      data.unshift({
        month: date.toLocaleString('default', { month: 'short' }),
        clients: Math.floor(Math.random() * 20) + 5,
        nps: Math.floor(Math.random() * 20) + 60,
        share: Math.floor(Math.random() * 5) + 20,
        adoption: Math.floor(Math.random() * 30) + 5
      })
    }
    return data
  }

  // State for KPI data
  const [clientAcquisitionData, setClientAcquisitionData] = useState({
    newClientsAcquired: 37,
    leadToClientConversionRate: '18%',
    clientPenetrationInKeyMarkets: '25%',
    strategicAccountGrowth: '15%',
    newClientsTrend: generateMockData(6),
    leadToClientConversion: [
      { stage: 'Initial Contact', rate: 100 },
      { stage: 'Qualification', rate: 60 },
      { stage: 'Proposal', rate: 40 },
      { stage: 'Negotiation', rate: 25 },
      { stage: 'Closed Won', rate: 18 },
    ],
  })

  const [clientRelationshipData, setClientRelationshipData] = useState({
    netPromoterScore: 72,
    clientRetentionRate: '92%',
    clientSatisfactionScore: 4.8,
    clientEngagementRate: '85%',
    npsOverTime: generateMockData(6),
    clientSatisfaction: [
      { aspect: 'Communication', score: 4.7 },
      { aspect: 'Expertise', score: 4.9 },
      { aspect: 'Responsiveness', score: 4.6 },
      { aspect: 'Value for Money', score: 4.5 },
      { aspect: 'Overall Satisfaction', score: 4.8 },
    ],
  })

  const [marketPositioningData, setMarketPositioningData] = useState({
    marketShareGrowth: '5.2%',
    shareOfVoice: '28%',
    competitiveWinRate: '65%',
    brandRecognition: '72%',
    marketShareTrend: generateMockData(6),
    competitiveAnalysis: [
      { competitor: 'Our Firm', score: 85 },
      { competitor: 'Competitor A', score: 78 },
      { competitor: 'Competitor B', score: 72 },
      { competitor: 'Competitor C', score: 68 },
      { competitor: 'Competitor D', score: 62 },
    ],
  })

  const [strategicInitiativesData, setStrategicInitiativesData] = useState({
    newPartnershipsFormed: 5,
    partnershipImpactOnGrowth: '12%',
    successRateOfInitiatives: '78%',
    adoptionOfNewServices: '32%',
    initiativeSuccessRate: [
      { initiative: 'Market Entry', rate: 85 },
      { initiative: 'New Service Line', rate: 72 },
      { initiative: 'Digital Transformation', rate: 68 },
      { initiative: 'Client Portal', rate: 90 },
    ],
    newServiceAdoption: generateMockData(6),
  })

  const [marketingCalendarData, setMarketingCalendarData] = useState({
    events: [
      { date: '2024-01-10', type: 'Client Breakfast', title: 'Dutch Corporate Law Updates', icon: Coffee },
      { date: '2024-01-25', type: 'Webinar', title: 'GDPR Compliance for Dutch Businesses', icon: ShieldIcon },
      { date: '2024-02-05', type: 'Seminar', title: 'Dutch Labor Law Trends 2024', icon: Mic2 },
      { date: '2024-02-15', type: 'Networking', title: 'Amsterdam Legal Tech Mixer', icon: UsersIcon },
      { date: '2024-03-01', type: 'Workshop', title: 'Cross-Border M&A in the EU', icon: BookOpen },
      { date: '2024-03-20', type: 'Client Appreciation', title: 'Tulip Day Legal Gathering', icon: Coffee },
      { date: '2024-04-05', type: 'Conference', title: 'Benelux Intellectual Property Summit', icon: Landmark },
      { date: '2024-04-18', type: 'Panel Discussion', title: 'Sustainability and Dutch Corporate Responsibility', icon: UsersIcon },
      { date: '2024-05-10', type: 'Seminar', title: 'Dutch Tax Law Updates for Multinationals', icon: Mic2 },
      { date: '2024-05-22', type: 'Client Breakfast', title: 'Real Estate Law in the Netherlands', icon: Coffee },
      { date: '2024-06-07', type: 'Webinar', title: 'Cybersecurity Law for Dutch Enterprises', icon: ShieldIcon },
      { date: '2024-06-20', type: 'Workshop', title: 'Negotiation Strategies in Dutch Courts', icon: Scale },
      { date: '2024-07-03', type: 'Conference', title: 'European Union Law Symposium', icon: Landmark },
      { date: '2024-07-15', type: 'Networking', title: 'Young Dutch Lawyers Forum', icon: UsersIcon },
      { date: '2024-08-09', type: 'Client Appreciation', title: 'Summer Borrel at Vondelpark', icon: Coffee },
      { date: '2024-08-24', type: 'Seminar', title: 'Dutch Competition Law in Practice', icon: Mic2 },
      { date: '2024-09-05', type: 'Workshop', title: 'Legal Project Management for Dutch Firms', icon: BookOpen },
      { date: '2024-09-18', type: 'Client Breakfast', title: 'Financial Regulations in the Netherlands', icon: Coffee },
      { date: '2024-10-02', type: 'Conference', title: 'Dutch Legal Tech Innovation Summit', icon: Landmark },
      { date: '2024-10-16', type: 'Panel Discussion', title: 'Diversity in the Dutch Legal Profession', icon: UsersIcon },
      { date: '2024-11-07', type: 'Seminar', title: 'Environmental Law and Sustainability in NL', icon: Mic2 },
      { date: '2024-11-21', type: 'Client Appreciation', title: 'Sinterklaas Legal Networking Event', icon: Coffee },
      { date: '2024-12-04', type: 'Webinar', title: 'Year-End Dutch Tax Planning for Businesses', icon: EuroIcon },
      { date: '2024-12-13', type: 'Workshop', title: 'Legal Writing in Dutch and English', icon: FileText },
    ]
  })

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleExportReport = async () => {
    if (dashboardRef.current) {
      try {
        const canvas = await html2canvas(dashboardRef.current, { scale: 2 })
        const imgData = canvas.toDataURL('image/png')
        const pdf = new jsPDF({
          orientation: 'landscape',
          unit: 'px',
          format: [canvas.width, canvas.height]
        })
        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height)
        pdf.save('law-firm-dashboard.pdf')
      } catch (error) {
        console.error('Error generating PDF:', error)
      }
    }
  }

  const getMonthsToShow = () => {
    switch (selectedTimeRange) {
      case '3M':
        return 3
      case '6M':
        return 6
      case '1Y':
        return 12
      default:
        return 12
    }
  }

  const getFilteredEvents = () => {
    const monthsToShow = getMonthsToShow()
    const currentDate = new Date()
    const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + monthsToShow, 0)
    
    return marketingCalendarData.events.filter(event => {
      const eventDate = new Date(event.date)
      return eventDate >= currentDate && eventDate <= endDate
    })
  }

  const groupEventsByMonth = (events) => {
    return events.reduce((acc, event) => {
      const monthYear = new Date(event.date).toLocaleString('default', { month: 'long', year: 'numeric' })
      if (!acc[monthYear]) {
        acc[monthYear] = []
      }
      acc[monthYear].push(event)
      return acc
    }, {})
  }

  useEffect(() => {
    // Update KPI data based on selected time range
    const months = getMonthsToShow()
    setClientAcquisitionData(prevData => ({
      ...prevData,
      newClientsTrend: generateMockData(months)
    }))
    setClientRelationshipData(prevData => ({
      ...prevData,
      npsOverTime: generateMockData(months)
    }))
    setMarketPositioningData(prevData => ({
      ...prevData,
      marketShareTrend: generateMockData(months)
    }))
    setStrategicInitiativesData(prevData => ({
      ...prevData,
      newServiceAdoption: generateMockData(months)
    }))
  }, [selectedTimeRange])

  return (
    <div className={`min-h-screen bg-background text-foreground ${darkMode ? 'dark' : ''}`}>
      <header className="border-b border-border p-4 sticky top-0 z-10 bg-background/80 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="/placeholder.svg" alt="Suzan" />
              <AvatarFallback>S</AvatarFallback>
            </Avatar>
            <span className="font-semibold">Suzan</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <SearchIcon className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
              <Input 
                className="pl-8" 
                placeholder="Search..." 
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
              {darkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </header>
      
      <main className="p-6" ref={dashboardRef}>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Strategic Growth Dashboard</h1>
          <div className="flex items-center space-x-2">
            <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3M">Last 3 Months</SelectItem>
                <SelectItem value="6M">Last 6 Months</SelectItem>
                <SelectItem value="1Y">Last 1 Year</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleExportReport}>
              <DownloadIcon className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="client-acquisition" className="space-y-6">
          <TabsList>
            <TabsTrigger value="client-acquisition">Client Acquisition</TabsTrigger>
            <TabsTrigger value="client-relationship">Client Relationship</TabsTrigger>
            <TabsTrigger value="market-positioning">Market Positioning</TabsTrigger>
            <TabsTrigger value="strategic-initiatives">Strategic Initiatives</TabsTrigger>
            <TabsTrigger value="marketing-calendar">Marketing Calendar</TabsTrigger>
          </TabsList>

          <TabsContent value="client-acquisition">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <MetricCard
                title="New Clients Acquired"
                value={clientAcquisitionData.newClientsAcquired.toString()}
                trend="+15% from last quarter"
                icon={UsersIcon}
                tooltip="Total number of new clients onboarded in the selected period"
              />
              <MetricCard
                title="Lead-to-Client Conversion"
                value={clientAcquisitionData.leadToClientConversionRate}
                trend="+2% from last year"
                icon={TrendingUpIcon}
                tooltip="Percentage of leads that become paying clients"
              />
              <MetricCard
                title="Client Penetration in Key Markets"
                value={clientAcquisitionData.clientPenetrationInKeyMarkets}
                trend="+5% from last quarter"
                icon={GlobeIcon}
                tooltip="Percentage of target market captured as clients"
              />
              <MetricCard
                title="Strategic Account Growth"
                value={clientAcquisitionData.strategicAccountGrowth}
                trend="+3% from last year"
                icon={BarChartIcon}
                tooltip="Growth in revenue from key strategic accounts"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <ChartCard
                title="New Clients Trend"
                tooltip="Shows the number of new clients acquired each month"
              >
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={clientAcquisitionData.newClientsTrend}>
                      <XAxis dataKey="month" label={{ value: 'Month', position: 'insideBottom', offset: -5 }} />
                      <YAxis label={{ value: 'Number of New Clients', angle: -90, position: 'insideLeft' }} />
                      <RechartsTooltip />
                      <Area type="monotone" dataKey="clients" stroke={accentColor} fill={accentColor} fillOpacity={0.2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </ChartCard>
              
              <ChartCard
                title="Lead-to-Client Conversion Analysis"
                tooltip="Displays the conversion rate at each stage of the sales funnel"
              >
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={clientAcquisitionData.leadToClientConversion} layout="vertical">
                      <XAxis type="number" label={{ value: 'Conversion Rate (%)', position: 'insideBottom', offset: -5 }} />
                      <YAxis dataKey="stage" type="category" width={100} />
                      <RechartsTooltip />
                      <Bar dataKey="rate" fill={accentColor} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </ChartCard>
            </div>
          </TabsContent>

          <TabsContent value="client-relationship">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <MetricCard
                title="Net Promoter Score"
                value={clientRelationshipData.netPromoterScore.toString()}
                trend="+5 from last survey"
                icon={AwardIcon}
                tooltip="Measure of client loyalty and satisfaction"
              />
              <MetricCard
                title="Client Retention Rate"
                value={clientRelationshipData.clientRetentionRate}
                trend="+2% from last year"
                icon={HeartHandshakeIcon}
                tooltip="Percentage of clients retained over a given period"
              />
              <MetricCard
                title="Client Satisfaction Score"
                value={clientRelationshipData.clientSatisfactionScore.toString()}
                trend="+0.2 from last quarter"
                icon={TrophyIcon}
                tooltip="Average rating of client satisfaction surveys"
              />
              <MetricCard
                title="Client Engagement Rate"
                value={clientRelationshipData.clientEngagementRate}
                trend="+5% from last quarter"
                icon={BriefcaseIcon}
                tooltip="Measure of how actively clients interact with the firm"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <ChartCard
                title="NPS Over Time"
                tooltip="Shows how the Net Promoter Score has changed over the months"
              >
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={clientRelationshipData.npsOverTime}>
                      <XAxis dataKey="month" label={{ value: 'Month', position: 'insideBottom', offset: -5 }} />
                      <YAxis label={{ value: 'Net Promoter Score', angle: -90, position: 'insideLeft' }} />
                      <RechartsTooltip />
                      <Line type="monotone" dataKey="nps" stroke={accentColor} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </ChartCard>
              
              <ChartCard
                title="Client Satisfaction Analysis"
                tooltip="Breaks down client satisfaction scores across different aspects of service"
              >
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={clientRelationshipData.clientSatisfaction} layout="vertical">
                      <XAxis type="number" domain={[0, 5]} label={{ value: 'Satisfaction Score', position: 'insideBottom', offset: -5 }} />
                      <YAxis dataKey="aspect" type="category" width={120} />
                      <RechartsTooltip />
                      <Bar dataKey="score" fill={accentColor} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </ChartCard>
            </div>
          </TabsContent>

          <TabsContent value="market-positioning">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <MetricCard
                title="Market Share Growth"
                value={marketPositioningData.marketShareGrowth}
                trend="+1.2% from last year"
                icon={BarChartIcon}
                tooltip="Increase in the firm's share of the total market"
              />
              <MetricCard
                title="Share of Voice"
                value={marketPositioningData.shareOfVoice}
                trend="+3% from last quarter"
                icon={TrendingUpIcon}
                tooltip="Firm's visibility in the market compared to competitors"
              />
              <MetricCard
                title="Competitive Win Rate"
                value={marketPositioningData.competitiveWinRate}
                trend="+5% from last quarter"
                icon={AwardIcon}
                tooltip="Percentage of bids won against direct competitors"
              />
              <MetricCard
                title="Brand Recognition"
                value={marketPositioningData.brandRecognition}
                trend="+7% from last year"
                icon={TrophyIcon}
                tooltip="Percentage of target audience aware of the firm's brand"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <ChartCard
                title="Market Share Trend"
                tooltip="Illustrates how the firm's market share has changed over time"
              >
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={marketPositioningData.marketShareTrend}>
                      <XAxis dataKey="month" label={{ value: 'Month', position: 'insideBottom', offset: -5 }} />
                      <YAxis label={{ value: 'Market Share (%)', angle: -90, position: 'insideLeft' }} />
                      <RechartsTooltip />
                      <Line type="monotone" dataKey="share" stroke={accentColor} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </ChartCard>
              
              <ChartCard
                title="Competitive Analysis"
                tooltip="Compares the firm's performance against key competitors"
              >
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={marketPositioningData.competitiveAnalysis} layout="vertical">
                      <XAxis type="number" label={{ value: 'Performance Score', position: 'insideBottom', offset: -5 }} />
                      <YAxis dataKey="competitor" type="category" width={100} />
                      <RechartsTooltip />
                      <Bar dataKey="score" fill={accentColor} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </ChartCard>
            </div>
          </TabsContent>

          <TabsContent value="strategic-initiatives">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <MetricCard
                title="New Partnerships Formed"
                value={strategicInitiativesData.newPartnershipsFormed.toString()}
                trend="+2 from last year"
                icon={HeartHandshakeIcon}
                tooltip="Number of new strategic alliances or partnerships"
              />
              <MetricCard
                title="Partnership Impact on Growth"
                value={strategicInitiativesData.partnershipImpactOnGrowth}
                trend="+5% from last quarter"
                icon={TrendingUpIcon}
                tooltip="Percentage of growth attributed to partnerships"
              />
              <MetricCard
                title="Success Rate of Initiatives"
                value={strategicInitiativesData.successRateOfInitiatives}
                trend="+8% from last year"
                icon={AwardIcon}
                tooltip="Percentage of strategic initiatives meeting their goals"
              />
              <MetricCard
                title="Adoption of New Services"
                value={strategicInitiativesData.adoptionOfNewServices}
                trend="+12% from last quarter"
                icon={LightbulbIcon}
                tooltip="Percentage of clients using newly introduced services"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <ChartCard
                title="Initiative Success Rate"
                tooltip="Shows the success rate of different strategic initiatives"
              >
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={strategicInitiativesData.initiativeSuccessRate}>
                      <XAxis dataKey="initiative" label={{ value: 'Strategic Initiative', position: 'insideBottom', offset: -5 }} />
                      <YAxis label={{ value: 'Success Rate (%)', angle: -90, position: 'insideLeft' }} />
                      <RechartsTooltip />
                      <Bar dataKey="rate" fill={accentColor} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </ChartCard>
              
              <ChartCard
                title="New Service Adoption Trend"
                tooltip="Tracks the adoption rate of newly introduced services over time"
              >
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={strategicInitiativesData.newServiceAdoption}>
                      <XAxis dataKey="month" label={{ value: 'Month', position: 'insideBottom', offset: -5 }} />
                      <YAxis label={{ value: 'Adoption Rate (%)', angle: -90, position: 'insideLeft' }} />
                      <RechartsTooltip />
                      <Line type="monotone" dataKey="adoption" stroke={accentColor} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </ChartCard>
            </div>
          </TabsContent>

          <TabsContent value="marketing-calendar">
            <Card>
              <CardHeader>
                <CardTitle>Marketing Campaign Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Object.entries(groupEventsByMonth(getFilteredEvents())).map(([monthYear, events]) => (
                    <Card key={monthYear}>
                      <CardHeader>
                        <CardTitle>{monthYear}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {events.map((event, index) => {
                            const EventIcon = event.icon
                            return (
                              <div key={index} className="flex items-center space-x-4">
                                <div className="flex-shrink-0">
                                  <EventIcon className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                  <p className="text-sm font-medium">{event.title}</p>
                                  <p className="text-xs text-muted-foreground">{new Date(event.date).toLocaleDateString()} - {event.type}</p>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}