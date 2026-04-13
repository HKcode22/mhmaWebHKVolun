<?php
/**
 * WordPress React Frontend Bridge - FIXED VERSION
 * Serves appropriate React HTML files for each route
 */

$request_uri = $_SERVER['REQUEST_URI'];
$path = parse_url($request_uri, PHP_URL_PATH);
$path = trim($path, '/');

// Allow WordPress admin, API, and uploads to work normally
if (strpos($request_uri, '/wp-admin') === 0 || 
    strpos($request_uri, '/wp-login.php') === 0 ||
    strpos($request_uri, '/wp-json') === 0 ||
    strpos($request_uri, '/graphql') === 0 ||
    strpos($request_uri, '/wp-content/uploads') === 0) {
    require dirname(__FILE__) . '/wp-blog-header.php';
    exit;
}

// React app folder
$react_app = dirname(__FILE__) . '/react-app';

// Map paths to HTML files
$html_file = null;

if ($path === '' || $path === '/') {
    // Home page
    $html_file = $react_app . '/index.html';
} else {
    // Try to find matching HTML file
    $possible_files = [
        $react_app . '/' . $path . '.html',
        $react_app . '/' . $path . '/index.html',
    ];
    
    foreach ($possible_files as $file) {
        if (file_exists($file)) {
            $html_file = $file;
            break;
        }
    }
}

// If no specific HTML file found, serve index.html (SPA fallback)
if (!$html_file || !file_exists($html_file)) {
    $html_file = $react_app . '/index.html';
}

// Serve the HTML file
if (file_exists($html_file)) {
    // Read the HTML content
    $content = file_get_contents($html_file);
    
    // Fix asset paths - ensure they point to react-app folder
    $content = str_replace('href="./', 'href="/react-app/', $content);
    $content = str_replace('src="./', 'src="/react-app/', $content);
    
    echo $content;
} else {
    echo "React app not found at: $html_file";
}
?>
