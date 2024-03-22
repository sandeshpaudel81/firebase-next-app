"use client"
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TipTapToolbar from './toolbar'
import Underline from '@tiptap/extension-underline'
import Image from '@tiptap/extension-image'
import { useEffect } from 'react'

const Tiptap = ({content, onChange}) => {
    const handleChange = (newContent) => {
        onChange(newContent)
    }

    useEffect(() => {
        if (editor && !editor.isDestroyed) editor?.commands.setContent(content);
     }, [content]);

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    HTMLAttributes: {
                        class: "text-xl font-bold",
                        levels: [2]
                    }
                },
                bulletList: {
                    itemTypeName: 'listItem',
                    HTMLAttributes: {
                        class: "list-disc ml-5"
                    }
                },
                orderedList: {
                    itemTypeName: 'listItem',
                    HTMLAttributes: {
                        class: "list-decimal ml-5"
                    }
                },
                blockquote: {
                    HTMLAttributes: {
                        class: "border-l-2 pl-3 border-gray-700 text-gray-700"
                    }
                }
            }),
            Underline,
            Image.configure({
                HTMLAttributes: {
                    class: "max-w-10/12 max-h-500px object-contain my-3"
                }
            })
        ],
        content: content,
        editorProps: {
            attributes: {
                class: "bg-gray-300 p-2 outline-none focus:bg-[#b4bbc5] min-h-[100px]"
            },
        },
        onUpdate({ editor }){
            handleChange(editor.getHTML())
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