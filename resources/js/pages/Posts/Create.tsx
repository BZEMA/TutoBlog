import { FormEvent, useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import { CreateProps, PostFormData } from "@/types/post";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { dashboard } from "@/routes";
import { Input } from "@/components/ui/input";
import { Textarea } from "@headlessui/react";
import { error } from "console";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";

export default function Create({ auth } : CreateProps) {
    const { data, setData, post, processing, errors, reset } = useForm<PostFormData>({
        title: '',
        description: '',
        image: null as File | null,
    });

    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

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
        post('/posts', {
            forceFormData: true,
            onSuccess: () => {
                reset();
                setPreviewUrl('');
            }
        });
    }

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: dashboard().url,
        },
    ];

    return (
        <AppLayout breadcrumbs={[...breadcrumbs, { title: 'Créer un post', href: '#' }]}>
            <Head title="Création d'un post" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <h2 className="text-2xl font-semibold mb-6">
                            Création d'un nouveau post
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
                                    {processing ? 'Création en cours...' : 'Créer le post'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );

}
