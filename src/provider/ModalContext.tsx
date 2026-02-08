import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  ComponentType,
  useCallback,
  useRef,
  useEffect
} from 'react';


type ModalProps<P> = P & {
  onClose: () => void;
};

type ModalComponent<P = {}> = ComponentType<ModalProps<P>>;

interface ModalContextType {
  openModal: <P>(Component: ModalComponent<P>, props: P) => void;
  closeModal: () => void;
  modalIsOpen: boolean;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

interface ModalProviderProps {
  children: ReactNode;
}


export const ModalProvider: React.FC<ModalProviderProps> = ({children}) => {
  const [modal, setModal] = useState<{ Component: ModalComponent<any>, props: any } | null>(null);

  const ref = useRef(null);
  useEffect(() => {
    if (modal) {
      document.body.classList.add('no-scroll'); // Блокируем прокрутку
    } else {
      document.body.classList.remove('no-scroll'); // Восстанавливаем прокрутку
    }

    return () => {
      document.body.classList.remove('no-scroll'); // Очищаем класс при размонтировании компонента
    };
  }, [modal]);


  const openModal = useCallback(<P, >(Component: ModalComponent<P>, props: P) => {
    setModal({Component, props});
  }, []);


  const closeModal = useCallback(() => {
    setModal(null);
  }, []);

  return (
    <ModalContext.Provider value={{openModal, closeModal, modalIsOpen: modal !== null}}>
      <div ref={ref}>
        {children}
        {/*<Popover items={SETTINGS_CONF} parentRef={ref} />*/}
      </div>
      {modal && (
        <modal.Component {...modal.props} onClose={closeModal}/>
      )}
    </ModalContext.Provider>
  );
};


export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
