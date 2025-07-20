import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Lock, Plus, Save, X, Upload, Trash2, Edit } from "lucide-react";
import { useSecretCode } from "@/hooks/use-secret-code";
import { useToast } from "@/hooks/use-toast";
import type { ProgressUpdate } from "@shared/schema";

export default function ProgressTracker() {
  const { isAdminMode } = useSecretCode();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newUpdate, setNewUpdate] = useState({
    title: "",
    description: "",
    status: "pending",
    image: null as File | null
  });

  const { data: updates, isLoading } = useQuery<ProgressUpdate[]>({
    queryKey: ["/api/progress"],
  });

  const createMutation = useMutation({
    mutationFn: async (data: { title: string; description: string; status: string; image?: File }) => {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("status", data.status);
      if (data.image) {
        formData.append("image", data.image);
      }

      const response = await fetch("/api/progress", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to create progress update");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/progress"] });
      setNewUpdate({ title: "", description: "", status: "pending", image: null });
      setIsEditing(false);
      toast({
        title: "Success",
        description: "Progress update created successfully!",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create progress update. Please try again.",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/progress/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete progress update");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/progress"] });
      toast({
        title: "Success",
        description: "Progress update deleted successfully!",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete progress update. Please try again.",
        variant: "destructive",
      });
    },
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-400";
      case "in-progress":
        return "bg-yellow-400";
      case "pending":
        return "bg-text-secondary";
      default:
        return "bg-text-secondary";
    }
  };

  const getStatusTextColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-400";
      case "in-progress":
        return "text-yellow-400";
      case "pending":
        return "text-text-secondary";
      default:
        return "text-text-secondary";
    }
  };

  const handleSubmit = () => {
    if (!newUpdate.title.trim() || !newUpdate.description.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    createMutation.mutate(newUpdate);
  };

  const handleCancel = () => {
    setNewUpdate({ title: "", description: "", status: "pending", image: null });
    setIsEditing(false);
    setEditingId(null);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this progress update?")) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) {
    return (
      <Card className="bg-midnight border border-border-dark">
        <CardContent className="p-6">
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-start space-x-3 animate-pulse">
                <div className="w-2 h-2 bg-border-dark rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-border-dark rounded w-3/4"></div>
                  <div className="h-3 bg-border-dark rounded w-full"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-midnight border border-border-dark">
      <CardContent className="p-6">
        <div className="space-y-4">
          {updates?.map((update) => (
            <div key={update.id} className="flex items-start space-x-3 group">
              <div className={`w-2 h-2 ${getStatusColor(update.status)} rounded-full mt-2 flex-shrink-0`}></div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className={`font-semibold ${getStatusTextColor(update.status)}`}>
                      {update.title}
                    </h4>
                    <p className="text-text-secondary text-sm">{update.description}</p>
                  </div>
                  {isAdminMode && (
                    <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(update.id)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-accent/20 p-1 h-auto"
                        disabled={deleteMutation.isPending}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
                {update.imageUrl && (
                  <img 
                    src={update.imageUrl} 
                    alt={update.title}
                    className="mt-3 max-w-full max-h-64 object-cover rounded-lg border border-border-dark cursor-pointer hover:border-red-accent transition-colors duration-200"
                    onClick={() => window.open(update.imageUrl!, '_blank')}
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Admin Interface */}
        {isAdminMode && (
          <div className="mt-8 pt-6 border-t border-border-dark">
            <div className="flex items-center mb-4">
              <Lock className="w-5 h-5 text-red-accent mr-2" />
              <h4 className="font-semibold text-red-accent">Admin Mode Active</h4>
            </div>

            {!isEditing ? (
              <Button
                onClick={() => setIsEditing(true)}
                className="bg-red-accent hover:bg-red-hover text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Progress Update
              </Button>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <Input
                    value={newUpdate.title}
                    onChange={(e) => setNewUpdate({ ...newUpdate, title: e.target.value })}
                    placeholder="Progress update title..."
                    className="bg-midnight-light border-border-dark text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <Textarea
                    value={newUpdate.description}
                    onChange={(e) => setNewUpdate({ ...newUpdate, description: e.target.value })}
                    placeholder="Describe the progress..."
                    className="bg-midnight-light border-border-dark text-white min-h-[100px] resize-y"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Status</label>
                  <Select
                    value={newUpdate.status}
                    onValueChange={(value) => setNewUpdate({ ...newUpdate, status: value })}
                  >
                    <SelectTrigger className="bg-midnight-light border-border-dark text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-midnight border-border-dark">
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Image (Optional)</label>
                  <div className="relative border-2 border-dashed border-border-dark rounded-lg p-6 text-center hover:border-red-accent transition-colors duration-200">
                    {newUpdate.image ? (
                      <div className="space-y-2">
                        <div className="w-16 h-16 mx-auto bg-red-accent/20 rounded-lg flex items-center justify-center">
                          <Upload className="w-6 h-6 text-red-accent" />
                        </div>
                        <p className="text-sm text-white">{newUpdate.image.name}</p>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setNewUpdate({ ...newUpdate, image: null })}
                          className="text-red-accent hover:text-red-hover"
                        >
                          Remove
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="w-16 h-16 mx-auto bg-border-dark rounded-lg flex items-center justify-center">
                          <Upload className="w-6 h-6 text-text-secondary" />
                        </div>
                        <p className="text-text-secondary">Click to upload or drag and drop</p>
                        <p className="text-xs text-text-secondary">PNG, JPG, GIF up to 5MB</p>
                      </div>
                    )}
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setNewUpdate({ ...newUpdate, image: e.target.files?.[0] || null })}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button
                    onClick={handleSubmit}
                    disabled={createMutation.isPending}
                    className="bg-red-accent hover:bg-red-hover text-white"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {createMutation.isPending ? "Saving..." : "Save Changes"}
                  </Button>
                  <Button
                    onClick={handleCancel}
                    variant="outline"
                    className="border-red-accent text-red-accent hover:bg-red-accent hover:text-white"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
