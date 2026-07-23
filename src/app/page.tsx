import { HomeStage } from "@/components/HomeStage";
import { HeroCaption } from "@/components/HeroCaption";
import { CurtainLoader } from "@/components/loader/CurtainLoader";
import { BlueprintFrame } from "@/components/ui/BlueprintFrame";
import { MobileNavFan } from "@/components/ui/MobileNavFan";
import { ProfileBadge } from "@/components/ui/ProfileBadge";
import { SocialDock } from "@/components/ui/SocialDock";
import { TopNav } from "@/components/ui/TopNav";
import { PageSections } from "@/components/sections/PageSections";
import { StarField } from "@/components/three/StarField";

export default function HomePage() {
  return (
    <main className="bg-cinematic relative min-h-svh">
      <StarField />
      <div
        aria-hidden
        className="bg-blueprint-grid pointer-events-none fixed inset-0 opacity-[0.14]"
      />

      <BlueprintFrame />
      <SocialDock />
      <TopNav />
      <MobileNavFan />
      <ProfileBadge />

      <section id="hero" className="relative h-svh w-full overflow-hidden">
        <HomeStage />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,var(--bg-void)_92%)]"
        />

        <HeroCaption />
      </section>

      <PageSections />

      <CurtainLoader />
    </main>
  );
}
