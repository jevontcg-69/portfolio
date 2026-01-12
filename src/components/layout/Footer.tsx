import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-background border-t border-border/40 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <span className="text-lg font-bold tracking-tighter text-foreground">
                            JP<span className="text-primary">.tech</span>
                        </span>
                        <p className="text-sm text-muted-foreground mt-2">
                            Physics Graduate | Business Analyst | Developer
                        </p>
                    </div>

                    <div className="flex items-center space-x-6">
                        <Link
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary transition-colors"
                        >
                            <Github className="h-5 w-5" />
                            <span className="sr-only">GitHub</span>
                        </Link>
                        <Link
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary transition-colors"
                        >
                            <Linkedin className="h-5 w-5" />
                            <span className="sr-only">LinkedIn</span>
                        </Link>
                        <Link
                            href="/login"
                            className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium"
                        >
                            Admin
                        </Link>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-border/20 text-center text-sm text-muted-foreground">
                    &copy; {new Date().getFullYear()} Jevon. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
