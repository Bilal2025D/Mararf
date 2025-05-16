
import React from 'react';
import MemberCard from './MemberCard';
import { Member } from '@/types';

interface MemberListProps {
  members: Member[];
  editingMember: Member | null;
  loading: boolean;
  syncing: boolean;
  searchTerm: string;
  activeTab: string;
  onEdit: (member: Member) => void;
  onSave: () => void;
  onDelete: (id: string) => void;
  onEditChange: (updatedMember: Member) => void;
}

const MemberList: React.FC<MemberListProps> = ({
  members,
  editingMember,
  loading,
  syncing,
  searchTerm,
  activeTab,
  onEdit,
  onSave,
  onDelete,
  onEditChange
}) => {
  // Filter members based on search term and active tab
  const filteredMembers = members.filter(member => {
    const matchesSearch = 
      member.name.includes(searchTerm) || 
      (member.phone && member.phone.includes(searchTerm)) || 
      (member.email && member.email.includes(searchTerm));
    
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "teachers") return matchesSearch && member.type === "teacher";
    if (activeTab === "students") return matchesSearch && member.type === "student";
    if (activeTab === "inactive") return matchesSearch && member.status === "inactive";
    
    return matchesSearch;
  });

  if (loading) {
    return (
      <div className="text-center py-10">
        <p className="text-emerald-700 arabic">جاري تحميل البيانات...</p>
      </div>
    );
  }

  if (filteredMembers.length === 0) {
    return (
      <div className="col-span-full text-center py-10">
        <p className="text-gray-500 arabic">لا توجد نتائج مطابقة للبحث</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredMembers.map(member => (
        <MemberCard
          key={member.id}
          member={member}
          editingMember={editingMember}
          syncing={syncing}
          onEdit={onEdit}
          onSave={onSave}
          onDelete={onDelete}
          onEditChange={onEditChange}
        />
      ))}
    </div>
  );
};

export default MemberList;
