"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Loader2, X, Link as LinkIcon } from "lucide-react";

interface AchievementFormProps {
    onClose: () => void;
    onSuccess: () => void;
    initialData?: any;
}

export function AchievementForm({ onClose, onSuccess, initialData }: AchievementFormProps) {
    const [loading, setLoading] = useState(false);
    const supabase = createClient();

    // Form States
    const [title, setTitle] = useState(initialData?.title || "");
    const [description, setDescription] = useState(initialData?.description || "");
    const [type, setType] = useState(initialData?.type || "milestone");
    const [date, setDate] = useState(
        initialData?.date || new Date().toISOString().split('T')[0]
    );
    const [imageUrl, setImageUrl] = useState(initialData?.image_url || "");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const achievementData = {
                title,
                description,
                type,
                date,
                image_url: imageUrl || null,
            };

            let error;
            if (initialData?.id) {
                // Update existing achievement
                ({ error } = await supabase
                    .from("achievements")
                    .update(achievementData)
                    .eq("id", initialData.id));
            } else {
                // Insert new achievement
                ({ error } = await supabase.from("achievements").insert(achievementData));
            }

            if (error) throw error;
            onSuccess();
            onClose();
        } catch (error: any) {
            console.error("Error saving achievement:", error);
            alert(`Failed to save achievement: ${error.message || "Unknown error"}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg border bg-card p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">
                        {initialData ? "Edit Achievement" : "Add New Achievement"}
                    </h2>
                    <button onClick={onClose} className="hover:bg-accent p-1 rounded">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Title</label>
                        <input
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full rounded-md border border-input bg-background px-3 py-2"
                            placeholder="Won Hackathon 2024"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Type</label>
                            <select
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                className="w-full rounded-md border border-input bg-background px-3 py-2"
                            >
                                <option value="milestone">Milestone</option>
                                <option value="award">Award</option>
                                <option value="certification">Certification</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Date</label>
                            <input
                                type="date"
                                required
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full rounded-md border border-input bg-background px-3 py-2"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <textarea
                            required
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full rounded-md border border-input bg-background px-3 py-2 min-h-[100px]"
                            placeholder="Describe this achievement..."
                        />
                    </div>

                    {/* Image URL Input */}
                    <div className="space-y-3">
                        <label className="block text-sm font-medium">
                            <LinkIcon className="inline h-4 w-4 mr-1" />
                            Achievement Image URL (Optional)
                        </label>

                        {/* Image Preview */}
                        {imageUrl && (
                            <div className="relative w-full h-48 rounded-lg border border-border overflow-hidden">
                                <img
                                    src={imageUrl}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.currentTarget.src = '';
                                        e.currentTarget.alt = 'Failed to load image';
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setImageUrl("")}
                                    className="absolute top-2 right-2 p-1 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                        )}

                        <input
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            className="w-full rounded-md border border-input bg-background px-3 py-2"
                            placeholder="https://example.com/image.png or /image-name.png"
                        />
                        <p className="text-xs text-muted-foreground">
                            💡 Tip: Upload your image to the <code className="bg-muted px-1 rounded">public</code> folder and use <code className="bg-muted px-1 rounded">/image-name.png</code>
                        </p>
                    </div>

                    <div className="pt-2 flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium hover:bg-accent rounded-md"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 rounded-md flex items-center disabled:opacity-50"
                        >
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {loading ? "Saving..." : "Save Achievement"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
