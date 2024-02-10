const TipTapToolbar = ({editor}) => {
    if (!editor) {
        return null
    }

    return (
        <div className="flex gap-1 bg-gray-400 border-b-2 p-1">
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editor.can().chain().focus().toggleBold().run()}
                className={editor.isActive('bold') ? 'px-2 bg-gray-300 rounded-md' : 'px-2 hover:bg-gray-300 rounded-md'}
            >
            Bold   
            </button>
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
                className={editor.isActive('italic') ? 'px-2 bg-gray-300 rounded-md' : 'px-2 hover:bg-gray-300 rounded-md'}
            >
            Italic
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({level:2}).run()}
                className={editor.isActive('heading') ? 'px-2 bg-gray-300 rounded-md' : 'px-2 hover:bg-gray-300 rounded-md'}
            >
            H2
            </button>
            <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={editor.isActive('bulletList') ? 'px-2 bg-gray-300 rounded-md' : 'px-2 hover:bg-gray-300 rounded-md'}
            >
            &#10070;&#10070;&#10070;
            </button>
            <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={editor.isActive('orderedList') ? 'px-2 bg-gray-300 rounded-md' : 'px-2 hover:bg-gray-300 rounded-md'}
            >
            123
            </button>
        </div>
        
    )
}

export default TipTapToolbar
