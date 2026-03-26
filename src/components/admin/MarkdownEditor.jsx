import React from 'react';
import MDEditor from '@uiw/react-md-editor';
import { useAppContext } from '../../context/AppContext';

const MarkdownEditor = ({ value, onChange, placeholder = "Write your markdown content here..." }) => {
  const { isDarkMode } = useAppContext();

  return (
    <div
      data-color-mode={isDarkMode ? "dark" : "light"}
      className="w-full rounded-xl overflow-hidden border border-light-border dark:border-dark-border shadow-sm"
    >
      <MDEditor
        value={value}
        onChange={onChange}
        height={400}
        minHeight={300}
        previewOptions={{
          rehypePlugins: [], // Can add sanitize plugins if needed
        }}
        textareaProps={{
          placeholder: placeholder
        }}
        style={{
          borderRadius: '0.75rem',
          backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff', // Fallback colors if css vars fail
        }}
      />
    </div>
  );
};

export default MarkdownEditor;
