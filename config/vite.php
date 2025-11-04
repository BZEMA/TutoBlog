<?php

return [
    'dev_server' => [
        'enabled' => env('VITE_DEV_SERVER_ENABLED', true),
        'host' => env('VITE_HOST', 'localhost'),
        'port' => env('VITE_PORT', 5173),
    ],
];
