import Nav from "@/components/nav";
import { Button } from "@/components/ui/button";
import AppLayout from "@/layouts/app-layout";
import { dashboard } from "@/routes";
import { type BreadcrumbItem } from "@/types";
import { ShowProps } from "@/types/post";
import { Head, Link, router } from "@inertiajs/react";
import { Heart } from "lucide-react";

export default function Show({ auth, post }: ShowProps) {
    const handleLike = () => {
        if (!auth.user) {
            window.location.href = '/login';
            return;
        }
        router.post(`/posts/${post.id}/like`, {}, {
            preserveScroll: true,
            preserveState: false, // Ne pas préserver l'état pour permettre la mise à jour des likes
        });
    }

    const handleDelete = () => {
        if (confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) {
            router.delete(`/posts/${post.id}`, {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => {
                    window.location.href = '/dashboard';
                },
                onError: () => {
                    alert("Une erreur s'est produite lors de la suppression de l'article.");
                },
            })
        }
    }

    const canEdit = auth.user?.id === post.user_id;

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Page d\'accueil',
            href: dashboard().url,
        },
    ];

    return (
        auth.user && (
            <AppLayout breadcrumbs={[...breadcrumbs, { title: `Détails du post : ${post.title}`, href: '#' }]}>
                <Head title={post.title} />
                <div className="max-w-4xl mx-auto py-12 px-4">
                    {post.image && (
                        <div className="mb-6">
                            <img src={`/storage/${post.image}`} alt={post.title} className="w-full h-auto rounded-lg" />
                        </div>
                    )}
                    <h1 className="text-4xl font-bold mb-4 text-gray-800">{post.title}</h1>
                    <p className="text-gray-600 mb-6">Par {post.author.name} le {new Date(post.created_at).toLocaleDateString()}</p>
                    <div className="prose prose-lg text-gray-700 mb-8">
                        <p>{post.description}</p>
                    </div>
                    <div className="flex justify-between space-x-4">
                        <Button variant="ghost" size="icon" onClick={() => handleLike()} className={`transition-color ${post.is_liked ? 'text-red-600 hover:text-red-700 w-max px-3' : 'text-gray-600 hover:text-red-700 w-max px-3'}`}>
                            <Heart className="h-6 w-6" fill={post.is_liked ? "currentColor" : "none"} />
                            <span className="text-gray-600">
                                {post.likes_count} {post.likes_count > 1 ? 'Likes' : 'Like'}
                            </span>
                        </Button>
                        <div>
                            {canEdit && (
                                <>
                                    <Button className="mx-2 text-blue-600 bg-transparent hover:bg-blue-300">
                                        <Link href={`/posts/${post.id}/edit`}>
                                            Éditer
                                        </Link>
                                    </Button>
                                    <Button onClick={handleDelete} className="text-red-600 bg-transparent hover:bg-red-300">
                                        Supprimer
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </AppLayout>
        ) || (
            <>

                <Head title={post.title} />
                <div className="max-w-4xl mx-auto py-12 px-4">
                    {post.image && (
                        <div className="mb-6">
                            <img src={`/storage/${post.image}`} alt={post.title} className="w-full h-auto rounded-lg" />
                        </div>
                    )}
                    <h1 className="text-4xl font-bold mb-4 text-gray-800">{post.title}</h1>
                    <p className="text-gray-600 mb-6">Par {post.author.name} le {new Date(post.created_at).toLocaleDateString()}</p>
                    <div className="prose prose-lg text-gray-700 mb-8">
                        <p>{post.description}</p>
                    </div>
                    <div className="flex justify-between space-x-4">
                        <Button variant="ghost" size="icon" onClick={() => handleLike()} className={`transition-color ${post.is_liked ? 'text-red-600 hover:text-red-700 w-max px-3' : 'text-gray-600 hover:text-red-700 w-max px-3'}`}>
                            <Heart className="h-6 w-6" fill={post.is_liked ? "currentColor" : "none"} />
                            <span className="text-gray-600">
                                {post.likes_count} {post.likes_count > 1 ? 'Likes' : 'Like'}
                            </span>
                        </Button>
                        <div>
                            {canEdit && (
                                <>
                                    <Button className="mx-2 text-blue-600 bg-transparent hover:bg-blue-300">
                                        <Link href={`/posts/${post.id}/edit`}>
                                            Éditer
                                        </Link>
                                    </Button>
                                    <Button onClick={handleDelete} className="text-red-600 bg-transparent hover:bg-red-300">
                                        Supprimer
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </>
        )
    )

}


