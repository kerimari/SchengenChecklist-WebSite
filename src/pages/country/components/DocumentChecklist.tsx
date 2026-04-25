
import { useState, useEffect, forwardRef, useImperativeHandle, useCallback } from 'react';
import { useAuth } from '../../../hooks/useAuth';

interface DocumentItem {
  name: string;
  description: string;
  required: boolean;
  note: string | null;
  applicantType: 'all' | 'employee' | 'student' | 'retired' | 'self-employed';
}

interface DocumentCategory {
  title: string;
  icon: string;
  items: DocumentItem[];
}

interface DocumentChecklistProps {
  documents: Record<string, DocumentCategory>;
  applicantType: 'all' | 'employee' | 'student' | 'retired' | 'self-employed';
  onCheckChange: (checked: number, total: number) => void;
  countryId: string;
  countryName: string;
  countryFlag: string;
}

const DocumentChecklist = forwardRef<{ generatePDF: () => void }, DocumentChecklistProps>(
  ({ countryId, countryName, countryFlag, documents, applicantType, onCheckChange }, ref) => {
    const { user } = useAuth();
    const [openCategories, setOpenCategories] = useState<string[]>(Object.keys(documents));
    const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

    const getStorageKey = useCallback(() => {
      if (user) return `checklist_${user.email}_${countryId}_${applicantType}`;
      return `checklist_guest_${countryId}_${applicantType}`;
    }, [user, countryId, applicantType]);

    // Get all visible items for current applicant type
    const getVisibleItems = useCallback(() => {
      const items: { key: string; item: DocumentItem }[] = [];
      Object.entries(documents).forEach(([categoryKey, category]) => {
        category.items.forEach((item, index) => {
          const matchesType =
            applicantType === 'all' ||
            item.applicantType === 'all' ||
            item.applicantType === applicantType;
          if (matchesType) {
            items.push({ key: `${categoryKey}-${index}`, item });
          }
        });
      });
      return items;
    }, [documents, applicantType]);

    // Recalculate and report counts
    const reportCounts = useCallback(
      (currentChecked: Set<string>) => {
        const visibleItems = getVisibleItems();
        const total = visibleItems.length;
        let completed = 0;
        visibleItems.forEach(({ key }) => {
          if (currentChecked.has(key)) {
            completed++;
          }
        });
        onCheckChange(completed, total);
      },
      [getVisibleItems, onCheckChange],
    );

    // Load checked items when applicant type or country changes
    useEffect(() => {
      const storageKey = getStorageKey();
      const saved = localStorage.getItem(storageKey);
      const loaded = saved ? new Set<string>(JSON.parse(saved)) : new Set<string>();
      setCheckedItems(loaded);
      setTimeout(() => reportCounts(loaded), 0);
    }, [applicantType, countryId, user, getStorageKey, reportCounts]);

    // Open all categories when documents change
    useEffect(() => {
      setOpenCategories(Object.keys(documents));
    }, [documents]);

    const toggleCategory = (category: string) => {
      setOpenCategories((prev) =>
        prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
      );
    };

    const toggleItem = (itemKey: string) => {
      const newChecked = new Set(checkedItems);
      if (newChecked.has(itemKey)) {
        newChecked.delete(itemKey);
      } else {
        newChecked.add(itemKey);
      }
      setCheckedItems(newChecked);

      // Save to localStorage
      const storageKey = getStorageKey();
      localStorage.setItem(storageKey, JSON.stringify(Array.from(newChecked)));

      // Report new counts
      reportCounts(newChecked);
    };

    // Filter items for a specific category
    const getFilteredItems = (items: DocumentItem[]) => {
      if (applicantType === 'all') {
        return items.map((item, originalIndex) => ({ item, originalIndex }));
      }
      return items
        .map((item, originalIndex) => ({ item, originalIndex }))
        .filter(({ item }) => item.applicantType === 'all' || item.applicantType === applicantType);
    };

    const generatePDF = async () => {
      const { default: jsPDF } = await import('jspdf');
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 20;
      let yPosition = margin;

      doc.setFontSize(20);
      doc.setFont('helvetica', 'bold');
      doc.text('Schengen Checklist', pageWidth / 2, yPosition, { align: 'center' });
      yPosition += 15;

      doc.setFontSize(16);
      doc.text(`${countryFlag} ${countryName}`, pageWidth / 2, yPosition, { align: 'center' });
      yPosition += 10;

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      const currentDate = new Date().toLocaleDateString('tr-TR');
      doc.text(`Tarih: ${currentDate}`, margin, yPosition);
      yPosition += 6;

      const applicantTypeText =
        applicantType === 'all'
          ? 'Tüm Evraklar'
          : applicantType === 'employee'
          ? 'Çalışan'
          : applicantType === 'student'
          ? 'Öğrenci'
          : applicantType === 'retired'
          ? 'Emekli'
          : applicantType === 'self-employed'
          ? 'Serbest Meslek'
          : 'Tüm Evraklar';
      doc.text(`Başvuran Tipi: ${applicantTypeText}`, margin, yPosition);
      yPosition += 12;

      doc.setDrawColor(200, 200, 200);
      doc.line(margin, yPosition, pageWidth - margin, yPosition);
      yPosition += 10;

      const filteredCategories = Object.entries(documents)
        .map(([key, category]) => {
          const filteredItems = category.items.filter(
            (item: DocumentItem) =>
              applicantType === 'all' ||
              item.applicantType === 'all' ||
              item.applicantType === applicantType,
          );
          return { key, category, filteredItems };
        })
        .filter((cat) => cat.filteredItems.length > 0);

      filteredCategories.forEach((cat, catIndex) => {
        if (yPosition > pageHeight - 40) {
          doc.addPage();
          yPosition = margin;
        }

        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text(cat.category.title, margin, yPosition);
        yPosition += 8;

        cat.filteredItems.forEach((item: DocumentItem) => {
          if (yPosition > pageHeight - 30) {
            doc.addPage();
            yPosition = margin;
          }

          doc.setFontSize(9);
          doc.setFont('helvetica', 'bold');

          if (item.required) {
            doc.setTextColor(220, 38, 38);
            doc.text('●', margin, yPosition);
            doc.setTextColor(0, 0, 0);
          } else {
            doc.setTextColor(100, 100, 100);
            doc.text('○', margin, yPosition);
            doc.setTextColor(0, 0, 0);
          }

          doc.text(item.name, margin + 5, yPosition);
          yPosition += 5;

          doc.setFont('helvetica', 'normal');
          doc.setFontSize(8);
          doc.setTextColor(80, 80, 80);
          const descLines = doc.splitTextToSize(item.description, pageWidth - margin * 2 - 5);
          doc.text(descLines, margin + 5, yPosition);
          yPosition += descLines.length * 4;

          if (item.note) {
            doc.setTextColor(100, 100, 100);
            const noteLines = doc.splitTextToSize(`Not: ${item.note}`, pageWidth - margin * 2 - 5);
            doc.text(noteLines, margin + 5, yPosition);
            yPosition += noteLines.length * 4;
          }

          doc.setTextColor(0, 0, 0);
          yPosition += 3;
        });

        if (catIndex < filteredCategories.length - 1) {
          yPosition += 5;
        }
      });

      const footerY = pageHeight - 15;
      doc.setFontSize(8);
      doc.setTextColor(120, 120, 120);
      doc.text('Schengen Checklist - Vize Başvuru Evrak Listesi', pageWidth / 2, footerY, {
        align: 'center',
      });

      const fileName = `${countryName}_Evrak_Listesi_${currentDate.replace(/\./g, '-')}.pdf`;
      doc.save(fileName);
    };

    useImperativeHandle(ref, () => ({
      generatePDF,
    }));

    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="p-4 sm:p-6 border-b border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Evrak Kontrol Listesi</h2>
            <p className="text-sm text-gray-500 mt-1">
              {applicantType === 'all'
                ? 'Tüm evraklar gösteriliyor'
                : applicantType === 'employee'
                ? 'Çalışan evrakları gösteriliyor'
                : applicantType === 'student'
                ? 'Öğrenci evrakları gösteriliyor'
                : applicantType === 'retired'
                ? 'Emekli evrakları gösteriliyor'
                : 'Serbest meslek evrakları gösteriliyor'}
            </p>
          </div>
          <button
            onClick={generatePDF}
            className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors whitespace-nowrap cursor-pointer text-sm"
          >
            <i className="ri-download-line"></i>
            <span>PDF İndir</span>
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
          {Object.entries(documents).map(([key, category]) => {
            const filteredWithIndex = getFilteredItems(category.items);

            if (filteredWithIndex.length === 0) {
              return null;
            }

            const checkedInCategory = filteredWithIndex.filter(({ originalIndex }) =>
              checkedItems.has(`${key}-${originalIndex}`),
            ).length;

            return (
              <div
                key={key}
                className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => toggleCategory(key)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#00bcd4]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <i className={`${category.icon} text-xl sm:text-2xl text-[#00bcd4]`}></i>
                    </div>
                    <div className="text-left">
                      <span className="text-base sm:text-lg font-semibold text-gray-900 block">
                        {category.title}
                      </span>
                      <span className="text-xs text-gray-400">
                        {checkedInCategory}/{filteredWithIndex.length} tamamlandı
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <span className="bg-gray-100 text-gray-600 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap">
                      {filteredWithIndex.length}
                    </span>
                    <i
                      className={`ri-arrow-down-s-line text-xl sm:text-2xl text-gray-400 transition-transform ${
                        openCategories.includes(key) ? 'rotate-180' : ''
                      }`}
                    ></i>
                  </div>
                </button>

                {openCategories.includes(key) && (
                  <div className="border-t border-gray-100 p-3 sm:p-5 space-y-3 sm:space-y-4">
                    {filteredWithIndex.map(({ item, originalIndex }) => {
                      const itemKey = `${key}-${originalIndex}`;
                      const isChecked = checkedItems.has(itemKey);

                      return (
                        <div
                          key={originalIndex}
                          className={`p-3 sm:p-4 rounded-xl border-2 transition-all ${
                            isChecked
                              ? 'border-[#00bcd4] bg-[#00bcd4]/5'
                              : 'border-gray-100 hover:border-gray-200'
                          }`}
                        >
                          <div className="flex items-start gap-3 sm:gap-4">
                            <button
                              onClick={() => toggleItem(itemKey)}
                              className={`w-5 h-5 sm:w-6 sm:h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5 cursor-pointer transition-all ${
                                isChecked
                                  ? 'bg-[#00bcd4] border-[#00bcd4]'
                                  : 'border-gray-300 hover:border-[#00bcd4]'
                              }`}
                            >
                              {isChecked && (
                                <i className="ri-check-line text-white text-xs sm:text-sm"></i>
                              )}
                            </button>

                            <div className="flex-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-2 mb-1">
                                <h4
                                  className={`font-semibold text-sm sm:text-base ${
                                    isChecked ? 'text-[#00bcd4] line-through' : 'text-gray-900'
                                  }`}
                                >
                                  {item.name}
                                </h4>
                                {item.required && (
                                  <span className="bg-red-100 text-red-600 px-1.5 sm:px-2 py-0.5 rounded text-[10px] sm:text-xs font-medium">
                                    Zorunlu
                                  </span>
                                )}
                                {item.applicantType !== 'all' && (
                                  <span className="bg-[#00bcd4]/10 text-[#00bcd4] px-1.5 sm:px-2 py-0.5 rounded text-[10px] sm:text-xs font-medium">
                                    {item.applicantType === 'employee' && 'Çalışan'}
                                    {item.applicantType === 'student' && 'Öğrenci'}
                                    {item.applicantType === 'retired' && 'Emekli'}
                                    {item.applicantType === 'self-employed' && 'Serbest Meslek'}
                                  </span>
                                )}
                              </div>
                              <p className="text-gray-600 text-xs sm:text-sm mb-2">{item.description}</p>
                              {item.note && (
                                <div className="flex items-start gap-2 bg-amber-50 text-amber-700 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm">
                                  <i className="ri-information-line mt-0.5 flex-shrink-0"></i>
                                  <span>{item.note}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  },
);

DocumentChecklist.displayName = 'DocumentChecklist';

export default DocumentChecklist;
