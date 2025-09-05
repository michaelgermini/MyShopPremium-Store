"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface SearchSuggestion {
  id: string;
  name: string;
  category?: string;
  type: "product" | "category";
}

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const router = useRouter();

  // Load recent searches from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('recentSearches');
    if (stored) {
      try {
        setRecentSearches(JSON.parse(stored));
      } catch (error) {
        console.error('Error loading recent searches:', error);
      }
    }
  }, []);

  // Mock suggestions - in a real app, this would come from an API
  useEffect(() => {
    if (query.length > 0) {
      const mockSuggestions: SearchSuggestion[] = [
        { id: "1", name: "Wireless Headphones", category: "Electronics", type: "product" },
        { id: "2", name: "Bluetooth Speaker", category: "Electronics", type: "product" },
        { id: "3", name: "Running Shoes", category: "Sports", type: "product" },
        { id: "4", name: "Coffee Maker", category: "Home", type: "product" },
        { id: "electronics", name: "Electronics", type: "category" },
        { id: "sports", name: "Sports", type: "category" },
        { id: "home", name: "Home", type: "category" },
      ].filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.category?.toLowerCase().includes(query.toLowerCase())
      );

      setSuggestions(mockSuggestions);
      setIsOpen(true);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  }, [query]);

  const handleSearch = (searchQuery: string) => {
    if (searchQuery.trim()) {
      // Add to recent searches
      const updated = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem('recentSearches', JSON.stringify(updated));

      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsOpen(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(query);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-2 sm:px-0">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search products, categories..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 pr-4 h-12 text-base w-full"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground p-1"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border rounded-md shadow-lg max-h-80 overflow-y-auto">
            <div className="p-2">
              {suggestions.length > 0 ? (
                <div className="space-y-1">
                  {suggestions.map((suggestion) => (
                    <button
                      key={suggestion.id}
                      onClick={() => {
                        setQuery(suggestion.name);
                        handleSearch(suggestion.name);
                      }}
                      className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 flex items-center justify-between"
                    >
                      <div>
                        <span className="font-medium">{suggestion.name}</span>
                        {suggestion.category && (
                          <span className="text-sm text-muted-foreground ml-2">
                            in {suggestion.category}
                          </span>
                        )}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {suggestion.type}
                      </Badge>
                    </button>
                  ))}
                </div>
              ) : query.length > 0 ? (
                <div className="text-center py-4 text-muted-foreground">
                  No results found for &quot;{query}&quot;
                </div>
              ) : (
                recentSearches.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-muted-foreground">
                        Recent searches
                      </span>
                      <button
                        onClick={clearRecentSearches}
                        className="text-xs text-muted-foreground hover:text-foreground"
                      >
                        Clear
                      </button>
                    </div>
                    <div className="space-y-1">
                      {recentSearches.map((search, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setQuery(search);
                            handleSearch(search);
                          }}
                          className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 flex items-center text-sm"
                        >
                          <Search className="h-3 w-3 mr-2 text-muted-foreground" />
                          {search}
                        </button>
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </form>

      {/* Quick category buttons */}
      <div className="flex flex-wrap gap-2 mt-4 justify-center">
        {["Electronics", "Clothing", "Home", "Sports", "Books"].map((category) => (
          <Button
            key={category}
            variant="outline"
            size="sm"
            onClick={() => handleSearch(category)}
            className="text-xs"
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
}
