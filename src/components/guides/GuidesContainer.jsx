import React, { useState } from 'react';
import { GUIDE_TABS, GUIDE_CONTENT } from '../../data/guideContent';
import GuideTabs from './GuideTabs';
import TableOfContents from './TableOfContents';
import GuideContent from './GuideContent';
import ConsultationForm from './ConsultationForm';

const GuidesContainer = () => {
  const [activeTab, setActiveTab] = useState('persiapan');
  const [activeSection, setActiveSection] = useState('');

  const currentContent = GUIDE_CONTENT[activeTab];

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Panduan Lengkap</h1>
        <p className="text-gray-600 text-sm mt-1">
          Panduan lengkap untuk WHV dan kehidupan di Australia
        </p>
      </div>

      {/* Tabs */}
      <GuideTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Content Area */}
      <div className="mt-6">
        {/* Two-column layout on desktop */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Table of Contents - Desktop Only */}
          <TableOfContents
            sections={currentContent.sections}
            activeSection={activeSection}
          />

          {/* Main Content */}
          <div className="flex-1">
            {/* Title */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {currentContent.title}
              </h2>
            </div>

            {/* Content Sections */}
            <GuideContent
              sections={currentContent.sections}
              onSectionChange={setActiveSection}
            />
          </div>
        </div>
      </div>

      {/* Consultation Form */}
      <div className="mt-12">
        <ConsultationForm />
      </div>
    </div>
  );
};

export default GuidesContainer;
