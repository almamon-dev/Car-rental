import React, { useState } from "react";
import { Link, router } from "@inertiajs/react";
import { 
    Pencil, 
    Trash2, 
    ChevronRight, 
    ChevronDown, 
    Layers,
    Globe
} from "lucide-react";
import DeleteAction from "@/Components/modals/ConfirmDelete";

const CategoryTableRow = React.memo(function CategoryTableRow({
    item,
    isEffectivelySelected,
    toggleSelect,
    isClientSideLoading,
    onDeleteSuccess,
    level = 0
}) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    
    const hasChildren = item.children && item.children.length > 0;

    const handleStatusToggle = (id) => {
        router.patch(
            route("admin.category.status", id),
            {},
            { preserveScroll: true }
        );
    };

    return (
        <React.Fragment>
            <tr
                className={`group transition-all duration-200 border-b border-[#f3f2ef] ${
                    isEffectivelySelected(item.id)
                        ? "bg-blue-50/30"
                        : level > 0 ? "bg-slate-50/20 hover:bg-slate-50/50" : "hover:bg-slate-50/50"
                }`}
            >
                {/* 1. Selection */}
                <td className="py-5 px-10 text-center">
                    <div className="flex flex-col items-center gap-3">
                        <input
                            type="checkbox"
                            checked={isEffectivelySelected(item.id)}
                            onChange={() => toggleSelect(item.id)}
                            className="w-4 h-4 rounded border-gray-300 text-[#0a66c2] focus:ring-[#0a66c2]/10 cursor-pointer transition-all"
                            disabled={isClientSideLoading}
                        />
                        {level === 0 && hasChildren && (
                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className={`p-1 rounded-lg transition-colors ${
                                    isExpanded ? "text-[#0a66c2] bg-blue-50" : "text-gray-400 hover:text-[#0a66c2] hover:bg-gray-100"
                                }`}
                            >
                                {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                            </button>
                        )}
                    </div>
                </td>

                {/* 2. Identity */}
                <td className="py-4 px-4 min-w-[240px]">
                    <div className="flex items-center gap-4">
                        <div className={`shrink-0 h-10 w-10 bg-white rounded-xl border border-[#f0f0f0] flex items-center justify-center overflow-hidden transition-all shadow-sm ${level > 0 ? 'scale-90' : ''}`}>
                            {item.icon ? (
                                <img
                                    src={`/${item.icon}`}
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <Layers size={16} className="text-gray-300" />
                            )}
                        </div>
                        <div style={{ paddingLeft: `${level * 10}px` }}>
                            <div className="flex items-center gap-2">
                                <span className={`font-bold text-slate-800 tracking-tight ${level > 0 ? 'text-[13px]' : 'text-[14px]'}`}>
                                    {item.name}
                                </span>
                                {level > 0 && (
                                    <span className="px-1.5 py-0.5 bg-slate-100 text-slate-400 text-[8px] font-bold uppercase tracking-wider rounded">Sub</span>
                                )}
                            </div>
                            <p className="text-[11px] text-gray-400 font-medium mt-0.5">
                                /{item.slug} {item.parent && <span className="ml-1 text-[#0a66c2]/60">• {item.parent.name}</span>}
                            </p>
                        </div>
                    </div>
                </td>

                {/* 3. Context */}
                <td className="py-4 px-4">
                    <p className="text-[12px] text-gray-500 leading-relaxed font-medium max-w-[200px] line-clamp-1 italic">
                        {item.description || "—"}
                    </p>
                </td>

                {/* 4. Connectivity */}
                <td className="py-4 px-4 text-center">
                    <span className="text-[14px] font-bold text-slate-700">{item.cars_count || 0}</span>
                </td>

                {/* 5. Status Badge */}
                <td className="py-4 px-4">
                    <button
                        onClick={() => handleStatusToggle(item.id)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all border ${
                            item.status === "active" 
                            ? "border-emerald-100 text-emerald-600 bg-emerald-50" 
                            : "border-slate-100 text-slate-400 bg-slate-50"
                        }`}
                    >
                        {item.status === "active" ? "Active" : "Inactive"}
                    </button>
                </td>

                {/* 6. Actions */}
                <td className="py-4 px-4 text-right pr-10">
                    <div className="flex items-center justify-end gap-1">
                        <Link
                            href={route("admin.category.edit", item.id)}
                            className="p-2 text-slate-400 hover:text-[#0a66c2] hover:bg-blue-50 rounded-xl transition-all"
                            title="Edit Category"
                        >
                            <Pencil size={16} strokeWidth={2} />
                        </Link>
                        <button
                            onClick={() => setIsDeleteModalOpen(true)}
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                            title="Delete Category"
                        >
                            <Trash2 size={16} strokeWidth={2} />
                        </button>
                    </div>

                    <DeleteAction
                        trigger={false}
                        open={isDeleteModalOpen}
                        onOpenChange={setIsDeleteModalOpen}
                        id={item.id}
                        routeName="admin.category.destroy"
                        onSuccess={onDeleteSuccess}
                    />
                </td>
            </tr>

            {/* Nested Content */}
            {isExpanded && hasChildren && item.children.map((child) => (
                <CategoryTableRow
                    key={child.id}
                    item={child}
                    level={level + 1}
                    isEffectivelySelected={isEffectivelySelected}
                    toggleSelect={toggleSelect}
                    isClientSideLoading={isClientSideLoading}
                    onDeleteSuccess={onDeleteSuccess}
                />
            ))}
        </React.Fragment>
    );
});

export default CategoryTableRow;
