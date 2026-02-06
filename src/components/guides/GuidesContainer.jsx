import React, { useState } from 'react';
import { GUIDE_TABS, GUIDE_CONTENT } from '../../data/guideContent';
import GuideTabs from './GuideTabs';
import TableOfContents from './TableOfContents';
import GuideContent from './GuideContent';
import ConsultationForm from './ConsultationForm';
import Button from '../common/Button';
import Modal from '../common/Modal';

const GuidesContainer = () => {
  const [activeTab, setActiveTab] = useState('persiapan');
  const [activeSection, setActiveSection] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

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
            <div className="bg-indo-red border border-indo-red/20 rounded-xl p-6 mb-8 shadow-md">
              <h2 className="text-2xl lg:text-3xl font-bold text-white">
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

      {/* Consultation CTA */}
      <div className="mt-12 bg-white border border-gray-200 rounded-xl p-6 text-center shadow-sm">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Butuh Bantuan Lebih Lanjut?
        </h3>
        <p className="text-gray-600 mb-6">
          Konsultasi gratis dengan ahli imigrasi Australia
        </p>
        <Button onClick={() => setIsModalOpen(true)} className="w-full sm:w-auto">
          Tanyakan Lebih Lanjut
        </Button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Butuh Bantuan Lebih Lanjut?"
      >
        <p className="text-gray-600 text-sm mb-6">
          Konsultasi gratis dengan ahli imigrasi Australia
        </p>
        <ConsultationForm />
      </Modal>
    </div>
  );
};

export default GuidesContainer;
