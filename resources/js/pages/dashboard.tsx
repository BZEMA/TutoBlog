import ListPost from '@/components/Post/ListPost';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { PageProps, type BreadcrumbItem } from '@/types';
import { Post } from '@/types/post';
import { Head, Link } from '@inertiajs/react';

interface Props extends PageProps {
    userPosts: Post[]
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Page d\'accueil',
        href: dashboard().url,
    },
];

export default function Dashboard({ userPosts }: Props) {
    // export default function Dashboard({ userPosts }: Props[]) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <div className="flex justify-center items-center mb-6">
                        <h2 className="text-2xl font-semibold text-gray-900">Mes publications</h2>
                        <Link href="/posts/create" className='inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700'>
                            Créer un post
                        </Link>
                    </div>

                    {userPosts.length > 0 ? (
                        <ListPost posts={userPosts} showAuthor={false} canEdit={true} />
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20">
                            <PlaceholderPattern className="h-48 w-48 mb-6 text-gray-300" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun post trouvé</h3>
                            <p className="text-sm text-gray-500">Vous n'avez pas encore créé de post.</p>
                            <p className="text-sm text-gray-500">Cliquez sur le bouton "Créer un post" pour commencer à partager vos idées !</p>
                        <Link href="/posts/create" className='text-indigo-600 hover:text-indigo-800'>
                            Créer votre premier post
                        </Link>
                        </div>
                    )}

                </div>
            </div>
        </AppLayout>
    );
}
