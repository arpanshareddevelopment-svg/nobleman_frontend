"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const INSTRUCTORS = [
  {
    name: "Ashish Gambhir",
    role: "Engineering Lead",
    company: "WINZO",
    photo:
      "https://images.unsplash.com/photo-1758560572645-0f7fa62ab59f?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    expertise: ["React", "Leadership", "Systems"],
    rating: 4.9,
    students: "1.2k",
  },
  {
    name: "Kartik Kannan",
    role: "Group Product Manager",
    company: "AJIO",
    photo:
      "https://images.unsplash.com/photo-1632812662039-916d700e23ee?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    expertise: ["Product", "Strategy", "Analytics"],
    rating: 4.8,
    students: "980",
  },
  {
    name: "Rohit V",
    role: "Group Product Manager",
    company: "AngelOne",
    photo:
      "https://media.istockphoto.com/id/1417967324/photo/white-man-making-gestures-with-cell-phone.jpg?s=1024x1024&w=is&k=20&c=Zu_iBNC1IFzucZEq5Xu4ETRyHWaMZe6h5Jt6W8mCcV4=",
    expertise: ["Payments", "Growth", "PM"],
    rating: 4.7,
    students: "2.1k",
  },
  {
    name: "Palash Somani",
    role: "Director of Product",
    company: "DREAM11",
    photo:
      "https://media.istockphoto.com/id/1475088196/photo/mature-man-looking-at-the-camera-while-working-on-a-laptop-standing-near-a-cubicle-in-an.jpg?s=1024x1024&w=is&k=20&c=6p4vqb5V_GCcPWERrzv3jtovL0fnAlf2NKhlQ7fn0X8=",
    expertise: ["Product", "SportsTech", "Leadership"],
    rating: 4.9,
    students: "3.4k",
  },
  {
    name: "Priya Sharma",
    role: "Senior Data Scientist",
    company: "Amazon",
    photo:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80",
    expertise: ["Python", "ML", "SQL"],
    rating: 4.8,
    students: "1.7k",
  },
];

function InstructorCard({
  inst,
  hovered,
}: {
  inst: (typeof INSTRUCTORS)[0];
  hovered: boolean;
}) {
  return (
    <div
      className="group relative shrink-0 overflow-hidden rounded-[28px] p-5 transition-all duration-500"
      style={{
        width: 300,
        background: hovered
          ? "linear-gradient(135deg, rgba(200,255,0,0.08), rgba(0,196,255,0.08))"
          : "var(--card)",
        border: hovered
          ? "1px solid rgba(200,255,0,0.2)"
          : "1px solid var(--card-border)",
        boxShadow: hovered
          ? "0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(200,255,0,0.08)"
          : "var(--card-shadow)",
        backdropFilter: "blur(18px)",
      }}
    >
      {/* glow */}
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle at top, rgba(200,255,0,0.12), transparent 60%)",
        }}
      />

      {/* image */}
      <div className="relative mb-4 h-[180px] overflow-hidden rounded-2xl">
        <img
          src={inst.photo}
          alt={inst.name}
          className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

        {/* arrow */}
        <div
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full opacity-0 transition-all duration-300 group-hover:opacity-100"
          style={{
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.1)",
            backdropFilter: "blur(12px)",
          }}
        >
         
        </div>

        {/* company */}
        <div
          className="absolute bottom-3 left-3 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em]"
          style={{
            background: "rgba(0,0,0,0.45)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "rgba(255,255,255,0.7)",
            backdropFilter: "blur(10px)",
          }}
        >
          {inst.company}
        </div>
      </div>

      {/* content */}
      <div className="space-y-3">
        <div>
          <h3
            className="text-[18px] font-bold"
            style={{ color: "var(--fg-primary)" }}
          >
            {inst.name}
          </h3>

          <p className="text-[13px]" style={{ color: "var(--fg-secondary)" }}>
            {inst.role}
          </p>
        </div>

        {/* stats */}
        <div className="flex items-center gap-2">
          <Star
            size={13}
            fill="var(--brand-green)"
            stroke="var(--brand-green)"
          />

          <span
            className="text-[13px] font-semibold"
            style={{ color: "var(--brand-green-light)" }}
          >
            {inst.rating}
          </span>

          <span className="text-[12px]" style={{ color: "var(--fg-muted)" }}>
            · {inst.students} students
          </span>
        </div>

        {/* tags */}
        <div className="flex flex-wrap gap-2 pt-1">
          {inst.expertise.map((tag) => (
            <span
              key={tag}
              className="rounded-full px-3 py-1 text-[11px] font-semibold"
              style={{
                background: hovered
                  ? "rgba(200,255,0,0.08)"
                  : "rgba(255,255,255,0.04)",
                border: hovered
                  ? "1px solid rgba(200,255,0,0.16)"
                  : "1px solid rgba(255,255,255,0.06)",
                color: hovered
                  ? "var(--brand-green-light)"
                  : "rgba(255,255,255,0.72)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* bottom line */}
      <div
        className="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-500 group-hover:w-full"
        style={{
          background:
            "linear-gradient(90deg,var(--brand-green),var(--brand-blue))",
        }}
      />
    </div>
  );
}

function Track() {
  const [hovered, setHovered] = useState<number | null>(null);

  const items = [...INSTRUCTORS, ...INSTRUCTORS, ...INSTRUCTORS];

  return (
    <motion.div
      animate={{
        x: [0, -1620],
      }}
      transition={{
        duration: 22,
        repeat: Infinity,
        ease: "linear",
      }}
      className="flex w-max gap-6"
    >
      {items.map((inst, i) => (
        <div
          key={i}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
        >
          <InstructorCard inst={inst} hovered={hovered === i} />
        </div>
      ))}
    </motion.div>
  );
}
export default function InstructorCarousel() {
  return (
    <section
      id="instructors"
      className="relative isolate overflow-hidden py-16 md:py-28"
      style={{
        background:
          "linear-gradient(180deg, #06040f 0%, #071220 55%, #060a12 100%)",
      }}
    >
      {/* bg glow */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: `
            radial-gradient(circle at 10% 20%, rgba(255,230,0,0.08), transparent 35%),
            radial-gradient(circle at 80% 0%, rgba(0,196,255,0.12), transparent 35%),
            radial-gradient(circle at 50% 100%, rgba(200,255,0,0.08), transparent 40%)
          `,
          filter: "blur(90px)",
        }}
      />

      {/* grid */}
      <div
        className="absolute inset-0 -z-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          opacity: 0.08,
        }}
      />

      <div className="mx-auto mb-14 max-w-7xl px-6 md:px-10">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <h2
              className="text-[clamp(2.3rem,4vw,4rem)] font-black leading-[1.05]"
              style={{ color: "var(--fg-primary)" }}
            >
              Learn from the{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(120deg,var(--brand-green-light),var(--brand-blue-light))",
                }}
              >
                best in the field
              </span>
            </h2>

            <p
              className="mt-4 max-w-2xl text-[15px]"
              style={{ color: "var(--fg-secondary)" }}
            >
              Learn directly from engineers, product leaders and data experts
              working at the world's top companies.
            </p>
          </div>

        </div>
      </div>

      {/* carousel */}
      <div className="relative overflow-hidden">
        {/* left fade */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24"
          style={{
            background:
              "linear-gradient(to right, var(--bg-page), transparent)",
          }}
        />

        {/* right fade */}
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24"
          style={{
            background: "linear-gradient(to left, var(--bg-page), transparent)",
          }}
        />

        <div className="py-6">
          <Track />
        </div>
      </div>
    </section>
  );
}
