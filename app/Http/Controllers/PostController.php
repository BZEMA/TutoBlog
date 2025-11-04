<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class PostController extends Controller
{
    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        if (!Auth::check()) {
            abort(403, 'Action not authorisée');
        }
        return Inertia::render('Posts/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        if (!Auth::check()) {
            abort(403, 'Action not authorisée');
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|file|mimetypes:image/jpeg,image/png,image/jpg,image/gif,image/webp,image/avif,image/heic,image/heif,image/bmp,image/tiff|max:16384',
        ]);

        $post = new Post();
        $post->title = $validated['title'];
        $post->description = $validated['description'];
        $post->user_id = Auth::id();



        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('posts', 'public');
            $post->image = $path;
        }

        $post->save();
        return redirect()->route('dashboard')->with('success', 'Le post a été créé avec succès.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post): Response
    {
        // if (!Auth::check()) {
        //     abort(403, 'Action not authorisée');
        // }
        // cette fonction charge la relation "author" avant de passer le post à la vue
        return Inertia::render('Posts/Show', [
            'post' => $post->load('author'),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post): Response
    {
        // Vérifier si l'utilisateur authentifié est l'auteur du post
        if (!Auth::check() || Auth::id() !== $post->user_id) {
            abort(403, 'Action not authorisée');
        }
        return Inertia::render('Posts/Edit', [
            'post' => $post
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        // dd($request->all());
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|file|mimetypes:image/jpeg,image/png,image/jpg,image/gif,image/webp,image/avif,image/heic,image/heif,image/bmp,image/tiff|max:16384',
        ]);

        $post->title = $validated['title'];
        $post->description = $validated['description'];

        if ($request->hasFile('image')) {
            if ($post->image) {
                Storage::disk('public')->delete($post->image);
            }
            $path = $request->file('image')->store('posts', 'public');
            $post->image = $path;
        }

        $post->save();
        return redirect()->route('dashboard')->with('success', 'Le post a été mis à jour avec succès.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        if (!Auth::check() || Auth::id() !== $post->user_id) {
            abort(403, 'Action not authorisée');
        }

        if ($post->image) {
            Storage::disk('public')->delete($post->image);
        }

        $post->delete();
        return redirect()->back()->with('success', 'Le post a été supprimé avec succès.');
    }

    /**
     * Like or unlike a post.
     */
    public function like(Post $post)
    {
        $user = Auth::user();

        if ($post->likedBy()->where('user_id', $user->id)->exists()) {
            $post->likedBy()->detach($user->id);
            $message = 'Post disliké avec succès.';
        } else {
            $post->likedBy()->attach($user->id);
            $message = 'Post liké avec succès.';
        }

        // Recharger le post avec les relations nécessaires
        $post->load('author', 'likedBy');

        return back()
            ->with('message', $message)
            ->with('post', $post);
    }
}
