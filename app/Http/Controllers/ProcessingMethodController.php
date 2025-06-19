<?php

namespace App\Http\Controllers;

use App\Models\ProcessingMethod;
use App\Models\AdminActivity;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProcessingMethodController extends Controller
{

    public function index()
    {
        $methods = ProcessingMethod::withCount('steps')->get();
        return Inertia::render('admin/processingmethods/index', ['processingMethods' => $methods]);
    }


    public function create()
    {
        return Inertia::render('admin/processingmethods/create');
    }


    public function store(Request $request)
    {
        $data = $request->validate([
            'judul' => 'required|string',
            'steps' => 'required|array',
            'steps.*.tahap_ke' => 'required|integer',
            'steps.*.deskripsi_tahapan' => 'nullable|string',
            'steps.*.gambar_tahapan' => 'nullable|image|max:2048',
        ]);

        $method = ProcessingMethod::create(['judul' => $data['judul']]);

        foreach ($data['steps'] as $index => $step) {
            $stepData = [
                'tahap_ke' => $step['tahap_ke'],
                'deskripsi_tahapan' => $step['deskripsi_tahapan'],
                'processing_method_id' => $method->id,
            ];

            if ($request->hasFile("steps.$index.gambar_tahapan")) {
                $stepData['gambar_tahapan'] = $request->file("steps.$index.gambar_tahapan")->store('processing', 'public');
            }

            $method->steps()->create($stepData);
        }

        AdminActivity::create([
            'description' => '➕ Metode pengolahan "' . $method->judul . '" ditambahkan',
            'admin_id' => Auth::id(),
        ]);

        return redirect()->route('admin.processing-methods.index');
    }


    public function show(ProcessingMethod $processingMethod)
    {
        $processingMethod->load('steps');
        return Inertia::render('admin/processingmethods/show', ['processingMethod' => $processingMethod]);
    }


    public function edit(ProcessingMethod $processingMethod)
    {
        $processingMethod->load('steps');
        return Inertia::render('admin/processingmethods/edit', ['processingMethod' => $processingMethod]);
    }


    public function update(Request $request, ProcessingMethod $processingMethod)
    {
        $data = $request->validate([
            'judul' => 'required|string',
            'steps' => 'required|array',
            'steps.*.tahap_ke' => 'required|integer',
            'steps.*.deskripsi_tahapan' => 'nullable|string',
            'steps.*.gambar_tahapan' => 'nullable|file|image|max:2048'
        ]);

        $processingMethod->update(['judul' => $data['judul']]);

        // Delete old steps & their images
        foreach ($processingMethod->steps as $step) {
            if ($step->gambar_tahapan) {
                Storage::disk('public')->delete($step->gambar_tahapan);
            }
        }
        $processingMethod->steps()->delete();

        foreach ($data['steps'] as $index => $step) {
            $path = null;
            if ($request->hasFile("steps.$index.gambar_tahapan")) {
                $path = $request->file("steps.$index.gambar_tahapan")->store('processing', 'public');
            }

            $processingMethod->steps()->create([
                'tahap_ke' => $step['tahap_ke'],
                'deskripsi_tahapan' => $step['deskripsi_tahapan'],
                'gambar_tahapan' => $path,
            ]);
        }

        AdminActivity::create([
            'description' => '🔄 Metode pengolahan "' . $processingMethod->judul . '" diperbarui',
            'admin_id' => Auth::id(),
        ]);

        return redirect()->route('admin.processing-methods.index');
    }


    public function destroy(ProcessingMethod $processingMethod)
    {
        foreach ($processingMethod->steps as $step) {
            if ($step->gambar_tahapan) {
                Storage::disk('public')->delete($step->gambar_tahapan);
            }
        }

        $judul = $processingMethod->judul;
        $processingMethod->delete();

        AdminActivity::create([
            'description' => '❌ Metode pengolahan "' . $judul . '" dihapus',
            'admin_id' => Auth::id(),
        ]);

        return redirect()->route('admin.processing-methods.index');
    }

    public function publicIndex()
{
    $methods = ProcessingMethod::with('steps')->get();

    $flattenedSteps = $methods->flatMap(function ($method) {
        return $method->steps->map(function ($step) use ($method) {
            return [
                'id' => $step->id,
                'judul' => $method->judul,
                'tahap_ke' => $step->tahap_ke,
                'deskripsi_tahapan' => $step->deskripsi_tahapan,
                'gambar_tahapan' => $step->gambar_tahapan,
            ];
        });
    });

    $methods = ProcessingMethod::all();
    return Inertia::render('user/processing-methods', [
        'methods' => $methods,
    ]);
}
}