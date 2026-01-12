"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Loader2, X } from "lucide-react";

interface ProjectFormProps {
    onClose: () => void;
    onSuccess: () => void;
}

export function ProjectForm({ onClose, onSuccess }: ProjectFormProps) {
    const [loading, setLoading] = useState(false);
    const supabase = createClient();

    // Form States
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("Web Development");
    const [techStack, setTechStack] = useState(""); // Comma separated string
    const [github, setGithub] = useState("");
    const [demo, setDemo] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { error } = await supabase.from("projects").insert({
                title,
                description,
                category,
                tech_stack: techStack.split(",").map((t) => t.trim()),
                github_link: github || null,
                demo_link: demo || null,
                display_order: 0,
            });

            if (error) throw error;
            onSuccess();
            onClose();
        } catch (error: any) {
            console.error("Error adding project:", error);
            alert(`Failed to add project: ${error.message || "Unknown error"}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <div className="w-full max-w-lg rounded-lg border bg-card p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">Add New Project</h2>
                    <button onClick={onClose}><X className="h-5 w-5" /></button>
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
                            className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 rounded-md flex items-center"
                        >
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Save Project
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
