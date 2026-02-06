import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Modal, Portal } from '@mantine/core';
import { ModalContext } from '@/hooks/useModal';

type ModalProps = {
  id: string; // 고유 ID
  component: React.ReactNode; // Modal content
  parameter: unknown; // Parameters to pass to the modal
  opened: boolean; // Whether the modal is open
  title: string; // Title of the modal
  onClose: (result?: unknown) => void; // Callback when the modal closes
  closeOnClickOutside: boolean; // 외부 클릭 시 모달 닫기 허용 여부
};

export const ModalStackManager: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [modalStack, setModalStack] = useState<ModalProps[]>([]);
  const modalIdCounter = useRef(0);

  const openModal = useCallback(
    (
      component: React.ReactNode,
      parameter: unknown,
      title: string,
      closeOnClickOutside = true // 기본값: 외부 클릭 시 닫기 허용
    ): Promise<unknown> => {
      return new Promise<unknown>((resolve) => {
        const modalProps: ModalProps = {
          id: `modal-${++modalIdCounter.current}`,
          component,
          parameter,
          onClose: resolve,
          title,
          opened: true,
          closeOnClickOutside,
        };
        setModalStack((prevStack) => [...prevStack, modalProps]);
      });
    },
    []
  );

  const closeModal = useCallback((result?: unknown) => {
    setModalStack((prevStack) => {
      if (prevStack.length === 0) {
        return prevStack;
      }

      const updatedStack = [...prevStack];
      const currentModal = updatedStack.pop();
      if (currentModal) {
        currentModal.onClose(result);
      }
      return updatedStack;
    });
  }, []);

  const contextValue = useMemo(() => ({ openModal, closeModal }), [openModal, closeModal]);

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      <Portal>
        {modalStack.map((modalProps) => (
          <Modal
            key={modalProps.id}
            opened={modalProps.opened}
            onClose={() => closeModal(null)}
            title={modalProps.title}
            centered
            size="auto"
            closeOnClickOutside={modalProps.closeOnClickOutside}
          >
            {modalProps.component}
          </Modal>
        ))}
      </Portal>
    </ModalContext.Provider>
  );
};
