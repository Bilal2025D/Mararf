
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, User, Trash, Edit, Save } from "lucide-react";
import { Member } from "@/types";

interface MemberCardProps {
  member: Member;
  editingMember: Member | null;
  syncing: boolean;
  onEdit: (member: Member) => void;
  onSave: () => void;
  onDelete: (id: string) => void;
  onEditChange: (updatedMember: Member) => void;
}

const MemberCard: React.FC<MemberCardProps> = ({
  member,
  editingMember,
  syncing,
  onEdit,
  onSave,
  onDelete,
  onEditChange
}) => {
  const isEditing = editingMember?.id === member.id;

  return (
    <Card
      className={`overflow-hidden transition-all duration-200 shadow hover:shadow-md ${member.status === 'inactive' ? 'opacity-70' : ''}`}
    >
      <CardContent className="p-0">
        <div className={`h-2 w-full ${member.type === 'teacher' ? 'bg-amber-400' : 'bg-emerald-500'}`}></div>
        <div className="p-4">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center">
              <div className="rounded-full bg-emerald-50 flex items-center justify-center h-12 w-12">
                <User className="h-6 w-6 text-emerald-700" />
              </div>
              <div className="mr-3 rtl">
                {isEditing ? (
                  <Input
                    value={editingMember.name}
                    onChange={(e) => onEditChange({...editingMember, name: e.target.value})}
                    className="mb-2 font-bold arabic text-emerald-800"
                  />
                ) : (
                  <h3 className="font-bold arabic text-emerald-800">
                    {member.name}
                  </h3>
                )}
                
                {isEditing ? (
                  <Input
                    value={editingMember.app_role}
                    onChange={(e) => onEditChange({...editingMember, app_role: e.target.value})}
                    className="text-sm arabic"
                  />
                ) : (
                  <p className="text-sm text-gray-500 arabic">
                    {member.app_role}
                  </p>
                )}
              </div>
            </div>
            <div className="flex space-x-1">
              {isEditing ? (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 hover:bg-emerald-50 hover:text-emerald-700"
                  onClick={onSave}
                  disabled={syncing}
                >
                  <Save className="h-4 w-4" />
                </Button>
              ) : (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 hover:bg-emerald-50 hover:text-emerald-700"
                  onClick={() => onEdit(member)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              )}
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 hover:bg-red-50 hover:text-red-600"
                onClick={() => onDelete(member.id)}
                disabled={syncing}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            {isEditing ? (
              <>
                <div className="flex items-center text-sm rtl">
                  <Phone className="h-4 w-4 ml-2 text-gray-500" />
                  <Input
                    value={editingMember.phone || ""}
                    onChange={(e) => onEditChange({...editingMember, phone: e.target.value})}
                    className="arabic"
                  />
                </div>
                <div className="flex items-center text-sm rtl">
                  <Mail className="h-4 w-4 ml-2 text-gray-500" />
                  <Input
                    value={editingMember.email || ""}
                    onChange={(e) => onEditChange({...editingMember, email: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <select 
                    value={editingMember.type || "student"}
                    onChange={(e) => onEditChange({...editingMember, type: e.target.value})}
                    className="p-1 text-sm rounded-md border border-input arabic"
                  >
                    <option value="teacher">أستاذ/ة</option>
                    <option value="student">تلميذ/ة</option>
                  </select>
                  <select 
                    value={editingMember.status || "active"}
                    onChange={(e) => onEditChange({...editingMember, status: e.target.value})}
                    className="p-1 text-sm rounded-md border border-input arabic"
                  >
                    <option value="active">نشط</option>
                    <option value="inactive">غير نشط</option>
                  </select>
                </div>
              </>
            ) : (
              <>
                {member.phone && (
                  <div className="flex items-center text-sm rtl">
                    <Phone className="h-4 w-4 ml-2 text-gray-500" />
                    <span className="arabic">{member.phone}</span>
                  </div>
                )}
                {member.email && (
                  <div className="flex items-center text-sm rtl">
                    <Mail className="h-4 w-4 ml-2 text-gray-500" />
                    <span>{member.email}</span>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MemberCard;
