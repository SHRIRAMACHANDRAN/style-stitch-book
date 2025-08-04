import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, Ruler } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data - replace with actual Supabase data
const mockBookings = [
  {
    id: "BK001",
    designId: "RN001",
    designName: "Elegant Evening Gown",
    customerName: "Sarah Johnson",
    phone: "+1234567890",
    status: "In Progress",
    bookingDate: "2024-08-01",
    measurements: {
      "Bust": "36 inches",
      "Waist": "28 inches", 
      "Hip": "38 inches",
      "Length": "60 inches"
    },
    extraRequirements: "Please use silk fabric in navy blue"
  },
  {
    id: "BK002",
    designId: "RN002",
    designName: "Traditional Saree Blouse",
    customerName: "Priya Sharma",
    phone: "+1234567891",
    status: "Completed",
    bookingDate: "2024-07-28",
    measurements: {
      "Bust": "34 inches",
      "Waist": "26 inches",
      "Blouse Length": "15 inches"
    },
    extraRequirements: ""
  }
];

const Bookings = () => {
  const [bookings, setBookings] = useState(mockBookings);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Your Bookings</h1>
          <p className="text-muted-foreground">Track the status of your custom orders</p>
        </div>

        {bookings.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">You don't have any bookings yet.</p>
            <Button asChild>
              <Link to="/designs">Browse Designs</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <Card key={booking.id} className="w-full">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <CardTitle className="text-xl">{booking.designName}</CardTitle>
                      <p className="text-sm text-muted-foreground">Booking #{booking.id}</p>
                    </div>
                    <Badge className={getStatusColor(booking.status)}>
                      {booking.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          <strong>Customer:</strong> {booking.customerName}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          <strong>Booked:</strong> {new Date(booking.bookingDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          <strong>Design ID:</strong> #{booking.designId}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <Ruler className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div className="text-sm">
                          <strong>Measurements:</strong>
                          <div className="mt-1 space-y-1">
                            {Object.entries(booking.measurements).map(([key, value]) => (
                              <div key={key} className="flex justify-between">
                                <span className="text-muted-foreground">{key}:</span>
                                <span>{value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {booking.extraRequirements && (
                    <div className="pt-3 border-t">
                      <p className="text-sm">
                        <strong>Special Requirements:</strong> {booking.extraRequirements}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookings;