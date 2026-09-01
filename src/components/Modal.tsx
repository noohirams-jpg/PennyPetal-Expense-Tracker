import { type ReactNode, useEffect } from 'react';
import { X } from 'lucide-react';

type ModalProps = {
  open: boolean;
  title: string;
  description?: string;
  onClose: () => void;
  children: ReactNode;
  wide?: boolean;
};

export function Modal({ open, title, description, onClose, children, wide = false }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-[hsl(158_24%_18%/_.38)] p-0 sm:items-center sm:p-4" role="presentation" onMouseDown={(event) => { if (event.currentTarget === event.target) onClose(); }}>
      <div className={`w-full ${wide ? 'max-w-2xl' : 'max-w-lg'} max-h-[92dvh] overflow-y-auto rounded-t-[1.7rem] bg-[hsl(var(--card))] p-5 shadow-2xl sm:rounded-[1.7rem] sm:p-7`} role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div><h2 id="modal-title" className="serif text-3xl text-[hsl(var(--foreground))]">{title}</h2>{description && <p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">{description}</p>}</div>
          <button data-testid="button-close-modal" aria-label="Close dialog" onClick={onClose} className="rounded-full p-2 text-[hsl(var(--muted-foreground))] transition hover:bg-[hsl(var(--muted))]"><X size={19} /></button>
        </div>
        {children}
      </div>
    </div>
  );
}