'use client';

import { Button, Modal, ModalBody, ModalContent, ModalFooter, useDraggable } from "@heroui/react"
import { forwardRef, useImperativeHandle, useRef, useState } from "react"
import { CONFIRM_TYPE } from "@/lib/constant";
import { MessageCircleWarning } from 'lucide-react';

export type MesCOnfirmModalRef = {
    open: () => void
    close: () => void
}

const MesConfirmModal = forwardRef<MesCOnfirmModalRef, {
    title?: string;
    type?: typeof CONFIRM_TYPE[keyof typeof CONFIRM_TYPE];
    content?: React.ReactNode;
    cancelText?: string;
    confirmText?: string;
    loading?: boolean;
    onConfirm?: () => void;
    onCancel?: () => void;
}
>(({ title, type = CONFIRM_TYPE.WARNING, content, cancelText, confirmText, loading = false, onConfirm, onCancel }, ref) => {
    const [isOpen, setIsOpen] = useState(false)
    const modalRef = useRef<HTMLElement>(null as unknown as HTMLElement);
    const { moveProps } = useDraggable({ targetRef: modalRef, isDisabled: !isOpen });

    useImperativeHandle(ref, () => {
        return {
            open: () => {
                setIsOpen(true)
            },
            close: () => {
                setIsOpen(false)
            }
        }
    })
    const handleConfirm = () => {
        onConfirm?.();
    };

    return <Modal
        ref={modalRef}
        isOpen={isOpen}
        placement="top"
        scrollBehavior="inside"
        isDismissable={false}
        hideCloseButton
        className="min-w-[300px] max-w-[500px]"
    >
        <ModalContent className="shadow-xl">
            {(onClose) => (
                <>
                    <ModalBody className="p-6 min-h-[120px]">
                        <div {...moveProps} className="flex gap-4 items-center h-[32px]">
                            {type === CONFIRM_TYPE.WARNING && (
                                <div className="flex-shrink-0">
                                    <MessageCircleWarning className="text-orange-300" size={24} />
                                </div>
                            )}
                            <div className="text-lg font-semibold">{title ?? '提示'}</div>
                        </div>
                        <div className="text-gray-700">
                            {content}
                        </div>
                    </ModalBody>
                    <ModalFooter className="border-t border-gray-300 py-4 px-4 flex justify-end gap-3">
                        <Button
                            variant="bordered"
                            onPress={() => {
                                onCancel?.();
                                setIsOpen(false);
                            }}
                        >
                            {cancelText ?? '取消'}
                        </Button>
                        <Button
                            color="primary"
                            onPress={handleConfirm}
                            isLoading={loading}
                        >
                            {confirmText ?? '确定'}
                        </Button>
                    </ModalFooter>
                </>
            )}
        </ModalContent>
    </Modal>
})

MesConfirmModal.displayName = 'MesConfirmModal'
export default MesConfirmModal