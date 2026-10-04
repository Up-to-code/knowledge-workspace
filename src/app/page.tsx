import type { Metadata } from 'next';
import MarketingLanding from '@/components/MarketingLanding';

export const metadata: Metadata = {
  title: 'Knowledge — Sources, notes, and source-backed drafts',
  description: 'Save original sources, notes, and files. Search your knowledge and work with a connected agent to prepare editable drafts.',
};

export default function Page() {
  return <MarketingLanding />;
}
