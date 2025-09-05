"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Star,
  ThumbsUp,
  MessageSquare,
  User,
  ChevronDown,
  ChevronUp
} from "lucide-react";

interface Review {
  id: string;
  author: string;
  avatar?: string;
  rating: number;
  title: string;
  comment: string;
  date: Date;
  verified: boolean;
  helpful: number;
  images?: string[];
}

interface ProductReviewsProps {
  productId: string;
  reviews?: Review[];
}

// Sample review data
const mockReviews: Review[] = [
  {
    id: "1",
    author: "Marie Dupont",
    avatar: "/avatars/01.png",
    rating: 5,
    title: "Excellent product!",
    comment: "I am very satisfied with this purchase. The quality is excellent and the product matches the description perfectly. Fast delivery and careful packaging.",
    date: new Date("2024-01-15"),
    verified: true,
    helpful: 12,
  },
  {
    id: "2",
    author: "Pierre Martin",
    rating: 4,
    title: "Good product, minor issue",
    comment: "Good quality product, meets my expectations. Only minor issue: the color is slightly different from the one shown in the photos.",
    date: new Date("2024-01-10"),
    verified: true,
    helpful: 8,
  },
  {
    id: "3",
    author: "Sophie Bernard",
    rating: 5,
    title: "Highly recommended",
    comment: "Excellent customer service! Quick response to my questions. Product arrived in perfect condition. I highly recommend this seller.",
    date: new Date("2024-01-08"),
    verified: false,
    helpful: 15,
  }
];

export function ProductReviews({ productId, reviews = mockReviews }: ProductReviewsProps) {
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [helpfulVotes, setHelpfulVotes] = useState<Set<string>>(new Set());

  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 3);

  // Calcul des statistiques
  const totalReviews = reviews.length;
  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews;
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(review => review.rating === rating).length,
    percentage: (reviews.filter(review => review.rating === rating).length / totalReviews) * 100
  }));

  const handleHelpful = (reviewId: string) => {
    setHelpfulVotes(prev => {
      const newVotes = new Set(prev);
      if (newVotes.has(reviewId)) {
        newVotes.delete(reviewId);
      } else {
        newVotes.add(reviewId);
      }
      return newVotes;
    });
  };

  const renderStars = (rating: number, size: "sm" | "md" = "sm") => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${
              size === "sm" ? "h-4 w-4" : "h-5 w-5"
            } ${
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Statistiques des avis */}
      <Card>
        <CardHeader>
                  <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Customer Reviews ({totalReviews})
        </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Note globale */}
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">
                {averageRating.toFixed(1)}
              </div>
              {renderStars(Math.round(averageRating), "md")}
              <p className="text-sm text-muted-foreground mt-2">
                Based on {totalReviews} reviews
              </p>
            </div>

            {/* Rating Distribution */}
            <div className="space-y-2">
              {ratingDistribution.map(({ rating, count, percentage }) => (
                <div key={rating} className="flex items-center gap-3">
                  <span className="text-sm font-medium w-6">{rating}</span>
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Progress value={percentage} className="flex-1 h-2" />
                  <span className="text-sm text-muted-foreground w-8">
                    {count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Liste des avis */}
      <div className="space-y-4">
        {displayedReviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={review.avatar} alt={review.author} />
                  <AvatarFallback>
                    <User className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{review.author}</span>
                        {review.verified && (
                          <Badge variant="secondary" className="text-xs">
                            Verified Purchase
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        {renderStars(review.rating)}
                        <span className="text-sm text-muted-foreground">
                          {review.date.toLocaleDateString('en-US')}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">{review.title}</h4>
                    <p className="text-muted-foreground">{review.comment}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleHelpful(review.id)}
                      className={`h-auto p-2 ${
                        helpfulVotes.has(review.id)
                          ? "text-primary bg-primary/10"
                          : ""
                      }`}
                    >
                      <ThumbsUp className="h-4 w-4 mr-2" />
                      Helpful ({helpfulVotes.has(review.id) ? review.helpful + 1 : review.helpful})
                    </Button>

                    {review.images && review.images.length > 0 && (
                      <div className="flex gap-2">
                        {review.images.map((image, index) => (
                          <Image
                            key={index}
                            src={image}
                            alt={`Review image ${index + 1}`}
                            width={64}
                            height={64}
                            className="w-16 h-16 object-cover rounded cursor-pointer hover:opacity-80"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {reviews.length > 3 && (
          <div className="text-center">
            <Button
              variant="outline"
              onClick={() => setShowAllReviews(!showAllReviews)}
              className="w-full md:w-auto"
            >
              {showAllReviews ? (
                <>
                  <ChevronUp className="h-4 w-4 mr-2" />
                  See fewer reviews
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4 mr-2" />
                  See all reviews ({reviews.length - 3} more)
                </>
              )}
            </Button>
          </div>
        )}
      </div>

      {/* Bouton pour laisser un avis */}
      <Card>
        <CardContent className="p-6 text-center">
          <h3 className="font-semibold mb-2">Have you purchased this product?</h3>
          <p className="text-muted-foreground mb-4">
            Share your experience to help other customers
          </p>
          <Button>
            <MessageSquare className="h-4 w-4 mr-2" />
            Write a review
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
