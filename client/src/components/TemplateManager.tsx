import React, { useState, useEffect } from 'react';
import { Save, FolderOpen, Trash2, Edit2, Eye, Calendar, FileText, Sparkles } from 'lucide-react';
import { useAuth } from '@clerk/clerk-react';
import { templateApi, Template } from '../services/templateApi';
import toast from 'react-hot-toast';

interface TemplateManagerProps {
  currentSubject: string;
  currentHtml: string;
  currentPlainText: string;
  onLoadTemplate: (template: Template) => void;
}

const TemplateManager: React.FC<TemplateManagerProps> = ({
  currentSubject,
  currentHtml,
  currentPlainText,
  onLoadTemplate
}) => {
  const { userId } = useAuth();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [templateName, setTemplateName] = useState('');
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);
  const [deleteConfirmTemplate, setDeleteConfirmTemplate] = useState<Template | null>(null);

  useEffect(() => {
    if (userId) {
      loadTemplates();
    }
  }, [userId]);

  const loadTemplates = async () => {
    if (!userId) {
      console.warn('Cannot load templates: user not authenticated');
      return;
    }

    try {
      const userTemplates = await templateApi.getTemplates(userId);
      setTemplates(userTemplates);
    } catch (error) {
      console.error('Failed to load templates:', error);
    }
  };

  const saveTemplate = async () => {
    if (!userId) {
      toast.error('Please sign in to save templates');
      return;
    }

    if (!templateName.trim()) {
      toast.error('Please enter a template name');
      return;
    }

    if (!currentSubject.trim() && !currentHtml.trim()) {
      toast.error('Please create some content before saving');
      return;
    }

    setIsLoading(true);
    try {
      const templateData = {
        name: templateName.trim(),
        subject: currentSubject,
        htmlContent: currentHtml,
        plainText: currentPlainText
      };

      if (editingTemplate) {
        await templateApi.updateTemplate(editingTemplate._id!, templateData, userId);
        toast.success('Template updated successfully!');
      } else {
        await templateApi.createTemplate(templateData, userId);
        toast.success('Template saved successfully!');
      }

      setShowSaveDialog(false);
      setTemplateName('');
      setEditingTemplate(null);
      await loadTemplates();
    } catch (error) {
      toast.error(editingTemplate ? 'Failed to update template' : 'Failed to save template');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTemplate = async () => {
    if (!deleteConfirmTemplate || !userId) return;

    try {
      await templateApi.deleteTemplate(deleteConfirmTemplate._id!, userId);
      toast.success('Template deleted successfully!');
      await loadTemplates();
    } catch (error) {
      toast.error('Failed to delete template');
    } finally {
      setDeleteConfirmTemplate(null);
    }
  };

  const handleLoadTemplate = (template: Template) => {
    onLoadTemplate(template);
    toast.success(`Loaded template: ${template.name}`);
  };

  const openSaveDialog = (template?: Template) => {
    if (template) {
      setEditingTemplate(template);
      setTemplateName(template.name);
    } else {
      setEditingTemplate(null);
      setTemplateName('');
    }
    setShowSaveDialog(true);
  };

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg border border-gray-200 p-4 lg:p-8 mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 space-y-4 lg:space-y-0">
        <div className="flex items-center space-x-3 lg:space-x-4">
          <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <FolderOpen className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl lg:text-2xl font-bold text-gray-900">Email Templates</h2>
            <p className="text-xs lg:text-sm text-gray-600 mt-1">Save and reuse your favorite email designs</p>
          </div>
        </div>
        <div className="flex items-center justify-between lg:justify-end space-x-3">
          {templates.length > 0 && (
            <div className="text-xs lg:text-sm text-gray-500 bg-white px-2 lg:px-3 py-1 rounded-full border border-gray-200">
              {templates.length} template{templates.length !== 1 ? 's' : ''}
            </div>
          )}
        <button
          onClick={() => openSaveDialog()}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 lg:px-6 py-2 lg:py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm lg:text-base"
          disabled={!currentSubject.trim() && !currentHtml.trim()}
        >
            <Save className="w-4 h-4 mr-2 inline" />
            <span className="hidden sm:inline">Save Template</span>
            <span className="sm:hidden">Save</span>
        </button>
        </div>
      </div>

      {/* Templates List */}
      {templates.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-6">
          {templates.map((template) => (
            <div key={template._id} className="group bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl p-5 lg:p-6 hover:border-blue-300 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 min-h-[280px] lg:min-h-[320px]">
              {/* Template Header */}
              <div className="flex items-start justify-between mb-3 lg:mb-4">
                <div className="flex items-center space-x-2 lg:space-x-3 flex-1">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-sm">
                    <FileText className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-base lg:text-lg truncate group-hover:text-blue-700 transition-colors">
                      {template.name}
                    </h3>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <Calendar className="w-3 h-3 mr-1" />
                      {template.updatedAt ? new Date(template.updatedAt).toLocaleDateString() : 'Recently updated'}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-1 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity ml-2 flex-shrink-0">
                  <button
                    onClick={() => openSaveDialog(template)}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors touch-manipulation"
                    title="Edit template"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeleteConfirmTemplate(template)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors touch-manipulation"
                    title="Delete template"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Template Preview */}
              <div className="mb-4 lg:mb-5 flex-grow">
                <div className="bg-white rounded-lg border border-gray-100 p-3 mb-3 shadow-sm">
                  <p className="text-sm font-medium text-gray-700 mb-2">Subject:</p>
                  <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                    {template.subject || <span className="text-gray-400 italic">No subject</span>}
                  </p>
                </div>

                {template.htmlContent && (
                  <div className="bg-white rounded-lg border border-gray-100 p-3 shadow-sm">
                    <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
                    <div
                      className="text-xs text-gray-600 line-clamp-3 prose prose-sm max-w-none leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: template.htmlContent.length > 100
                          ? template.htmlContent.substring(0, 100) + '...'
                          : template.htmlContent
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Template Actions */}
              <div className="flex flex-col space-y-3 mt-auto">
                <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                  <div className="flex items-center">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Template
                  </div>
                  {template.plainText && (
                    <div className="flex items-center">
                      <FileText className="w-3 h-3 mr-1" />
                      Plain Text
                    </div>
                  )}
                </div>
                <button
                  onClick={() => handleLoadTemplate(template)}
                  className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105 shadow-sm touch-manipulation w-full"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Use Template
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 lg:py-12 px-4 lg:px-6">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 lg:p-8 max-w-sm lg:max-w-md mx-auto border border-blue-100">
            <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 lg:mb-6 shadow-lg">
              <FileText className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
            </div>
            <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-2">No templates yet</h3>
            <p className="text-sm lg:text-base text-gray-600 mb-4 lg:mb-6">Create your first email template to save time and stay organized!</p>
            <div className="flex items-center justify-center space-x-2 text-xs lg:text-sm text-blue-600">
              <Sparkles className="w-3 h-3 lg:w-4 lg:h-4" />
              <span>Get started by saving your current email as a template</span>
            </div>
          </div>
        </div>
      )}

      {/* Save Template Dialog */}
      {showSaveDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 lg:p-6">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm lg:max-w-md w-full overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 lg:p-6 text-white">
              <div className="flex items-center space-x-2 lg:space-x-3">
                <div className="w-8 h-8 lg:w-10 lg:h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                  <Save className="w-4 h-4 lg:w-5 lg:h-5" />
                </div>
                <h3 className="text-lg lg:text-xl font-bold">
                  {editingTemplate ? 'Update Template' : 'Save Template'}
                </h3>
              </div>
            </div>
            <div className="p-4 lg:p-6">

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Template Name
                </label>
                <input
                  type="text"
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                  placeholder="Enter template name"
                  className="input-field"
                  autoFocus
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-end sm:space-x-3 space-y-2 sm:space-y-0">
                <button
                  onClick={() => {
                    setShowSaveDialog(false);
                    setTemplateName('');
                    setEditingTemplate(null);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors order-2 sm:order-1 touch-manipulation"
                >
                  Cancel
                </button>
                <button
                  onClick={saveTemplate}
                  disabled={isLoading || !templateName.trim()}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none order-1 sm:order-2 touch-manipulation"
                >
                  {isLoading ? 'Saving...' : (editingTemplate ? 'Update' : 'Save')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 lg:p-6">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm lg:max-w-md w-full overflow-hidden">
            <div className="bg-gradient-to-r from-red-500 to-pink-600 p-4 lg:p-6 text-white">
              <div className="flex items-center space-x-2 lg:space-x-3">
                <div className="w-8 h-8 lg:w-10 lg:h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                  <Trash2 className="w-4 h-4 lg:w-5 lg:h-5" />
                </div>
                <h3 className="text-lg lg:text-xl font-bold">Delete Template</h3>
              </div>
            </div>
            <div className="p-4 lg:p-6">

              <p className="text-gray-600 mb-6">
                Are you sure you want to delete the template <strong>"{deleteConfirmTemplate.name}"</strong>?
                This action cannot be undone.
              </p>

              <div className="flex flex-col sm:flex-row sm:justify-end sm:space-x-3 space-y-2 sm:space-y-0">
                <button
                  onClick={() => setDeleteConfirmTemplate(null)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors order-2 sm:order-1 touch-manipulation"
                >
                  Cancel
                </button>
                <button
                  onClick={deleteTemplate}
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 order-1 sm:order-2 touch-manipulation"
                >
                  Delete Template
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateManager;
