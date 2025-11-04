import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import AutoRefreshProvider from '@/layouts/AutoRefreshProvider';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => (
    <AutoRefreshProvider interval={5000}>
        <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
            {children}
        </AppLayoutTemplate>
    </AutoRefreshProvider>
);
