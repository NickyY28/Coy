"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

export default function HomePage() {
  const router = useRouter();
  const [resetting, setResetting] = useState(false);

  async function resetApplication() {
    if (!window.confirm("Reset all swipes and matches to the original demo data?")) return;

    setResetting(true);
    try {
      await api<{ reset: boolean }>("/reset", { method: "POST" });
      router.push("/discover");
      router.refresh();
    } catch (error) {
      window.alert(error instanceof Error ? error.message : "Could not reset the app");
    } finally {
      setResetting(false);
    }
  }

  return (
    <section className="home-page">
      <div className="home-card">
        <div className="crush-pattern" aria-hidden="true">
          {Array.from({ length: 32 }, (_, index) => (
            <span key={index} className={index === 9 || index === 12 ? "highlight" : index === 10 ? "pink-highlight" : ""} />
          ))}
        </div>

        <div className="home-card-content">
          <h1>Find out if your<br />crush likes you back</h1>
          <div className="home-feature">
            <span>♙</span>
            <p>Add someone you like by number or email</p>
          </div>
          <div className="home-feature">
            <span>♧</span>
            <p>We tell them someone likes them, not who</p>
          </div>
          <div className="home-feature">
            <span>♥</span>
            <p>If they add you back, it&apos;s a match</p>
          </div>
          <button className="home-primary" onClick={() => router.push("/discover")}>
            Start discovering
          </button>
        </div>
      </div>

      <button className="reset-card" onClick={resetApplication} disabled={resetting}>
        <span className="reset-icon">↻</span>
        <span><strong>{resetting ? "Resetting..." : "Reset application"}</strong><small>Restore all profiles and swipe state</small></span>
      </button>

      <button className="home-action-card">
        <span className="orange-icon">+</span>
        <span><strong>Add a crush</strong><small>4/5 available</small></span>
      </button>

      <button className="home-action-card">
        <span className="yellow-icon">★</span>
        <span><strong>Get more slots</strong><small>Add more people to your list</small></span>
      </button>

      <article className="how-card">
        <div className="how-icon">▱<span>♥</span></div>
        <div>
          <strong>How Coy works</strong>
          <p>Follow one crush from secret to match in 3 quick steps.</p>
        </div>
      </article>

      <article className="how-card">
        <div className="slot-icon">▣</div>
        <div>
          <strong>Get a slot free</strong>
          <p>Invite a friend. A slot opens when they join Coy.</p>
        </div>
      </article>
    </section>
  );
}
