
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Upload, FileText, Link } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const DataImport = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [tokenLink, setTokenLink] = useState("");
  const { toast } = useToast();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    setIsUploading(true);
    
    // Simulate file processing
    setTimeout(() => {
      setIsUploading(false);
      toast({
        title: "Upload successful!",
        description: `${files[0].name} has been processed.`,
        variant: "default",
      });
    }, 2000);
  };

  const handleTokenizedLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tokenLink.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid tokenized link",
        variant: "destructive",
      });
      return;
    }

    // Simulate link processing
    toast({
      title: "Processing link...",
      description: "Please wait while we securely access your data.",
    });

    setTimeout(() => {
      toast({
        title: "Success!",
        description: "Bank data has been securely imported.",
      });
      setTokenLink("");
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Data Import</h1>
        <p className="text-muted-foreground">
          Securely import your financial data from various sources.
        </p>
      </div>

      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload">File Upload</TabsTrigger>
          <TabsTrigger value="link">Tokenized Link</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload size={20} />
                Upload Bank Statement
              </CardTitle>
              <CardDescription>
                Upload your bank statement in PDF or CSV format.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="bankStatement">Bank Statement</Label>
                <Input
                  id="bankStatement"
                  type="file"
                  accept=".pdf,.csv"
                  onChange={handleFileUpload}
                  disabled={isUploading}
                />
              </div>
              
              <div className="mt-6 border rounded-md p-4">
                <h3 className="font-medium mb-2">Supported Banks:</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  <div className="p-2 border rounded bg-slate-50 text-center">Bank of America</div>
                  <div className="p-2 border rounded bg-slate-50 text-center">Chase</div>
                  <div className="p-2 border rounded bg-slate-50 text-center">Citibank</div>
                  <div className="p-2 border rounded bg-slate-50 text-center">Wells Fargo</div>
                  <div className="p-2 border rounded bg-slate-50 text-center">Capital One</div>
                  <div className="p-2 border rounded bg-slate-50 text-center">+ others</div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button disabled={isUploading}>
                {isUploading ? "Processing..." : "Upload File"}
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText size={20} />
                How It Works
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">1</div>
                  <div>
                    <h3 className="font-medium">Download your statement</h3>
                    <p className="text-sm text-muted-foreground">
                      Download your monthly statement from your bank's website in PDF or CSV format.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">2</div>
                  <div>
                    <h3 className="font-medium">Upload it securely</h3>
                    <p className="text-sm text-muted-foreground">
                      Upload the file here. All processing happens on your device for maximum security.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">3</div>
                  <div>
                    <h3 className="font-medium">Review imported data</h3>
                    <p className="text-sm text-muted-foreground">
                      Review and confirm the imported transactions before adding them to your budget.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="link" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Link size={20} />
                Import via Tokenized Link
              </CardTitle>
              <CardDescription>
                Use a secure, temporary link from your banking app.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleTokenizedLink} className="space-y-4">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="tokenLink">Secure Bank Link</Label>
                  <Input 
                    id="tokenLink" 
                    placeholder="https://secure.bank.com/share/token123..." 
                    value={tokenLink}
                    onChange={(e) => setTokenLink(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Links are valid for 10 minutes and can only be used once.
                  </p>
                </div>
                
                <Button type="submit" className="mt-4">Import Data</Button>
              </form>
              
              <div className="mt-6 border rounded-md p-4">
                <h3 className="font-medium mb-2">How to get a tokenized link:</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  <li>Open your banking app</li>
                  <li>Find "Share Statement" or "Export Data" option</li>
                  <li>Select "Generate Secure Link"</li>
                  <li>Copy the link and paste it above</li>
                </ol>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Security Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-l-4 border-green-500 pl-3">
                  <div className="text-green-500 font-semibold">End-to-end encryption</div>
                  <div className="text-sm">Your data is encrypted and secure</div>
                </div>
                
                <div className="flex items-center gap-2 border-l-4 border-green-500 pl-3">
                  <div className="text-green-500 font-semibold">Data privacy</div>
                  <div className="text-sm">All processing happens on your device</div>
                </div>
                
                <div className="flex items-center gap-2 border-l-4 border-green-500 pl-3">
                  <div className="text-green-500 font-semibold">No storage</div>
                  <div className="text-sm">We don't store your banking credentials</div>
                </div>
              </div>
              
              <div className="mt-4 relative w-full">
                <AspectRatio ratio={16 / 9}>
                  <div className="w-full h-full bg-slate-100 rounded-md flex items-center justify-center">
                    <p className="text-muted-foreground text-sm">Security diagram illustration</p>
                  </div>
                </AspectRatio>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DataImport;
