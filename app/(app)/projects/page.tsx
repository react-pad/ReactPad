"use client"
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import { ProjectCard, type Project } from "@/components/ui/project-card";

const projects: Project[] = [
  {
    id: "etherium-nexus",
    name: "Etherium Nexus",
    description: "A naval-inspired Web3 game in an immersive virtual world.",
    logo: "https://placehold.co/60x60/8B5CF6/FFFFFF?text=EN",
    statusType: "live",
    raised: 87567,
    goal: 120000,
    currency: "WMTX",
    progress: 73,
    endTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    website: "en.io",
  },
  {
    id: "quantum-chain",
    name: "QuantumChain",
    description: "A revolutionary new DeFi protocol for secure and scalable assets.",
    logo: "https://placehold.co/60x60/2563EB/FFFFFF?text=QC",
    statusType: "upcoming",
    raised: 0,
    goal: 150000,
    currency: "NETZ",
    progress: 0,
    startTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    website: "quantumchain.io",
  },
  {
    id: "neo-nova",
    name: "NeoNova",
    description: "The next generation of NFT marketplace with a focus on community.",
    logo: "https://placehold.co/60x60/06B6D4/FFFFFF?text=NN",
    statusType: "upcoming",
    raised: 0,
    goal: 100000,
    currency: "NETZ",
    progress: 0,
    startTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    website: "neonova.art",
  },
  {
    id: "cipher-crest",
    name: "CipherCrest",
    description: "A decentralized social media platform that values user privacy.",
    logo: "https://placehold.co/60x60/EC4899/FFFFFF?text=CC",
    statusType: "completed",
    raised: 120000,
    goal: 120000,
    currency: "WMTX",
    progress: 100,
    website: "ciphercrest.com",
  },
];

const statusFilters = [
  { label: "All", value: "all" },
  { label: "Live", value: "live" },
  { label: "Upcoming", value: "upcoming" },
  { label: "Completed", value: "completed" }
];

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = projects.filter(project => {
    const matchesFilter = activeFilter === "all" || project.statusType === activeFilter;
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-6 py-20 max-w-7xl">
        <div className="mb-20">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black uppercase leading-none mb-6 tracking-tight">
            PROJECT<br />LAUNCHPAD
          </h1>
          <p className="text-xl md:text-2xl font-light max-w-2xl">
            Discover, fund, and launch the next generation of decentralized applications.
          </p>
        </div>

        <div className="mb-16 space-y-6">
          <div className="relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-black w-6 h-6" />
            <Input
              placeholder="SEARCH PROJECTS..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-16 w-full h-16 text-lg border-2 border-black focus:ring-0 focus:border-black font-medium uppercase placeholder:text-gray-400"
            />
          </div>
          <div className="flex items-center gap-3">
            {statusFilters.map(filter => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`px-6 py-3 text-sm font-bold uppercase tracking-wider border-2 border-black transition-all ${activeFilter === filter.value
                  ? "bg-black text-white"
                  : "bg-white text-black hover:bg-black hover:text-white"
                  }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard project={project} key={project.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
