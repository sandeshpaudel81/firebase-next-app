const TipTapToolbar = ({editor}) => {
    if (!editor) {
        return null
    }

    return (
        <>
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={
                    !editor.can().chain().focus().toggleStrike().run()
                }
                className={editor.isActive('bold') ? 'font-bold' : ''}
            >
            Bold    
            </button>
        </>
        
    )
}

export default TipTapToolbar
