import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Scissors, Star, Users, Clock } from "lucide-react";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to designs page with search query
      window.location.href = `/designs?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  const features = [
    {
      icon: <Scissors className="h-8 w-8 text-primary" />,
      title: "Expert Tailoring",
      description: "Professional stitching with years of experience"
    },
    {
      icon: <Star className="h-8 w-8 text-primary" />,
      title: "Premium Quality",
      description: "High-quality fabrics and attention to detail"
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Custom Designs",
      description: "Personalized designs to match your style"
    },
    {
      icon: <Clock className="h-8 w-8 text-primary" />,
      title: "Quick Delivery",
      description: "Fast turnaround time without compromising quality"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Welcome to{" "}
            <span className="text-primary">Renu's Tailoring</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover beautiful custom designs and book your perfect outfit with our expert tailoring services
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-md mx-auto mb-8">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Search designs by name or reference ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" className="px-6">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </form>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/designs">Browse Designs</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/bookings">Your Bookings</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Renu's Tailoring?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="mx-auto mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Browse our collection of designs and book your custom outfit today
          </p>
          <Button asChild size="lg">
            <Link to="/designs">Explore Designs</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;