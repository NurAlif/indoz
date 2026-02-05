import React from 'react';
import {
  LayoutDashboard,
  FileText,
  Scroll,
  Calculator,
  Briefcase,
  Settings,
  LogOut,
  Star,
  MessageSquare,
  FileSearch,
  BookOpen
} from 'lucide-react';
import { cn } from '../../../utils/cn';

const PremiumSidebar = ({ activeTab, onTabChange, onLogout, className }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'aichat', label: 'AI Chat', icon: MessageSquare },
    { id: 'jobs', label: 'Job Matches', icon: Briefcase },
    { id: 'resume', label: 'Cek Resume', icon: FileSearch },
    { id: 'guides', label: 'Panduan', icon: BookOpen },
    { id: 'documents', label: 'Document Vault', icon: FileText },
    { id: 'logbook', label: '88-Day Logbook', icon: Scroll },
    { id: 'pr-calc', label: 'PR Points Simulator', icon: Calculator },
  ];

  return (
    <aside className={cn("hidden w-72 flex-col border-r border-gray-200 bg-white lg:flex h-full", className)}>
      <div className="flex h-full flex-col justify-between p-6">
        <div className="flex flex-col gap-8">
          {/* User Profile */}
          <div className="flex items-center gap-4 px-2">
            <div className="relative">
              <div
                className="w-12 h-12 rounded-full bg-cover bg-center ring-2 ring-oz-gold ring-offset-2 ring-offset-white"
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuATqm0biALyUT0iwT-6bveOEAtj3-PlpMi6CRzkQiJpZOxynTNBVUkH6JVqzM71VmmUif3LQVC2RH_dKeP9N_w3v20UDCB8I5otT3VWllhf6hxTT0x27z9z1Cpqk91tEsfPWJ3EZG4AHtui4EYzTYjYgR6xThaKYNhvko5Xt5pDj1CB4G8paJCkcuKzJDaurCxtyxwwFyB5uA6hCGvELEVLJWKHCfHVLaENhVx56VvsE-jcCD-w8_dVsufW37PZ1TNx_NfXkvqYHKRI")' }}
              />
              <div className="absolute -bottom-1 -right-1 flex w-5 h-5 items-center justify-center rounded-full bg-oz-gold text-white">
                <Star size={10} fill="currentColor" />
              </div>
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg font-bold text-gray-900">IndOz+</h1>
              <p className="text-oz-gold text-xs font-semibold uppercase tracking-wider">Premium Member</p>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-all w-full text-left",
                    isActive
                      ? "bg-gray-100 text-indo-red"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:shadow-sm group"
                  )}
                >
                  <Icon size={20} className={cn(isActive ? "text-indo-red" : "group-hover:text-indo-red transition-colors")} />
                  <p className="text-sm font-semibold">{item.label}</p>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col gap-4 border-t border-gray-200 pt-6">
          <button className="flex items-center gap-3 px-4 py-2 text-gray-600 hover:text-indo-red transition-colors w-full text-left">
            <Settings size={20} />
            <p className="text-sm font-medium">Settings</p>
          </button>
          <button
            onClick={onLogout}
            className="flex items-center gap-3 px-4 py-2 text-gray-600 hover:text-indo-red transition-colors w-full text-left"
          >
            <LogOut size={20} />
            <p className="text-sm font-medium">Log Out</p>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default PremiumSidebar;
