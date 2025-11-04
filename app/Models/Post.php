<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Facades\Auth;

class Post extends Model
{
    use HasFactory;

    // Les attributs qui peuvent être assignés en masse.
    protected $fillable = [
        'title',
        'description',
        'image',
        'user_id',
    ];

    // il s'agit des attributs personnalisés que nous voulons ajouter à la représentation JSON du modèle.
    protected $appends = [
        'is_liked',
        'likes_count',
    ];

    // Cela permet de charger automatiquement la relation "likedBy" chaque fois qu'une instance du modèle Post est récupérée.
    protected $with = [
        'likedBy',
    ];

    // Définir la relation avec le modèle User (auteur du post)
    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    // Définir la relation many-to-many avec le modèle User pour les likes
    public function likedBy(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'post_likes');
    }

    // Attribut personnalisé pour vérifier si l'utilisateur authentifié a aimé le post
    public function getIsLikedAttribute(): bool
    {
        return Auth::check() && $this->likedBy->contains('id', Auth::id());
    }

    // Attribut personnalisé pour obtenir le nombre de likes du post
    public function getLikesCountAttribute(): int
    {
        return $this->likedBy->count();
    }
}
