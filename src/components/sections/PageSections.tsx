"use client";

import { AboutSection } from "./AboutSection";
import { CredentialsSection } from "./credentials/CredentialsSection";
import { ProjectsSection } from "./projects/ProjectsSection";
import { ExperienceSection } from "./experience/ExperienceSection";
import { SkillsSection } from "./skills/SkillsSection";
import { TestimonialsSection } from "./testimonials/TestimonialsSection";
import { ContactSection } from "./contact/ContactSection";
import { SectionDivider } from "../ui/SectionDivider";

export function PageSections() {
  return (
    <>
      <AboutSection />
      <SectionDivider />
      <CredentialsSection />
      <SectionDivider />
      <ProjectsSection />
      <SectionDivider />
      <ExperienceSection />
      <SectionDivider />
      <SkillsSection />
      <SectionDivider />
      <TestimonialsSection />
      <SectionDivider />
      <ContactSection />
    </>
  );
}
