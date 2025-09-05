"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Mail, Send, TestTube, AlertCircle, CheckCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function AdminEmailsPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [emailType, setEmailType] = useState<string>("");
  const [formData, setFormData] = useState({
    email: "",
    orderId: "",
    userId: "",
    subject: "",
    html: "",
    text: "",
    trackingNumber: "",
    carrier: "",
    failureReason: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleTestEmail = async () => {
    if (!formData.email) {
      toast({
        title: "Error",
        description: "Please enter a test email address",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/admin/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "test",
          email: formData.email,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Success",
          description: "Test email sent successfully!",
        });
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to send test email",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send test email",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendEmail = async () => {
    if (!emailType) {
      toast({
        title: "Error",
        description: "Please select an email type",
        variant: "destructive",
      });
      return;
    }

    // Validation based on email type
    if ((emailType === "order_confirmation" || emailType === "order_shipped" || emailType === "payment_failed") && !formData.orderId) {
      toast({
        title: "Error",
        description: "Order ID is required for this email type",
        variant: "destructive",
      });
      return;
    }

    if (emailType === "welcome" && !formData.userId) {
      toast({
        title: "Error",
        description: "User ID is required for welcome emails",
        variant: "destructive",
      });
      return;
    }

    if (emailType === "custom" && (!formData.email || !formData.subject || !formData.html)) {
      toast({
        title: "Error",
        description: "Email, subject and HTML content are required",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const payload: any = {
        type: emailType,
      };

      // Add specific data based on email type
      if (emailType === "custom") {
        payload.email = formData.email;
        payload.customData = {
          subject: formData.subject,
          html: formData.html,
          text: formData.text,
        };
      } else if (emailType === "order_shipped") {
        payload.orderId = formData.orderId;
        payload.customData = {
          trackingInfo: {
            trackingNumber: formData.trackingNumber,
            carrier: formData.carrier,
          },
        };
      } else if (emailType === "payment_failed") {
        payload.orderId = formData.orderId;
        payload.customData = {
          reason: formData.failureReason,
        };
      } else {
        payload.orderId = formData.orderId;
        payload.userId = formData.userId;
      }

      const response = await fetch("/api/admin/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Success",
          description: "Email sent successfully!",
        });
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to send email",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send email",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Email Management</h1>
        <p className="text-muted-foreground">
          Send automated emails and test email functionality
        </p>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          <strong>Note:</strong> Make sure your email configuration is set up in the environment variables.
          Check the console for any email sending errors.
        </AlertDescription>
      </Alert>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TestTube className="h-5 w-5" />
              Test Email
            </CardTitle>
            <CardDescription>
              Send a test email to verify your email configuration
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="testEmail">Test Email Address</Label>
              <Input
                id="testEmail"
                type="email"
                placeholder="test@example.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            </div>
            <Button
              onClick={handleTestEmail}
              disabled={isLoading}
              className="w-full"
            >
              <Send className="mr-2 h-4 w-4" />
              Send Test Email
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Send Automated Email
            </CardTitle>
            <CardDescription>
              Send specific types of emails manually
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="emailType">Email Type</Label>
              <Select value={emailType} onValueChange={setEmailType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select email type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="order_confirmation">Order Confirmation</SelectItem>
                  <SelectItem value="order_shipped">Order Shipped</SelectItem>
                  <SelectItem value="payment_failed">Payment Failed</SelectItem>
                  <SelectItem value="welcome">Welcome Email</SelectItem>
                  <SelectItem value="custom">Custom Email</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {(emailType === "order_confirmation" || emailType === "order_shipped" || emailType === "payment_failed") && (
              <div>
                <Label htmlFor="orderId">Order ID</Label>
                <Input
                  id="orderId"
                  placeholder="Enter order ID"
                  value={formData.orderId}
                  onChange={(e) => handleInputChange("orderId", e.target.value)}
                />
              </div>
            )}

            {emailType === "welcome" && (
              <div>
                <Label htmlFor="userId">User ID</Label>
                <Input
                  id="userId"
                  placeholder="Enter user ID"
                  value={formData.userId}
                  onChange={(e) => handleInputChange("userId", e.target.value)}
                />
              </div>
            )}

            {emailType === "order_shipped" && (
              <>
                <div>
                  <Label htmlFor="trackingNumber">Tracking Number</Label>
                  <Input
                    id="trackingNumber"
                    placeholder="Enter tracking number"
                    value={formData.trackingNumber}
                    onChange={(e) => handleInputChange("trackingNumber", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="carrier">Carrier</Label>
                  <Input
                    id="carrier"
                    placeholder="e.g., UPS, FedEx, DHL"
                    value={formData.carrier}
                    onChange={(e) => handleInputChange("carrier", e.target.value)}
                  />
                </div>
              </>
            )}

            {emailType === "payment_failed" && (
              <div>
                <Label htmlFor="failureReason">Failure Reason</Label>
                <Input
                  id="failureReason"
                  placeholder="Reason for payment failure"
                  value={formData.failureReason}
                  onChange={(e) => handleInputChange("failureReason", e.target.value)}
                />
              </div>
            )}

            {emailType === "custom" && (
              <>
                <div>
                  <Label htmlFor="customEmail">Recipient Email</Label>
                  <Input
                    id="customEmail"
                    type="email"
                    placeholder="recipient@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="Email subject"
                    value={formData.subject}
                    onChange={(e) => handleInputChange("subject", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="html">HTML Content</Label>
                  <Textarea
                    id="html"
                    placeholder="Enter HTML content"
                    rows={6}
                    value={formData.html}
                    onChange={(e) => handleInputChange("html", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="text">Text Content (Optional)</Label>
                  <Textarea
                    id="text"
                    placeholder="Enter plain text content"
                    rows={3}
                    value={formData.text}
                    onChange={(e) => handleInputChange("text", e.target.value)}
                  />
                </div>
              </>
            )}

            <Button
              onClick={handleSendEmail}
              disabled={isLoading || !emailType}
              className="w-full"
            >
              <Send className="mr-2 h-4 w-4" />
              Send Email
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Email Configuration Status</CardTitle>
          <CardDescription>
            Current email service configuration
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium">SMTP Configuration</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Host: {process.env.NEXT_PUBLIC_EMAIL_SMTP_HOST || 'smtp.gmail.com'}
              </p>
              <p className="text-xs text-muted-foreground">
                Port: {process.env.NEXT_PUBLIC_EMAIL_SMTP_PORT || '587'}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium">Email Templates</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Order Confirmation ✓
              </p>
              <p className="text-xs text-muted-foreground">
                Order Shipped ✓
              </p>
              <p className="text-xs text-muted-foreground">
                Payment Failed ✓
              </p>
              <p className="text-xs text-muted-foreground">
                Welcome Email ✓
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
