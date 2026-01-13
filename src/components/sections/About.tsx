"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export function About() {
    const highlights = [
        "Physics background providing strong analytical foundations",
        "Experience in Business Analysis & Process Optimization",
        "Proficient in Full-Stack Development (Python, SQL, Web)",
        "Expertise in Data Analysis & Visualization",
    ];

    return (
        <section id="about" className="py-24 bg-muted/30">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="flex flex-col md:flex-row gap-12 items-center">

                    {/* Text Content */}
                    <motion.div
                        className="flex-1 space-y-6"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                            About Me
                        </h2>
                        <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                            <p>
                                My journey began in the world of Physics, where I learned to deconstruct complex
                                systems and model real-world phenomena. This rigorous training instilled in me
                                a first-principles approach to problem-solving.
                            </p>
                            <p>
                                Transitioning into the tech industry, I found my passion at the intersection of
                                data, business logic, and software development. I don't just write code;
                                I build solutions that optimize workflows and drive data-informed decisions.
                            </p>
                            <p>
                                Currently, I leverage tools like Python, Next.js, and SQL to bridge the gap
                                between technical possibilities and business requirements.
                            </p>
                        </div>

                        <div className="pt-4 grid sm:grid-cols-2 gap-3">
                            {highlights.map((item, index) => (
                                <div key={index} className="flex items-start gap-2">
                                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                    <span className="text-sm font-medium">{item}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        className="flex-1 w-full flex justify-center md:justify-end"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-2xl overflow-hidden shadow-2xl border-2 border-primary/20">
                            <img
                                src="/headshot.png"
                                alt="Hizkia Jevon Chandra - Professional Headshot"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
