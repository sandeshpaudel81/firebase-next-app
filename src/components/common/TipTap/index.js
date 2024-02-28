"use client"
import Heading from '@tiptap/extension-heading'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TipTapToolbar from './toolbar'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import ListItem from '@tiptap/extension-list-item'

const Tiptap = ({content, onChange}) => {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({}),
            Heading.configure({
                HTMLAttributes: {
                    class: "text-xl font-bold",
                    levels: [2]
                }
            }),
            ListItem,
            BulletList.configure({
                itemTypeName: 'listItem',
                HTMLAttributes: {
                    class: "list-disc ml-5"
                }
            }),
            OrderedList.configure({
                itemTypeName: 'listItem',
                HTMLAttributes: {
                    class: "list-decimal ml-5"
                }
            }),
        ],
        content: content,
        editorProps: {
            attributes: {
                class: "bg-gray-300 p-2 outline-none focus:bg-[#b4bbc5] min-h-[100px]"
            },
        },
        onUpdate({ editor }){
            onChange(editor.getHTML())
        }
    }, [content])

  return (
    <div className='flex flex-col'>
        <TipTapToolbar editor={editor} />
        <EditorContent editor={editor} />
    </div>
  )
}

export default Tiptap