import { useState } from "react";
import { Palette, Download, Printer, Image as ImageIcon, Type, Layers, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Slider } from "../components/ui/slider";

const templates = [
  { name: "Event Poster", size: "24x36 in", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=600&fit=crop" },
  { name: "Product Launch", size: "18x24 in", image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=600&fit=crop" },
  { name: "Sale Promotion", size: "24x36 in", image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&h=600&fit=crop" },
  { name: "Brand Awareness", size: "27x40 in", image: "https://images.unsplash.com/photo-1635514569146-9a9607ecf303?w=400&h=600&fit=crop" },
  { name: "Workshop/Seminar", size: "18x24 in", image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=600&fit=crop" },
  { name: "Minimalist", size: "24x36 in", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=600&fit=crop" },
];

const savedDesigns = [
  { name: "Summer Festival 2026", date: "Feb 20, 2026", status: "Ready", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=600&fit=crop" },
  { name: "Black Friday Sale", date: "Feb 15, 2026", status: "Draft", image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&h=600&fit=crop" },
  { name: "Product Launch Event", date: "Feb 10, 2026", status: "Ready", image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=600&fit=crop" },
];

export default function PosterDesign() {
  const [fontSize, setFontSize] = useState([64]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Poster Design Studio</h1>
          <p className="text-muted-foreground">Create stunning physical marketing materials</p>
        </div>
        <Button>
          <Sparkles className="w-4 h-4 mr-2" />
          AI Design Assistant
        </Button>
      </div>

      <Tabs defaultValue="templates" className="space-y-4">
        <TabsList>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="editor">Design Editor</TabsTrigger>
          <TabsTrigger value="saved">Saved Designs</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-4">
          <div className="flex gap-2">
            <Input placeholder="Search templates..." className="flex-1" />
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="events">Events</SelectItem>
                <SelectItem value="sales">Sales</SelectItem>
                <SelectItem value="products">Products</SelectItem>
                <SelectItem value="brand">Branding</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-3">
            {templates.map((template, index) => (
              <Card key={index} className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
                <div className="aspect-[2/3] relative group">
                  <img
                    src={template.image}
                    alt={template.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button variant="secondary">Use Template</Button>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium">{template.name}</h3>
                  <p className="text-sm text-muted-foreground">{template.size}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="editor" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Canvas */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Canvas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-[2/3] bg-white rounded-lg shadow-lg flex items-center justify-center relative overflow-hidden">
                    {/* Example poster design */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 p-12 flex flex-col justify-between">
                      <div>
                        <h2 className="text-white text-4xl font-bold mb-4">SUMMER</h2>
                        <h3 className="text-white text-6xl font-bold">FESTIVAL</h3>
                      </div>
                      <div className="text-white">
                        <p className="text-xl mb-2">June 15-17, 2026</p>
                        <p className="text-lg">Downtown Central Park</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" className="flex-1">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Printer className="w-4 h-4 mr-2" />
                      Print
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tools Panel */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Design Tools</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-2">
                    <Button variant="outline" size="sm" className="flex flex-col h-auto py-3">
                      <Type className="w-5 h-5 mb-1" />
                      <span className="text-xs">Text</span>
                    </Button>
                    <Button variant="outline" size="sm" className="flex flex-col h-auto py-3">
                      <ImageIcon className="w-5 h-5 mb-1" />
                      <span className="text-xs">Image</span>
                    </Button>
                    <Button variant="outline" size="sm" className="flex flex-col h-auto py-3">
                      <Palette className="w-5 h-5 mb-1" />
                      <span className="text-xs">Color</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Text Properties</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="text-content">Text</Label>
                    <Input id="text-content" placeholder="Enter text..." />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="font-family">Font</Label>
                    <Select defaultValue="inter">
                      <SelectTrigger id="font-family">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="inter">Inter</SelectItem>
                        <SelectItem value="roboto">Roboto</SelectItem>
                        <SelectItem value="playfair">Playfair Display</SelectItem>
                        <SelectItem value="montserrat">Montserrat</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="font-size">Size: {fontSize[0]}px</Label>
                    <Slider
                      id="font-size"
                      value={fontSize}
                      onValueChange={setFontSize}
                      min={12}
                      max={120}
                      step={1}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="text-color">Color</Label>
                    <div className="flex gap-2">
                      <Input id="text-color" type="color" defaultValue="#000000" className="h-10" />
                      <Input placeholder="#000000" className="flex-1" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Poster Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="poster-size">Size</Label>
                    <Select defaultValue="24x36">
                      <SelectTrigger id="poster-size">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="18x24">18" x 24"</SelectItem>
                        <SelectItem value="24x36">24" x 36"</SelectItem>
                        <SelectItem value="27x40">27" x 40"</SelectItem>
                        <SelectItem value="custom">Custom Size</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="orientation">Orientation</Label>
                    <Select defaultValue="portrait">
                      <SelectTrigger id="orientation">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="portrait">Portrait</SelectItem>
                        <SelectItem value="landscape">Landscape</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quality">Print Quality</Label>
                    <Select defaultValue="high">
                      <SelectTrigger id="quality">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard (300 DPI)</SelectItem>
                        <SelectItem value="high">High (600 DPI)</SelectItem>
                        <SelectItem value="premium">Premium (1200 DPI)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="saved" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            {savedDesigns.map((design, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="aspect-[2/3] relative">
                  <img
                    src={design.image}
                    alt={design.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        design.status === "Ready"
                          ? "bg-green-500 text-white"
                          : "bg-yellow-500 text-white"
                      }`}
                    >
                      {design.status}
                    </span>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium">{design.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{design.date}</p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Download className="w-3 h-3 mr-1" />
                      Export
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Print Partners</CardTitle>
              <CardDescription>Order professional prints directly</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { name: "PrintHub Pro", turnaround: "2-3 days", price: "$25-$50" },
                { name: "QuickPrint Express", turnaround: "1-2 days", price: "$35-$65" },
                { name: "Premium Prints Co.", turnaround: "3-5 days", price: "$20-$45" },
              ].map((partner, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg border"
                >
                  <div>
                    <p className="font-medium">{partner.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {partner.turnaround} • {partner.price}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Order
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
