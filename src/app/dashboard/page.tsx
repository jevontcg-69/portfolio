"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Plus, LogOut, LayoutDashboard, FolderKanban, Award, Trash2, Edit2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { AchievementForm } from "@/components/admin/AchievementForm";

type Tab = "projects" | "achievements";

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState<Tab>("projects");
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [showAchievementForm, setShowAchievementForm] = useState(false);
    const [editingItem, setEditingItem] = useState<any>(null);
    const [projects, setProjects] = useState<any[]>([]);
    const [achievements, setAchievements] = useState<any[]>([]);
    const router = useRouter();
    const supabase = createClient();

    const fetchProjects = useCallback(async () => {
        const { data } = await supabase
            .from("projects")
            .select("*")
            .order("created_at", { ascending: false });
        if (data) setProjects(data);
    }, [supabase]);

    const fetchAchievements = useCallback(async () => {
        const { data } = await supabase
            .from("achievements")
            .select("*")
            .order("date", { ascending: false });
        if (data) setAchievements(data);
    }, [supabase]);

    useEffect(() => {
        fetchProjects();
        fetchAchievements();
    }, [fetchProjects, fetchAchievements]);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push("/login");
    };

    const handleDeleteProject = async (id: string) => {
        if (!confirm("Are you sure you want to delete this project?")) return;
        await supabase.from("projects").delete().eq("id", id);
        fetchProjects();
    };

    const handleDeleteAchievement = async (id: string) => {
        if (!confirm("Are you sure you want to delete this achievement?")) return;
        await supabase.from("achievements").delete().eq("id", id);
        fetchAchievements();
    };

    return (
        <div className="space-y-6 px-4 md:px-0">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <LayoutDashboard className="h-6 w-6 text-primary" />
                    <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
                </div>
                <button
                    onClick={handleSignOut}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-destructive-foreground bg-destructive rounded-md hover:bg-destructive/90 transition-colors"
                >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                </button>
            </div>

            <div className="flex space-x-1 rounded-lg bg-muted p-1 w-fit">
                <button
                    onClick={() => setActiveTab("projects")}
                    className={cn(
                        "inline-flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all",
                        activeTab === "projects"
                            ? "bg-background shadow text-foreground"
                            : "text-muted-foreground hover:bg-background/50 hover:text-foreground"
                    )}
                >
                    <FolderKanban className="h-4 w-4 mr-2" />
                    Projects
                </button>
                <button
                    onClick={() => setActiveTab("achievements")}
                    className={cn(
                        "inline-flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all",
                        activeTab === "achievements"
                            ? "bg-background shadow text-foreground"
                            : "text-muted-foreground hover:bg-background/50 hover:text-foreground"
                    )}
                >
                    <Award className="h-4 w-4 mr-2" />
                    Achievements
                </button>
            </div>

            <div className="bg-card rounded-lg border border-border/50 shadow-sm min-h-[500px] p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">
                        {activeTab === "projects" ? "Manage Projects" : "Manage Achievements"}
                    </h2>
                    <button
                        onClick={() => {
                            setEditingItem(null);
                            activeTab === "projects" ? setShowProjectForm(true) : setShowAchievementForm(true);
                        }}
                        className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        Add New
                    </button>
                </div>

                {activeTab === "projects" ? (
                    projects.length > 0 ? (
                        <div className="grid gap-4">
                            {projects.map((project) => (
                                <div
                                    key={project.id}
                                    className="flex items-center justify-between p-4 rounded-lg border bg-background"
                                >
                                    <div>
                                        <h3 className="font-semibold">{project.title}</h3>
                                        <p className="text-sm text-muted-foreground">{project.category}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => {
                                                setEditingItem(project);
                                                setShowProjectForm(true);
                                            }}
                                            className="p-2 text-primary hover:bg-primary/10 rounded-md"
                                        >
                                            <Edit2 className="h-4 w-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteProject(project.id)}
                                            className="p-2 text-destructive hover:bg-destructive/10 rounded-md"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-64 text-muted-foreground border-2 border-dashed border-border/50 rounded-lg bg-muted/10">
                            <p>No projects found. Add your first one!</p>
                        </div>
                    )
                ) : (
                    achievements.length > 0 ? (
                        <div className="grid gap-4">
                            {achievements.map((achievement) => (
                                <div
                                    key={achievement.id}
                                    className="flex items-center justify-between p-4 rounded-lg border bg-background"
                                >
                                    <div>
                                        <h3 className="font-semibold">{achievement.title}</h3>
                                        <p className="text-sm text-muted-foreground">{achievement.type} - {new Date(achievement.date).toLocaleDateString()}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => {
                                                setEditingItem(achievement);
                                                setShowAchievementForm(true);
                                            }}
                                            className="p-2 text-primary hover:bg-primary/10 rounded-md"
                                        >
                                            <Edit2 className="h-4 w-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteAchievement(achievement.id)}
                                            className="p-2 text-destructive hover:bg-destructive/10 rounded-md"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-64 text-muted-foreground border-2 border-dashed border-border/50 rounded-lg bg-muted/10">
                            <p>No achievements found. Add your first one!</p>
                        </div>
                    )
                )}
            </div>

            {showProjectForm && (
                <ProjectForm
                    onClose={() => {
                        setShowProjectForm(false);
                        setEditingItem(null);
                    }}
                    onSuccess={() => {
                        fetchProjects();
                        setEditingItem(null);
                    }}
                    initialData={editingItem}
                />
            )}

            {showAchievementForm && (
                <AchievementForm
                    onClose={() => {
                        setShowAchievementForm(false);
                        setEditingItem(null);
                    }}
                    onSuccess={() => {
                        fetchAchievements();
                        setEditingItem(null);
                    }}
                    initialData={editingItem}
                />
            )}
        </div>
    );
}
