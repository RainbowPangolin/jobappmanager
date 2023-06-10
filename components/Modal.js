import { useRef, useEffect} from 'react';

const Modal = ({isClosed, onClose, children}) => {
	const modalRef = useRef(null);
	const handleOutsideClick = (event) => {
		if (modalRef.current.open) {
			const dialogRect = modalRef.current.getBoundingClientRect();
			const clickedInsideModal = event.clientX >= dialogRect.left &&
				event.clientX <= dialogRect.right &&
				event.clientY >= dialogRect.top &&
				event.clientY <= dialogRect.bottom;
			if (!clickedInsideModal) {
				onClose();
			}
		}
	};

	const showModal = () => {
		if (modalRef.current) {
			modalRef.current.showModal();
		}
	};

	const closeModal = () => {
		if (modalRef.current) {
			modalRef.current.close();
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleOutsideClick);

		return () => {
			document.removeEventListener('mousedown', handleOutsideClick);
		};
	}, []);


	if(isClosed){
		closeModal();
	} else{
		showModal();
	}

	return (
		<dialog className="modal" ref={modalRef}>
			{children}
		</dialog>
	);
};

export default Modal;
