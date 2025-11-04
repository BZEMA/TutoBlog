import { useState } from "react";
import { Head, router, useForm } from "@inertiajs/react";
import { EditProps, PostFormData } from "@/types/post";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { dashboard } from "@/routes";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@headlessui/react";

export default function Create({ post } : EditProps) {
    const { data, setData, processing, errors, reset } = useForm<PostFormData>({
        title: post.title,
        description: post.description,
        image: null,
    });

    // Initialiser l'URL de l'aperçu avec l'image existante du post
    const [previewUrl, setPreviewUrl] = useState<string>(post.image ? `/storage/${post.image}` : '');

    // Gérer le changement d'image et l'aperçu
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('image', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // ici on a besoin de créer un FormData manuellement pour inclure le fichier
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);
        // Vérifier si une nouvelle image a été sélectionnée
        if (data.image instanceof File) {
            formData.append('image', data.image);
        }
        formData.append('_method', 'PUT'); // Pour Laravel, car FormData utilise toujours POST

        router.post(`/posts/${post.id}`, formData);
    }

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: dashboard().url,
        },
    ];

    return (
        <AppLayout breadcrumbs={[...breadcrumbs, { title: 'Modifier un post', href: '#' }]}>
            <Head title="Modification d'un post" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <h2 className="text-2xl font-semibold mb-6">
                            Modification d'un post
                        </h2>
                        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="title">
                                    Titre
                                </Label>
                                <Input
                                    id="title"
                                    type="text"
                                    className="my-4"
                                    value={data.title}
                                    onChange={e => setData('title', e.target.value)}
                                />
                                {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="description">
                                    Description
                                </Label>
                                <Textarea
                                    id="description"
                                    className="my-4 border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-20 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                />
                                {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="image" >
                                    Image
                                </Label>
                                <Input
                                    id="image"
                                    type="file"
                                    accept="images/*"
                                    className="block h-13 px-3 file:mr-4 file:rounded-md file:border-0 file:text-sm file:text-semibold file:bg-indigo-50 file:bg-indigo-500 file:my-2 file:px-2 file:font-semibold hover:file:bg-indigo-700"
                                    onChange={handleImageChange}
                                />
                                {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
                                {previewUrl && (
                                    <div className="mt-4">
                                        <p className="mb-2">Aperçu de l'image :</p>
                                        <div className="flex items-center justify-center">
                                            <img src={previewUrl} alt="Aperçu" className="max-w-xl max-h-80 rounded-md" />
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="flex items-center justify-end space-x-4">
                                <Button type="button" variant="outline" onClick={() => window.history.back()}>
                                    Annuler
                                </Button>
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Modification en cours...' : 'Modifier le post'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
