"use client"

import { FaBold, FaItalic, FaStrikethrough, FaListUl, FaListOl, FaHeading, FaUnderline, FaQuoteLeft, FaUndo, FaRedo } from "react-icons/fa"

const TipTapToolbar = ({editor}) => {
    if (!editor) {
        return null
    }

    return (
        <div className="flex gap-1 bg-gray-400 border-b-2 p-2 flex-wrap">
            <button
                onClick={(e) => {
                    e.preventDefault()
                    editor.chain().focus().toggleBold().run()
                }}
                disabled={!editor.can().chain().focus().toggleBold().run()}
                className={editor.isActive('bold') ? 'p-2 bg-gray-300 rounded-md' : 'p-2 hover:bg-gray-300 rounded-md'}
            >
            <FaBold />   
            </button>
            <button
                onClick={(e) => {
                    e.preventDefault()
                    editor.chain().focus().toggleItalic().run()
                }}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
                className={editor.isActive('italic') ? 'px-2 bg-gray-300 rounded-md' : 'px-2 hover:bg-gray-300 rounded-md'}
            >
            <FaItalic />
            </button>
            <button
                onClick={(e) => {
                    e.preventDefault()
                    editor.chain().focus().toggleStrike().run()
                }}
                disabled={!editor.can().chain().focus().toggleStrike().run()}
                className={editor.isActive('strike') ? 'px-2 bg-gray-300 rounded-md' : 'px-2 hover:bg-gray-300 rounded-md'}
            >
            <FaStrikethrough />
            </button>
            <button
                onClick={(e) => {
                    e.preventDefault()
                    editor.chain().focus().toggleUnderline().run()
                }}
                disabled={!editor.can().chain().focus().toggleUnderline().run()}
                className={editor.isActive('underline') ? 'px-2 bg-gray-300 rounded-md' : 'px-2 hover:bg-gray-300 rounded-md'}
            >
            <FaUnderline />
            </button>
            <button
                onClick={(e) => {
                    e.preventDefault()
                    editor.chain().focus().toggleHeading({level:2}).run();
                }}
                disabled={!editor.can().chain().focus().toggleHeading({level:2}).run()}
                className={editor.isActive('heading', {level:2}) ? 'px-2 bg-gray-300 rounded-md' : 'px-2 hover:bg-gray-300 rounded-md'}
            >
            <FaHeading />
            </button>
            <button
                onClick={(e) => {
                    e.preventDefault()
                    editor.chain().focus().toggleBulletList().run()
                }}
                disabled={!editor.can().chain().focus().toggleBulletList().run()}
                className={editor.isActive('bulletList') ? 'px-2 bg-gray-300 rounded-md' : 'px-2 hover:bg-gray-300 rounded-md'}
            >
            <FaListUl />
            </button>
            <button
                onClick={(e) => {
                    e.preventDefault()
                    editor.chain().focus().toggleOrderedList().run()
                }}
                disabled={!editor.can().chain().focus().toggleOrderedList().run()}
                className={editor.isActive('orderedList') ? 'px-2 bg-gray-300 rounded-md' : 'px-2 hover:bg-gray-300 rounded-md'}
            >
            <FaListOl />
            </button>
            <button
                onClick={(e) => {
                    e.preventDefault()
                    editor.chain().focus().toggleBlockquote().run()
                }}
                disabled={!editor.can().chain().focus().toggleBlockquote().run()}
                className={editor.isActive('blockquote') ? 'px-2 bg-gray-300 rounded-md' : 'px-2 hover:bg-gray-300 rounded-md'}
            >
            <FaQuoteLeft />
            </button>
            <button
                onClick={(e) => {
                    e.preventDefault()
                    editor.chain().focus().undo().run()
                }}
                disabled={!editor.can().chain().focus().undo().run()}
                className={editor.isActive('undo') ? 'px-2 bg-gray-300 rounded-md' : 'px-2 hover:bg-gray-300 rounded-md'}
            >
            <FaUndo />
            </button>
            <button
                onClick={(e) => {
                    e.preventDefault()
                    editor.chain().focus().redo().run()
                }}
                disabled={!editor.can().chain().focus().redo().run()}
                className={editor.isActive('redo') ? 'px-2 bg-gray-300 rounded-md' : 'px-2 hover:bg-gray-300 rounded-md'}
            >
            <FaRedo />
            </button>
        </div>
        
    )
}

export default TipTapToolbar
