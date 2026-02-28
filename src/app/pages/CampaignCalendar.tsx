import { useState } from "react";
import { Calendar as CalendarIcon, Plus, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";

const campaigns = [
  {
    date: "2026-02-28",
    title: "YouTube Video: Marketing Tips",
    channel: "YouTube",
    time: "10:00 AM",
    status: "Scheduled",
    color: "bg-red-500",
  },
  {
    date: "2026-03-01",
    title: "Product Launch Post",
    channel: "Instagram",
    time: "3:00 PM",
    status: "Scheduled",
    color: "bg-pink-500",
  },
  {
    date: "2026-03-01",
    title: "Newsletter Send",
    channel: "Email",
    time: "9:00 AM",
    status: "Scheduled",
    color: "bg-blue-500",
  },
  {
    date: "2026-03-03",
    title: "Facebook Campaign",
    channel: "Social Media",
    time: "2:00 PM",
    status: "Scheduled",
    color: "bg-purple-500",
  },
  {
    date: "2026-03-05",
    title: "LinkedIn Article",
    channel: "Social Media",
    time: "11:00 AM",
    status: "Scheduled",
    color: "bg-blue-700",
  },
  {
    date: "2026-03-07",
    title: "Instagram Reel",
    channel: "Instagram",
    time: "5:00 PM",
    status: "Scheduled",
    color: "bg-pink-500",
  },
  {
    date: "2026-03-10",
    title: "Email Campaign",
    channel: "Email",
    time: "10:00 AM",
    status: "Scheduled",
    color: "bg-blue-500",
  },
];

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function CampaignCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 2, 1)); // March 2026
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const getCampaignsForDate = (day: number | null) => {
    if (!day) return [];
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return campaigns.filter(c => c.date === dateStr);
  };

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const days = getDaysInMonth(currentDate);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Campaign Calendar</h1>
          <p className="text-muted-foreground">Plan and schedule your marketing campaigns</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Channels</SelectItem>
              <SelectItem value="youtube">YouTube</SelectItem>
              <SelectItem value="instagram">Instagram</SelectItem>
              <SelectItem value="social">Social Media</SelectItem>
              <SelectItem value="email">Email</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Campaign
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Calendar */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>
                  {months[currentDate.getMonth()]} {currentDate.getFullYear()}
                </CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" onClick={goToPreviousMonth}>
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
                    Today
                  </Button>
                  <Button variant="outline" size="icon" onClick={goToNextMonth}>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2">
                {/* Day headers */}
                {daysOfWeek.map((day) => (
                  <div key={day} className="text-center text-sm font-medium text-muted-foreground p-2">
                    {day}
                  </div>
                ))}
                {/* Calendar days */}
                {days.map((day, index) => {
                  const dayCampaigns = getCampaignsForDate(day);
                  const isToday = day === 27 && currentDate.getMonth() === 1; // Feb 27
                  return (
                    <div
                      key={index}
                      className={`min-h-24 p-2 border rounded-lg ${
                        !day ? "bg-muted/20" : "bg-card hover:bg-accent cursor-pointer"
                      } ${isToday ? "border-primary border-2" : ""}`}
                      onClick={() => day && setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
                    >
                      {day && (
                        <>
                          <div className={`text-sm font-medium mb-1 ${isToday ? "text-primary" : ""}`}>
                            {day}
                          </div>
                          <div className="space-y-1">
                            {dayCampaigns.slice(0, 2).map((campaign, i) => (
                              <div
                                key={i}
                                className={`text-xs px-1.5 py-0.5 rounded text-white truncate ${campaign.color}`}
                              >
                                {campaign.title}
                              </div>
                            ))}
                            {dayCampaigns.length > 2 && (
                              <div className="text-xs text-muted-foreground px-1.5">
                                +{dayCampaigns.length - 2} more
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Campaigns */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Campaigns</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {campaigns.slice(0, 6).map((campaign, index) => (
                <div key={index} className="p-3 rounded-lg border space-y-2">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{campaign.title}</p>
                      <p className="text-xs text-muted-foreground">{campaign.channel}</p>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {campaign.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <CalendarIcon className="w-3 h-3" />
                    <span>{new Date(campaign.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                    <span>•</span>
                    <span>{campaign.time}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">This Week</span>
                <span className="font-bold">8 campaigns</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">This Month</span>
                <span className="font-bold">24 campaigns</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Next Month</span>
                <span className="font-bold">18 campaigns</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Channel Distribution</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { channel: "Social Media", count: 12, color: "bg-purple-500" },
                { channel: "Email", count: 8, color: "bg-blue-500" },
                { channel: "YouTube", count: 6, color: "bg-red-500" },
                { channel: "Instagram", count: 10, color: "bg-pink-500" },
              ].map((item) => (
                <div key={item.channel}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">{item.channel}</span>
                    <span className="text-sm font-medium">{item.count}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className={`h-full ${item.color}`} style={{ width: `${(item.count / 36) * 100}%` }} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
