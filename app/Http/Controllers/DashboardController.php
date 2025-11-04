<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        return Inertia::render('dashboard', [
            'userPosts' => $user->posts()->with('author')->latest()->get(),
        ]);
    }
}
