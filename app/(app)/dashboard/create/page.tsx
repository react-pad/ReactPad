"use client";

import { ArrowRight, Box, CircleDollarSign, Factory, ImageIcon, Lock, Send } from "lucide-react";
import Link from "next/link";

const creationOptions = [
  {
    href: "/dashboard/create/token",
    title: "Create a new Token",
    description: "Deploy a standard, mintable, or taxable ERC20 token.",
    icon: CircleDollarSign,
  },
  {
    href: "/dashboard/create/presale",
    title: "Create a Presale",
    description: "Launch a presale for your token to raise funds.",
    icon: Factory,
  },
  {
    href: "/dashboard/create/nft",
    title: "Create an NFT Collection",
    description: "Deploy an NFT collection with a configurable public sale.",
    icon: ImageIcon,
  },
  {
    href: "/dashboard/create/project",
    title: "Submit a Project",
    description: "Submit your project for the launchpad.",
    icon: Box,
  },
];

const toolOptions = [
  {
    href: "/dashboard/tools/token-locker",
    title: "Token Locker",
    description: "Lock up your tokens for a specified period.",
    icon: Lock,
  },
  {
    href: "/dashboard/tools/airdrop",
    title: "Airdrop Tool",
    description: "Send tokens to multiple recipients at once.",
    icon: Send,
  }
]

export default function CreateHubPage() {
  return (
    <div className="container mx-auto px-4 py-12 text-black">
      <section className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Create</h1>
        <p className="text-lg text-gray-600">
          Create new assets and utilities for the Reactive ecosystem.
        </p>
      </section>

      <div className="space-y-10">
        <div>
          <h2 className="text-2xl font-bold mb-6">Assets</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {creationOptions.map((item) => (
              <Link href={item.href} key={item.href} className="border-2 border-black bg-white p-6 hover:bg-black hover:text-white transition-all group">
                <item.icon className="w-8 h-8 mb-4 text-black group-hover:text-white" />
                <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                <p className="text-sm opacity-70 mb-4">{item.description}</p>
                <div className="flex justify-end">
                  <ArrowRight className="w-6 h-6 transform transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-6">Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {toolOptions.map((item) => (
              <Link href={item.href} key={item.href} className="border-2 border-black bg-white p-6 hover:bg-black hover:text-white transition-all group">
                <item.icon className="w-8 h-8 mb-4 text-black group-hover:text-white" />
                <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                <p className="text-sm opacity-70 mb-4">{item.description}</p>
                <div className="flex justify-end">
                  <ArrowRight className="w-6 h-6 transform transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
