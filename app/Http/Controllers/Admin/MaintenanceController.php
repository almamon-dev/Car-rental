<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\DB;

class MaintenanceController extends Controller
{
    public function logs()
    {
        $logPath = storage_path('logs/laravel.log');
        $logs = "";

        if (File::exists($logPath)) {
            $file = file($logPath);
            $logs = implode("", array_slice($file, -500));
        }

        return Inertia::render('Admin/Maintenance/Logs', [
            'logs' => $logs
        ]);
    }

    public function backups()
    {
        $storagePath = storage_path('app/backups');
        $files = [];

        if (File::exists($storagePath)) {
            $rawFiles = File::files($storagePath);
            foreach ($rawFiles as $file) {
                if ($file->getExtension() === 'sql') {
                    $size = $file->getSize();
                    if ($size < 1024) {
                        $sizeText = $size . ' Bytes';
                    } else {
                        $sizeText = round($size / 1024, 2) . ' KB';
                    }

                    $files[] = [
                        'name' => $file->getFilename(),
                        'size' => $sizeText,
                        'created_at' => date("Y-m-d H:i:s", $file->getMTime()),
                    ];
                }
            }
        }

        usort($files, function($a, $b) {
            return strtotime($b['created_at']) - strtotime($a['created_at']);
        });

        return Inertia::render('Admin/Maintenance/Backups', [
            'backups' => $files
        ]);
    }

    public function updates()
    {
        $composer = json_decode(file_get_contents(base_path('composer.json')), true);
        $dependencies = array_merge(
            $composer['require'] ?? [],
            $composer['require-dev'] ?? []
        );

        return Inertia::render('Admin/Maintenance/Updates', [
            'currentVersion' => '1.0.0',
            'latestVersion' => '1.0.0',
            'phpVersion' => PHP_VERSION,
            'dependencies' => $dependencies
        ]);
    }

    public function generateBackup()
    {
        try {
            $tables = [];
            $result = DB::select('SHOW TABLES');
            
            foreach ($result as $row) {
                $rowArray = (array)$row;
                $tables[] = reset($rowArray); 
            }

            $filename = "db-backup-" . date("Y-m-d-His") . ".sql";
            $storagePath = storage_path('app/backups');

            if (!File::exists($storagePath)) {
                File::makeDirectory($storagePath, 0755, true);
            }

            $filePath = $storagePath . '/' . $filename;
            
            // Start creating the SQL file
            $handle = fopen($filePath, 'w+');
            
            fwrite($handle, "-- Fleet Rentals Database Backup\n");
            fwrite($handle, "-- Generated: " . date("Y-m-d H:i:s") . "\n\n");
            fwrite($handle, "SET FOREIGN_KEY_CHECKS=0;\n\n");

            foreach ($tables as $table) {
                // Table structure
                $res = DB::select("SHOW CREATE TABLE `$table` ");
                $sqlRow = (array)$res[0];
                $createTableSql = reset($sqlRow); // Gets the second element of the array which is 'Create Table'

                fwrite($handle, "\n-- Table structure for table `$table` --\n");
                fwrite($handle, "DROP TABLE IF EXISTS `$table`;\n");
                fwrite($handle, $createTableSql . ";\n\n");

                // Table data
                $rows = DB::table($table)->get();
                if ($rows->count() > 0) {
                    fwrite($handle, "-- Dumping data for table `$table` --\n");
                    foreach ($rows as $row) {
                        $rowArray = (array)$row;
                        $keys = array_keys($rowArray);
                        $values = array_values($rowArray);
                        
                        $escapedValues = array_map(function($val) {
                            if ($val === null) return 'NULL';
                            return "'" . addslashes($val) . "'";
                        }, $values);

                        fwrite($handle, "INSERT INTO `$table` (`" . implode("`, `", $keys) . "`) VALUES (" . implode(", ", $escapedValues) . ");\n");
                    }
                }
                fwrite($handle, "\n");
            }

            fwrite($handle, "SET FOREIGN_KEY_CHECKS=1;");
            fclose($handle);
            
            return back()->with('success', 'Backup generated successfully: ' . $filename);

        } catch (\Exception $e) {
            return back()->with('error', 'Backup failed: ' . $e->getMessage());
        }
    }

    public function downloadFile($filename)
    {
        $filePath = storage_path('app/backups/' . $filename);
        if (File::exists($filePath)) {
            return Response::download($filePath);
        }
        return back()->with('error', 'File not found.');
    }

    public function deleteFile($filename)
    {
        $filePath = storage_path('app/backups/' . $filename);
        if (File::exists($filePath)) {
            File::delete($filePath);
            return back()->with('success', 'Backup deleted successfully.');
        }
        return back()->with('error', 'File not found.');
    }

    public function optimize()
    {
        return Inertia::render('Admin/Maintenance/Optimize');
    }

    public function runOptimize(Request $request)
    {
        $type = $request->input('type', 'optimize');
        
        try {
            switch ($type) {
                case 'optimize':
                    Artisan::call('optimize');
                    $message = "System optimized successfully.";
                    break;
                case 'cache_clear':
                    Artisan::call('cache:clear');
                    $message = "Application cache cleared.";
                    break;
                case 'config_cache':
                    Artisan::call('config:cache');
                    $message = "Configuration cached successfully.";
                    break;
                case 'route_cache':
                    Artisan::call('route:cache');
                    $message = "Routes cached successfully.";
                    break;
                case 'view_clear':
                    Artisan::call('view:clear');
                    $message = "Compiled views cleared.";
                    break;
                default:
                    return back()->with('error', 'Invalid optimization type.');
            }
            
            return back()->with('success', $message);
        } catch (\Exception $e) {
            return back()->with('error', 'Optimization failed: ' . $e->getMessage());
        }
    }

    public function clearLogs()
    {
        $logPath = storage_path('logs/laravel.log');
        if (File::exists($logPath)) {
            File::put($logPath, "");
        }
        return back()->with('success', 'System logs cleared successfully.');
    }
}
