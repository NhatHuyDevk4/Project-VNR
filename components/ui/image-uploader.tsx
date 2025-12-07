"use client"

import React, { useRef, useState, useCallback } from 'react'
import { Button } from './button'
import { uploadApi } from '@/service/upload'
import { toast } from 'react-toastify'

type Props = {
    onUploaded: (url: string) => void
    folder?: string
    className?: string
}

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']

export function ImageUploader({ onUploaded, folder = 'brand', className }: Props) {
    const inputRef = useRef<HTMLInputElement | null>(null)
    const [uploading, setUploading] = useState(false)

    const resetInput = useCallback(() => {
        if (inputRef.current) {
            inputRef.current.value = ''
        }
    }, [])

    const validateFile = useCallback((file: File): string | null => {
        if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
            return 'Vui lòng chọn file ảnh hợp lệ (JPEG, PNG, GIF, WebP)'
        }

        if (file.size > MAX_FILE_SIZE) {
            return 'Kích thước file không được vượt quá 10MB'
        }

        return null
    }, [])

    const handleFileUpload = useCallback(async (file: File) => {
        try {
            setUploading(true)
            const res = await uploadApi.uploadImage(file, folder)

            if (res?.data) {
                onUploaded(res.data)
                toast.success('Upload ảnh thành công')
                console.log('Upload successful:', res.data)
            } else {
                throw new Error('Không nhận được URL từ server')
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Lỗi không xác định'
            toast.error(errorMessage)
            throw error
        } finally {
            setUploading(false)
        }
    }, [onUploaded, folder])

    const handlePick = useCallback(() => {
        inputRef.current?.click()
    }, [])

    const onFileChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]

        if (!file) {
            resetInput()
            return
        }

        // Validate file
        const validationError = validateFile(file)
        if (validationError) {
            alert(validationError)
            resetInput()
            return
        }

        try {
            await handleFileUpload(file)
            resetInput()
        } catch {
            // Error already handled in handleFileUpload
            resetInput()
        }
    }, [validateFile, handleFileUpload, resetInput])

    return (
        <div className={className}>
            <input
                ref={inputRef}
                type='file'
                accept={ALLOWED_IMAGE_TYPES.join(',')}
                className='hidden'
                onChange={onFileChange}
            />
            <Button
                type='button'
                variant='outline'
                onClick={handlePick}
                disabled={uploading}
                className='min-w-[120px]'
            >
                {uploading ? (
                    <div className='flex items-center gap-2'>
                        <div className='w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin' />
                        Đang upload...
                    </div>
                ) : (
                    'Chọn ảnh'
                )}
            </Button>
        </div>
    )
}



