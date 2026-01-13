"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Download, FileText, Upload } from "lucide-react";

export default function ResumePage() {
    const [resumeUrl, setResumeUrl] = useState<string | null>(null);

    useEffect(() => {
        // Check if resume.pdf exists in public folder
        const checkResume = async () => {
            try {
                const response = await fetch('/resume.pdf', { method: 'HEAD' });
                if (response.ok) {
                    setResumeUrl('/resume.pdf');
                }
            } catch (error) {
                console.log('No resume file found');
            }
        };
        checkResume();
    }, []);

    return (
        <div className="min-h-screen py-20">
            <div className="container px-4 md:px-6 mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-5xl mx-auto"
                >
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Resume</h1>
                        <p className="text-muted-foreground text-lg">
                            View or download my professional resume
                        </p>
                    </div>

                    {/* Resume Viewer */}
                    <div className="bg-card rounded-lg border border-border p-8">
                        {resumeUrl ? (
                            <div className="space-y-6">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-xl font-bold">Resume Preview</h2>
                                    <a
                                        href={resumeUrl}
                                        download="Hizkia_Jevon_Chandra_Resume.pdf"
                                        className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                                    >
                                        <Download className="h-4 w-4 mr-2" />
                                        Download PDF
                                    </a>
                                </div>

                                {/* PDF Viewer */}
                                <div className="w-full h-[800px] border border-border rounded-lg overflow-hidden">
                                    <iframe
                                        src={resumeUrl}
                                        className="w-full h-full"
                                        title="Resume Preview"
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-20">
                                <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
                                <h3 className="text-xl font-bold mb-2">No Resume Uploaded</h3>
                                <p className="text-muted-foreground mb-8">
                                    Please upload your resume PDF file to the <code className="bg-muted px-2 py-1 rounded">/public</code> folder as <code className="bg-muted px-2 py-1 rounded">resume.pdf</code>
                                </p>
                                <div className="bg-muted/50 border border-border rounded-lg p-6 max-w-md mx-auto text-left">
                                    <h4 className="font-semibold mb-2">Instructions:</h4>
                                    <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                                        <li>Save your resume as <code className="bg-background px-1 rounded">resume.pdf</code></li>
                                        <li>Place it in the <code className="bg-background px-1 rounded">public</code> folder</li>
                                        <li>Refresh this page to view it</li>
                                    </ol>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Additional Info */}
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-card border border-border rounded-lg p-6">
                            <h3 className="font-bold mb-2">Experience</h3>
                            <p className="text-sm text-muted-foreground">2 years of experience in Business Analysis and Development roles</p>
                        </div>
                        <div className="bg-card border border-border rounded-lg p-6">
                            <h3 className="font-bold mb-2">Education</h3>
                            <p className="text-sm text-muted-foreground">Physics Graduate with strong technical background</p>
                        </div>
                        <div className="bg-card border border-border rounded-lg p-6">
                            <h3 className="font-bold mb-2">Skills</h3>
                            <p className="text-sm text-muted-foreground">Business Analysis, Data Analysis, Artificial Intelligence, Machine Learning, Process Automation, Software Development</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
