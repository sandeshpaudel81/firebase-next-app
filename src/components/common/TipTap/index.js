"use client"
import Bold from '@tiptap/extension-bold'
import Paragraph from '@tiptap/extension-paragraph'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TipTapToolbar from './toolbar'

const Tiptap = ({content, onChange}) => {
    const editor = useEditor({
        extensions: [
            StarterKit
        ],
        content: content,
        editorProps: {
            attributes: {
                class: "bg-gray-300 p-2 focus:border-primary focus:bg-gray-400 rounded-lg"
            },
        },
        onUpdate({ editor }){
            onChange(editor.getHTML())
            console.log(editor.getHTML())
        }
    })

  return (
    <div className='flex flex-col'>
        <TipTapToolbar editor={editor} />
        <EditorContent editor={editor} />
    </div>
  )
}

export default Tiptap