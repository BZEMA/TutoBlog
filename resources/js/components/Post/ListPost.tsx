// import { route } from "@/routes";
import { Post, Props } from "@/types/post";
import { router, usePage, Link } from "@inertiajs/react";
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { Edit, Eye, Heart, Trash2 } from "lucide-react";

export default function ListPost({ posts, showAuthor = true }: Props) {
    const { auth } = usePage().props as any;
    const [deletingId, setDeletingId] = useState<number | null>(null);

    const handleDelete = (postId: number) => {
        if (confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) {
            setDeletingId(postId);
            // Ici, vous pouvez ajouter la logique pour appeler l'API de suppression
            router.delete(`/posts/${postId}`, {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => {
                    setDeletingId(null);
                },
                onError: () => {
                    setDeletingId(null);
                    alert("Une erreur s'est produite lors de la suppression de l'article.");
                },
            })
        }
    }

    const handleLike = (postId: number) => {
        router.post(`/posts/${postId}/like`, {}, {
            preserveScroll: true,
            preserveState: true,
        })
    }

    const canEditPost = (post: Post) => {
        return auth.user?.id === post.user_id;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-12">
            {posts.map((post) => (
                <Card key={post.id} className="mx-6 flex flex-col h-full overflow-hidden">
                    {post.image && (
                        <div className="aspect-w16 aspect-h-9">
                            <img src={`/storage/${post.image}`} alt={post.title} className="object-cover w-full h-h48" />
                        </div>
                    )}
                    <CardHeader>
                        <h3 className="text-xl font-semibold text-gray-800">
                            {post.title}
                        </h3>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-600 line-clamp-3 mb-4">
                            {post.description}
                        </p>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                            {showAuthor && (
                                <span>Par {post.author ? post.author.name : 'Auteur inconnu'}</span>
                            )}
                            <span>{new Date(post.created_at).toLocaleDateString()}</span>
                        </div>
                    </CardContent>
                    <CardFooter className="flex items-center justify-between">
                        <div className="flex items-center justify-end space-x-2">
                            <Button variant="ghost" size="icon" onClick={() => handleLike(post.id)} className={`transition-color ${post.is_liked ? 'text-red-600 hover:text-red-700' : 'text-gray-600 hover:text-red-700'}`}>
                                <Heart className="h-6 w-6" fill={post.is_liked ? "currentColor" : "none"} />
                            </Button>
                            <span className="text-gray-600">
                                {post.likes_count}
                            </span>
                        </div>

                        <div className="flex items-center space-x-3">
                            <Button variant="link" asChild>
                                <Link href={`/posts/${post.id}`}>
                                    <Eye className="h-6 w-6" />
                                </Link>
                            </Button>
                            {canEditPost(post) && (
                                <>
                                    <Button variant="link" asChild>
                                        <Link href={`/posts/${post.id}/edit`}>
                                            <Edit className="h-6 w-6" />
                                        </Link>
                                    </Button>
                                    <Button
                                        onClick={() => handleDelete(post.id)}
                                        disabled={deletingId === post.id}
                                        variant="ghost"
                                        className="text-red-600 hover:text-red-700"
                                    >
                                        <Trash2 className="h-6 w-6" />
                                    </Button>
                                </>
                            )}
                        </div>
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}
