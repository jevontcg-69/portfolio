"use client";

import Link from "next/link";
import Image from "next/image";
import { Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
    return (
        <footer className="border-t border-border bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-2">
                            <Image
                                src="/logo.png"
                                alt="Hizkia Jevon Chandra"
                                width={32}
                                height={32}
                                className="object-contain"
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                }}
                            />
                            <span className="text-lg font-bold">Hizkia Jevon Chandra</span>
                        </Link>
                        <p className="text-sm text-muted-foreground">
                            Physics Graduate | Business Analyst | Developer
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/#about" className="text-muted-foreground hover:text-primary transition-colors">About</Link></li>
                            <li><Link href="/#projects" className="text-muted-foreground hover:text-primary transition-colors">Projects</Link></li>
                            <li><Link href="/#achievements" className="text-muted-foreground hover:text-primary transition-colors">Achievements</Link></li>
                            <li><Link href="/resume" className="text-muted-foreground hover:text-primary transition-colors">Resume</Link></li>
                            <li><Link href="/login" className="text-muted-foreground hover:text-primary transition-colors">Admin</Link></li>
                        </ul>
                    </div>

                    {/* Social Links */}
                    <div>
                        <h3 className="font-semibold mb-4">Connect</h3>
                        <div className="flex items-center space-x-6">
                            <Link
                                href="https://github.com/jevontcg-69"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-primary transition-colors"
                            >
                                <Github className="h-5 w-5" />
                                <span className="sr-only">GitHub</span>
                            </Link>
                            <Link
                                href="https://www.linkedin.com/in/hizkia-jevon-chandra-79a83525b/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-primary transition-colors"
                            >
                                <Linkedin className="h-5 w-5" />
                                <span className="sr-only">LinkedIn</span>
                            </Link>
                            <Link
                                href="mailto:jevontcg@gmail.com"
                                className="text-muted-foreground hover:text-primary transition-colors"
                            >
                                <Mail className="h-5 w-5" />
                                <span className="sr-only">Email</span>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} Hizkia Jevon Chandra. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
