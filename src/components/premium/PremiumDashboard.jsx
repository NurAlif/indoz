import React, { useState } from 'react';
import { Download, Plus } from 'lucide-react';
import PremiumLayout from './layout/PremiumLayout';
import StatsOverview from './dashboard/StatsOverview';
import RecentActivity from './dashboard/RecentActivity';
import JobMatchesWidget from './dashboard/JobMatchesWidget';
import SidebarWidgets from './dashboard/SidebarWidgets';

// Feature components
import DocumentsVault from './DocumentsVault/DocumentsVault';
import Logbook from './Logbook';
import PRCalculator from './PRCalculator/PRCalculator';
import JobSearchContainer from '../jobs/JobSearchContainer';
import AIChatContainer from '../ai-chat/AIChatContainer';
import ResumeCheckerContainer from '../resume/ResumeCheckerContainer';
import GuidesContainer from '../guides/GuidesContainer';

const PremiumDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <>
            {/* Welcome Section */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-black tracking-tight text-gray-900">
                  Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indo-red to-orange-500">Budi</span>
                </h1>
                <p className="text-lg text-gray-500">
                  Your migration journey to Australia is moving fast.
                </p>
              </div>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm border border-gray-200 hover:bg-gray-50">
                  <Download size={16} />
                  Export Report
                </button>
                <button className="flex items-center gap-2 rounded-lg bg-indo-red px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-indo-red/20 hover:bg-red-700">
                  <Plus size={16} />
                  New Entry
                </button>
              </div>
            </div>

            {/* Stats Overview Cards */}
            <StatsOverview />

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column: Detailed Modules */}
              <div className="lg:col-span-2 flex flex-col gap-8">
                <RecentActivity />
                <JobMatchesWidget />
              </div>
              {/* Right Column: Sidebar Widgets */}
              <div className="flex flex-col gap-6">
                <SidebarWidgets />
              </div>
            </div>
          </>
        );
      case 'aichat':
        return <AIChatContainer embedded={true} />;
      case 'resume':
        return <ResumeCheckerContainer />;
      case 'guides':
        return <GuidesContainer />;
      case 'documents':
        return <DocumentsVault />;
      case 'logbook':
        return <Logbook />;
      case 'pr-calc':
        return <PRCalculator />;
      case 'jobs':
        return <JobSearchContainer />;
      default:
        return null;
    }
  };

  return (
    <PremiumLayout
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onLogout={onLogout}
    >
      {renderContent()}
    </PremiumLayout>
  );
};

export default PremiumDashboard;
