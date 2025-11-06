import ProposalVoteClient from '@/components/proposal-vote-client';

// This is the same data as in the main voting page. 
// In a real app, this would be fetched from a central store or API.
const initialProposals = [
  { id: 1, title: "INCREASE STAKING REWARDS", description: "Proposal to increase staking rewards by 5% for all tiers to incentivize long-term holders", votesFor: 12500, votesAgainst: 3200, status: "active", endTime: "2 days left" },
  { id: 2, title: "NEW PROJECT LISTING: QUANTUMCHAIN", description: "Approve QuantumChain for listing on the launchpad with dedicated allocation", votesFor: 8900, votesAgainst: 2100, status: "active", endTime: "5 days left" },
  // ... other proposals
];

export async function generateStaticParams() {
    return initialProposals.map((p) => ({ id: p.id.toString() }));
}

interface ProposalDetailPageProps {
    params: Promise<{ id: string }>;
}

export default async function ProposalDetailPage({ params }: ProposalDetailPageProps) {
    const { id } = await params;
    const proposal = initialProposals.find(p => p.id.toString() === id);

    if (!proposal) {
        return <div className="text-center py-20 text-black">Proposal not found.</div>;
    }

    return <ProposalVoteClient initialProposal={proposal} />;
}

