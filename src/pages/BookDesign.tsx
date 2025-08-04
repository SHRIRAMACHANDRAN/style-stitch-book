import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, User, Phone, Ruler } from "lucide-react";

// Mock design data
const mockDesigns = {
  "RN001": {
    id: "RN001",
    name: "Elegant Evening Gown",
    image: "/placeholder.svg",
    measurements: ["Bust", "Waist", "Hip", "Length", "Shoulder Width"],
    category: "Evening Wear"
  },
  "RN002": {
    id: "RN002", 
    name: "Traditional Saree Blouse",
    image: "/placeholder.svg",
    measurements: ["Bust", "Waist", "Blouse Length", "Sleeve Length", "Shoulder Width"],
    category: "Traditional"
  }
};

const BookDesign = () => {
  const { designId } = useParams();
  const navigate = useNavigate();
  const [design, setDesign] = useState<any>(null);
  const [unit, setUnit] = useState("inches");
  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    extraRequirements: "",
    measurements: {} as Record<string, string>
  });

  useEffect(() => {
    if (designId && mockDesigns[designId as keyof typeof mockDesigns]) {
      const designData = mockDesigns[designId as keyof typeof mockDesigns];
      setDesign(designData);
      
      // Initialize measurements object
      const initialMeasurements = designData.measurements.reduce((acc, measurement) => {
        acc[measurement] = "";
        return acc;
      }, {} as Record<string, string>);
      
      setFormData(prev => ({ ...prev, measurements: initialMeasurements }));
    }
  }, [designId]);

  const handleMeasurementChange = (measurement: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      measurements: {
        ...prev.measurements,
        [measurement]: value
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.customerName || !formData.phone) {
      alert("Please fill in all required fields.");
      return;
    }

    // Validate measurements
    const emptyMeasurements = Object.entries(formData.measurements).filter(([_, value]) => !value);
    if (emptyMeasurements.length > 0) {
      alert("Please provide all required measurements.");
      return;
    }

    // Submit booking
    const bookingData = {
      designId: design.id,
      designName: design.name,
      ...formData,
      unit,
      bookingDate: new Date().toISOString(),
      status: "Pending"
    };

    console.log("Booking submitted:", bookingData);
    alert("Booking submitted successfully! You will be contacted soon.");
    navigate("/bookings");
  };

  if (!design) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Design not found</p>
          <Button onClick={() => navigate("/designs")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Designs
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto max-w-2xl">
        <Button
          variant="outline"
          onClick={() => navigate("/designs")}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Designs
        </Button>

        <div className="space-y-6">
          {/* Design Preview */}
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row gap-4">
                <img
                  src={design.image}
                  alt={design.name}
                  className="w-32 h-32 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <CardTitle className="text-xl">{design.name}</CardTitle>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="secondary">#{design.id}</Badge>
                    <Badge variant="outline">{design.category}</Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Booking Form */}
          <Card>
            <CardHeader>
              <CardTitle>Book This Design</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Customer Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Customer Information
                  </h3>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="customerName">Full Name *</Label>
                      <Input
                        id="customerName"
                        value={formData.customerName}
                        onChange={(e) => setFormData(prev => ({ ...prev, customerName: e.target.value }))}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="Enter your phone number"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Measurements */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium flex items-center gap-2">
                      <Ruler className="h-5 w-5" />
                      Measurements
                    </h3>
                    <Select value={unit} onValueChange={setUnit}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="inches">Inches</SelectItem>
                        <SelectItem value="cm">Centimeters</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {design.measurements.map((measurement: string) => (
                      <div key={measurement}>
                        <Label htmlFor={measurement}>
                          {measurement} ({unit}) *
                        </Label>
                        <Input
                          id={measurement}
                          type="number"
                          step="0.1"
                          value={formData.measurements[measurement] || ""}
                          onChange={(e) => handleMeasurementChange(measurement, e.target.value)}
                          placeholder={`Enter ${measurement.toLowerCase()}`}
                          required
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Extra Requirements */}
                <div className="space-y-2">
                  <Label htmlFor="extraRequirements">
                    Special Requirements (Optional)
                  </Label>
                  <Textarea
                    id="extraRequirements"
                    value={formData.extraRequirements}
                    onChange={(e) => setFormData(prev => ({ ...prev, extraRequirements: e.target.value }))}
                    placeholder="Any special requirements, fabric preferences, color choices, etc."
                    rows={3}
                  />
                </div>

                <Button type="submit" className="w-full" size="lg">
                  Submit Booking Request
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BookDesign;