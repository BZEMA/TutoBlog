<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Inertia\Inertia;
use Inertia\Response;

class WelcomeController extends Controller
{
    public function index():Response{
        // $posts = Post::all();
        $posts = Post::with('author')->latest()->get();
        // dd($posts);
        return Inertia::render('welcome', [
            'posts' => $posts,
            'canRegister' => config('services.registration.enabled', true),
        ]);
    }
}
