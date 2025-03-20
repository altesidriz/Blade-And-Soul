import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';

const TextEditor = ({ onChange }) => {
    const [editorContent, setEditorContent] = useState('');

    const handleImageUpload = (blobInfo, progress) => {
        return new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append('file', blobInfo.blob(), blobInfo.filename());
            formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

            axios.post(
                `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
                formData,
                {
                    onUploadProgress: (progressEvent) => {
                        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        progress(percentCompleted);
                    },
                }
            )
                .then((response) => {
                    resolve(response.data.secure_url);
                })
                .catch((error) => {
                    reject('HTTP Error: ' + error.message);
                });
        });
    };

    console.log(editorContent);


    return (
        <div>
            <Editor
                apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
                value={editorContent}
                onEditorChange={(content) => {
                    setEditorContent(content);
                    if (onChange) {
                        onChange(content);
                    }
                }}
                init={{
                    menubar: true, // Show the menu bar
                    toolbar: 'undo redo | formatpainter | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | numlist bullist | table | link image code | wordcount',
                    plugins: 'advlist table image lists formatpainter link wordcount code',
                    // plugins: 'a11ychecker advcode advlist advtable anchor autocorrect autolink autoresize autosave casechange charmap checklist code codesample directionality editimage emoticons export footnotes formatpainter fullscreen image importcss inlinecss insertdatetime link linkchecker lists media mediaembed mentions mergetags nonbreaking pagebreak pageembed permanentpen powerpaste preview quickbars save searchreplace table tableofcontents template tinydrive tinymcespellchecker typography visualblocks visualchars wordcount',
                    directionality: 'ltr',
                    images_upload_handler: handleImageUpload,
                }}
            />
        </div>
    );
};

export default TextEditor;