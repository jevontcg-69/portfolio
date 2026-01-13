"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Loader2, X, Link as LinkIcon } from "lucide-react";

interface ProjectFormProps {
    onClose: () => void;
    onSuccess: () => void;
    initialData?: any;
}

export function ProjectForm({ onClose, onSuccess, initialData }: ProjectFormProps) {
    const [loading, setLoading] = useState(false);
    const supabase = createClient();

    // Form States
    const [title, setTitle] = useState(initialData?.title || "");
    const [description, setDescription] = useState(initialData?.description || "");
    const [category, setCategory] = useState(initialData?.category || "Web Development");
    const [techStack, setTechStack] = useState(
        initialData?.tech_stack ? initialData.tech_stack.join(", ") : ""
    );
    const [github, setGithub] = useState(initialData?.github_link || "");
    const [demo, setDemo] = useState(initialData?.demo_link || "");
    const [imageUrl, setImageUrl] = useState(initialData?.image_url || "");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const projectData = {
                title,
                description,
                category,
                tech_stack: techStack.split(",").map((t: string) => t.trim()).filter(Boolean),
                image_url: imageUrl || null,
                github_link: github || null,
                demo_link: demo || null,
                display_order: 0,
            };

            let error;
            if (initialData?.id) {
                // Update existing project
                ({ error } = await supabase
                    .from("projects")
                    .update(projectData)
                    .eq("id", initialData.id));
            } else {
                // Insert new project
                ({ error } = await supabase.from("projects").insert(projectData));
            }

            if (error) throw error;
            onSuccess();
            onClose();
        } catch (error: any) {
            console.error("Error saving project:", error);
            alert(`Failed to save project: ${error.message || "Unknown error"}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg border bg-card p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">
                        {initialData ? "Edit Project" : "Add New Project"}
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
                            placeholder="Portfolio Website"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Category</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full rounded-md border border-input bg-background px-3 py-2"
                        >
                            <option>Web Development</option>
                            <option>Data Analysis</option>
                            <option>Automation</option>
                            <option>Other</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <textarea
                            required
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full rounded-md border border-input bg-background px-3 py-2 min-h-[100px]"
                            placeholder="Brief description of the project..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Tech Stack (comma separated)</label>
                        <input
                            value={techStack}
                            onChange={(e) => setTechStack(e.target.value)}
                            className="w-full rounded-md border border-input bg-background px-3 py-2"
                            placeholder="Next.js, Python, Supabase"
                        />
                    </div>

                    {/* Image URL Input */}
                    <div className="space-y-3">
                        <label className="block text-sm font-medium">
                            <LinkIcon className="inline h-4 w-4 mr-1" />
                            Project Image URL (Optional)
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
                                        e.currentTarget.className = 'w-full h-full flex items-center justify-center bg-muted text-muted-foreground text-sm';
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
                            placeholder="https://example.com/image.png or paste from public folder"
                        />
                        <p className="text-xs text-muted-foreground">
                            💡 Tip: Upload your image to the <code className="bg-muted px-1 rounded">public</code> folder and use <code className="bg-muted px-1 rounded">/image-name.png</code>
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">GitHub URL</label>
                            <input
                                value={github}
                                onChange={(e) => setGithub(e.target.value)}
                                className="w-full rounded-md border border-input bg-background px-3 py-2"
                                placeholder="https://github.com/..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Demo URL</label>
                            <input
                                value={demo}
                                onChange={(e) => setDemo(e.target.value)}
                                className="w-full rounded-md border border-input bg-background px-3 py-2"
                                placeholder="https://..."
                            />
                        </div>
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
                            {loading ? "Saving..." : "Save Project"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
