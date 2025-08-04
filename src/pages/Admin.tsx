import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Plus, Trash2 } from "lucide-react";

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Set to true for demo
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [newDesign, setNewDesign] = useState({
    name: "",
    category: "",
    measurements: [""],
    image: null as File | null
  });

  // Mock bookings data
  const mockBookings = [
    {
      id: "BK001",
      designId: "RN001",
      designName: "Elegant Evening Gown",
      customerName: "Sarah Johnson",
      phone: "+1234567890",
      status: "In Progress",
      bookingDate: "2024-08-01"
    }
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple demo login - replace with actual authentication
    if (loginData.username === "admin" && loginData.password === "password") {
      setIsLoggedIn(true);
    } else {
      alert("Invalid credentials. Use admin/password for demo.");
    }
  };

  const handleAddMeasurement = () => {
    setNewDesign(prev => ({
      ...prev,
      measurements: [...prev.measurements, ""]
    }));
  };

  const handleRemoveMeasurement = (index: number) => {
    setNewDesign(prev => ({
      ...prev,
      measurements: prev.measurements.filter((_, i) => i !== index)
    }));
  };

  const handleMeasurementChange = (index: number, value: string) => {
    setNewDesign(prev => ({
      ...prev,
      measurements: prev.measurements.map((m, i) => i === index ? value : m)
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewDesign(prev => ({ ...prev, image: file }));
    }
  };

  const handleSubmitDesign = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle design submission to Supabase
    console.log("Submitting design:", newDesign);
    alert("Design uploaded successfully!");
    setNewDesign({ name: "", category: "", measurements: [""], image: null });
  };

  const updateBookingStatus = (bookingId: string, newStatus: string) => {
    // Handle status update
    console.log(`Updating booking ${bookingId} to ${newStatus}`);
    alert(`Booking status updated to ${newStatus}`);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={loginData.username}
                  onChange={(e) => setLoginData(prev => ({ ...prev, username: e.target.value }))}
                  placeholder="Enter username"
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                  placeholder="Enter password"
                />
              </div>
              <Button type="submit" className="w-full">Login</Button>
              <p className="text-sm text-muted-foreground text-center">
                Demo: admin / password
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Button variant="outline" onClick={() => setIsLoggedIn(false)}>
            Logout
          </Button>
        </div>

        <Tabs defaultValue="designs" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="designs">Upload Designs</TabsTrigger>
            <TabsTrigger value="bookings">Manage Bookings</TabsTrigger>
          </TabsList>

          <TabsContent value="designs">
            <Card>
              <CardHeader>
                <CardTitle>Upload New Design</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitDesign} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="designName">Design Name</Label>
                      <Input
                        id="designName"
                        value={newDesign.name}
                        onChange={(e) => setNewDesign(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Enter design name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Input
                        id="category"
                        value={newDesign.category}
                        onChange={(e) => setNewDesign(prev => ({ ...prev, category: e.target.value }))}
                        placeholder="e.g., Evening Wear, Traditional"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Design Image</Label>
                    <div className="mt-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="imageUpload"
                      />
                      <Label htmlFor="imageUpload" className="cursor-pointer">
                        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors">
                          <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">
                            {newDesign.image ? newDesign.image.name : "Click to upload image"}
                          </p>
                        </div>
                      </Label>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label>Required Measurements</Label>
                      <Button type="button" variant="outline" size="sm" onClick={handleAddMeasurement}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Measurement
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {newDesign.measurements.map((measurement, index) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            value={measurement}
                            onChange={(e) => handleMeasurementChange(index, e.target.value)}
                            placeholder="e.g., Bust, Waist, Length"
                            className="flex-1"
                          />
                          {newDesign.measurements.length > 1 && (
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              onClick={() => handleRemoveMeasurement(index)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button type="submit" className="w-full">Upload Design</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>Customer Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockBookings.map((booking) => (
                    <div key={booking.id} className="border rounded-lg p-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <h3 className="font-medium">{booking.designName}</h3>
                          <p className="text-sm text-muted-foreground">
                            Customer: {booking.customerName} | Phone: {booking.phone}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Booking: #{booking.id} | Design: #{booking.designId}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge>{booking.status}</Badge>
                          <Select
                            value={booking.status}
                            onValueChange={(value) => updateBookingStatus(booking.id, value)}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Pending">Pending</SelectItem>
                              <SelectItem value="In Progress">In Progress</SelectItem>
                              <SelectItem value="Completed">Completed</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;