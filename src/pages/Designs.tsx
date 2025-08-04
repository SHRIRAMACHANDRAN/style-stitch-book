import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data - replace with actual Supabase data
const mockDesigns = [
  {
    id: "RN001",
    name: "Elegant Evening Gown",
    image: "/placeholder.svg",
    measurements: ["Bust", "Waist", "Hip", "Length", "Shoulder Width"],
    category: "Evening Wear"
  },
  {
    id: "RN002", 
    name: "Traditional Saree Blouse",
    image: "/placeholder.svg",
    measurements: ["Bust", "Waist", "Blouse Length", "Sleeve Length", "Shoulder Width"],
    category: "Traditional"
  },
  {
    id: "RN003",
    name: "Business Suit",
    image: "/placeholder.svg", 
    measurements: ["Chest", "Waist", "Hip", "Jacket Length", "Sleeve Length", "Trouser Length"],
    category: "Formal"
  }
];

const Designs = () => {
  const [designs, setDesigns] = useState(mockDesigns);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredDesigns, setFilteredDesigns] = useState(mockDesigns);

  useEffect(() => {
    // Get search query from URL params
    const urlParams = new URLSearchParams(window.location.search);
    const search = urlParams.get('search');
    if (search) {
      setSearchQuery(search);
    }
  }, []);

  useEffect(() => {
    const filtered = designs.filter(design => 
      design.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      design.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredDesigns(filtered);
  }, [searchQuery, designs]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Our Design Collection</h1>
          <p className="text-muted-foreground">Browse our exclusive designs and book your perfect outfit</p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="max-w-md mx-auto mb-8">
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Search by design name or reference ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" variant="outline">
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </form>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Showing {filteredDesigns.length} design{filteredDesigns.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Designs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDesigns.map((design) => (
            <Card key={design.id} className="overflow-hidden">
              <CardHeader className="p-0">
                <img
                  src={design.image}
                  alt={design.name}
                  className="w-full h-48 object-cover"
                />
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-lg">{design.name}</CardTitle>
                  <Badge variant="secondary">#{design.id}</Badge>
                </div>
                <Badge variant="outline" className="mb-4">{design.category}</Badge>
                
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Required Measurements:</h4>
                  <div className="flex flex-wrap gap-1">
                    {design.measurements.map((measurement, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {measurement}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button asChild className="w-full">
                  <Link to={`/book/${design.id}`}>
                    <BookOpen className="h-4 w-4 mr-2" />
                    Book this Design
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredDesigns.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No designs found matching your search.</p>
            <Button
              variant="outline"
              onClick={() => setSearchQuery("")}
              className="mt-4"
            >
              Show All Designs
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Designs;