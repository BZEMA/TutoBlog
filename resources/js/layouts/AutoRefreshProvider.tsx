import { router } from '@inertiajs/react';
import { ReactNode, useEffect, useRef } from 'react';

interface AutoRefreshProviderProps {
    children: ReactNode;
    interval?: number;
    onlyProps?: string[];
}

export default function AutoRefreshProvider({
    children,
    interval = 10000, // 10 secondes par défaut
    onlyProps = ['posts', 'auth']
}: AutoRefreshProviderProps) {
    const formFocusRef = useRef(false);

    useEffect(() => {
        const refreshInterval = setInterval(() => {
            if (!formFocusRef.current && document.hasFocus()) {
                router.reload({ only: onlyProps });
            }
        }, interval);

        const handleFormFocus = () => {
            formFocusRef.current = true;
        };

        const handleFormBlur = () => {
            formFocusRef.current = false;
        };

        const handleVisibilityChange = () => {
            if (document.hidden) {
                clearInterval(refreshInterval);
            } else {
                router.reload({ only: onlyProps });
            }
        };

        // Gestionnaires d'événements pour les formulaires
        document.querySelectorAll('input, textarea, select, [contenteditable="true"]')
            .forEach(element => {
                element.addEventListener('focus', handleFormFocus);
                element.addEventListener('blur', handleFormBlur);
            });

        // Gestionnaire pour la visibilité de la page
        document.addEventListener('visibilitychange', handleVisibilityChange);

        // Nettoyage
        return () => {
            clearInterval(refreshInterval);
            document.querySelectorAll('input, textarea, select, [contenteditable="true"]')
                .forEach(element => {
                    element.removeEventListener('focus', handleFormFocus);
                    element.removeEventListener('blur', handleFormBlur);
                });
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [interval, onlyProps]);

    return <>{children}</>;
}
